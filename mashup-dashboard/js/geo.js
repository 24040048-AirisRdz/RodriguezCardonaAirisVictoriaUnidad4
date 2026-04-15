let map;
let marker;

window.addEventListener("load", () => {

  map = L.map('map').setView([19.4326, -99.1332], 5);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CartoDB'
  }).addTo(map);

  marker = L.marker([19.4326, -99.1332]).addTo(map)
    .bindPopup("📍 Ubicación inicial")
    .openPopup();

  setTimeout(() => {
    map.invalidateSize();
  }, 500);

});

function actualizarMapa(lat, lon, mensaje = "Ubicación") {
  map.setView([lat, lon], 13);
  marker.setLatLng([lat, lon]);

  marker.bindPopup(`📍 ${mensaje}`).openPopup();

  mostrarInfo(lat, lon);
}

function buscarCiudad() {
  let ciudad = document.getElementById("city").value;

  if (!ciudad) {
    alert("Escribe una ciudad 😐");
    return;
  }

  document.getElementById("geo-info").innerHTML = "Buscando ciudad... ⏳";

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${ciudad}`)
    .then(res => res.json())
    .then(data => {

      if (data.length > 0) {
        let lat = data[0].lat;
        let lon = data[0].lon;

        actualizarMapa(lat, lon, ciudad);
      } else {
        document.getElementById("geo-info").innerHTML = "❌ Ciudad no encontrada";
      }

    })
    .catch(() => {
      document.getElementById("geo-info").innerHTML = "Error al buscar 😢";
    });
}

function miUbicacion() {

  if (!navigator.geolocation) {
    alert("Tu navegador no soporta geolocalización");
    return;
  }

  document.getElementById("geo-info").innerHTML = "Obteniendo ubicación... ⏳";

  navigator.geolocation.getCurrentPosition(
    pos => {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;

      actualizarMapa(lat, lon, "Tu ubicación");
    },
    () => {
      document.getElementById("geo-info").innerHTML = "❌ No se pudo obtener tu ubicación";
    }
  );
}

function mostrarInfo(lat, lon) {

  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(res => res.json())
    .then(data => {

      let ciudad = data.address.city || data.address.town || data.address.village || "N/A";
      let pais = data.address.country || "N/A";

      document.getElementById("geo-info").innerHTML = `
        <p><strong>Lat:</strong> ${lat}</p>
        <p><strong>Lon:</strong> ${lon}</p>
        <p><strong>Ciudad:</strong> ${ciudad}</p>
        <p><strong>País:</strong> ${pais}</p>
      `;
    })
    .catch(() => {
      document.getElementById("geo-info").innerHTML = "Error al obtener información 😢";
    });

}