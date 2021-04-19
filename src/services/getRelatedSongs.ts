import { SongInterface } from '../classes/SongInterface';
import { token_yt } from '../config.json';

import nodeFetch from 'node-fetch'

const getRelatedSongs = async (song:SongInterface) => {
    if(!song || !song.url) return;
    const songsRelateds:any = [];
    const getIdSong = (song:SongInterface)=> {
        let id = song.url.split('v=')[1];
        return id;
    }
    const songId = getIdSong(song);
    await nodeFetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${songId}&type=video&key=${token_yt}`)
    .then(response => response.json())
    .then(json => {
        const resp = json;
        const { items } = resp;
        items.map( (item:any) => {
            if(item.snippet && item.id && item.id.videoId){
                let videoId = item.id.videoId;
                const song:SongInterface = {
                    title: item.snippet.title ? item.snippet.title : 'Problema con el título',
                    url: `https://www.youtube.com/watch?v=${videoId}`,
                }
                songsRelateds.push(song);
            }
        });
        return songsRelateds
        
    }).catch((error:any)=>{
        console.error(error);
        return false;
    });
    return songsRelateds;
}

export default getRelatedSongs;