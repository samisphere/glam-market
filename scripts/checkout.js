import { cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { getDeliveryDateString } from "./utils/delivery_date.js";
import { getDeliveryOption } from "../data/delivery_options.js";
import { formatCurrency } from "./utils/money.js";
import { addItems, addToOrders, orders } from "../data/order.js";

let itemsSummary = "";
let totalItemCost = 0;
let shippingCost = 0;
let totalCost = 0;
let totalQuantity = 0;
cart.forEach((cartItem) => {
  totalQuantity += cartItem.quantity;
  let matchingProduct = getProduct(cartItem.productId);
  let itemPrice = matchingProduct.priceCents * cartItem.quantity;
  totalItemCost += itemPrice;
  const deliveryOptionId = cartItem.deliveryOptionId;
  const delieveryOption = getDeliveryOption(deliveryOptionId);
  shippingCost += delieveryOption.priceCents;
  const dateString = getDeliveryDateString(deliveryOptionId);
  itemsSummary += `
          <div class="product-item">
            <img
              class="product-image"
              src="${matchingProduct.image}"
              alt=""
            />
            <div class="product-info">
              <div class="product-name">${matchingProduct.name}</div>

              <div class="product-quantity">
                Quantity: <span class="quantity">${cartItem.quantity}</span>
              </div>

              <div class="product-unit-price">QAR ${formatCurrency(matchingProduct.priceCents)}</div>
            </div>

            <div class="product-total-price">QAR ${formatCurrency(itemPrice)}</div>
          </div>

          <div class="product-shipping-details">
            <div class="shipping-label">
              <img src="images/icons/delivery-icon.svg" alt="" />
              Shipping & handling
            </div>

            <div class="shipping-cost">QAR ${formatCurrency(delieveryOption.priceCents)}</div>
          </div>
          <div class="seperator"></div>
        `;
  addItems(
    matchingProduct.id,
    matchingProduct.name,
    cartItem.quantity,
    dateString,
  );
});
document.querySelector(".product-details-grid").innerHTML = itemsSummary;
totalCost = totalItemCost + shippingCost;
document.querySelector(".item-quantity").innerHTML = totalQuantity;
document.querySelector(".total-items-price").innerHTML =
  formatCurrency(totalItemCost);
document.querySelector(".shipping-price").innerHTML =
  formatCurrency(shippingCost);
document.querySelector(".total-price").innerHTML =
  `QAR ${formatCurrency(totalCost)}`;

function getPaymentMethod() {
  return document.querySelector('input[name="paymentMethod"]:checked').value;
}
let address = null;
function addAddress(country, city, zone, street, building, po) {
  address = {
    country: country,
    city: city,
    zone: zone,
    street: street,
    building: building,
    po: po,
  };
}
function collectInputValue() {
  const country = document.querySelector(".country-input").value;
  const city = document.querySelector(".city-input").value;
  const zone = document.querySelector(".zone-input").value;
  const street = document.querySelector(".street-input").value;
  const building = document.querySelector(".building-input").value;
  const po = document.querySelector(".po-input").value;
  document.querySelector(".country-city").textContent = `${city}, ${country}`;
  document.querySelector(".zone").textContent = `Zone: ${zone}`;
  document.querySelector(".street").textContent = street;
  document.querySelector(".building").textContent = building;
  document.querySelector(".po").textContent = po;
  addAddress(country, city, zone, street, building, po);
  console.log(address);
}

// Saving Address
let addressState = 'empty'
let addressButton = document.querySelector(".add-address-button");
let addressForm = document.querySelector(".address-form");
let savedAddressButton = document.querySelector('.save-address')
let savedAddressCotainer = document.querySelector(".saved-shipping-address");
addressButton.addEventListener("click", () => {
  addressButton.style.display = 'none'
  addressForm.style.display = "grid";
  addressState = 'editing'
});

addressForm.addEventListener('submit', (event) => {
  event.preventDefault()
  collectInputValue()
  addressState = 'saved'
  addressButton.style.display = 'flex'
  addressForm.style.display = "none";
  savedAddressCotainer.style.display = 'flex'
  document.querySelector('.address-subtitle').textContent = 'You order will be delivered to'
})



document.querySelector(".place-order-button").addEventListener("click", () => {
  if (address === null || addressState !== 'saved') {
    alert("Please add your delivery address.");
  } else {
    const formattedTotalItemCost = formatCurrency(totalItemCost);
    const formattedShippingCost = formatCurrency(shippingCost);
    const formattedTotalCost = formatCurrency(totalCost);
    const paymentMethod = getPaymentMethod();
    addToOrders(
      totalQuantity,
      formattedTotalItemCost,
      formattedShippingCost,
      formattedTotalCost,
      paymentMethod,
      address,
    );
    window.location.href = "order_confirmation.html";
  }
});
