# discord-teemo-bot

![Discord-Teemo-Bot](https://i.imgur.com/j9bYYCK.png)

## ¿Cómo compilar y correr el bot?
Lo primero que debes hacer, es correr el comando "npm i" o "npm install", para instalar todas las librerías necesarias que consume el proyecto.

Una vez instalado todo, utilizaremos el comando "npm run dev" (En modo depuración con nodemon).
Otra opción, es utilizar "npm run build" que compila el código Typescript en javascript, para luego correr "npm start" y 
encender la aplicación.

## ¿Qué hace el bot?

## V.03
## ¡Reproduce música!

Se agregó la funcionabilidad de escuchar música en canales de voz, a través del bot. El usuario pasa una búsqueda a través del comando !!play (Canción a buscar) ó !!play -a (Canción a buscar)

#####################################################################################################################

- ping
Responde solamente con "Pong!"
- cc / clearchannel
Limpia los últimos 15 mensajes del canal si el usuario que ejecuta el comando cuenta con permisos de "ADMINISTRADOR".
- kick / expulsar
Expulsa o kickea al usuario que se arrobe después del comando; es decir por ejemplo: "!!kick @nombredeusuario", si cuenta con los permisos de "KICK_MEMBERS".

### V0.3

- help
Muestra los comandos disponibles sobre el bot.

- play
Busca una canción o video en youtube, y lo reproduce en stream en el canal de voz en el que estés conectado.

- play -a
Busca una canción o video en youtube, y pasa como parámetro que la playlist será automática: Es decir, será infinita, mientras el usuario pase este parametro; al quedar pocas canciones en la lista, o una última canción, el bot automáticamente buscará canciones relacionadas y las agregará a la playlist.

- stop
Detiene la reproducción del video en el que esté sonando y sale del canal de voz.

- queue
Muestra las canciones en lista a reproducir.





Hay algunos comandos qué fueron hechos solo por diversión, así que les dejo que lo prueben ustedes mismos 😎🐝
