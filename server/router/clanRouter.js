require('dotenv').config();
const axios = require('axios');
const express = require('express');
const { Router } = require('express');

const clanRouter = Router();
clanRouter.use(express.json());
const token = process.env.CLASH_API;
// console.log("Token:", token); 

function parsTagMiddleware(req, res, next) {
    let Tag = req.params.clanTag; // get the clan tag from the request
    if (!Tag) {
        return res.status(404).json({ error: 'Clan tag is required' });
    }
    console.log("Tag:", Tag);
    // encode the clan tag from the request i.e. makes # -> %23
    if (Tag.startsWith('#')) {
        Tag = encodeURIComponent(Tag);
    } else {
        Tag = encodeURIComponent(`#${Tag}`);
    }

    req.params.clanTag = Tag;
    next();
}

clanRouter.get('/clan-members/:clanTag', parsTagMiddleware, async (req, res) => {
    const clanTag = req.params.clanTag;

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

clanRouter.get("/:clanTag/currentWar/leaguegroup", parsTagMiddleware, async (req, res) => {
    const clanTag = req.params.clanTag;

    try {
        response = await axios.get(`https://api.clashofclans.com/v1/clans/${clanTag}/currentwar/leaguegroup`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.json(error);
    }
});

// TEST: again when cwl is started.
clanRouter.get("/clanwarleagues/wars/:warTag", async (req, res) => {
    const warTag = req.params.warTag;

    try {
        response = await axios.get(`https://api.clashofclans.com/v1/clanwarleagues/wars/${warTag}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = response.data;
        res.json(data);

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.json(error);
    }
});

// NOTE: This endpoint will only work if clan have public war log.
clanRouter.get("/:clanTag/warlog", parsTagMiddleware, async (req, res) => {
    const clanTag = req.params.clanTag;

    try {
        response = await axios.get(`https://api.clashofclans.com/v1/clans/${clanTag}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const isWarLogPublic = response.data.isWarLogPublic
        console.log(isWarLogPublic);

        if (!isWarLogPublic) {
            console.log("Clan war log is private");
            return res.json({ error: 'Clan war log is private' });
        }

        response = await axios.get(`https://api.clashofclans.com/v1/clans/${clanTag}/warlog`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }); 
        data = response.data;
        console.log("Successfully fetched war log");
        res.json(data);

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.json(error);
    }
});

clanRouter.get("/:searchClanName", async (req, res) => {
    const searchClanName = req.params.searchClanName;

    try {
        response = await axios.get(`https://api.clashofclans.com/v1/clans?name=${searchClanName}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = response.data;
        res.json(data);

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.json(error);
    } 
});


module.exports = clanRouter; 