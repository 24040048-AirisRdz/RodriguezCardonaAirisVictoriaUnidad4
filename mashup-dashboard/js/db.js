document.addEventListener("DOMContentLoaded", mostrarDatos);

function guardarDato() {
  let nombre = document.getElementById("db-nombre").value.trim();
  let email = document.getElementById("db-email").value.trim();

  if (!nombre || !email) {
    alert("Completa todos los campos 😐");
    return;
  }

  let datos = JSON.parse(localStorage.getItem("usuarios")) || [];

  let nuevo = {
    id: Date.now(),
    nombre: nombre,
    email: email,
    fecha: new Date().toLocaleString()
  };

  datos.push(nuevo);
  localStorage.setItem("usuarios", JSON.stringify(datos));

  document.getElementById("db-nombre").value = "";
  document.getElementById("db-email").value = "";

  mostrarDatos();
}

function mostrarDatos() {
  let datos = JSON.parse(localStorage.getItem("usuarios")) || [];
  const cont = document.getElementById("db-result");

  cont.innerHTML = "";

  if (datos.length === 0) {
    cont.innerHTML = `<div class="db-empty">Sin usuarios registrados</div>`;
    return;
  }

  datos.forEach((user, index) => {
    cont.innerHTML += `
      <div class="db-item">
        <div class="db-item-info">
          <p><strong>${user.nombre}</strong></p>
          <p>${user.email}</p>
          <p style="font-size:10px;color:var(--text-muted)">${user.fecha}</p>
        </div>
        <button class="btn-danger" onclick="eliminarDato(${index})">✕</button>
      </div>
    `;
  });
}

function eliminarDato(index) {
  let datos = JSON.parse(localStorage.getItem("usuarios")) || [];
  datos.splice(index, 1);
  localStorage.setItem("usuarios", JSON.stringify(datos));
  mostrarDatos();
}