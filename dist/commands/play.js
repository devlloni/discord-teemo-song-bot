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
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const yt_search_1 = __importDefault(require("yt-search"));
const Play = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    execute: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const voiceChannel = (_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel;
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
        if (!args.length)
            return message.channel.send('¡Bss, pasa una url válida! 🐝');
        const validUrl = (str) => {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if (!regex.test(str)) {
                return false;
            }
            else {
                return true;
            }
        };
        // if(validUrl(args[0])){
        const connection = yield voiceChannel.join();
        const videoFinder = (query) => __awaiter(void 0, void 0, void 0, function* () {
            const videoResult = yield yt_search_1.default(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        });
        const video = yield videoFinder(args.join(' '));
        if (video) {
            const stream = ytdl_core_1.default(video.url, { filter: 'audioonly' });
            connection.play(stream, { seek: 0, volume: 1 })
                .on('finish', () => {
                voiceChannel.leave();
            });
            yield message.reply(`:thumbsup: Reproduciendo ***${video.title}***  🐝`);
        }
        else {
            message.channel.send('No se encontraron videos / canciones 🐝');
        }
        // }else{
        //     message.channel.send('¡Pasá una URL válida papá! 🐝')
        // }
    })
};
exports.default = Play;
