import axios from 'axios';


// ------------- API CALL -------------

export const getArtistInfo = (artist, title) => {
    return axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
}
