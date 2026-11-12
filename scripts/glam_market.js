import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let productsHTML = "";
products.forEach((product) => {
  productsHTML += `
          <div class="product-container">
          <div class="product-image-container">
            <img src="${product.image}" alt="" />
          </div>
          <div class="product-name">${product.name}</div>
          <div class="product-rating">
            <img src="images/ratings/rating-${product.rating.stars * 10}.svg" alt="" />
            <div class="product-rating-count">${product.rating.count}</div>
          </div>
          <div class="product-price">QAR ${formatCurrency(product.priceCents)}</div>
          <div class="product-quantity">
            <select class="quantity-select">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="product-spacer"></div>
          <div class="added-to-cart">
            <img src="images/icons/checkbox.svg" alt="" /> Added
          </div>
          <button class="add-to-cart" data-product-id="${product.id}">
            Add to Cart <img src="images/icons/cart.svg" alt="" />
          </button>
        </div>
  `;
});
document.querySelector(".products-grid").innerHTML = productsHTML;

updateCartQunatity()
function updateCartQunatity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".cart-ammount").innerHTML = cartQuantity;
}

function displayAddedMessage(addedMessge) {
  addedMessge.classList.add("visible");
  setTimeout(() => {
    addedMessge.classList.remove("visible");
  }, 1500);
}

document.querySelectorAll(".add-to-cart").forEach((addCartButton) => {
  addCartButton.addEventListener("click", () => {
    const productContainer = addCartButton.closest(".product-container");
    const selectQuantity = productContainer.querySelector(".quantity-select");
    const quantity = Number(selectQuantity.value);
    const productId = addCartButton.dataset.productId;
    const addedMessge = productContainer.querySelector(".added-to-cart");
    
    displayAddedMessage(addedMessge)
    addToCart(productId, quantity);
    updateCartQunatity();
  });
});
