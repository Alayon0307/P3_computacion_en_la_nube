# API Express

Este es un proyecto de una API construida con Express.js. La API tiene endpoints para obtener, crear, actualizar y eliminar usuarios.

## Instalación

Para instalar este proyecto, sigue estos pasos:

1. Clona el repositorio: `git clone <url-del-repositorio>`.
2. Navega al directorio del proyecto: `cd <nombre-del-directorio>`.
3. Instala las dependencias: `npm install`.

## Uso

Para iniciar el servidor, ejecuta el comando `node app.js`. Esto iniciará el servidor en `http://localhost:3000`.

Los endpoints disponibles son:

- `GET /status/`: Responde simplemente pong.
- `GET /directories/`: Listado de objetos.
- `POST /directories/`: Creación de objeto.
- `GET /directories/{id}`: Obtener un objeto.
- `PUT /directories/{id}`: Actualizar un objeto.
- `PATCH /directories/{id}`: Actualizar parcialmente un objeto.
- `DELETE /directories/{id}`: Eliminar un objeto.