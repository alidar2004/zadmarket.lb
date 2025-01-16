// Show and Hide Sidebar
function showSidebar() {
  document.querySelector('.sidebar').style.display = 'flex';
}

function hideSidebar() {
  document.querySelector('.sidebar').style.display = 'none';
}

function hideSidebarm() {
  document.querySelector('.cart-sidebar').style.display = 'none';
}

// Cart Logic
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartSidebar = document.querySelector(".cart-sidebar");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const deliveryCheckbox = document.getElementById("delivery-checkbox");
const deliveryFee = 5; // Delivery fee

// Toggle Cart Sidebar
function toggleCart() {
  cartSidebar.classList.toggle("active");
}

// Add Item to Cart
function addToCart(itemId) {
  const item = items.find(i => i.id === itemId);
  if (!item) return; // If item not found, exit

  const existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCart();
  saveCart(); // Save cart to localStorage
}

// Update Cart Display
function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <span>${item.name}</span>
      <div class="quantity-controls">
        <button onclick="decreaseQuantity(${index})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${index})">+</button>
      </div>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    cartItemsList.appendChild(li);
    total += item.price * item.quantity;
  });

  if (deliveryCheckbox && deliveryCheckbox.checked) {
    total += deliveryFee;
  }

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Increase Quantity
function increaseQuantity(index) {
  cart[index].quantity++;
  updateCart();
  saveCart();
}

// Decrease Quantity
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1); // Remove item if quantity is 0
  }
  updateCart();
  saveCart();
}

// Delivery Checkbox Listener
if (deliveryCheckbox) {
  deliveryCheckbox.addEventListener("change", updateCart);
}

// Example Items
const items = [
  { id: 1, name: "Prayer Mat", price: 20, image: "../img/most1.jpg" },
  { id: 2, name: "Tasbeeh", price: 10, image: "https://via.placeholder.com/100" },
  { id: 3, name: "Quran", price: 25, image: "https://via.placeholder.com/100" },
];

// Render Items
const itemContainer = document.querySelector(".item-container");

items.forEach(item => {
  const card = document.createElement("div");
  card.className = "item-card";
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="item-image">
    <h2>${item.name}</h2>
    <p>$${item.price}</p>
    <button class="addtocart" onclick="addToCart(${item.id})">Add to Cart</button>
  `;
  itemContainer.appendChild(card);
});

// Save Cart to Local Storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load Cart on Checkout Page
function loadCartOnCheckout() {
  const checkoutCartItemsList = document.getElementById("checkout-cart-items");
  const checkoutCartTotal = document.getElementById("checkout-cart-total");
  const deliveryChecked = deliveryCheckbox && deliveryCheckbox.checked;

  if (checkoutCartItemsList && checkoutCartTotal) {
    checkoutCartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <span>${item.name}</span>
        <span>x${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      checkoutCartItemsList.appendChild(li);
      total += item.price * item.quantity;
    });

    // Add delivery fee if checkbox is checked
    if (deliveryChecked) {
      const deliveryLi = document.createElement("li");
      deliveryLi.innerHTML = `
        <span>Delivery</span>
        <span>$${deliveryFee.toFixed(2)}</span>
      `;
      checkoutCartItemsList.appendChild(deliveryLi);
      total += deliveryFee;
    }

    checkoutCartTotal.textContent = total.toFixed(2);
  }
}

// Call loadCartOnCheckout if on checkout page
if (document.getElementById("checkout-cart-items")) {
  loadCartOnCheckout();
}

// Send WhatsApp Message with Order Summary
function sendWhatsAppMessage() {
  const phoneNumbers = ["1234567890", "0987654321"]; // Replace with actual numbers
  const delivery = deliveryCheckbox && deliveryCheckbox.checked ? "Yes" : "No";
  let total = parseFloat(cartTotal.textContent);
  const deliveryFeeAmount = delivery === "Yes" ? deliveryFee : 0;
  total += deliveryFeeAmount;

  let message = `Order Summary:\n\n`;

  cart.forEach(item => {
    message += `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})\n`;
  });

  if (delivery === "Yes") {
    message += `- Delivery: $${deliveryFeeAmount.toFixed(2)}\n`;
  }

  message += `\nTotal: $${total.toFixed(2)}`;

  phoneNumbers.forEach(phone => {
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  });
}

// Attach sendWhatsAppMessage to the checkout button
const placeOrderButton = document.getElementById("place-order-button");
if (placeOrderButton) {
  placeOrderButton.addEventListener("click", sendWhatsAppMessage);
}
