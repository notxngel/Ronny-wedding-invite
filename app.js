// --- 0. RESET UTILITY ---
(function checkReset() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('reset')) {
        localStorage.removeItem('rsvpStatus');
        const url = new URL(window.location.href);
        url.searchParams.delete('reset');
        window.history.replaceState({}, '', url);
        window.location.reload();
    }
})();

/** 1. CONFIGURACIÓN: Fecha y Elementos Base **/
const weddingDate = new Date("2026-07-11T18:00:00");

const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  container: document.getElementById("countdown")
};

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    if (countdownElements.days) countdownElements.days.textContent = days;
    if (countdownElements.hours) countdownElements.hours.textContent = hours;
    if (countdownElements.minutes) countdownElements.minutes.textContent = minutes;
    if (countdownElements.seconds) countdownElements.seconds.textContent = seconds;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

/** 2. ANIMACIONES: Intersection Observer **/
(function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("section, .location-card, .faq__item").forEach(el => {
    observer.observe(el);
  });
})();

/** 3. FAQ: Lógica de acordeón **/
window.toggleFAQ = function(button) {
  const item = button.parentElement;
  const answer = item.querySelector(".faq__answer");
  const isOpen = item.classList.contains("active");

  document.querySelectorAll(".faq__item").forEach((otherItem) => {
    if (otherItem !== item) {
      otherItem.classList.remove("active");
      otherItem.querySelector(".faq__answer").style.maxHeight = null;
    }
  });

  if (isOpen) {
    item.classList.remove("active");
    answer.style.maxHeight = null;
  } else {
    item.classList.add("active");
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
};

/** 4. NAVBAR: Lógica de scroll y menú móvil **/
(function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const toggle = document.getElementById("navbarToggle");
  const links = document.querySelectorAll(".navbar__link");

  if (!navbar) return;

  // Toggle Menú Móvil
  if (toggle) {
    toggle.addEventListener("click", () => {
        navbar.classList.toggle("is-open");
    });
  }

  // Cerrar al hacer click en un link
  links.forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("is-open");
    });
  });

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar--scrolled");
    } else {
      navbar.classList.remove("navbar--scrolled");
    }
  });
})();

/** 5. RSVP: Gestión de Cupos y Envío **/
(function initRSVP() {
  const params = new URLSearchParams(window.location.search);
  const cupos = Math.min(Math.max(parseInt(params.get("c")) || 1, 1), 4);
  const container = document.getElementById("guestNamesContainer");
  const rsvpForm = document.getElementById("rsvpForm");

  if (container) {
    let html = "";
    for (let i = 1; i <= cupos; i++) {
      const label = i === 1 ? "Tu Nombre" : `Acompañante ${i - 1}`;
      html += `
        <div class="form__group">
          <label class="form__label">${label}</label>
          <input class="form__input" type="text" name="guest${i}" required placeholder="Escribe el nombre">
        </div>`;
    }
    container.innerHTML = html;
  }

  rsvpForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = rsvpForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    const formData = new FormData(rsvpForm);
    const data = Object.fromEntries(formData.entries());

    try {
      // Simulación de envío o conexión con CONFIG.webhookURL
      console.log("Datos a enviar:", data);
      
      // Mostrar éxito
      document.getElementById("rsvpContainer").innerHTML = `
        <div class="fade-in">
          <h2 class="section-header__title">¡Gracias!</h2>
          <p>Tu confirmación ha sido enviada con éxito.</p>
        </div>
      `;
    } catch (error) {
      alert("Hubo un error al enviar. Por favor intenta de nuevo.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar Confirmación";
    }
  });
})();
