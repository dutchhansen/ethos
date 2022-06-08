import axios from 'axios';


// ------------- API CALL -------------

export const getArtistInfo = (artist) => {
    return axios.get(`https://api.wikimedia.org/core/v1/wikipedia/en/page/${artist}/html`)
}
