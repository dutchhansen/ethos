import axios from 'axios';



const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const access_token = urlParams.get('access_token');
    const refresh_token = urlParams.get('refresh_token');
    const hasError = urlParams.get('error');

    if (hasError || access_token === 'undefined') {
        return false;
    }

    if (access_token && access_token !== 'undefined') {
        return access_token;
    }

    // if unable to retrieve access token
    return false;
};

export const access_token = getAccessToken();



// ------------- API CALLS -------------

// set headers for API calls
const headers = {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json'
}

export const getCurrentUserProfile = () => axios.get('https://api.spotify.com/v1/me', {headers});

export const getTopTracks = () => {
    return axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term`, {headers});
};

export const searchTracks = (search) => {
    return axios.get(`https://api.spotify.com/v1/search?limit=50&type=track&name:${search}&type=album,track`, {headers});
};
