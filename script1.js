// Check login
const username = localStorage.getItem("username");
const email = localStorage.getItem("email");

if (!username || !email) {
  alert("Please login first.");
  window.location.href = "login.html";
} else {
  document.getElementById("welcome").innerText = `Hello, ${username}! (${email})`;
}

// Logout function
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  window.location.href = "login.html";
});

// Leaflet map
let map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add trip
function addTrip() {
  const place = document.getElementById("place").value.trim();
  const country = document.getElementById("country").value.trim();
  const date = document.getElementById("date").value;

  if (!place || !country || !date) {
    alert("Please fill in all trip fields.");
    return;
  }

  const location = `${place}, ${country}`;
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        map.setView([lat, lon], 8);
        L.marker([lat, lon]).addTo(map)
          .bindPopup(`<b>${place}, ${country}</b><br>Visited on ${date}`).openPopup();

        const li = document.createElement("li");
        li.textContent = `${place}, ${country} — Visited on ${date}`;
        document.getElementById("tripList").appendChild(li);
      } else {
        alert("Location not found.");
      }
    });

  document.getElementById("place").value = "";
  document.getElementById("country").value = "";
  document.getElementById("date").value = "";
}