class Cart {
  cartItems;
  localStorageKey;
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadStorage();
  }
  loadStorage() {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }
  addToCart(productId, quantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: "DRK001",
      });
    }
    this.saveToStorage();
  }
  removeProduct(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  }
  updateProductQuantity(productId, updateButton) {
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
        this.cartItems.forEach((cartItem) => {
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
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}

const cart = new Cart('cart-oop');
const buisnessCart = new Cart('cart-buisnessCart');

buisnessCart.addToCart("RK006", 2);
cart.addToCart("RK001", 1);
console.log(cart);
console.log(buisnessCart);
