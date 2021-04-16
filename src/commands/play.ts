import ytdl from 'ytdl-core';
import ytSearch from 'yt-search';
import { Message, Client } from 'discord.js';
import { CommandInterface } from '../classes/CommandInterface';

const Play:CommandInterface = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    execute: async (message: Message, args: any) => {
        const voiceChannel = message.member?.voice.channel;

        if(!voiceChannel) return message.channel.send('¡Necesitas estar en un canal de voz para ejecutar este comando! 🐝');
        const client : Client = message.client;
        if(client.user === null || client.user === undefined) return message.channel.send('Error! 🐝');
        const permissions = voiceChannel.permissionsFor(client.user)
        if(!permissions?.has('CONNECT')) return message.channel.send('¡No tienes los permisos correctos! 🐝');
        if(!permissions?.has('SPEAK')) return message.channel.send('¡No tienes los permisos correctos! 🐝');
        if(!args.length) return message.channel.send('¡Bss, pasa una url válida! 🐝');

        const validUrl = (str: string) => {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            }else{
                return true;
            }
        }
        // if(validUrl(args[0])){
            const connection = await voiceChannel.join();
        
            const videoFinder = async (query: any) => {
                const videoResult = await ytSearch(query);
    
                return (videoResult.videos.length > 1 ) ? videoResult.videos[0] : null
            }
    
            const video = await videoFinder(args.join(' '));
            if(video){
                const stream = ytdl(video.url, {filter: 'audioonly'});
                connection.play(stream, {seek: 0, volume: 1})
                .on('finish', ()=>{
                    voiceChannel.leave();
                })
    
                await message.reply(`:thumbsup: Reproduciendo ***${video.title}***  🐝`)
            }else{
                message.channel.send('No se encontraron videos / canciones 🐝')
            }
        // }else{
        //     message.channel.send('¡Pasá una URL válida papá! 🐝')
        // }
        
    }

}

export default Play;