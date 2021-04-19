import { config as cnfg } from 'dotenv';
cnfg();
import {prefix, token_ds} from './config/config.json';
import { 
    Client, 
    Message,
    TextChannel,
    MessageEmbed
} 
        from "discord.js";
import CommandPlay from './commands/play'
import CommandStop from './commands/stop';
import CommandQueue from './commands/queue';
import command from './command';
import Play from './commands/play';
const client: Client = new Client();

client.on('ready', ()=>{
    console.log('Bot is ready');
});

//Ping
command(client, ['ping'], (message: Message) => {
    message.channel.send('  🏓 Pong!');
});

//Clearchannel
command(client, ['cc', 'clearchannel'], (message: Message) => {
    if(message.member?.hasPermission('ADMINISTRATOR')){
        message.channel.messages.fetch().then( (results) => {
            if(message.channel.type === "text"){
                message.channel.bulkDelete(results);
                message.channel.send(' 🐝 Bss, borré algunos mensajitos 🐝')
            }
        } );
    }else{
        message.channel.send(' 🧐 No tienes los permisos para hacer esto 🧐');
    }
});

//Boca
command(client, ['boque', 'boca'], (message: Message) => {
    message.channel.send(
        '¡Error! Quizás quisiste decir: "Bover" 🧐'
    );
});

//Hi
command(client, ['hola', 'hi', 'hello'], (message: Message) => {
    message.channel.send(
        '🐝 Arrrmado y preparado 🤓'
    );
});

//Kick
command(client, ['kick', 'expulsar'], async (message: Message) => {
    if(message.member?.hasPermission(['KICK_MEMBERS'])){
        const member = message.mentions.members?.first();
        if(member){
            const kickedMember = await member.kick();
            console.log(kickedMember.user.username);
            const userKicked = kickedMember.user.username;
            message.channel.send(` 🤬 ${userKicked} fué oneshoteado de una Q 🐝 | (Kick/Expulsión).`)
        }
    }else{
        message.channel.send(`
            Tas flashando pa, no te da para hacer eso a vos. 🐝 (No hay permisos)
        `);
    }
});

command(client, ['embed'], (message: Message) => {
    const logo = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fpaumol%2Fart%2Fteemo-el-hongo-430978947&psig=AOvVaw3BVjUku0NqLnEqlAO7FLNt&ust=1618599665134000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOja3uH3gPACFQAAAAAdAAAAABAD';
    const teemoSong = 'https://www.youtube.com/watch?v=lpVrIoYLSaM';
    const embed = new MessageEmbed()
    .setTitle('TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEMOOOOO')
    .setURL(teemoSong)
    .setAuthor(message.author.username)
    .setImage(logo)
    .setThumbnail(logo)
    .setFooter('Cebate un poco, dejá de manquear.')
    message.channel.send(embed); 
});

command(client, ['help', 'commands', 'ayuda', 'h'], (message:Message)=>{
    const embed = new MessageEmbed()
    .setTitle('Teemón Music 2021 | Comandos')
    .setAuthor(message.author.username)
    .addFields(
                // {name: 'NOMBRE COMANDO', value: 'DESCRIPCION', inline: true},
                {name: '!!help  / !!ayuda', value: 'Muestra los comandos disponibles', inline: true},
                {name: '!!hola  / !!hi', value: 'Saluda el bot', inline: true},
                {name: '!!play', value: 'Reproduce la canción que encuentre en youtube mediante las palabras seguidas del comando estando en un canal de voz.', inline: true},
                {name: '!!play -a', value: 'Reproduce de un modo automática la canción que encuentre en youtube, y va agregando música recomendada a la playlist.', inline: true},
                {name: '!!skip  / !!next', value: 'Saltea la canción en reproducción por la siguiente en la lista.', inline: true},
                {name: '!!queue  / !!q', value: 'Muestra la lista de canciones para reproducir en un canal.', inline: true}
            )
    message.channel.send(embed);
})

//Youtube music play

command(client, ['play'], (message: Message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    // const command = args.shift()?.toLowerCase();
    CommandPlay.execute(message, args);
});

command(client, ['stop', 's'], (message:Message) => {
    // CommandStop.execute(message, '')
    CommandPlay.execute(message, '')
});

command(client, ['next', 'skip'], (message:Message) => {
    CommandPlay.execute(message, '');
})

command(client, ['queue', 'q'], (message: Message) =>{
    CommandQueue.execute(message, '');
})

client.login(token_ds);