// --- 0. RESET UTILITY (Para pruebas) ---
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

// Fecha de la boda: 11 de Julio de 2026 (ceremonia a las 6pm)
const weddingDate = new Date("2026-07-11T18:00:00");

// Elementos del contador cacheados para rendimiento
const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  container: document.getElementById("countdown")
};

/**
 * Actualiza el contador de la cuenta regresiva en el DOM.
 * Calcula la diferencia entre la fecha de la boda y el momento actual.
 * Si la fecha ya pasó, muestra un mensaje de felicitación.
 * 
 * @returns {void}
 */
function updateCountdown() {
  const now = new Date();
  const difference = weddingDate - now;

  if (difference > 0) {
    // Calcular tiempo
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    countdownElements.days?.replaceChildren(document.createTextNode(String(days)));
    countdownElements.hours?.replaceChildren(document.createTextNode(String(hours)));
    countdownElements.minutes?.replaceChildren(document.createTextNode(String(minutes)));
    countdownElements.seconds?.replaceChildren(document.createTextNode(String(seconds)));
  } else {
    // Si la fecha ya pasó
    if (countdownElements.container) {
        countdownElements.container.innerHTML = `
        <div style="font-family: var(--font-serif); font-size: 1.6rem; letter-spacing: 0.1em; color: var(--color-gold); font-style: italic; text-transform:none;">
            ${t("countdown_passed")}
        </div>
        `;
    }
  }
}

// Ejecutar al cargar la página (para que no haya retraso de 1 segundo)
updateCountdown();

// Repetir cada 1000ms (1 segundo)
setInterval(updateCountdown, 1000);


/** 2. ANIMACIONES: Intersection Observer **/
(function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Animamos solo una vez al entrar
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll(".faq__item, .map-in").forEach(el => {
    observer.observe(el);
  });
})();

/** 2.1 FAQ: Lógica de acordeón **/
function toggleFAQ(button) {
  const item = button.parentElement;
  const answer = item.querySelector(".faq__answer");
  const isOpen = item.classList.contains("active");

  // Cerrar otros abiertos (opcional, para un efecto más limpio)
  document.querySelectorAll(".faq__item").forEach((otherItem) => {
    if (otherItem !== item) {
      otherItem.classList.remove("active");
      otherItem.querySelector(".faq__question").setAttribute("aria-expanded", "false");
      otherItem.querySelector(".faq__answer").style.maxHeight = null;
    }
  });

  // Toggle actual
  if (isOpen) {
    item.classList.remove("active");
    button.setAttribute("aria-expanded", "false");
    answer.style.maxHeight = null;
  } else {
    item.classList.add("active");
    button.setAttribute("aria-expanded", "true");
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
}

/** 3. NAVBAR: Lógica de visibilidad y menú móvil **/
(function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const toggle = document.getElementById("navbarToggle");
  const menu = document.getElementById("navbarMenu");
  const heroSection = document.getElementById("home");
  const links = document.querySelectorAll(".navbar__link");

  if (!navbar) return;

  // --- 3.1 Toggle Menú Móvil ---
  if (toggle && menu) {
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        navbar.classList.toggle("is-open");
        const isOpen = navbar.classList.contains("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cerrar al hacer click fuera
    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target)) {
            navbar.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });

    // Cerrar al hacer click en un link
    links.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
  }

  // --- 3.2 Scroll Appearance ---
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const heroBottom = heroSection.offsetHeight - 100;
      
      if (scrollY >= heroBottom) {
        navbar.classList.add("is-visible");
        navbar.classList.add("navbar--scrolled");
      } else {
        navbar.classList.remove("is-visible");
        navbar.classList.remove("navbar--scrolled");
      }
    });
  }
})();

/** 4. AUTO-LOAD RSVP: Verificar confirmación previa **/
(function initRSVP() {
    // Comentado temporalmente para pruebas: permite ver el formulario siempre
    /*
    if (localStorage.getItem('rsvpStatus') === 'sent') {
        mostrarExito();
    }
    */
})();

/** 5. CUPOS: Generación dinámica de campos de invitados **/

(function generarCamposDeNombres() {
  const params = new URLSearchParams(window.location.search);
  // Cupos: mínimo 1, máximo 4. Si no hay ?c= en la URL, muestra 1 campo.
  const cupos = Math.min(Math.max(parseInt(params.get("c")) || 1, 1), CONFIG.maxCupos);

  const container = document.getElementById("guestNamesContainer");
  if (!container) return;

  let html = "";
  for (let i = 1; i <= cupos; i++) {
    const label = i === 1 ? t("form_name") : `${t("form_companion")} ${i - 1}`;
    const placeholder = i === 1 ? t("form_name_placeholder") : t("form_companion_placeholder");
    const required = i === 1 ? "required" : "";
    html += `
            <div class="form__group">
                <label class="form__label" for="guest${i}">${label}</label>
                <input
                    class="form__input"
                    type="text"
                    id="guest${i}"
                    name="guest${i}"
                    placeholder="${placeholder}"
                    ${required}
                    autocomplete="off"
                >
                <span class="form__error" id="error-guest${i}"></span>
            </div>`;
  }
  container.innerHTML = html;
})();

