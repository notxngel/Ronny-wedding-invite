# 📖 Guía de Administración: Invitación Digital Premium

Esta invitación ha sido desarrollada bajo estándares de alta disponibilidad, seguridad y diseño editorial responsivo. A continuación, se detallan los módulos críticos para su gestión y entrega al cliente final.

---

## 🛠 1. Centro de Configuración (`config.js`)

Toda la lógica de negocio se centraliza en este archivo. No es necesario tocar el HTML para cambios operativos.

- **`webhookURL`**: Dirección de **Make.com** donde se reciben los datos.
- **`eventDateISO`**: Fecha del evento para el contador (Countdown).
- **`maxCupos`**: Límite global de invitados permitidos por formulario (por defecto 4).
- **`adminKey`**: Palabra clave para acceder al **Modo Admin** (ej: `amds-rsvp-debug`).

---

## 🌍 2. Gestión de Contenidos e Idiomas (`i18n.js`)

La página utiliza un sistema de inyección dinámica de texto. **Nunca edites texto directamente en el HTML** si el elemento tiene un atributo `data-i18n`.

- **Para cambiar un texto**: Busca la clave en el objeto `es` (español) o `en` (inglés) dentro de `i18n.js` y actualiza su valor.
- **Campos FAQ**: Si cambias las preguntas o respuestas, hazlo aquí para mantener la consistencia bilingüe.

---

## 🛡 3. Capa de Seguridad (Producción)

Se han implementado protecciones para evitar spam y ataques maliciosos:

1. **Sanitización XSS**: El sistema limpia automáticamente cualquier intento de inyección de código en los campos de texto.
2. **Honeypot**: Campo invisible que atrapa bots automáticamente.
3. **Double Rate Limiting**: Bloqueo de envíos masivos mediante variables de estado y `sessionStorage`. Máximo 5 envíos por sesión del navegador.
4. **Validación de Teléfono**: Solo acepta formatos numéricos válidos (7 a 15 dígitos).

---

## 🎟 4. Sistema de Invitaciones Dinámicas (`?inv=`)

Para ofrecer una experiencia personalizada y evitar que los invitados alteren sus cupos, usamos enlaces codificados en **Base64**.

### Cómo generar un link para un invitado:
1. Prepara el texto: `Nombre del Invitado|CantidadDeCupos` (ej: `Familia Perez|4`).
2. Codifícalo en Base64 (puedes usar [base64encode.org](https://www.base64encode.org/)).
   - `Familia Perez|4` -> `RmFtaWxpYSBQZXJleiY0`
3. Genera el link: `https://tu-dominio.com/?inv=RmFtaWxpYSBQZXJleiY0`

**Comportamiento:**
- El nombre del invitado principal aparecerá bloqueado (**Readonly**) para evitar errores.
- El formulario solo mostrará el número exacto de campos de acompañantes permitidos para ese invitado específico.

---

## 🚀 5. Modo Admin y Pruebas

Si necesitas realizar múltiples pruebas sin ser bloqueado por el sistema de seguridad o si el formulario ya aparece como "Enviado":

**Acceso:** Agrega `?admin=amds-rsvp-debug` a la URL (o la clave que definas en `config.js`).
**Efecto:**
- Limpia el historial de envíos local.
- Reinicia los contadores de seguridad.
- Desbloquea el formulario instantáneamente para nuevas pruebas.

---

**Desarrollado por:** AM dev Studio
**Tecnologías:** HTML5, CSS3 (Vanilla), JavaScript (Vanilla), Make.com Integration.
