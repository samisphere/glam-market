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
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { renderPaymentService } from "./payment.js";

export function renderOrderSummary() {
  let cartSummary = "";
  let productsHTML = ""
  const orderSummary = document.querySelector(".order-summary");
  if (cart.length > 0) {
    document.querySelector(".empty-cart-container").style.display = "none";
    document.querySelector(".cart-title").style.display = "block";
    orderSummary.style.display = "block";
    cart.forEach((cartItem) => {
      document.querySelector(".empty-cart-container").style.display = "none";
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
    document.querySelector(".ordered-products").innerHTML = cartSummary;
  } else {
    document.querySelector(".cart-title").style.display = "none";
    document.querySelector(".empty-cart-container").style.display = "block";
    document.querySelector(".order-summary").style.display = "none";
    document.querySelector(".ordered-products").innerHTML = "";
    document.querySelector(".cart-title").style.display = "none";
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
        <div class="product-spacer"></div>
        <button class="add-to-cart" data-product-id="${product.id}">
          Add to Cart <img src="images/icons/cart.svg" alt="" />
        </button>
      </div>
      `;
    });
    document.querySelector(".suggestions-products").innerHTML = productsHTML;
  }
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

  document.querySelectorAll(".delete").forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      let productId = deleteButton.dataset.productId;
      removeProduct(productId);
      updateCartQuantity();
      renderPaymentService();
      renderOrderSummary();
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

    document.querySelector(".cart-items-quantity").innerHTML =
      `( ${totalQuantity} items )`;

    document.querySelector(".item-quantity").textContent = `${totalQuantity}`;
  }
}
renderOrderSummary();
