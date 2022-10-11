const express = require('express');
const SpotifyWebAPI = require('spotify-web-api-node'); 
const cors = require('cors'); 
const bodyParser = require('body-parser');

const app = express(); 

app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => { 
    const refreshToken = req.body.refreshToken;
    console.log("hi");
    const spotifyAPI = new SpotifyWebAPI({
        redirectUri: 'http://localhost:3000', 
        clientId: 'd4c253e9f96a452bbab67dc95d304c34',
        clientSecret: '2f38aee8dd064d348eb6ec2dc8a12e5f',
        refreshToken,
    })

    spotifyAPI.refreshAccessToken()
        .then(data => { 
            console.log(data.body)
            console.log("hi")
        })
        .catch(err => { 
            res.sendStatus(400);
        }) 
})

app.post('/login', (req, res) => { 
    const code = req.body.code; 
    const spotifyAPI = new SpotifyWebAPI({
        redirectUri: 'http://localhost:3000', 
        clientId: 'd4c253e9f96a452bbab67dc95d304c34',
        clientSecret: '2f38aee8dd064d348eb6ec2dc8a12e5f',
    })
    spotifyAPI.authorizationCodeGrant(code)
        .then(data => { 
        res.json({
            accessToken: data.body.access_token, 
            refreshToken: data.body.refresh_token, 
            expiresIn: data.body.expires_in,
        })
    })
        .catch(err => {
            res.sendStatus(400);
        }) 
})

app.listen(4000);