video explicacion https://youtu.be/3rr8jtxBPiE

Instalacion y ejecucion backend
## Construir y ejecutar
Desde la carpeta demo (PowerShell):

powershell
cd 'c:\Users\dilan\Downloads\corruna back\corruna\demo'
# Ejecutar la app (usa el wrapper Maven incluido)
.\mvnw.cmd spring-boot:run

# o compilar empaquetar (sin ejecutar tests):
.\mvnw.cmd -DskipTests package


Nota: si Maven falla por "No compiler is provided..." instala/configura un JDK y exporta JAVA_HOME antes de ejecutar.


## Swagger / Documentación
Swagger UI (web): http://localhost:8081/swagger-ui/index.html
OpenAPI JSON: http://localhost:8081/v3/api-docs

Abre el navegador con:

powershell
Start-Process "http://localhost:8081/swagger-ui/index.html"



## Credenciales de prueba (crear vía API)
La API permite crear usuarios por POST /api/usuarios y el servicio hashará la contraseña automáticamente. Usa los siguientes JSONs en POST /api/usuarios si aún no tienes usuarios en la base:

Admin (rol ADMIN = id 1):
json
{
  "nombre": "Admin Heladeria",
  "email": "admin@heladeria.local",
  "contra": "AdminPass!2025",
  "estado": true,
  "fecha_creacion": 20251124,
  "rol": { "id": 1 }
}


Cliente (rol CLIENTE = id 2):
```json
{
  "nombre": "Cliente Demo",
  "email": "cliente@heladeria.local",
  "contra": "Cliente123!",
  "estado": true,
  "fecha_creacion": 20251124,
  "rol": { "id": 2 }
}
