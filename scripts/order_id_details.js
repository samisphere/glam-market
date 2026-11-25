import { orders } from "../data/order.js";
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


const params = new URLSearchParams(window.location.search)
const orderIndex = Number(params.get('orderIndex'))
const order = orders[orderIndex];

// ID and Date
document.querySelector(".id-title").innerHTML = order.id;
document.querySelector(".date-title").textContent = order.orderDate;

//Saved Locations
document.querySelector(".country-city").innerHTML = `${order.address.city}, ${order.address.country}`;
document.querySelector(".zone").textContent = `Zone: ${order.address.zone}`;
document.querySelector(".street").innerHTML = order.address.street;
document.querySelector(".building").textContent = order.address.building;
document.querySelector(".po").textContent = order.address.po;
document.querySelector(".phone").textContent = order.address.phoneNumber;

//Order SUmmary
document.querySelector('.item-quantity').textContent = `${order.totalItems}`;
document.querySelector('.total-items-price').textContent = `QAR ${order.totalItemsPrice}`;
document.querySelector('.shipping-price').textContent = `QAR ${order.shippingCost}`;
document.querySelector('.total-price').textContent = `QAR ${order.totalPrice}`

//Items and Delivery
let itemsSummary = "";
let deliverySummary = ""
order.items.forEach((item) => {
  const matchingProduct = getProduct(item.productId);
  itemsSummary += `
  <div class="product-item">
  <img
    class="product-image"
    src="../assets/${matchingProduct.image}"
    alt="${matchingProduct.name}"
  />

  <div class="product-info">
    <div class="product-name">
      ${matchingProduct.name}
    </div>

    <div class="product-quantity-price">
      Quantity: <span class="quantity">${item.quantity}</span>
      | ${matchingProduct.getPrice()}
    </div>
    <div class="product-shipping-price">
      Shipping: <span class="quantity"> QAR ${item.shipping}</span>
    </div>
  </div>

  <div class="product-total-price">
    QAR ${formatCurrency(item.quantity * matchingProduct.priceCents)}
  </div>
</div>
  `;
  deliverySummary += `
    <div class="each-delivery-group">
      <div class="delivery-products-details">
        <div class="delivery-date-label">${item.deliveryOptions}</div>
        <div class="delivery-product-name">${item.productName}</div>
        </div>
        <div class="delivery-item-count">${item.quantity}</div>
    </div>
    `
});

document.querySelector('.product-details-grid').innerHTML = itemsSummary 
document.querySelector('.delivery-groups').innerHTML = deliverySummary


if (order.paymentMethod === 'cash') {
  document.querySelector('.card-payment-container').style.display = 'none'
} else if(order.paymentMethod === 'card'){
  document.querySelector('.cash-payment-container').style.display = 'none'
}


document.querySelector('.continue').addEventListener('click', () => {
  window.location.href='../glam_market.html'
})
