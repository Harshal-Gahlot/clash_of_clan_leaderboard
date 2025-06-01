require('dotenv').config(); 
const axios = require('axios');
const express = require('express');
const { Router } = require('express');

const listClanMembersRouter = Router();
listClanMembersRouter.use(express.json());
const token = process.env.CLASH_API;
// console.log("Token:", token); 
 
listClanMembersRouter.get('/clan-members/:clanTag', async (req, res) => {
    let clanTag = req.params.clanTag; // get the clan tag from the request
    if (clanTag.startsWith('#')) {
        clanTag = encodeURIComponent(clanTag); // encode the clan tag from the request i.e. makes # -> %23
    } else {
        clanTag = encodeURIComponent(`#${clanTag}`);
    }
    console.log("Clan Tag:", clanTag);
    try {
        console.log("before try");
        const response = await axios.get(`https://api.clashofclans.com/v1/clans/${clanTag}/members`, {
            headers: {
                Authorization: `Bearer ${token}`
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

module.exports = listClanMembersRouter;