/** 6. VALIDACIÓN: Feedback visual inmediato en campos **/

// Función reutilizable para marcar un campo como inválido
/**
 * Marca un elemento de entrada como inválido y muestra un mensaje de error.
 * 
 * @param {HTMLInputElement} inputElement - El elemento del DOM a marcar.
 * @param {string} message - El mensaje de error a mostrar.
 * @returns {void}
 */
function setInvalid(inputElement, message) {
  const errorSpan = document.getElementById(`error-${inputElement.id}`);
  inputElement.classList.add("is-invalid");
  if (errorSpan) {
    // Usamos un ícono SVG de advertencia pequeñito junto al mensaje
    errorSpan.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            ${message}
        `;
    errorSpan.classList.add("active");
  }
}

// Función reutilizable para limpiar los errores de un campo
/**
 * Limpia el estado de error de un elemento de entrada.
 * 
 * @param {HTMLInputElement} inputElement - El elemento del DOM a limpiar.
 * @returns {void}
 */
function clearInvalid(inputElement) {
  const errorSpan = document.getElementById(`error-${inputElement.id}`);
  inputElement.classList.remove("is-invalid");
  if (errorSpan) {
    errorSpan.classList.remove("active");
    errorSpan.innerHTML = "";
  }
}

// Configurar los event listeners ("Los espías") a los campos
function setupValidationListeners() {
  const inputs = document.querySelectorAll(".form__input[required]");

  inputs.forEach((input) => {
    // Evento 'blur': se dispara cuando el usuario sale (pierde el foco) del campo
    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        const msg = input.id === "phone" ? t("val_phone") : t("val_name");
        setInvalid(input, msg);
      }
    });

    // Evento 'input': se dispara en tiempo real mientras el usuario escribe
    input.addEventListener("input", () => {
      // Si el usuario empieza a escribir, quitamos el error inmediatamente
      if (input.value.trim() !== "" && input.classList.contains("is-invalid")) {
        clearInvalid(input);
      }
    });
  });
}

// Ejecutar la asignación de espías apenas se crea el HTML en "generarCamposDeNombres()"
setupValidationListeners();

/** 7. FORMULARIO: Procesamiento y envío de datos (Make/Notion) **/

// La URL del webhook se lee desde config.js (CONFIG.webhookURL)

// Seleccionamos el formulario del HTML
const rsvpForm = document.getElementById("rsvpForm");

// --- Funciones Auxiliares para el Submit ---
let _lastSubmit = 0;

function isSafeToSubmit() {
  // Rate limiting extraido
  const now = Date.now();
  if (now - _lastSubmit < CONFIG.rateLimitMs) {
    mostrarError(t("val_rate_limit"));
    return false;
  }

  // Honeypot extraido
  const honeypot = document.getElementById("website");
  if (honeypot && honeypot.value !== "") {
    mostrarExito(); // Simular éxito para bots
    return false;
  }
  return true;
}

/**
 * Valida todos los campos obligatorios del formulario RSVP.
 * Enfoca el primer campo inválido si se encuentran errores.
 * 
 * @returns {boolean} True si el formulario es válido, False en caso contrario.
 */
function handleValidation() {
  const requiredInputs = Array.from(document.querySelectorAll(".form__input[required]"));
  let isValid = true;
  let firstInvalidInput = null;

  requiredInputs.forEach((input) => {
    if (input.value.trim() === "") {
      const msg = input.id === "phone" ? t("val_phone") : t("val_name");
      setInvalid(input, msg);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = input;
    }
  });

  if (!isValid) {
    firstInvalidInput.focus();
    firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  return isValid;
}

/**
 * Cambia el estado del botón de envío durante el proceso de procesamiento.
 * Muestra u oculta un spinner y deshabilita/habilita el botón.
 * 
 * @param {boolean} isSubmitting - Indica si se está enviando el formulario.
 * @returns {void}
 */
function toggleSubmitState(isSubmitting) {
  const submitBtn = document.getElementById("submitBtn");
  if (!submitBtn) return;
  
  if (isSubmitting) {
    submitBtn.dataset.originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';
    submitBtn.disabled = true;
  } else {
    submitBtn.innerHTML = submitBtn.dataset.originalText || "Enviar Confirmación";
    submitBtn.disabled = false;
  }
}

/**
 * Extrae los datos de los invitados y el formulario para su envío.
 * Organiza los nombres de acompañantes y el mensaje en un objeto estructurado.
 * 
 * @returns {Object} Un objeto con los campos: Nombre, Telefono, Invitados, Asistencia, Mensaje.
 */
function extractGuestData() {
  const nameInput = document.getElementById("guest1");
  const titular = nameInput ? nameInput.value.trim() : "";

  const inputs = Array.from(document.querySelectorAll('input[id^="guest"]'));
  const todosLosNombres = inputs
    .map((input) => input.value.trim())
    .filter((val) => val !== "");

  const acompanantes = todosLosNombres.filter((val) => val !== titular && val !== "");

  const formData = new FormData(rsvpForm);
  const mensajeUsuario = formData.get("message") || "";
  const telefono = formData.get("phone") || "";
  const data = {
    nombre: titular,
    title: titular,
    telefono: telefono,
    invitados: todosLosNombres.length,
    asistencia: formData.get("attendance"),
    token: CONFIG.securityToken,
    mensaje: acompanantes.length > 0
        ? `Acompañantes: ${acompanantes.join(", ")}${mensajeUsuario ? "\n\nMensaje: " + mensajeUsuario : ""}`
        : mensajeUsuario,
  };

  return data;
}

/**
 * Envía los datos del RSVP al webhook de Make.com.
 * Maneja el estado de éxito y error, y almacena el estado en localStorage.
 * 
 * @param {Object} data - Los datos extraídos del formulario.
 * @returns {Promise<void>}
 */
async function sendDataToMake(data) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.fetchTimeoutMs);

  try {
    const response = await fetch(CONFIG.webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (response.ok) {
      localStorage.setItem('rsvpStatus', 'sent');
      _lastSubmit = Date.now();
      mostrarExito();
    } else {
      throw new Error(`Error del servidor: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al enviar:", error);
    if (error.name === 'AbortError') {
      mostrarError(t("error_timeout"));
    } else {
      mostrarError();
    }
  }
}

