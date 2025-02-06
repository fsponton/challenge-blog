# Blog Univeral

### Es un Blog donde todos pueden crearse una cuenta con nombre, email y password y hacer posteos.

##### Cuando un usuario esta logueado en el blog, puede visualizar todos los Posts que tiene el blog pero solo puede editar/borrar los suyos.


## Alcance de acciones de usuarios dentro del blog:

- Crear Posts
- Buscar Posts en front, filtrando por id, contenido o titulo
- El creador del post, puede editar y eliminar un post especifico
- Filtros para ordenar por fecha de actualización (actualización más reciente o más antigua) y por id mayor
- Pagina de registracion con un formulario
- Pagina de login con un formulario


Inputs de registrar user, crear post y editar post tienen validaciones de que si hay un error no se habilita el boton de submit y ademas se agregan mensajes por debajo del input indicando el error.

### Imagenes del proyecto dentro de `challenge - blog/Imagenes proyecto`


## Como correr el proyecto en LINUX - localhost:

1- Instalar mysql
- `sudo apt update`
- `sudo apt upgrade`
- `sudo apt install mysql-server`

2- Revisar que este ok
- `sudo systemctl status mysql` 

#### Si deseas detener o iniciar el servicio, reemplaza "status" por "start" o "stop". Deberías ver algo similar a esto si está funcionando:

```
fsponton@desktop:~/Desktop/challenge - blog$ sudo systemctl status mysql
● mysql.service - MySQL Community Server
     Loaded: loaded (/usr/lib/systemd/system/mysql.service; enabled; preset: enabled)
     Active: active (running) since Wed 2025-02-05 14:46:42 -03; 19h ago
    Process: 43832 ExecStartPre=/usr/share/mysql/mysql-systemd-start pre (code=exited, status=0/SUCCESS)
   Main PID: 43841 (mysqld)
     Status: "Server is operational"
      Tasks: 40 (limit: 76794)
     Memory: 402.0M (peak: 402.5M)
        CPU: 4min 4.705s
     CGroup: /system.slice/mysql.service
             └─43841 /usr/sbin/mysqld 

Feb 05 14:46:42 desktop systemd[1]: Starting mysql.service - MySQL Community Server...
Feb 05 14:46:42 desktop systemd[1]: Started mysql.service - MySQL Community Server.
```

3- Acceder a mysql para crear la base de datos donde se conectara el backend
- `sudo mysql -u root -p`

#### (La contraseña debe ser 123456. Si usas otra, deberás cambiarla en el archivo .env.example.json del backend por la que sea del localhost donde corre MySQL).


4- Una vez dentro deberiamos ver y crear la database

```
fsponton@desktop:~/Desktop/challenge - blog$ mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 201
Server version: 8.0.41-0ubuntu0.24.04.1 (Ubuntu)

Copyright (c) 2000, 2025, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
 ```

- `CREATE DATABASE "blog_db";`


## Una vez instalado mysql y creado la database podemos empezar con el backend.

5- Moverse a blog-api, con `cd blog-api`

6- Crear el archivo .env con los datos del archivo .env.example.json.

7- Instalar dependencias con `npm i`

8- Correr el proyecto, `npm run dev`


## Levantar FrontEnd
9- Moverse a blog-front, con `cd blo-front`

10- Crear el archivo .env con los datos del archivo .env.example.json.

11- Instalar dependencias con `npm i`

12- Correr el proyecto con `npm run dev`


