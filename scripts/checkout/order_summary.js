import {
  cart,
  removeProduct,
  updateDeliveryOption,
  updateProductQuantity,
} from "../../data/cart.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/delivery_options.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { renderPaymentService } from "./payment.js";

export function renderOrderSummary() {
  let cartSummary = "";
  cart.forEach((cartItem) => {
    let matchingProduct = getProduct(cartItem.productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    let deliveryDate = today.add(deliveryOption.delieveryDays, "days");
    const dateString = deliveryDate.format("dddd MMMM D");
    cartSummary += `
    <div class="product-all-details js-item-id-${matchingProduct.id}">
    <div class="product-delivery-date">
    Delivery date: <span>${dateString}</span>
    </div>
    <div class="product">
      <img src="${matchingProduct.image}" alt="" />
      <div class="product-details">
        <div class="product-name">${matchingProduct.name}</div>
      </div>
      <div class="product-price">QAR ${formatCurrency(matchingProduct.priceCents)}</div>
      <div class="product-quantity">
        <div class="quantity-display">Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </div>

        <div class="quantity-editor">
          <button class="quantity-minus">−</button>
          <span class="quantity-value">${cartItem.quantity}</span>
          <button class="quantity-plus">+</button>
        </div>
      </div>
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
        ${deliveryOptionHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
  `;
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((option) => {
      const today = dayjs();
      let deliveryDate = today.add(option.delieveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        option.priceCents === 0
          ? "FREE Shipping"
          : `QAR ${formatCurrency(option.priceCents)} - Shipping`;
      const isChecked = option.id === cartItem.deliveryOptionId;
      html += `
    <label class="date-options" data-product-id =    "${matchingProduct.id}" data-delivery-option-id = "${option.id}">
      <input type="radio" ${isChecked ? "checked" : ""} name="${matchingProduct.id}" />                 
      <div class="date">${dateString}</div>
      <div class="shipping-charge">${priceString}</div>
    </label>
    `;
    });
    return html;
  }

  document.querySelector(".ordered-products").innerHTML = cartSummary;

  document.querySelectorAll(".delete").forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      let productId = deleteButton.dataset.productId;
      removeProduct(productId);
      updateCartQuantity();
      renderPaymentService();
      const product = document.querySelector(`.js-item-id-${productId}`);
      product.remove();
    });
  });
  document.querySelectorAll(".update").forEach((updateButton) => {
    updateButton.addEventListener("click", () => {
      let productId = updateButton.dataset.productId;
      updateProductQuantity(productId, updateButton);
      updateCartQuantity();
      renderPaymentService();
    });
  });
  updateCartQuantity();

  document.querySelectorAll(".date-options").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentService();
    });
  });
  function updateCartQuantity() {
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });
    document.querySelector(".checkout-items-quantity").innerHTML =
      `${totalQuantity} items`;
    document.querySelector(".item-quantity").textContent = `${totalQuantity}`;
  }
}
renderOrderSummary();
