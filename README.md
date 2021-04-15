# discord-teemo-bot

## ¿Cómo compilar y correr el bot?
Lo primero que debes hacer, es correr el comando "npm i" o "npm install", para instalar todas las librerías necesarias que consume el proyecto.
Una vez instalado todo, utilizaremos el comando "npm run dev" (En modo depuración con nodemon).
Otra opción, es utilizar "npm run build" que compila el código Typescript en javascript, para luego correr "npm start" y 
encender la aplicación.

## ¿Qué hace el bot?

Por ahora, está en la versión súper beta, donde usuarios de un canal pueden pasarle los siguientes comandos mediante el prefijo "!!" (editable en config.json):
- ping
Responde solamente con "Pong!"
- cc / clearchannel
Limpia los últimos 15 mensajes del canal si el usuario que ejecuta el comando cuenta con permisos de "ADMINISTRADOR".
- kick / expulsar
Expulsa o kickea al usuario que se arrobe después del comando; es decir por ejemplo: "!!kick @nombredeusuario", si cuenta con los permisos de "KICK_MEMBERS".

Hay algunos comandos qué fueron hechos solo por diversión, así que les dejo que lo prueben ustedes mismos 😎🐝
