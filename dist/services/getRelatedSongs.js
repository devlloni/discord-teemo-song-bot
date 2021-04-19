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
const config_json_1 = require("../config.json");
const node_fetch_1 = __importDefault(require("node-fetch"));
const getRelatedSongs = (song) => __awaiter(void 0, void 0, void 0, function* () {
    if (!song || !song.url)
        return;
    const songsRelateds = [];
    const getIdSong = (song) => {
        let id = song.url.split('v=')[1];
        return id;
    };
    const songId = getIdSong(song);
    yield node_fetch_1.default(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${songId}&type=video&key=${config_json_1.token_yt}`)
        .then(response => response.json())
        .then(json => {
        const resp = json;
        const { items } = resp;
        items.map((item) => {
            if (item.snippet && item.id && item.id.videoId) {
                let videoId = item.id.videoId;
                const song = {
                    title: item.snippet.title ? item.snippet.title : 'Problema con el título',
                    url: `https://www.youtube.com/watch?v=${videoId}`,
                };
                songsRelateds.push(song);
            }
        });
        return songsRelateds;
    }).catch((error) => {
        console.error(error);
        return false;
    });
    return songsRelateds;
});
exports.default = getRelatedSongs;
