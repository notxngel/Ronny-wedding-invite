/**
 * Core config de AM dev Studio.
 * Unico punto de configuracion para integraciones y seguridad.
 */
const CONFIG = Object.freeze({
  bride: "Dahyana Hiciano Perez",
  groom: "Bil Ronny Jimenez",
  coupleDisplayName: "Bil Ronny Jimenez & Dahyana Hiciano Perez",

  eventDateISO: "2026-07-11T18:00:00-04:00",
  ceremonyTime: "6:00 PM",
  receptionTime: "7:00 PM",
  rsvpDeadlineISO: "2026-06-15T23:59:59-04:00",

  mapsURL: "https://maps.google.com",

  webhookURL: "TU_WEBHOOK_MAKE_AQUI",
  securityToken: "bilronny-dahyana-rsvp-2026-amds",

  maxCupos: 4,
  rateLimitMs: 30000,
  fetchTimeoutMs: 10000,
  adminKey: "amds-rsvp-debug"
});
