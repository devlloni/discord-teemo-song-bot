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
const config_json_1 = require("../config.json");
const Queue_1 = __importDefault(require("../helpers/Queue"));
const Play = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    execute: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        const voiceChannel = (_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel;
        //*Queue
        const serverQueue = Queue_1.default.get((_b = message.guild) === null || _b === void 0 ? void 0 : _b.id);
        //*
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
        //! stop the queue
        if (message.content.startsWith(`${config_json_1.prefix}stop`)) {
            if (!((_c = message.member) === null || _c === void 0 ? void 0 : _c.voice.channel))
                return message.channel.send('¡Necesitas estar en un canal de voz para ejecutra este comando! 🐝');
            if (!serverQueue)
                return message.channel.send('No hay nada reproduciendo... 🐝');
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
            message.channel.send('Listo rey, te apagué la música ;) 🐝');
            return;
        }
        if (message.content.startsWith(`${config_json_1.prefix}next`) || message.content.startsWith(`${config_json_1.prefix}skip`)) {
            if (!((_d = message.member) === null || _d === void 0 ? void 0 : _d.voice.channel))
                return message.channel.send('¡Necesitas estar en un canal de voz para ejecutra este comando! 🐝');
            if (!serverQueue)
                return message.channel.send('No hay nada reproduciendo... 🐝');
            serverQueue.connection.dispatcher.end();
            message.channel.send('Listo, te cambié el temita 🐝');
            return;
        }
        if (!args.length && !message.content.startsWith(`${config_json_1.prefix}stop`))
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
        //* Queue
        //*
        // if(validUrl(args[0])){
        const connection = yield voiceChannel.join();
        const videoFinder = (query) => __awaiter(void 0, void 0, void 0, function* () {
            const videoResult = yield yt_search_1.default(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        });
        const video = yield videoFinder(args.join(' '));
        if (video) {
            const song = {
                title: video.title,
                url: video.url
            };
            //getRelatedSongs(song);
            const play = (guild, song) => {
                const serverQueue = Queue_1.default.get(guild.id);
                if (!song) {
                    serverQueue.voiceChannel.leave();
                    Queue_1.default.delete(guild.id);
                    return;
                }
                const dispatcher = serverQueue.connection.play(ytdl_core_1.default(song.url))
                    .on('finish', () => {
                    serverQueue.songs.shift();
                    console.log('Pasando al siguiente tema');
                    console.log(serverQueue.songs);
                    play(guild, serverQueue.songs[0]);
                })
                    .on('error', (error) => {
                    console.log(error);
                });
                console.log('reproduciendo el tema: ', song.title);
                dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
                message.channel.send(`🐝 Ahora estás escuchando: ***${song.title}*** 🐝`);
            };
            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                };
                Queue_1.default.set((_e = message.guild) === null || _e === void 0 ? void 0 : _e.id, queueConstruct);
                queueConstruct.songs.push(song);
                try {
                    var conexion = yield voiceChannel.join();
                    queueConstruct.connection = conexion;
                    play(message.guild, queueConstruct.songs[0]);
                }
                catch (error) {
                    console.log(`There was an error connection to the voice channel ${error}`);
                    Queue_1.default.delete((_f = message.guild) === null || _f === void 0 ? void 0 : _f.id);
                    return message.channel.send('There was an error');
                }
            }
            else {
                serverQueue.songs.push(song);
                return message.channel.send(`🐝 ***${song.title}*** agregada a la playlist.`);
            }
            // return undefined
            //*
            // const stream = ytdl(video.url, {filter: 'audioonly'});
            // connection.play(stream, {seek: 0, volume: 1})
            // .on('finish', ()=>{
            //     voiceChannel.leave();
            // })
            // await message.reply(`:thumbsup: Reproduciendo ***${video.title}***  🐝`)
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
