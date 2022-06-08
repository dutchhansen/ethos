import axios from 'axios';


// ------------- API CALL -------------

export const getArtistInfo = (artist) => {
    return axios.get(`https://en.wikipedia.org/w/api.php?action=parse&page=${artist}&format=json`)
}
