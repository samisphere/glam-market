//export let cart = JSON.parse(localStorage.getItem("cart")) || [];
export let cart = [
  {
    productId: "RK0001",
    quantity: 2,
    deliveryOptionId: "DRK001",
  },
  {
    productId: "RK0003",
    quantity: 2,
    deliveryOptionId: "DRK002",
  },
  ,
  {
    productId: "RK0004",
    quantity: 2,
    deliveryOptionId: "DRK003",
  },
];

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
      deliveryOptionId: 'DRK001'
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
export function updateProductQuantity(productId, updateButton) {
  const product = document.querySelector(`.js-item-id-${productId}`);
  const quantityEditor = product.querySelector(".quantity-editor");
  quantityEditor.classList.add("quantity-editor-visible");
  let minusButton = product.querySelector(".quantity-minus");
  let plusButton = product.querySelector(".quantity-plus");
  let cartQuantity = Number(
    product.querySelector(".quantity-value").textContent,
  );
  const quantityLabel = product.querySelector(".quantity-label");
  if (updateButton.textContent.trim() === "Update") {
    updateButton.innerHTML = '<img src="images/icons/check.svg"> Done';
    minusButton.onclick = () => {
      cart.forEach((cartItem) => {
        if (cartItem.productId === productId && cartItem.quantity >= 1) {
          cartItem.quantity--;
          product.querySelector(".quantity-value").textContent =
            `${cartItem.quantity}`;
          quantityLabel.innerHTML = `${cartItem.quantity}`;

          updateButtons(cartItem.quantity);
        }
      });
    };
    plusButton.onclick = () => {
      cart.forEach((cartItem) => {
        if (cartItem.productId === productId && cartItem.quantity <= 10) {
          cartItem.quantity++;
          product.querySelector(".quantity-value").textContent =
            `${cartItem.quantity}`;
          updateButtons(cartItem.quantity);

          quantityLabel.innerHTML = `${cartItem.quantity}`;
        }
      });
    };
  } else if (updateButton.textContent.trim() === "Done") {
    updateButton.innerHTML = '<img src="images/icons/repeat.svg"> Update';
    quantityEditor.classList.remove("quantity-editor-visible");
    saveToStorage();
  }
  function updateButtons(quantity) {
    minusButton.disabled = quantity <= 1;
    plusButton.disabled = quantity >= 10;
  }
  updateButtons(cartQuantity);
}
