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
const discord_js_1 = require("discord.js");
const Queue_1 = __importDefault(require("../helpers/Queue"));
const Queue = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    execute: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const voiceChannel = (_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel;
        const serverQueue = Queue_1.default.get((_b = message.guild) === null || _b === void 0 ? void 0 : _b.id);
        if (!voiceChannel)
            return message.channel.send('¡Necesitas estar en un canal de voz para ejecutar este comando! 🐝');
        const client = message.client;
        if (client.user === null || client.user === undefined)
            return message.channel.send('Error! 🐝');
        const permissions = voiceChannel.permissionsFor(client.user);
        if (!(permissions === null || permissions === void 0 ? void 0 : permissions.has('CONNECT')))
            return message.channel.send('¡No tienes los permisos correctos! 🐝');
        if (!(permissions === null || permissions === void 0 ? void 0 : permissions.has('SPEAK')))
            return message.channel.send('¡No tienes los permisos correctos! 🐝');
        //! ------------------- List the queue
        if (!((_c = message.member) === null || _c === void 0 ? void 0 : _c.voice.channel))
            return message.channel.send('¡Necesitas estar en un canal de voz para ejecutra este comando! 🐝');
        message.channel.send('aber');
        const queueList = Queue_1.default.get((_d = message.guild) === null || _d === void 0 ? void 0 : _d.id);
        if (queueList) {
            const exampleEmbed = new discord_js_1.MessageEmbed();
            queueList.songs.map((s, index) => {
                exampleEmbed.addField(`${index.toString()}`, `${s.title}`, true);
                // 
            });
            exampleEmbed.setTitle('Teemón Music | Playlist: ')
                .setFooter('Teemón Music 🐝', 'https://imgur.com/pCwa7QF.jpg');
            message.channel.send(exampleEmbed);
        }
        return;
    })
};
exports.default = Queue;
