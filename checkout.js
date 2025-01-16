// Load order items from localStorage
const orderItems = JSON.parse(localStorage.getItem("cart")) || [];
const orderItemsContainer = document.getElementById("order-items");
const orderTotal = document.getElementById("order-total");
const deliveryCheckbox = document.getElementById("delivery");

let total = 0;
let finalTotal = 0;
const deliveryFee = 5; // Delivery fee value

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
function updateTotal() {
  finalTotal = total;
  if (deliveryCheckbox && deliveryCheckbox.checked) {
    finalTotal += deliveryFee;
  }
  orderTotal.textContent = finalTotal.toFixed(2);
}

// Attach event listener to the delivery checkbox
if (deliveryCheckbox) {
  deliveryCheckbox.addEventListener("change", updateTotal);
}

// Initial calculation
updateTotal();

// Handle form submission
document.getElementById("checkout-form").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const city = document.getElementById("city").value;
  const address = document.getElementById("address").value;

  // Determine delivery status
  const deliveryStatus = deliveryCheckbox && deliveryCheckbox.checked ? "Yes" : "No";

  // Build the order summary
  let orderDetails = `Order Summary:\n\nName: ${name}\nPhone: ${phone}\nCity: ${city}\nAddress: ${address}\n\nItems:\n`;

  orderItems.forEach(item => {
    orderDetails += `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})\n`;
  });

  if (deliveryCheckbox && deliveryCheckbox.checked) {
    orderDetails += `Delivery Fee: $${deliveryFee.toFixed(2)}\n`;
  }

  orderDetails += `\nTotal: $${finalTotal.toFixed(2)}\n`;
  orderDetails += `Delivery Requested: ${deliveryStatus}`;

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

// Attach event listener to WhatsApp button if needed
const placeOrderButton = document.getElementById("place-order-button");
if (placeOrderButton) {
  placeOrderButton.addEventListener("click", () => {
    // Build WhatsApp message
    const deliveryStatus = deliveryCheckbox && deliveryCheckbox.checked ? "Yes" : "No";
    let message = `Order Summary:\n\n`;

    orderItems.forEach(item => {
      message += `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})\n`;
    });

    if (deliveryCheckbox && deliveryCheckbox.checked) {
      message += `Delivery Fee: $${deliveryFee.toFixed(2)}\n`;
    }

    message += `\nTotal: $${finalTotal.toFixed(2)}\n`;
    message += `Delivery Requested: ${deliveryStatus}`;

    // Send message via WhatsApp
    const numbers = ["+96103603294", "+96170698120"]; // Replace with real numbers
    numbers.forEach(phone => {
      const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
    });
  });
}
