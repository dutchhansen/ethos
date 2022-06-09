require('dotenv').config()
const express = require('express');
const app = express();
const axios = require('axios');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || 8888;


/**
 * Generates random string containing numbers and letters
 * @param {number} length The length of the string
 * @returns {string} The generated string
 */
const generateRandomString = (length) => {
    let randString = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12345667890';
    for (let i = 0; i < length; i++) {
        randString += (possible.charAt(Math.floor(Math.random() * possible.length)));
    }
    return randString;
}

const stateKey = 'spotify_auth_state'; // FIXME: learn cookies

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    let scope = 'user-read-private user-read-email user-library-read user-top-read user-modify-playback-state '
    scope += 'user-read-playback-state user-read-currently-playing app-remote-control streaming user-library-modify'

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    })

    res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
})


app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    const tokenParams = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
    });

    // pass tokenParams object to axios function
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: tokenParams.toString(),
        // encode unicode to byte and byte to string in header
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
        },
    })
        .then(response => {
            if (response.status === 200) {

                const {access_token, refresh_token, expires_in} = response.data;

                const queryParams = new URLSearchParams({
                    access_token: access_token,
                    refresh_token: refresh_token,
                    expires_in: expires_in
                });

                // redirect to react app
                res.redirect(`${FRONTEND_URI}?${queryParams}`)

            } else {
                res.redirect(`?${new URLSearchParams({error: 'invalid_token'})}`);
            }
        })
        .catch(error => {
            res.send(error);
        });
})


app.get('/refresh_token', (req, res) => {
    const {refresh_token} = req.query;

    const refreshParams = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
    });

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: refreshParams.toString(),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        }
    })
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });

})


// listen on PORT
app.listen(PORT);
