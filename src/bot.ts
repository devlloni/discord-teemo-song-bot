import { config } from 'dotenv';
config();
import {prefix} from './config.json';
import { 
    Client, 
    Message,
    TextChannel,
    MessageEmbed
} 
        from "discord.js";
import CommandPlay from './commands/play'
import CommandStop from './commands/stop';
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
})

//Youtube music play

command(client, ['play', 'p'], (message: Message) => {
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

client.login(process.env.TOKEN_DS);