import { Client } from "discord.js"
import { prefix } from './config.json';
const CommandHandler = async (client: Client, aliases: String[], callback: Function) => {

    client.on('message', message=> {
        const { content } = message;
        if(message.channel.type == "dm") return;
        if(message.author.bot) return;
        aliases.forEach( alias => {
            const command = `${prefix}${alias}`
            if(content.startsWith(`${command} `) || content === command){
                console.log(`Running the command ${command}`);
                callback(message);
            }
            // ping
            // test
            // testing
        })
    })
}

export default CommandHandler;