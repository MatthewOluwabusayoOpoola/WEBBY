"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// Falls back to localhost only for local dev; set CLIENT_URL in production
// (Netlify URL) so Stripe doesn't redirect paying customers to their own machine.
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:2001";

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userName, email } = ctx.request.body;

    if (!Array.isArray(products) || products.length === 0) {
      ctx.response.status = 400;
      return { error: { message: "products must be a non-empty array" } };
    }

    const hasInvalidProduct = products.some(
      (product) =>
        !product ||
        product.id == null ||
        !Number.isInteger(product.count) ||
        product.count <= 0
    );
    if (hasInvalidProduct) {
      ctx.response.status = 400;
      return {
        error: {
          message:
            "each product needs a valid id and a positive integer count",
        },
      };
    }

    try {
      // retrieve item information
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);

          if (!item) {
            throw new Error(`Item ${product.id} not found`);
          }

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );

      // create a stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: `${CLIENT_URL}/checkout/success`,
        cancel_url: CLIENT_URL,
        line_items: lineItems,
      });

      // create the item
      await strapi
        .service("api::order.order")
        .create({ data: { userName, products, stripeSessionId: session.id } });

      // return the session id
      return { id: session.id };
    } catch (error) {
      ctx.response.status = 500;
      return { error: { message: "There was a problem creating the charge" } };
    }
  },
}));
