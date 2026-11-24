import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
export let orders = JSON.parse(localStorage.getItem('orders'))|| [];
let items = [];

export function resetItems() {
  items = []
}

export function addToOrders(totalItems,totalItemsCost, shippingCost, totalCost, paymentMethod,address) {
  const orderId = `#ORD-RK-${crypto.randomUUID()}`;
  const today = dayjs();
  const orderDateString = today.format("dddd, MMMM D, YYYY");
  let status = "processing";
  orders.push({
    id: orderId,
    orderDate: orderDateString,
    status: status,
    totalItems: totalItems,
    items: items,
    totalItemsPrice: totalItemsCost,
    shippingCost: shippingCost,
    totalPrice: totalCost,
    paymentMethod: paymentMethod,
    address: address
  });
  saveToStorage()
}

export function addItems(productId, name, quantity, deliveryString) {
  items.push({
    productId: productId,
    productName:name,
    quantity:quantity,
    deliveryOptions: deliveryString,
  });
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
