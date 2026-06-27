import cartReducer, {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
} from "./index";

describe("cart reducer", () => {
  const initialState = { isCartOpen: false, cart: [], items: [] };

  it("adds a new item to an empty cart", () => {
    const state = cartReducer(
      initialState,
      addToCart({ item: { id: 1, count: 1 } })
    );
    expect(state.cart).toHaveLength(1);
    expect(state.cart[0]).toEqual({ id: 1, count: 1 });
  });

  it("merges counts instead of duplicating when the same id is added twice", () => {
    let state = cartReducer(
      initialState,
      addToCart({ item: { id: 1, count: 1 } })
    );
    state = cartReducer(state, addToCart({ item: { id: 1, count: 2 } }));

    expect(state.cart).toHaveLength(1); // <- this is the bug that was here before
    expect(state.cart[0].count).toBe(3);
  });

  it("only removes the entry matching the given id", () => {
    let state = cartReducer(
      initialState,
      addToCart({ item: { id: 1, count: 1 } })
    );
    state = cartReducer(state, addToCart({ item: { id: 2, count: 1 } }));
    state = cartReducer(state, removeFromCart({ id: 1 }));

    expect(state.cart).toHaveLength(1);
    expect(state.cart[0].id).toBe(2);
  });

  it("increaseCount/decreaseCount only affect the single merged row", () => {
    let state = cartReducer(
      initialState,
      addToCart({ item: { id: 1, count: 1 } })
    );
    state = cartReducer(state, addToCart({ item: { id: 1, count: 1 } }));
    // before the fix this would have been two rows of count 1 each;
    // now it's one row of count 2
    state = cartReducer(state, increaseCount({ id: 1 }));
    expect(state.cart).toHaveLength(1);
    expect(state.cart[0].count).toBe(3);

    state = cartReducer(state, decreaseCount({ id: 1 }));
    state = cartReducer(state, decreaseCount({ id: 1 }));
    expect(state.cart[0].count).toBe(1);
    // floors at 1, never disappears via decrease
    state = cartReducer(state, decreaseCount({ id: 1 }));
    expect(state.cart[0].count).toBe(1);
  });
});
