const videosBase = [
  { id: "dQw4w9WgXcQ", titulo: "Video 1" },
  { id: "3JZ_D3ELwOQ", titulo: "Video 2" },
  { id: "L_jWHffIx5E", titulo: "Video 3" },
  { id: "kJQP7kiw5Fk", titulo: "Video 4" },
  { id: "fJ9rUzIMcZQ", titulo: "Video 5" },
  { id: "9bZkp7q19f0", titulo: "Video 6" },
  { id: "Zi_XLOBDo_Y", titulo: "Video 7" }
];

window.addEventListener("load", () => {
  mostrarVideos(videosBase);
  cargarVideo(videosBase[0].id);
});


function mostrarVideos(lista) {
  const contenedor = document.getElementById("yt-results");
  contenedor.innerHTML = "";

  lista.forEach(video => {
    contenedor.innerHTML += `
      <div class="video-item" onclick="cargarVideo('${video.id}')">
        <img src="https://img.youtube.com/vi/${video.id}/0.jpg">
        <p>${video.titulo}</p>
      </div>
    `;
  });
}

function cargarVideo(id) {
  document.getElementById("yt-player").innerHTML = `
    <iframe src="https://www.youtube.com/embed/${id}" 
    frameborder="0" allowfullscreen></iframe>
  `;
}

function buscarVideos() {
  let texto = document.getElementById("yt-search").value.toLowerCase();

  let filtrados = videosBase.filter(v =>
    v.titulo.toLowerCase().includes(texto)
  );

  if (filtrados.length === 0) {
    document.getElementById("yt-results").innerHTML = "❌ No hay resultados";
  } else {
    mostrarVideos(filtrados);
  }
}