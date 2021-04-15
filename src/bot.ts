import { config } from 'dotenv';
config();
import {prefix} from './config.json';
import { 
    Client, 
    Message,
    TextChannel 
} 
        from "discord.js";
import command from './command';

const client: Client = new Client();


client.on('ready', ()=>{
    console.log('Bot is ready');
});

command(client, ['ping'], (message: Message) => {
    message.channel.send('Pong!');
});

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

command(client, ['boque', 'boca'], (message: Message) => {
    message.channel.send(
        '¡Error! Quizás quisiste decir: "Bover" 🧐'
    );
});

command(client, ['hola', 'hi', 'hello'], (message: Message) => {
    message.channel.send(
        '🐝 Arrrmado y preparado 🤓'
    );
});

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
client.login(process.env.TOKEN_DS);