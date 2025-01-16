const orderItems = JSON.parse(localStorage.getItem("cart")) || [];
const orderItemsContainer = document.getElementById("order-items");
const orderTotal = document.getElementById("order-total");
const deliveryCheckbox = document.getElementById("delivery");

let total = 0;
let finalTotal = 0;

// Populate the order summary
orderItems.forEach(item => {
  const li = document.createElement("li");
  li.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <div>
      <strong>${item.name}</strong><br>
      $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}
    </div>
  `;
  orderItemsContainer.appendChild(li);
  total += item.price * item.quantity;
});

// Calculate and display the total
finalTotal = total;
orderTotal.textContent = finalTotal.toFixed(2);


// Handle form submission
document.getElementById("checkout-form").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const city = document.getElementById("city").value;
  const address = document.getElementById("address").value;

  const orderDetails = `
    Order Summary:
    Name: ${name}
    Phone: ${phone}
    City: ${city}
    Address: ${address}
    Total: $${finalTotal.toFixed(2)}
  `;

  // Send notification via WhatsApp
  const numbers = ["whatsapp:+96103603294", "whatsapp:+96170698120"];
  numbers.forEach(number => {
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(orderDetails)}`;
    window.open(url, "_blank");
  });

  alert("Thank you for your order!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});

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


function showSidebar() {
  document.querySelector('.sidebar').style.display = 'flex';
}

function hideSidebar() {
  document.querySelector('.sidebar').style.display = 'none';
}