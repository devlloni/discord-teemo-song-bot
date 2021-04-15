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
const discord_js_1 = require("discord.js");
const command_1 = __importDefault(require("./command"));
const client = new discord_js_1.Client();
client.on('ready', () => {
    console.log('Bot is ready');
});
command_1.default(client, ['ping'], (message) => {
    message.channel.send('Pong!');
});
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
command_1.default(client, ['boque', 'boca'], (message) => {
    message.channel.send('¡Error! Quizás quisiste decir: "Bover" 🧐');
});
command_1.default(client, ['hola', 'hi', 'hello'], (message) => {
    message.channel.send('🐝 Arrrmado y preparado 🤓');
});
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
client.login(process.env.TOKEN_DS);
