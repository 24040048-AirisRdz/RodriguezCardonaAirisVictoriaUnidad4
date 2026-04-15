document.addEventListener("DOMContentLoaded", mostrarSMS);

function enviarSMS() {
  let numero = document.getElementById("sms-numero").value.trim();
  let mensaje = document.getElementById("sms-mensaje").value.trim();

  if (!numero || !mensaje) {
    alert("Completa todos los campos 😐");
    return;
  }

  let lista = JSON.parse(localStorage.getItem("sms")) || [];

  let nuevo = {
    numero: numero,
    mensaje: mensaje,
    fecha: new Date().toLocaleString(),
    estado: "Enviado"
  };

  lista.unshift(nuevo);
  localStorage.setItem("sms", JSON.stringify(lista));

  document.getElementById("sms-numero").value = "";
  document.getElementById("sms-mensaje").value = "";

  mostrarSMS();
}

function mostrarSMS() {
  let lista = JSON.parse(localStorage.getItem("sms")) || [];
  const cont = document.getElementById("sms-result");

  cont.innerHTML = "";

  if (lista.length === 0) {
    cont.innerHTML = `<div class="db-empty">Sin mensajes enviados</div>`;
    return;
  }

  lista.forEach((sms, index) => {
    cont.innerHTML += `
      <div class="sms-item">
        <p><strong>${sms.numero}</strong></p>
        <p>${sms.mensaje}</p>
        <div class="sms-footer">
          <span style="font-size:10px;color:var(--text-muted)">${sms.fecha}</span>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="sms-status">✓ ${sms.estado}</span>
            <button class="btn-danger" onclick="eliminarSMS(${index})">✕</button>
          </div>
        </div>
      </div>
    `;
  });
}

function eliminarSMS(index) {
  let lista = JSON.parse(localStorage.getItem("sms")) || [];
  lista.splice(index, 1);
  localStorage.setItem("sms", JSON.stringify(lista));
  mostrarSMS();
}