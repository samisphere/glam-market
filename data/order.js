import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
export let orders = JSON.parse(localStorage.getItem("orders")) || [];
let items = [];

export function resetItems() {
  items = [];
}

export function addToOrders(
  totalItems,
  totalItemsCost,
  shippingCost,
  totalCost,
  paymentMethod,
  address,
) {
  const orderId = `#ORD-RK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const today = dayjs();
  const orderDateString = today.format("dddd, MMMM D, YYYY");

  orders.push({
    id: orderId,
    orderDate: orderDateString,
    totalItems: totalItems,
    items: items,
    totalItemsPrice: totalItemsCost,
    shippingCost: shippingCost,
    totalPrice: totalCost,
    paymentMethod: paymentMethod,
    address: address,
  });
  saveToStorage();
}

export function addItems(productId, name, quantity, deliveryString,shipping) {
  let status = "processing";
  items.push({
    productId: productId,
    productName: name,
    quantity: quantity,
    deliveryOptions: deliveryString,
    status: status,
    shipping: shipping
  });
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}


export function getOrderIndex(orderId) {
  let orderIndex
    orders.forEach((order, index) => {
    if (order.id === orderId) {
       orderIndex = index;
    }
    })
  return orderIndex
}
