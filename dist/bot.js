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
const stop_1 = __importDefault(require("./commands/stop"));
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
//Youtube music play
command_1.default(client, ['play', 'p'], (message) => {
    const args = message.content.slice(config_json_1.prefix.length).split(/ +/);
    // const command = args.shift()?.toLowerCase();
    play_1.default.execute(message, args);
});
command_1.default(client, ['stop', 's'], (message) => {
    stop_1.default.execute(message, '');
});
client.login(process.env.TOKEN_DS);
