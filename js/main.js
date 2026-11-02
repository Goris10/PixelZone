// ===== PixelZone - JavaScript principal =====

// ---------- Modo oscuro ----------
const html = document.documentElement;

function aplicarTema(tema) {
  html.setAttribute("data-bs-theme", tema);
  const btn = document.getElementById("btnTema");
  if (btn) {
    btn.innerHTML = tema === "dark"
      ? '<i class="bi bi-sun"></i>'
      : '<i class="bi bi-moon-stars"></i>';
  }
}

// Recuerda el tema elegido aunque se cambie de página
let temaGuardado = "light";
try {
  temaGuardado = localStorage.getItem("tema") || "light";
} catch (e) {}
aplicarTema(temaGuardado);

document.getElementById("btnTema")?.addEventListener("click", () => {
  const nuevo = html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  aplicarTema(nuevo);
  try {
    localStorage.setItem("tema", nuevo);
  } catch (e) {}
});

// ---------- Pie de página y modal de privacidad (contenido dinámico) ----------
const pie = document.getElementById("pie");
if (pie) {
  const anio = new Date().getFullYear();
  pie.innerHTML = `
    <footer class="py-4 mt-5 border-top">
      <div class="container text-center">
        <div class="redes mb-2">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
          <a href="https://www.twitch.tv/" target="_blank" rel="noopener" aria-label="Twitch"><i class="bi bi-twitch"></i></a>
          <a href="https://discord.com/" target="_blank" rel="noopener" aria-label="Discord"><i class="bi bi-discord"></i></a>
          <a href="https://x.com/" target="_blank" rel="noopener" aria-label="X"><i class="bi bi-twitter-x"></i></a>
        </div>
        <p class="mb-1">&copy; ${anio} PixelZone · Versión beta</p>
        <a href="#" data-bs-toggle="modal" data-bs-target="#modalPrivacidad">Políticas de privacidad</a>
      </div>
    </footer>

    <div class="modal fade" id="modalPrivacidad" tabindex="-1" aria-labelledby="tituloPrivacidad" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="tituloPrivacidad"><i class="bi bi-shield-lock"></i> Políticas de privacidad</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <p>En PixelZone respetamos tu privacidad.</p>
            <ul>
              <li>No vendemos ni compartimos tus datos personales.</li>
              <li>Solo guardamos en tu navegador la preferencia de modo oscuro.</li>
              <li>Los datos del formulario de contacto solo se usan para responderte.</li>
              <li>Los videos y mapas incrustados pertenecen a YouTube y Google Maps y siguen sus propias políticas.</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendido</button>
          </div>
        </div>
      </div>
    </div>`;
}

// ---------- Alertas ----------
document.getElementById("btnBienvenida")?.addEventListener("click", () => {
  const nombre = prompt("¿Cómo te llamas, jugador?");
  if (nombre && nombre.trim() !== "") {
    alert(`¡Bienvenido a PixelZone, ${nombre.trim()}! 🎮`);
  } else {
    alert("¡Bienvenido a PixelZone, jugador anónimo! 🎮");
  }
});

document.getElementById("btnEstado")?.addEventListener("click", () => {
  alert(
    "Estado de la beta:\n\n" +
    "✔ Inicio, carrusel y listas\n" +
    "✔ Modo oscuro\n" +
    "✔ Contacto con mailto\n" +
    "✔ Enlaces con YouTube y Google Maps\n" +
    "⏳ Más artículos de noticias\n" +
    "⏳ Buscador de juegos"
  );
});

// ---------- Formulario de contacto ----------
const formulario = document.getElementById("formContacto");
if (formulario) {
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!formulario.checkValidity()) {
      formulario.classList.add("was-validated");
      return;
    }
    const nombre = document.getElementById("nombre").value.trim();
    document.getElementById("nombreModal").textContent = nombre;
    const modal = new bootstrap.Modal(document.getElementById("modalGracias"));
    modal.show();
    formulario.reset();
    formulario.classList.remove("was-validated");
  });
}

// ---------- Noticias: "Leer más" abre un modal con el artículo ----------
document.querySelectorAll(".btn-leer").forEach((boton) => {
  boton.addEventListener("click", () => {
    const tarjeta = boton.closest(".tarjeta");
    document.getElementById("modalNoticiaTitulo").textContent =
      tarjeta.querySelector(".card-title").textContent;
    document.getElementById("modalNoticiaTexto").textContent = boton.dataset.texto;
    new bootstrap.Modal(document.getElementById("modalNoticia")).show();
  });
});
