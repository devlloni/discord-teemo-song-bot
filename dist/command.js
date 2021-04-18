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
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = require("./config.json");
const CommandHandler = (client, aliases, callback) => __awaiter(void 0, void 0, void 0, function* () {
    client.on('message', message => {
        const { content } = message;
        if (message.channel.type == "dm")
            return;
        if (message.author.bot)
            return;
        aliases.forEach(alias => {
            const command = `${config_json_1.prefix}${alias}`;
            if (content.startsWith(`${command} `) || content === command) {
                // console.log(`Running the command ${command}`);
                callback(message);
            }
            // ping
            // test
            // testing
        });
    });
});
exports.default = CommandHandler;
