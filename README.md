# District +58 · Control de tienda

App web instalable (PWA). Inventario, ventas, gastos y ganancias. Funciona sin internet: los datos viven en el teléfono.

## Archivos (todos en la carpeta raíz, sin subcarpetas)
- `index.html` — toda la aplicación
- `sw.js` — modo sin internet y actualizaciones
- `manifest.webmanifest` — datos de la app para instalarla y para crear el APK
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` — íconos
- `README.md` — este archivo

Sube los 8 archivos juntos, sueltos, a la raíz del repositorio. No hace falta crear carpetas.

## 1. Publicar en GitHub Pages
1. Repositorio nuevo → **Add file → Upload files** → selecciona los 8 archivos → Commit.
2. **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`** → Save.
3. En 1–2 minutos: `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`

## 2. Instalarla
- **Android (Chrome):** abre el link → ⋮ → *Instalar aplicación*.
- **iPhone (Safari):** Compartir → *Añadir a pantalla de inicio*.
Ábrela una vez con internet: así queda lista para usarse sin conexión (Ajustes lo confirma).

## 3. Actualizar
Cambia `index.html` en `main` y sube la nueva versión. La app la toma sola al abrirla con internet.
Cambia `VER` en `index.html` cada vez para comprobar en Ajustes que llegó.
Si cambias algún archivo de la lista de `sw.js`, cambia también `d58-v3` por `d58-v4`, etc.

## 4. Crear el APK
1. Entra a **pwabuilder.com**, pega tu link de GitHub Pages y toca *Start*.
2. Revisa que el manifiesto salga sin errores y elige **Android → Generate**.
3. Guarda la clave (*signing key*) que te entrega: sin ella no podrás actualizar el APK después.
4. Instala el APK en el teléfono (permite instalar apps de origen desconocido).

Nota: para que el APK abra sin barra de dirección, el sitio debe verificarse con un archivo `assetlinks.json` en la raíz del dominio.
Con la dirección `usuario.github.io/repo` no se puede; con un repositorio llamado exactamente `TU-USUARIO.github.io` sí
(PWABuilder te entrega el archivo; se sube como `.well-known/assetlinks.json`). Sin eso el APK funciona igual, pero muestra una barra arriba.

## Importante: tus datos
- Se guardan en el teléfono, ligados a la dirección exacta de la página. Si cambias de dirección, empiezas vacío.
- Antes de migrar: Ajustes → Registro → *Guardar registro*; en la nueva dirección: *Cargar registro*.
- Cada dispositivo tiene sus propios datos; no se sincronizan.
- Los PIN solo bloquean el acceso a la app; no son seguridad real.
