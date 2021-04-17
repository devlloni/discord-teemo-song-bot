import ytdl from 'ytdl-core';
import ytSearch from 'yt-search';
import { prefix } from '../config.json'
import { Message, Client, Guild } from 'discord.js';
import { CommandInterface } from '../classes/CommandInterface';
import { SongInterface } from '../classes/SongInterface';
import queue from '../helpers/Queue';

const Play:CommandInterface = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    execute: async (message: Message, args: any) => {
        
        const voiceChannel = message.member?.voice.channel;
        //*Queue
        const serverQueue = queue.get(message.guild?.id);
        //*
        if(!voiceChannel) return message.channel.send('¡Necesitas estar en un canal de voz para ejecutar este comando! 🐝');
        const client : Client = message.client;
        if(client.user === null || client.user === undefined) return message.channel.send('Error! 🐝');
        const permissions = voiceChannel.permissionsFor(client.user)
        if(!permissions?.has('CONNECT')) return message.channel.send('¡No tienes los permisos correctos! 🐝');
        if(!permissions?.has('SPEAK')) return message.channel.send('¡No tienes los permisos correctos! 🐝');
        //! stop the queue
        if(message.content.startsWith(`${prefix}stop`)){
            if(!message.member?.voice.channel) return message.channel.send('¡Necesitas estar en un canal de voz para ejecutra este comando! 🐝')
            if(!serverQueue) return message.channel.send('No hay nada reproduciendo... 🐝');
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
            message.channel.send('Listo rey, te apagué la música ;) 🐝');
            return;
        }if(message.content.startsWith(`${prefix}next`) || message.content.startsWith(`${prefix}skip`)){
            if(!message.member?.voice.channel) return message.channel.send('¡Necesitas estar en un canal de voz para ejecutra este comando! 🐝')
            if(!serverQueue) return message.channel.send('No hay nada reproduciendo... 🐝');
            serverQueue.connection.dispatcher.end();
            message.channel.send('Listo, te cambié el temita 🐝');
            return;
        }
        if(!args.length && !message.content.startsWith(`${prefix}stop`)) return message.channel.send('¡Bss, pasa una url válida! 🐝');
        const validUrl = (str: string) => {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            }else{
                return true;
            }
        }

        //* Queue
        
        //*
        // if(validUrl(args[0])){
            const connection = await voiceChannel.join();
        
            const videoFinder = async (query: any) => {
                const videoResult = await ytSearch(query);
    
                return (videoResult.videos.length > 1 ) ? videoResult.videos[0] : null
            }
    
            const video = await videoFinder(args.join(' '));
            if(video){
                const song : SongInterface = {
                    title: video.title,
                    url: video.url
                }
                const play = ( guild:any, song : SongInterface ) => {
                    const serverQueue = queue.get(guild.id);
                    
                    if(!song){
                        serverQueue.voiceChannel.leave();
                        queue.delete(guild.id);
                        return;
                    }
        
                    const dispatcher = serverQueue.connection.play(ytdl(song.url))
                    .on('finish', () => {
                        serverQueue.songs.shift();
                        play(guild, serverQueue.songs[0])
                    })
                    .on('error', (error:any) =>{
                        console.log(error);
                    });
                    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
                    message.channel.send(`🐝 Ahora estás escuchando: ***${song.title}*** 🐝`);
                }
                if(!serverQueue){
                    const queueConstruct:any = {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 5,
                        playing: true
                    }
                    queue.set(message.guild?.id, queueConstruct);

                    queueConstruct.songs.push(song);

                    try {
                        var conexion = await voiceChannel.join();
                        queueConstruct.connection = conexion;
                        play(message.guild, queueConstruct.songs[0]);
                        
                    } catch (error) {
                        console.log(`There was an error connection to the voice channel ${error}`);
                        queue.delete(message.guild?.id);
                        return message.channel.send('There was an error');
                    }

                }
                else{
                    serverQueue.songs.push(song);
                    return message.channel.send(`🐝 ***${song.title}*** agregada a la playlist.`)
                }
                
                // return undefined
                //*
                // const stream = ytdl(video.url, {filter: 'audioonly'});
                // connection.play(stream, {seek: 0, volume: 1})
                // .on('finish', ()=>{
                //     voiceChannel.leave();
                // })
    
                // await message.reply(`:thumbsup: Reproduciendo ***${video.title}***  🐝`)

                

            }else{
                message.channel.send('No se encontraron videos / canciones 🐝')
            }
        // }else{
        //     message.channel.send('¡Pasá una URL válida papá! 🐝')
        // }

        
        
    }

}

export default Play;