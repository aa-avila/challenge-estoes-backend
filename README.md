# Challenge: Esto Es - backend
Solución para el challenge backend de "Esto es - Agencia Digital".

## Deployed version
La aplicación se encuentra desplegada en el servicio *Heroku* => [Esto Es Challenge BackI](https://esto-es-challenge-back.herokuapp.com/)

(link: https://esto-es-challenge-back.herokuapp.com/)

En dicho link hay una simple landing page con 2 vínculos
1. Documentación con Swagger UI
2. Link a este repositorio

Por otra parte, la base de datos se encuentra desplegada en el servicio *remotemysql.com*.
Si bien no es un método diseñado para un verdadero despliegue en producción, me pareció un buen recurso para demostrar de forma rápida y sencilla el funcionamiento pleno de esta API Rest.

A continuación, se indican los pasos para instalación y uso de forma local.

## Local Installation

Instalar dependencias mediante NPM:

```bash
npm install
```

Para ejecutar una versión local, se requiere disponer en funcionamiento una base de datos mysql.
Además se deberá crear un archivo .env en el directorio raíz, el cual contendrá las siguientes variables de entorno:

```bash
# CUSTOM PORT
CUSTOM_PORT=****

# JWT SECRET
SECRET_TOKEN=*******

# DATABASE PARAMS
DB_NAME=****
DB_USER=****
DB_PASSWORD=****
DB_HOST=****
DB_PORT=3306
```

Una vez configurado el proyecto, realizar migraciones
``` bash
npx sequelize-cli db:migrate
```

Y seeders
``` bash
npx sequelize-cli db:seed:all
```

Iniciar el servidor con el comando:
```bash
npm start
```

De manera opcional, se puede iniciar el servidor con *nodemon* con el siguiente comando:
```bash
npm run dev

```

## Usage / Docs
La documentación se realizó utilizando la herramienta *SwaggerUI*, siguiendo los lineamientos de la OpenAPI Specification Version 3.0.0.
Se puede acceder a ésta mediante el path "/api-docs/", por lo cual, como se mencionó más arriba, se encuentra disponible online en el siguiente link: [API Docs](https://esto-es-challenge-back.herokuapp.com/api-docs)

link => (https://esto-es-challenge-back.herokuapp.com/api-docs)

NOTA: ya que el foco del challenge se centra en la entidad PROJECTS, se agregó únicamente un endpoint de Login de usuario. Este resulta útil para demostrar un posible funcionamiento de roles (Admin y Standard) según los cuales algunas operaciones están restringidas sólo para usuarios Admin. El seeder de users provee algunos usuarios de prueba con ambos roles. A continuación se facilita un listado de los mismos:
1. email: test@admin.com - password: 12345678
2. email: test@standard.com - password: 12345678
3. email: usuario1@admin.com - password: 12345678
4. email: usuario2@standard.com - password: 12345678
