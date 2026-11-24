import { addToCart, cart, loadStorage } from "../data/cart.js";

// describe("test suite: add to cart", () => {
//   beforeEach(() => {
//     spyOn(localStorage, "setItem");
//     spyOn(localStorage, "getItem").and.returnValue(JSON.stringify([]));
//     loadStorage();
//   });
//   it("adds an existing product to the cart", () => {
//     addToCart("RK0001", 1);
//     expect(cart.length).toEqual(1);
//   });
//   it("adds a new product to the cart", () => {
//     addToCart("RK0001", 1);
//     console.log(localStorage.setItem);
//     console.log(localStorage.setItem.and);
//     expect(cart.length).toEqual(1);
//     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
//     expect(cart[0].productId).toEqual("RK0001");
//   });
// });
