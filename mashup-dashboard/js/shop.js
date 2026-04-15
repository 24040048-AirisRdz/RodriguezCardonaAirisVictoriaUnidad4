let productos = [];

window.addEventListener("load", () => {
  cargarProductos();
});

function cargarProductos() {
  const cont = document.getElementById("shop-result");
  cont.innerHTML = "Cargando productos... ⏳";

  fetch("https://fakestoreapi.com/products")
    .then(res => {
      if (!res.ok) {
        throw new Error("Error en la API");
      }
      return res.json();
    })
    .then(data => {
      console.log("Productos:", data); 

      productos = data;
      mostrarProductos(productos.slice(0, 6));
    })
    .catch(err => {
      console.error(err);
      cont.innerHTML = "❌ Error al cargar productos";
    });
}

function mostrarProductos(lista) {
  const cont = document.getElementById("shop-result");
  cont.innerHTML = "";

  lista.forEach(prod => {
    cont.innerHTML += `
      <div class="producto">
        <h4>${prod.title}</h4>
        <img src="${prod.image}">
        <p>$${prod.price}</p>
      </div>
    `;
  });
}

function buscarProducto() {
  let texto = document.getElementById("shop-search").value.trim().toLowerCase();

  if (!texto) {
    mostrarProductos(productos.slice(0, 6));
    return;
  }

  let filtrados = productos.filter(p => {
    return p.title.toLowerCase().includes(texto) ||
           p.category.toLowerCase().includes(texto);
  });

  if (filtrados.length === 0) {
    document.getElementById("shop-result").innerHTML = "❌ No hay resultados";
  } else {
    mostrarProductos(filtrados.slice(0, 6));
  }
}