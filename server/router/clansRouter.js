require('dotenv').config();
const axios = require('axios');
const express = require('express');
const { Router } = require('express');

const clansRouter = Router();
clansRouter.use(express.json());
const token = process.env.CLASH_API;

// "rounds": [
//     {
//         "warTags": [
//             "#8L0QY80PR",
//             "#8L0QY2V0Y",
//             "#8L0QY9YUV",
//             "#8L0QY82GV"
//         ]
//     },
//     {
//         "warTags": [
//             "#8L0RVQJVC",
//             "#8L0RVQUP2",
//             "#8L0RVG0UR",
//             "#8L0RVQVGY"
//         ]
//     },
//     {
//         "warTags": [
//             "#8L0UJVVUV",
//             "#8L0UC08QQ",
//             "#8L0UC0JY9",
//             "#8L0UC09CC"
//         ]
//     },
//     {
//         "warTags": [
//             "#8L22LLVLR",
//             "#8L22LQPRC",
//             "#8L22LQ0JV",
//             "#8L22LQ829"
//         ]
//     },
//     {
//         "warTags": [
//             "#8L2PPPYQC",
//             "#8L2PP9LLV",
//             "#8L2PP9QC9",
//             "#8L2PP9R2Q"
//         ]
//     }
// ];

function parsClanTagMiddleware(req, res, next) {
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

clansRouter.get("/:clanTag/currentWar/leaguegroup", parsClanTagMiddleware, async (req, res) => {
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
clansRouter.get("/cwl/wars/:warTag", async (req, res) => {
    let warTag = req.params.warTag;
    warTag = encodeURIComponent(`#${warTag}`);

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
clansRouter.get("/:clanTag/warlog", parsClanTagMiddleware, async (req, res) => {
    const clanTag = req.params.clanTag;

    try {
        response = await axios.get(`https://api.clashofclans.com/v1/clans/${clanTag}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const isWarLogPublic = response.data.isWarLogPublic;
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

// TODO TEST: implement limit to results and test if it reutrn limted items.
clansRouter.get("/search_clan_with_name/:searchClanName/", async (req, res) => {
    const searchClanName = req.params.searchClanName;
    const limit = req.query.limit || 10;
    const after = req.query.after;
    const before = req.query.before;

    try {
        let link;
        if (after) {
            link = `https://api.clashofclans.com/v1/clans?name=${searchClanName}&limit=${limit}&after=${after}`;
        } else if (before) {
            link = `https://api.clashofclans.com/v1/clans?name=${searchClanName}&limit=${limit}&before=${before}`;
        } else {
            link = `https://api.clashofclans.com/v1/clans?name=${searchClanName}&limit=${limit}`;
        }

        response = await axios.get(link, {
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

// TEST: ig this endpoint will only work if clan have public war log
clansRouter.get("/:clanTag/currentWar", parsClanTagMiddleware, async (req, res) => {
    const clanTag = req.params.clanTag;

    try {
        response = await axios.get(`https://api.clashofclans.com/v1/clans/${clanTag}/currentwar/`, {
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

clansRouter.get('/search_clan_with_tag/:clanTag', parsClanTagMiddleware, async (req, res) => {
    const clanTag = req.params.clanTag;

    try {
        console.log("before try");
        const response = await axios.get(`https://api.clashofclans.com/v1/clans/${clanTag}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("after try");
        const data = response.data;
        res.json(data); // send to frontend
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.json(error);
    }
});

clansRouter.get('/:clanTag/clan_members/', parsClanTagMiddleware, async (req, res) => {
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

clansRouter.get('/:clanTag/capitalraidseasons/', parsClanTagMiddleware, async (req, res) => {
    const clanTag = req.params.clanTag;
    const limit = req.query.limit || 10;
    const after = req.query.after;
    const before = req.query.before;

    try {
        console.log("before try");

        let link;
        if (after) {
            link = `https://api.clashofclans.com/v1/clans/${clanTag}/capitalraidseasons?limit=${limit}&after=${after}`;
        } else if (before) {
            link = `https://api.clashofclans.com/v1/clans/${clanTag}/capitalraidseasons?limit=${limit}&before=${before}`;
        } else {
            link = `https://api.clashofclans.com/v1/clans/${clanTag}/capitalraidseasons?limit=${limit}`;
        }

        response = await axios.get(link, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("after try");
        const data = response.data;
        res.json(data); // send to frontend
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.json(error);
    }
});

module.exports = clansRouter; 