import { getOrderIndex, orders } from "../../data/order.js";


let deliveryDetails = "";
const order = orders[orders.length - 1];
document.querySelector(".order-reference-number").textContent = order.id;

order.items.forEach((item) => {
  deliveryDetails += `
    <div class="each-delivery-group">
      <div class="delivery-products-details">
        <div class="delivery-date-label">${order.orderDate}</div>
        <div class="delivery-product-name">${item.productName}</div>
        </div>
        <div class="delivery-item-count">${item.quantity}</div>
    </div>
    `;
});
document.querySelector(".delivery-groups").innerHTML = deliveryDetails;
document.querySelector(".item-quantity").textContent = `${order.totalItems}`;
document.querySelector(".total-items-price").textContent =
  order.totalItemsPrice;
document.querySelector(".shipping-price").textContent = order.shippingCost;
document.querySelector(".total-price").textContent = order.totalPrice;
document.querySelector(".continue").addEventListener("click", () => {
  window.location.href = "glam_market.html";
});
document.querySelector(".view-details").addEventListener("click", () => {
  const orderIndex = getOrderIndex(order.id)
  if (orderIndex === -1) return;
  console.log(orderIndex);
  window.location.href = `order_id_details.html?orderIndex=${orderIndex}`;

});




