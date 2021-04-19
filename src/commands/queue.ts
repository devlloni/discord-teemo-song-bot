import { CommandInterface} from '../classes/CommandInterface';
import { Message, Client, MessageEmbed } from 'discord.js'
import { SongInterface } from '../classes/SongInterface';
import queue from '../helpers/Queue';
const Queue:CommandInterface = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    execute: async (message: Message, args: any) => {
        const voiceChannel = message.member?.voice.channel;
        const serverQueue = queue.get(message.guild?.id);

        if(!voiceChannel) return message.channel.send('¡Necesitas estar en un canal de voz para ejecutar este comando! 🐝');
        const client : Client = message.client;
        if(client.user === null || client.user === undefined) return message.channel.send('Error! 🐝');
        const permissions = voiceChannel.permissionsFor(client.user)
        if(!permissions?.has('CONNECT')) return message.channel.send('¡No tienes los permisos correctos! 🐝');
        if(!permissions?.has('SPEAK')) return message.channel.send('¡No tienes los permisos correctos! 🐝');

        //! ------------------- List the queue
            if(!message.member?.voice.channel) return message.channel.send('¡Necesitas estar en un canal de voz para ejecutra este comando! 🐝')
            const queueList = queue.get(message.guild?.id);
            if (queueList){
                const exampleEmbed = new MessageEmbed()
                                queueList.songs.map((s:SongInterface, index:number) => {
                                    exampleEmbed.addField(`${index.toString()}`, `${s.title}`, true)
                                    // 
                                });
                exampleEmbed.setTitle('Teemón Music | Playlist: ')
                .setFooter('Teemón Music 🐝', 'https://imgur.com/pCwa7QF.jpg');
                message.channel.send(exampleEmbed);
            }
            return;
        
    }
}

export
 default 
    Queue;