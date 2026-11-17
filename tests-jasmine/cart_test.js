import { addToCart, cart } from "../data/cart.js";

describe('test suite: add to cart', () => {
  it('adds an existing product to the cart', () => {
    addToCart('RK001')
  })
  it('adds a new product to the cart', () => {
    addToCart('RK001')
    expect(cart.length).toEqual(1)
  })
})

