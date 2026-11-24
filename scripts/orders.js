import { orders } from "../data/order.js";
import { getProduct } from "../data/products.js";

if (orders.length === 0) {
  document.querySelector(".page-tittle").style.display = "none";
  document.querySelector(".empty-orders-container").style.display = "flex";
} else {
  document.querySelector(".page-tittle").style.display = "block";
  document.querySelector(".empty-orders-container").style.display = "none";

  let orderContainerHtml = "";
  orders
    .slice()
    .reverse()
    .forEach((order) => {
      let allProducts = "";
      order.items.forEach((item, index) => {
        const matchingProduct = getProduct(item.productId);
        allProducts += `
      <div class="order-product-details">
        <div class="product-container">
          <div class="product-image-container">
            <img src="${matchingProduct.image}" alt="" />
          </div>
          <div class="product-details">
            <div class="product-name">${matchingProduct.getName()}</div>
            <div class="product-arriving-date">
              Arriving on: ${item.deliveryOptions}
            </div>

            <div class="product-quantity">
              Quantity: ${item.quantity}
            </div>

            <div class="product-price">
              QAR ${((item.quantity * matchingProduct.priceCents) / 100).toFixed(2)}
            </div>
          </div>

          <div class="product-status">${item.status}</div>
        </div>
      </div>
       ${index !== order.items.length - 1 ? '<div class="divider"></div>' : ''}
    `;
      });

      orderContainerHtml += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-left-section">
          <div class="order-placed">
            Order Placed
            <div class="order-placed-date">${order.orderDate}</div>
          </div>

          <div class="order-total">
            Total
            <div class="order-total-price">QAR ${order.totalPrice}</div>
          </div>
        </div>

        <div class="order-right-section">
          <div class="order-details">
            View Order Details
            <img src="images/icons/right-carret.svg" alt="" />
          </div>
        </div>
      </div>

      ${allProducts}
    </div>
  `;
    });

  document.querySelector(".orders-grid").innerHTML = orderContainerHtml;
}
