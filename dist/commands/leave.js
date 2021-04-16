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
const Leave = {
    name: 'stop',
    description: 'Leave from voice chat',
    execute: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const voiceChannel = (_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel;
        if (!voiceChannel)
            return message.channel.send('¡Necesitas estar en un canal de voz para ejecutar este comando! 🐝');
        yield voiceChannel.leave();
        yield message.channel.send('¡Me voy yeeeendo del voice! 🐝');
    })
};
exports.default = Leave;
