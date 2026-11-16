import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/delivery_options.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { addItems, addToOrders, orders, resetItems } from "../../data/order.js";

const placeOrderButton = document.querySelector(".place-order-button");
let totalItemsCost;
let shippingCost;
let totalCost;
let totalItems;
export function renderPaymentService() {
  totalItemsCost = 0;
  shippingCost = 0;
  totalCost = 0;
  totalItems = 0;
  resetItems()
  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);
    let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    let eachProductCost =
      cartItem.quantity * Number(formatCurrency(matchingProduct.priceCents));
    totalItemsCost += eachProductCost;
    shippingCost += deliveryOption.priceCents;
    totalItems += cartItem.quantity;

    addItems(
      cartItem.productId,
      matchingProduct.name,
      cartItem.quantity,
      cartItem.deliveryOptionId,
    );
  });
  shippingCost = Number(formatCurrency(shippingCost));
  totalCost = totalItemsCost + shippingCost;
  document.querySelector(".total-items-price").textContent =
    `QAR ${totalItemsCost}`;
  document.querySelector(".shipping-price").textContent =
    `QAR ${shippingCost.toFixed(2)}`;
  document.querySelector(".total-price").textContent = `QAR ${totalCost}`;
  if (cart.length === 0) {
    placeOrderButton.classList.add("button-disabled");
    placeOrderButton.disabled = true;
  } else {
    placeOrderButton.classList.remove("button-disabled");
    placeOrderButton.disabled = false;
  }
}

placeOrderButton.addEventListener("click", () => {
  if (cart.length === 0) {
    return;
  }

  window.location.href = "order_confirmation.html";

  addToOrders(totalItems, totalItemsCost.toFixed(2), shippingCost.toFixed(2), totalCost.toFixed(2));

});
