import ytdl from 'ytdl-core';
import ytSearch from 'yt-search';
import { prefix } from '../config/config.json'
import { Message, MessageEmbed, Client, Guild } from 'discord.js';
import { CommandInterface } from '../classes/CommandInterface';
import { SongInterface } from '../classes/SongInterface';
import { TitleMusicInterface} from '../classes/titleMusicInterface';
import getRelatedSongs from '../services/getRelatedSongs';
import queue from '../helpers/Queue';
import { title } from 'node:process';

const Play:CommandInterface = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    execute: async (message: Message, args: any) => {
        const voiceChannel = message.member?.voice.channel;
        //*Queue
        const serverQueue = queue.get(message.guild?.id);
        //*AutoPlay
        let AutoPlay : boolean = false;
        //*
        if(!voiceChannel) return message.channel.send('¡Necesitas estar en un canal de voz para ejecutar este comando! 🐝');
        const client : Client = message.client;
        if(client.user === null || client.user === undefined) return message.channel.send('Error! 🐝');
        const permissions = voiceChannel.permissionsFor(client.user)
        if(!permissions?.has('CONNECT')) return message.channel.send('¡No tienes los permisos correctos! 🐝');
        if(!permissions?.has('SPEAK')) return message.channel.send('¡No tienes los permisos correctos! 🐝');

        //! ------------------- stop the queue
        if(message.content.startsWith(`${prefix}stop`)){
            if(!message.member?.voice.channel) return message.channel.send('¡Necesitas estar en un canal de voz para ejecutra este comando! 🐝')
            if(!serverQueue) return message.channel.send('No hay nada reproduciendo... 🐝');
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
            message.channel.send('Listo rey, te apagué la música ;) 🐝');
            return;
        }
        //! ------------------- skip the song
        if(message.content.startsWith(`${prefix}next`) || message.content.startsWith(`${prefix}skip`)){
            if(!message.member?.voice.channel) return message.channel.send('¡Necesitas estar en un canal de voz para ejecutra este comando! 🐝')
            if(!serverQueue) return message.channel.send('No hay nada reproduciendo... 🐝');
            serverQueue.connection.dispatcher.end();
            message.channel.send('Listo, te cambié el temita 🐝');
            return;
        }
        if(message.content.startsWith(`${prefix}play -a`) || message.content.startsWith(`${prefix}p -a`)){
            console.log('ejecutado con autoplay');
            message.content.replace(' -a', '');
            AutoPlay = true;
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
            const connection = await voiceChannel.join();
        
            const videoFinder = async (query: any, autoplay:Boolean) => {

                let newQuery:string = "";
                if(autoplay && query.includes('play -a')){
                    newQuery = query.replace('play -a', '');
                }
                
                const videoResult = await ytSearch(autoplay ? newQuery : query);
    
                return (videoResult.videos.length > 1 ) ? videoResult.videos[0] : null
            }
            
            const video = await videoFinder(args.join(' '), AutoPlay);
            if(video){
                const song : SongInterface = {
                    title: video.title,
                    url: video.url
                }
                const play = async ( guild:any, song : SongInterface ) => {
                    const serverQueue = queue.get(guild.id);
                    if(serverQueue){
                        if(serverQueue.songs.length === 1 && serverQueue.autoPlay){
                            //If queue are empty and have autoplay active
                            const relatedSongs:any = await getRelatedSongs(song);
                            if(relatedSongs){
                                const exampleEmbed = new MessageEmbed()
                                relatedSongs.map((s:SongInterface, index:number) => {
                                    serverQueue.songs.push(s);
                                    exampleEmbed.addField(`${index.toString()}`, `${s.title}`, true)
                                });
                                
                                exampleEmbed.setColor('#0099ff')
                                .setTitle('Teemón Music Playlist:')
                                .setURL('https://discord.js.org/')
                                .setDescription(`🐝 Nuevas canciones agregadas automáticamente: `)
                                .setTimestamp()
                                .setFooter('Teemón Music 🐝', 'https://imgur.com/pCwa7QF.jpg');
                                message.channel.send(exampleEmbed);
                            }
                        }
                        else if(serverQueue.songs.length == 1 && !serverQueue.autoPlay){
                        }
                    }
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
                    console.log('reproduciendo el tema: ', song.title)
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
                        playing: true,
                        autoPlay: AutoPlay
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

            }else{
                message.channel.send('No se encontraron videos / canciones 🐝')
            }   
    }

}

export default Play;