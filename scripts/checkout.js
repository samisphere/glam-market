import { cart, removeProduct } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let totalQuantity=0
let cartSummary=''
cart.forEach((cartItem) => {
  let matchingProduct;
  products.forEach((productItem) => {
    if (cartItem.productId === productItem.id) {
      matchingProduct = productItem;
    }
  });
  // console.log(matchingProduct);
  cartSummary +=
  `
    <div class="product-all-details js-item-id-${matchingProduct.id}">
    <div class="product">
      <img src="${matchingProduct.image}" alt="" />
      <div class="product-details">
        <div class="product-name">${matchingProduct.name}</div>
      </div>
      <div class="product-quantity">Quantity: ${cartItem.quantity}</div>
      <div class="product-price">QAR ${formatCurrency(matchingProduct.priceCents)}</div>
      <div class="product-actions">
        <button class="update" data-product-id="${matchingProduct.id}">
          <img src="images/icons/update.svg" alt="" /> Update
        </button>
        <button class="delete" data-product-id="${matchingProduct.id}">
          <img src="images/icons/trash.svg" alt="" /> Delete
        </button>
      </div>
    </div>
    <div class="product-delivery-dates">
      <div class="title">Choose a delivery option</div>
      <div class="delivery-options">
        <label class="date-options">
          <input type="radio" name="${matchingProduct.id}" />                 
          <div class="date">Tuesday, Nov 21</div>
          <div class="shipping-charge">FREE Shipping</div>
        </label>
        <label class="date-options">
          <input type="radio" name="${matchingProduct.id}"  />
          <div class="date">Tuesday, Nov 11</div>
          <div class="shipping-charge">QAR 10.99 - Shipping</div>
        </label>
        <label class="date-options">
          <input type="radio" name="${matchingProduct.id}"  />
          <div class="date">Tuesday, Nov 1</div>
          <div class="shipping-charge">QAR 20.99 - Shipping</div>
        </label>
      </div>
    </div>
  </div>
  `;

  totalQuantity += cartItem.quantity
});

document.querySelector('.header-middle').innerHTML = `Checkout ( ${totalQuantity} )`
document.querySelector('.ordered-products').innerHTML = cartSummary

document.querySelectorAll('.delete').forEach((deleteButton) => {
  deleteButton.addEventListener('click', () => {
    let productId = deleteButton.dataset.productId
    removeProduct(productId)

    const product = document.querySelector(`.js-item-id-${productId}`)
    product.remove()
  })
})
