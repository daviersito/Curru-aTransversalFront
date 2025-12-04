# Instrucciones de instalación y ejecución

Este archivo recoge los pasos mínimos para instalar dependencias, ejecutar la aplicación frontend y ejecutar los tests UI (Jest + RTL). También incluye credenciales de prueba sugeridas para usar durante el desarrollo.

IMPORTANTE: Este repositorio separa frontend y backend. Estas instrucciones asumen que tienes disponible un backend en `http://localhost:8081` con los endpoints que usa la app (`/api/usuarios`, `/api/productos`, `/api/pedidos`, `/api/boletas`, etc.). Si no tienes el backend, algunas funcionalidades no estarán activas y los tests usan mocks para aislar la UI.

**Requisitos previos**
- Node.js (recomendado v20+). Verifica con `node -v`.
- npm (incluido con Node). Verifica con `npm -v`.

1) Instalar dependencias (PowerShell)

```powershell
cd c:\Users\dilan\Downloads\curruna\fornt
# En caso de conflictos de peer-deps usar --legacy-peer-deps (recomendado en este repo)
npm install --legacy-peer-deps
```

2) Ejecutar la aplicación en modo desarrollo

```powershell
cd c:\Users\dilan\Downloads\curruna\fornt
npm run dev
```

Esto ejecuta Vite y levanta el frontend en `http://localhost:5173` por defecto (o el puerto que Vite indique). El frontend espera el backend en `http://localhost:8081` según el código actual.

3) Ejecutar tests UI (Jest + React Testing Library)

```powershell
cd c:\Users\dilan\Downloads\curruna\fornt
npm run test:ui
```

Comandos útiles adicionales:
- Ejecutar un único fichero o carpeta de tests:

```powershell
npx jest src/componentes/Productos --config ./jest.config.cjs --runInBand
```
- Ejecutar `jest` en modo watch (cuando esté soportado en tu entorno):

```powershell
npx jest --watch
```

4) (Opcional) Ejecutar solo el frontend sin instalar devDependencies problemáticas

Si prefieres evitar conflictos de versiones con dependencias de test/CI, puedes instalar solo `dependencies` y levantar Vite:

```powershell
npm ci --omit=dev
npm run dev
```

Credenciales de prueba (sugeridas)

Estas credenciales son de ejemplo para usar en desarrollo y pruebas manuales. No son cuentas reales del backend: asegúrate de que tu backend tenga usuarios equivalentes o crea/seed estas cuentas en la base de datos de desarrollo.

- Admin
  - Email: admin@example.com
  - Contraseña: admin123

- Cliente
  - Email: cliente@example.com
  - Contraseña: cliente123

Si el backend expone un endpoint de seed o creación rápida, crea los usuarios anteriores antes de iniciar sesión. Ejemplo (pseudo-API):

```http
POST http://localhost:8081/api/usuarios
Content-Type: application/json

{ "nombre": "Admin", "email": "admin@example.com", "contra": "admin123", "rol": "admin" }
```

Endpoints y notas de integración

- Frontend usa llamadas a `http://localhost:8081/api/*` (productos, categorias, usuarios, cart, pedidos, boletas).
- Para implementar el nuevo flujo de `pedido` → confirmación admin → `boleta`, considera estos endpoints (backend debe soportarlos):
  - `POST /api/pedidos` — crear pedido desde carrito (estado: `pendiente`).
  - `GET /api/pedidos` — listar pedidos (admin).
  - `PATCH /api/pedidos/:id/aceptar` — admin acepta pedido (backend crea boleta y cambia estado).
  - `GET /api/boletas` — listar boletas del usuario.

Si necesitas, puedo generar un `README` con instrucciones para crear/seedear usuarios en la base de datos del backend (si me muestras la API o la base de datos), o crear un script `seed` en el backend para crear las cuentas de prueba automáticamente.

Contacto y pasos siguientes

- Si quieres que añada las credenciales reales en un archivo `.env.example` o que automatice la creación de las cuentas de prueba, dime cómo es el backend (framework / base de datos) y lo preparo.

*** Fin ***
