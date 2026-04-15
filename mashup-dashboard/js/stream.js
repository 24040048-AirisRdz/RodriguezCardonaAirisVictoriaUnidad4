const canciones = [
  { nombre: "Blinding Lights", id: "0VjIjW4GlUZAMYd2vXMi3b" },
  { nombre: "Shape of You", id: "7qiZfU4dY1lWllzX7mPBI3" },
  { nombre: "Levitating", id: "463CkQjx2Zk1yXoBuierM9" },
  { nombre: "Bad Bunny - Tití Me Preguntó", id: "6Sq7ltF9Qa7SNFBsV5Cogx" },
  { nombre: "Peso Pluma - Ella Baila Sola", id: "3k3NWokhRRkEPhCzPmV8TW" },
  { nombre: "The Weeknd - Starboy", id: "7MXVkk9YMctZqd1Srtv4MB" }
];

window.addEventListener("load", () => {
  mostrarCanciones(canciones);
  reproducir(canciones[0].id);
});

function mostrarCanciones(lista) {
  const cont = document.getElementById("sp-results");
  cont.innerHTML = "";

  lista.forEach(c => {
    cont.innerHTML += `
      <div class="sp-item" onclick="reproducir('${c.id}')">
        ${c.nombre}
      </div>
    `;
  });
}

function reproducir(id) {
  document.getElementById("sp-player").innerHTML = `
    <iframe src="https://open.spotify.com/embed/track/${id}"
    frameborder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
    </iframe>
  `;
}

function buscarCancion() {
  let texto = document.getElementById("sp-search").value.toLowerCase();

  let filtradas = canciones.filter(c =>
    c.nombre.toLowerCase().includes(texto)
  );

  if (filtradas.length === 0) {
    document.getElementById("sp-results").innerHTML = "❌ No encontrada";
  } else {
    mostrarCanciones(filtradas);
  }
}