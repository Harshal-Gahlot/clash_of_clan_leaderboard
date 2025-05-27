require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000; // backend port

const token = process.env.CLASH_API;

app.get('/api/clan-members/:clanTag', async (req, res) => {
    let clanTag = req.params.clanTag; // get the clan tag from the request
    if (clanTag.startsWith('#')) {
        clanTag = encodeURIComponent(clanTag); // encode the clan tag from the request i.e. makes # -> %23
    } else {
        clanTag = encodeURIComponent(`#${clanTag}`); // if it doesn't start with #, add it and encode
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
