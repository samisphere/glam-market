export let cart;
loadStorage();

export function loadStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

export function addToCart(productId, quantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "DRK001",
    });
  }
  saveToStorage();
}

export function removeProduct(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function updateCartItemQuantity(productId, newQuantity) {
  const cartItem = cart.find(item => item.productId === productId);

  if (cartItem) {
    cartItem.quantity = newQuantity;
    saveToStorage();
  }
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
export function updateCartQunatity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".cart-ammount").innerHTML = cartQuantity;
}
