
# 📝 API TASKAPP Y WEB

Prueba tecnica para Porthos




## 🌐 VARIABLES DE ENTORNO

Adjunté los enlaces 📎 junto con los archivos .env 🗂️ para el frontend y el backend. Contienen las variables sensibles que deben guardarse ahí para seguir buenas prácticas de seguridad 🔒 y organización 🛠️.

## 🚀 INICIO

Para comenzar 🛠️:

Backend: Node.js v22.12.0 ⚙️ (usa esta versión para evitar problemas).
Frontend: ReactJS v18.3 💻 (el versionado aquí no es crítico).
No olvides colocar los archivos .env en cada proyecto 📂.

```bash
  node --version (ideal 22.12.0)
```
¿Ya tenemos todo lo necesario? Entonces, puedes proceder y darle inicio.

```bash
  npm install (or npm i) en ambos proyectos
  npm run dev
```


## 🧠 TOMA DE DECISIONES

El backend de TaskApp fue desarrollado con Node.js v22.12.0 utilizando el framework Express.js por su flexibilidad y rendimiento. Se sigue el patrón MVC para mantener una estructura clara y modular. La base de datos seleccionada es SQLite, y se utilizan variables de entorno para gestionar información sensible.

La autenticación se implementa con JWT, Además, se incorporaron middlewares como CORS y validaciones para proteger la API y asegurar un buen rendimiento.

## ✨ API ENDPOINTS

📌 API ENDPOINTS - TAREAS

1️⃣ Crear una tarea

POST /api/task/create
- 🔒 Middleware: userQueryMiddleware
- ✔️ Descripción: Crea una nueva tarea asociada al usuario autenticado.

2️⃣ Obtener tareas por usuario

GET /api/task
- 🔒 Middleware: userQueryMiddleware
- ✔️ Descripción: Devuelve todas las tareas asociadas al usuario autenticado.

3️⃣ Actualizar una tarea

PUT /api/task/uptask
- 🔒 Middleware: userQueryMiddleware
- ✔️ Descripción: Actualiza los detalles de una tarea específica.

4️⃣ Eliminar una tarea

DELETE /api/task/deltask
- 🔒 Middleware: userQueryMiddleware
- ✔️ Descripción: Elimina una tarea específica asociada al usuario autenticado.


## 🔐 API ENDPOINTS - USUARIOS

1️⃣ Registrar usuario

POST /api/register
- ✔️ Descripción: Registra un nuevo usuario en el sistema.

2️⃣ Iniciar sesión

POST /api/login
- ✔️ Descripción: Permite al usuario autenticarse y recibir un token de sesión.

3️⃣ Obtener detalles del usuario

GET /api/user
- 🔒 Middleware: userQueryMiddleware
- ✔️ Descripción: Devuelve los datos del usuario autenticado.

4️⃣ Cerrar sesión

GET /api/logout
- 🔒 Middleware: userQueryMiddleware
- ✔️ Descripción: Finaliza la sesión del usuario.

