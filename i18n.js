/** i18n Core - ES por defecto, EN opcional **/
let LANG = (() => {
  const params = new URLSearchParams(window.location.search);
  return params.get("lang") === "en" ? "en" : "es";
})();

const I18N = Object.freeze({
  es: {
    nav_home: "Inicio",
    nav_moments: "Nuestra Historia",
    nav_details: "Detalles",

    hero_eyebrow: "Nos casamos",
    hero_date: "11 de julio de 2026",
    hero_instruction: "Desliza y descubre cada detalle.",
    countdown_days: "Dias",
    countdown_hours: "Horas",
    countdown_minutes: "Min",
    countdown_seconds: "Seg",
    countdown_passed: "Ya comenzo nuestro nuevo capitulo.",

    album_title: "Momentos que nos trajeron hasta aqui",
    album_subtitle: "Bil Ronny Jimenez y Dahyana Hiciano Perez",
    caption_1: "La promesa",
    caption_2: "Complices",
    caption_3: "Nuestro para siempre",
    caption_4: "Elegancia y amor",
    caption_5: "Nuestra mejor version",
    caption_6: "Un solo camino",

    details_title: "Detalles del evento",
    details_subtitle: "Todo lo que necesitas saber",
    timeline_church: "Ceremonia",
    timeline_church_desc: "6:00 PM - Inicio puntual.",
    timeline_event: "Recepcion",
    timeline_desc: "7:00 PM - Brindis y celebracion.",
    dress_title: "Dress code",
    dress_desc: "Formal. Importante: evitar color verde y color blanco.",
    no_kids_title: "Invitacion para adultos",
    no_kids_desc: "Agradecemos coordinar el cuidado de los pequenos.",
    gifts_title: "Regalos",
    gifts_desc: "Tu presencia es nuestro mejor regalo.",
    seats_title: "Cupos",
    seats_desc: "Respeta los cupos indicados en tu enlace.",
    faq_q1: "Cuando y a que hora es la ceremonia?",
    faq_q2: "A que hora inicia la recepcion?",
    faq_q3: "Cual es el codigo de vestimenta?",
    faq_q4: "Hay restricciones de color?",
    faq_q5: "Se permiten ninos?",
    faq_q6: "Como funciona mi cupo?",

    loc_title: "Ubicacion",
    loc_subtitle: "Abrir ruta en Google Maps",
    loc_btn: "Ver en Google Maps",

    rsvp_title: "Confirma tu asistencia",
    rsvp_subtitle: "Fecha limite: 15 de junio de 2026",
    rsvp_card_subtitle: "Nos encantara compartir contigo",
    rsvp_card_text: "Completa el formulario una sola vez por familia.",
    rsvp_deadline: "Confirma antes del 15 de junio",
    rsvp_open_btn: "Confirmar ahora",

    modal_title: "RSVP",
    modal_subtitle: "Bil Ronny Jimenez & Dahyana Hiciano Perez",
    modal_deadline: "Por favor confirma antes del <strong>15 de junio de 2026</strong>",
    form_name: "Nombre completo",
    form_companion: "Acompanante",
    form_name_placeholder: "Ej. Andrea Perez",
    form_companion_placeholder: "Nombre completo del acompanante",
    form_attendance: "Asistiras?",
    form_yes: "Si, con mucho gusto",
    form_no: "No podre asistir",
    form_phone: "Telefono (WhatsApp)",
    form_phone_placeholder: "Ej. +1 809 000 0000",
    form_message: "Mensaje opcional",
    form_message_placeholder: "Dedicatoria para los novios",
    form_submit: "Enviar confirmacion",

    val_name: "Ingresa un nombre valido.",
    val_phone: "Ingresa un telefono valido.",
    val_rate_limit: "Espera unos segundos antes de reenviar.",

    success_title: "Gracias por confirmar",
    success_subtitle: "Tu respuesta fue recibida",
    success_text: "Nos emociona celebrar contigo este gran dia.",
    success_apple_cal: "Agregar a Apple Calendar",
    success_google_cal: "Agregar a Google Calendar",
    success_close: "Cerrar",
    success_test: "(Modo prueba: enviar otra respuesta)",

    error_default: "No se pudo enviar. Intenta nuevamente.",
    error_timeout: "La solicitud tardo demasiado. Vuelve a intentar.",

    footer_eyebrow: "Con amor",
    footer_made: "Disenado por AM dev Studio"
  },
  en: {
    nav_home: "Home",
    nav_moments: "Our Story",
    nav_details: "Details",

    hero_eyebrow: "We're getting married",
    hero_date: "July 11, 2026",
    hero_instruction: "Scroll to explore every detail.",
    countdown_days: "Days",
    countdown_hours: "Hours",
    countdown_minutes: "Min",
    countdown_seconds: "Sec",
    countdown_passed: "Our new chapter has begun.",

    album_title: "Moments that brought us here",
    album_subtitle: "Bil Ronny Jimenez and Dahyana Hiciano Perez",
    caption_1: "The promise",
    caption_2: "Partners",
    caption_3: "Our forever",
    caption_4: "Elegance and love",
    caption_5: "Our best version",
    caption_6: "One shared path",

    details_title: "Event details",
    details_subtitle: "Everything you need to know",
    timeline_church: "Ceremony",
    timeline_church_desc: "6:00 PM - Please arrive on time.",
    timeline_event: "Reception",
    timeline_desc: "7:00 PM - Toast and celebration.",
    dress_title: "Dress code",
    dress_desc: "Formal. Important: please avoid green and white.",
    no_kids_title: "Adults only",
    no_kids_desc: "Please arrange childcare in advance.",
    gifts_title: "Gifts",
    gifts_desc: "Your presence is our greatest gift.",
    seats_title: "Seats",
    seats_desc: "Please respect the seat count in your invite link.",
    faq_q1: "When is the ceremony?",
    faq_q2: "When does the reception start?",
    faq_q3: "What is the dress code?",
    faq_q4: "Are any colors restricted?",
    faq_q5: "Are kids allowed?",
    faq_q6: "How does my seat count work?",

    loc_title: "Location",
    loc_subtitle: "Open route in Google Maps",
    loc_btn: "Open in Google Maps",

    rsvp_title: "RSVP",
    rsvp_subtitle: "Deadline: June 15, 2026",
    rsvp_card_subtitle: "We would love to celebrate with you",
    rsvp_card_text: "Submit this form once per household.",
    rsvp_deadline: "Please reply by June 15",
    rsvp_open_btn: "Confirm now",

    modal_title: "RSVP",
    modal_subtitle: "Bil Ronny Jimenez & Dahyana Hiciano Perez",
    modal_deadline: "Please confirm before <strong>June 15, 2026</strong>",
    form_name: "Full name",
    form_companion: "Guest",
    form_name_placeholder: "e.g. Andrea Perez",
    form_companion_placeholder: "Guest full name",
    form_attendance: "Will you attend?",
    form_yes: "Yes, I'd love to",
    form_no: "I won't be able to attend",
    form_phone: "Phone (WhatsApp)",
    form_phone_placeholder: "e.g. +1 809 000 0000",
    form_message: "Optional message",
    form_message_placeholder: "A short note for the couple",
    form_submit: "Send RSVP",

    val_name: "Please enter a valid name.",
    val_phone: "Please enter a valid phone number.",
    val_rate_limit: "Please wait a few seconds before retrying.",

    success_title: "Thanks for your RSVP",
    success_subtitle: "Your response has been received",
    success_text: "We're excited to celebrate this day with you.",
    success_apple_cal: "Add to Apple Calendar",
    success_google_cal: "Add to Google Calendar",
    success_close: "Close",
    success_test: "(Test mode: submit another response)",

    error_default: "We couldn't submit your RSVP. Please try again.",
    error_timeout: "Request timed out. Please retry.",

    footer_eyebrow: "With love",
    footer_made: "Designed by AM dev Studio"
  }
});

function t(key) {
  return I18N[LANG]?.[key] ?? I18N.es[key] ?? key;
}

function applyTranslations() {
  document.documentElement.lang = LANG;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = t(key);
    if (value.includes("<")) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = t(key);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    el.setAttribute("aria-label", t(key));
  });

  const label = document.getElementById("langLabel");
  if (label) label.textContent = LANG === "es" ? "EN" : "ES";
}

function toggleLanguage() {
  LANG = LANG === "es" ? "en" : "es";
  applyTranslations();
}

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  const langBtn = document.getElementById("langToggle");
  if (langBtn) langBtn.addEventListener("click", toggleLanguage);
});
