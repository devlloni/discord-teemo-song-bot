"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const config_json_1 = require("./config.json");
const discord_js_1 = require("discord.js");
const play_1 = __importDefault(require("./commands/play"));
const queue_1 = __importDefault(require("./commands/queue"));
const command_1 = __importDefault(require("./command"));
const client = new discord_js_1.Client();
client.on('ready', () => {
    console.log('Bot is ready');
});
//Ping
command_1.default(client, ['ping'], (message) => {
    message.channel.send('  🏓 Pong!');
});
//Clearchannel
command_1.default(client, ['cc', 'clearchannel'], (message) => {
    var _a;
    if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission('ADMINISTRATOR')) {
        message.channel.messages.fetch().then((results) => {
            if (message.channel.type === "text") {
                message.channel.bulkDelete(results);
                message.channel.send(' 🐝 Bss, borré algunos mensajitos 🐝');
            }
        });
    }
    else {
        message.channel.send(' 🧐 No tienes los permisos para hacer esto 🧐');
    }
});
//Boca
command_1.default(client, ['boque', 'boca'], (message) => {
    message.channel.send('¡Error! Quizás quisiste decir: "Bover" 🧐');
});
//Hi
command_1.default(client, ['hola', 'hi', 'hello'], (message) => {
    message.channel.send('🐝 Arrrmado y preparado 🤓');
});
//Kick
command_1.default(client, ['kick', 'expulsar'], (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(['KICK_MEMBERS'])) {
        const member = (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
        if (member) {
            const kickedMember = yield member.kick();
            console.log(kickedMember.user.username);
            const userKicked = kickedMember.user.username;
            message.channel.send(` 🤬 ${userKicked} fué oneshoteado de una Q 🐝 | (Kick/Expulsión).`);
        }
    }
    else {
        message.channel.send(`
            Tas flashando pa, no te da para hacer eso a vos. 🐝 (No hay permisos)
        `);
    }
}));
command_1.default(client, ['embed'], (message) => {
    const logo = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fpaumol%2Fart%2Fteemo-el-hongo-430978947&psig=AOvVaw3BVjUku0NqLnEqlAO7FLNt&ust=1618599665134000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOja3uH3gPACFQAAAAAdAAAAABAD';
    const teemoSong = 'https://www.youtube.com/watch?v=lpVrIoYLSaM';
    const embed = new discord_js_1.MessageEmbed()
        .setTitle('TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEMOOOOO')
        .setURL(teemoSong)
        .setAuthor(message.author.username)
        .setImage(logo)
        .setThumbnail(logo)
        .setFooter('Cebate un poco, dejá de manquear.');
    message.channel.send(embed);
});
command_1.default(client, ['help', 'commands', 'ayuda', 'h'], (message) => {
    const embed = new discord_js_1.MessageEmbed()
        .setTitle('Teemón Music 2021 | Comandos')
        .setAuthor(message.author.username)
        .addFields(
    // {name: 'NOMBRE COMANDO', value: 'DESCRIPCION', inline: true},
    { name: '!!help  / !!ayuda', value: 'Muestra los comandos disponibles', inline: true }, { name: '!!hola  / !!hi', value: 'Saluda el bot', inline: true }, { name: '!!play', value: 'Reproduce la canción que encuentre en youtube mediante las palabras seguidas del comando estando en un canal de voz.', inline: true }, { name: '!!play -a', value: 'Reproduce de un modo automática la canción que encuentre en youtube, y va agregando música recomendada a la playlist.', inline: true }, { name: '!!skip  / !!next', value: 'Saltea la canción en reproducción por la siguiente en la lista.', inline: true }, { name: '!!queue  / !!q', value: 'Muestra la lista de canciones para reproducir en un canal.', inline: true });
    message.channel.send(embed);
});
//Youtube music play
command_1.default(client, ['play'], (message) => {
    const args = message.content.slice(config_json_1.prefix.length).split(/ +/);
    // const command = args.shift()?.toLowerCase();
    play_1.default.execute(message, args);
});
command_1.default(client, ['stop', 's'], (message) => {
    // CommandStop.execute(message, '')
    play_1.default.execute(message, '');
});
command_1.default(client, ['next', 'skip'], (message) => {
    play_1.default.execute(message, '');
});
command_1.default(client, ['queue', 'q'], (message) => {
    queue_1.default.execute(message, '');
});
client.login(config_json_1.token_ds);
