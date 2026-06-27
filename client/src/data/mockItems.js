// Fallback catalog rendered when the live Strapi backend is unreachable
// (e.g. Render free-tier instance asleep, network blip, backend down).
// Shape matches the Strapi v4 REST response exactly: { data: [ { id, attributes: {...} } ] }
// so existing components (Item.jsx, ItemDetails.jsx, CartMenu.jsx) need no special-casing.

const placeholderImage = (label, bg = "1a1a1a", fg = "ffffff") => ({
  data: {
    attributes: {
      formats: {
        medium: {
          url: `https://placehold.co/300x250/${bg}/${fg}?text=${encodeURIComponent(
            label
          )}`,
        },
      },
    },
  },
});

export const mockItemsResponse = {
  data: [
    {
      id: 9001,
      attributes: {
        name: "Meridian Chronograph",
        shortDescription:
          "A sport chronograph with a brushed steel case and tachymeter bezel.",
        longDescription:
          "The Meridian Chronograph pairs a 41mm brushed stainless steel case with a sapphire crystal and a tachymeter bezel for timing speed over distance. The automatic movement offers a 48-hour power reserve, and the dial's recessed sub-registers stay legible in direct light. An everyday watch built for travel, with a quick-release strap so you can swap leather for steel in seconds.",
        price: 1250,
        category: "newArrivals",
        image: placeholderImage("Meridian Chronograph", "2b2b2b"),
      },
    },
    {
      id: 9002,
      attributes: {
        name: "Solace Diver 200M",
        shortDescription:
          "Dive-rated to 200m with a unidirectional bezel and lumed indices.",
        longDescription:
          "Built for time underwater and everywhere else, the Solace Diver carries a 200m water resistance rating, a unidirectional rotating bezel with ceramic insert, and broad lume-filled hour markers for low-light legibility. The screw-down crown and case back keep it sealed against the elements, while the 40mm case wears comfortably whether you're on a dive boat or at a desk.",
        price: 890,
        category: "newArrivals",
        image: placeholderImage("Solace Diver", "0a3d62"),
      },
    },
    {
      id: 9003,
      attributes: {
        name: "Voss & Co. Heritage Automatic",
        shortDescription:
          "A dress watch with a hand-finished movement visible through an exhibition case back.",
        longDescription:
          "The Heritage Automatic draws on mid-century dress watch proportions: a slim 38mm case, a domed sapphire crystal, and a sunburst dial that shifts from charcoal to silver depending on the light. Flip it over and an exhibition case back reveals a hand-finished automatic movement with a visible balance wheel and engraved bridges — the kind of detail meant to be seen, not just owned.",
        price: 2400,
        category: "bestSellers",
        image: placeholderImage("Voss Heritage", "4a4a4a"),
      },
    },
    {
      id: 9004,
      attributes: {
        name: "Halcyon Minimalist",
        shortDescription:
          "A clean two-hand watch with no date window and a Milanese mesh band.",
        longDescription:
          "Halcyon strips the watch back to its essentials: two hands, no date window, no clutter on the dial. A matte case in brushed steel is paired with a Milanese mesh band that adjusts infinitely with a sliding clasp, so it fits exactly the way you want it to. Quartz-accurate and genuinely understated, it's built for people who want to check the time, not start a conversation about it.",
        price: 410,
        category: "bestSellers",
        image: placeholderImage("Halcyon Minimalist", "d9d7d7", "222222"),
      },
    },
    {
      id: 9005,
      attributes: {
        name: "Obsidian Pilot's Watch",
        shortDescription:
          "An oversized pilot's watch with a railroad-track minute scale.",
        longDescription:
          "Inspired by cockpit instruments from the golden age of aviation, the Obsidian Pilot's Watch features a 44mm case, a railroad-track minute scale for precise reading at a glance, and a matte black dial designed for maximum contrast against the oversized luminous hands. A signed crown, large enough to operate with gloves on, completes the instrument-first design.",
        price: 1975,
        category: "topRated",
        image: placeholderImage("Obsidian Pilot", "111111"),
      },
    },
    {
      id: 9006,
      attributes: {
        name: "Aurelia Dress Watch",
        shortDescription:
          "An elegant 36mm dress watch with a guilloché dial and alligator strap.",
        longDescription:
          "Aurelia is built for formalwear: a 36mm case kept deliberately slim, a hand-guilloché dial that catches light differently with every angle, and a genuine alligator strap with a deployant clasp. The lack of a rotating bezel or chronograph pushers is intentional — this is a watch meant to disappear under a cuff until you need it.",
        price: 1150,
        category: "topRated",
        image: placeholderImage("Aurelia Dress", "5c4033"),
      },
    },
  ],
};

// Convenience lookup for the single-item endpoint (GET /api/items/:id)
export const getMockItemById = (id) =>
  mockItemsResponse.data.find((item) => String(item.id) === String(id)) ||
  null;
