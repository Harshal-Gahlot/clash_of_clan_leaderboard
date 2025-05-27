require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const token = process.env.CLASH_API;

// DEV: just to copy the ip and make new API key every time ip changes, that's how it works sadly.
axios.get('https://api64.ipify.org?format=json').then(
    res => console.log('Your public IP is:', res.data.ip)
);

app.get('/api/clan-members/:clanTag', async (req, res) => {
    let clanTag = req.params.clanTag; // get the clan tag from the request
    if (clanTag.startsWith('#')) {
        clanTag = encodeURIComponent(clanTag); // encode the clan tag from the request i.e. makes # -> %23
    } else {
        clanTag = encodeURIComponent(`#${clanTag}`); 
    }
    try {
        console.log("before try");
        const response = await axios.get(`https://api.clashofclans.com/v1/clans/${clanTag}/members`, {
            headers: {
                "Authorization": token
            }
        });
        console.log("after try");
        const members = response.data.items;
        res.json(members); // send to frontend
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.json(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
