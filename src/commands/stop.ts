import { CommandInterface } from '../classes/CommandInterface';
import ytdl from 'ytdl-core';
import ytSearch from 'yt-search';
import { Message, Client } from 'discord.js';

const Leave : CommandInterface = {
    name: 'stop',
    description: 'Leave from voice chat',
    execute: async (message: Message, args: any) => {
        const voiceChannel = message.member?.voice.channel;
        
        if(!voiceChannel) return message.channel.send('¡Necesitas estar en un canal de voz para ejecutar este comando! 🐝');
        await voiceChannel.leave();
        await message.channel.send('¡Me voy yeeeendo del voice! 🐝');
    }
}

export default Leave;