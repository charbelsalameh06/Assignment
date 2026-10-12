const menu = [
  { name: "Espresso", price: 3.0 },
  { name: "Latte", price: 4.5 },
  { name: "Mocha", price: 5.0 },
  { name: "Muffin", price: 2.5 },
];
let cart = [];

const menuList = document.getElementById('menu-list');
const cartList = document.getElementById('cart-list');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const rewardMsg = document.getElementById('reward-msg');
const itemName = document.getElementById('item-name');
const itemPrice = document.getElementById('item-price');
const errorMsg = document.getElementById('error-msg');
const addCustomBtn = document.getElementById('add-custom-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');

// Draw the menu and its Add buttons.
function renderMenu() {
  menuList.textContent = '';

  menu.forEach((item) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = `${item.name} — $${item.price.toFixed(2)}`;

    const button = document.createElement('button');
    button.textContent = 'Add';
    // Add the product linked to this button.
    button.addEventListener('click', () => {
      addToCart(item);
    });

    li.appendChild(span);
    li.appendChild(button);
    menuList.appendChild(li);
  });
}

// Add a new product or increase its quantity.
function addToCart(item) {
  const existingItem = cart.find((entry) => entry.name === item.name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: item.name, price: item.price, quantity: 1 });
  }

  renderCart();
}

// Keep the row index and action on each button.
function createCartButton(text, action, index) {
  const button = document.createElement('button');
  button.textContent = text;
  button.dataset.index = index;
  button.dataset.action = action;
  return button;
}

// Show each product once, with its quantity and row total.
function renderCart() {
  cartList.textContent = '';

  if (cart.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Your cart is empty.';
    cartList.appendChild(li);
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      const subtotal = item.price * item.quantity;
      span.textContent = `${item.name} ×${item.quantity} — $${subtotal.toFixed(2)}`;

      const buttons = document.createElement('div');
      buttons.className = 'cart-buttons';
      buttons.appendChild(createCartButton('+', 'increase', index));
      buttons.appendChild(createCartButton('−', 'decrease', index));
      buttons.appendChild(createCartButton('Remove', 'remove', index));

      li.appendChild(span);
      li.appendChild(buttons);
      cartList.appendChild(li);
    });
  }

  // Count the units, not just the different products.
  cartCount.textContent = cart.reduce((count, item) => count + item.quantity, 0);
  updateTotal();
}

// Update the total and show the reward when it passes $15.
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);

  if (total > 15) {
    cartTotal.style.color = 'red';
    rewardMsg.classList.remove('hidden');
  } else {
    cartTotal.style.color = '';
    rewardMsg.classList.add('hidden');
  }
}

// Check the inputs before adding a custom product.
function addCustomItem() {
  const name = itemName.value.trim();
  const priceText = itemPrice.value.trim();
  const price = Number(priceText);

  if (name === '') {
    errorMsg.textContent = 'Name is required.';
    return;
  }

  if (!Number.isFinite(price) || price <= 0) {
    errorMsg.textContent = 'Price must be a positive number.';
    return;
  }

  const existingItem = menu.find((item) => item.name.toLowerCase() === name.toLowerCase());

  if (existingItem) {
    errorMsg.textContent = 'This item is already on the menu.';
    return;
  }

  menu.push({ name, price });
  renderMenu();
  itemName.value = '';
  itemPrice.value = '';
  errorMsg.textContent = '';
}

// Handle the cart buttons through the list's single listener.
function handleCartClick(event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }

  const index = Number(event.target.dataset.index);
  const action = event.target.dataset.action;

  if (action === 'increase') {
    cart[index].quantity++;
  } else if (action === 'decrease' || action === 'remove') {
    // Remove takes out one unit, just like the minus button.
    cart[index].quantity--;

    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
    }
  }

  renderCart();
}

// Empty the cart and reset the displayed values.
function clearCart() {
  cart = [];
  renderCart();
}

cartList.addEventListener('click', handleCartClick);
addCustomBtn.addEventListener('click', addCustomItem);
clearCartBtn.addEventListener('click', clearCart);

renderMenu();
renderCart();
