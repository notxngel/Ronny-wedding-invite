/**
 * Configuración centralizada del proyecto.
 * Para rotar el webhook, solo edita este archivo.
 *
 * SEGURIDAD: En Make.com, configura el módulo Webhook para que
 * valide el encabezado "Origin" de tu dominio
 * y rechace cualquier otra procedencia.
 */
const CONFIG = Object.freeze({
  webhookURL: "TU_WEBHOOK_URL_AQUI",
  adminKey: "r7xQ3",
  maxCupos: 4,
  rateLimitMs: 30000,
  fetchTimeoutMs: 10000,
  securityToken: "boda-bilronny-dahyana-2026"
});
