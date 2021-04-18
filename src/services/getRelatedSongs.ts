import { SongInterface } from '../classes/SongInterface';
import { token_yt } from '../config.json';

import nodeFetch from 'node-fetch'

const getRelatedSongs = async (song:SongInterface) => {
    if(!song) return;
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
            if(item.snippet){
                console.log(item.snippet.title);
            }
        })
    }).catch((error:any)=>{
        console.error(error);
        return false;
    })
}

export default getRelatedSongs;