// Escuchamos el evento 'submit' refactorizado
rsvpForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!isSafeToSubmit()) return;
  if (!handleValidation()) return;

  toggleSubmitState(true);
  
  const guestData = extractGuestData();
  await sendDataToMake(guestData);
  
  // Limpia el botón si no fue éxito
  if (localStorage.getItem('rsvpStatus') !== 'sent') {
    toggleSubmitState(false);
  }
});

/** 8. FEEDBACK: Mensajes de éxito, error y cierre **/

/**
 * Muestra el mensaje de éxito en el modal tras un envío exitoso.
 * Genera botones dinámicos para añadir el evento al calendario según el dispositivo.
 * 
 * @returns {void}
 */
function mostrarExito() {
  // Reemplazamos el contenedor del form con un mensaje de éxito
  const rsvpContainer = document.getElementById("rsvpContainer");
  if(!rsvpContainer) return;

  // Permite ver el botón secreto de reinicio de pruebas solo si el URL lo autoriza
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('dbg') === CONFIG.adminKey;
  const botonPruebasHTML = isAdmin 
    ? `<p style="margin-top: 1.5rem; font-size: 0.75rem; color: #d1d5db; text-decoration: underline; cursor: pointer;" onclick="localStorage.removeItem('rsvpStatus'); location.reload();">
          ${t("success_test")}
       </p>` 
    : '';

  // Detección de dispositivo para Mostrar Calendario Adecuado
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  const isMac = /Macintosh/.test(userAgent);
  const isApple = isIOS || isMac;

  let calendarButtonsHTML = '';
  if (isApple) {
      calendarButtonsHTML = `
            <div style="display: flex; justify-content: center; margin-top: 2rem;">
                <a href="#" class="btn btn--dark" style="background-color: #000; border-color: #000; color: white;">
                    ${t("success_apple_cal")}
                </a>
            </div>
      `;
  } else {
      calendarButtonsHTML = `
            <div style="display: flex; justify-content: center; margin-top: 2rem;">
                <a href="#" target="_blank" rel="noopener" class="btn btn--dark" style="background-color: #4285F4; border-color: #4285F4; color: white;">
                    ${t("success_google_cal")}
                </a>
            </div>
      `;
  }

  rsvpContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
            <!-- Icono o Imagen reemplazada/eliminada por peticion (Sin Emojis) -->
            <h2 style="font-family: var(--font-serif); font-size: 2rem; margin-bottom: 0.5rem;">
                ${t("success_title")}
            </h2>
            <p style="color: #c5a059; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.1em; margin-bottom: 1.5rem;">
                ${t("success_subtitle")}
            </p>
            <p style="color: #57534e; line-height: 1.6;">
                ${t("success_text")}
            </p>
            
            ${calendarButtonsHTML}

            ${botonPruebasHTML}
        </div>
    `;
}

/**
 * Muestra un mensaje de error visual en el botón de envío.
 * 
 * @param {string} [mensaje="Hubo un error. Intenta de nuevo"] - El mensaje de error a mostrar.
 * @returns {void}
 */
function mostrarError(mensaje = t("error_default")) {
  const submitBtn = document.querySelector(".btn--submit");
  if (submitBtn) {
      submitBtn.textContent = mensaje;
      submitBtn.disabled = false;
      submitBtn.style.backgroundColor = "#b91c1c"; // Rojo para indicar error
  }
}


