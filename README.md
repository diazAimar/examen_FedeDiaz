# Examen Municipalidad 

## Instructivo instalación/ejecución del exámen:

- Clonar el repositorio https://github.com/diazAimar/examen_FedeDiaz.git

### Back end
- Instalar [XAMPP](https://www.apachefriends.org/es/index.html), ejecutar, e iniciar los servidores APACHE y MySQL.
- Copiar (`ctrl+c`) la carpeta llamada "examen_backend" y pegar (`ctrl+v`) en la ruta donde hayamos instalado XAMPP, dentro de la carpeta `htdocs` (por ejemplo: `E:\xampp\htdocs`)
- Ir a [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/) y dirigirse al apartado de SQL.
- Copiar y ejecutar el código SQL que se encuentra dentro del archivo `database.sql` en la carpeta "examen_backend".

### Front end
- Dirigirse a la carpeta llamada "examen_frontend" y abrir una consola de comandos.
- Ejecutar el comando `git checkout dev` (si no nos encontramos en dicha rama) para ir a la rama donde se encuentra el desarrollo completo de la aplicación.
- Ejecutar el comando `npm install` o `npm i`  para instalar las dependencias y librerias.
- Por ultimo, ejecutar el comando `npm run dev` para inicalizar el ambiente de desarrollo y "levantar" la aplicación.
