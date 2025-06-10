require('dotenv').config();
const axios = require('axios');
const express = require('express');
const { Router } = require('express');

const playersRouter = Router();
playersRouter.use(express.json());
const token = process.env.CLASH_API;

function parsPlayerTagMiddleware(req, res, next) {
    let Tag = req.params.playerTag; // get the player tag from the request
    if (!Tag) {
        return res.status(404).json({ error: 'Player tag is required' });
    }
    console.log("Tag:", Tag);
    // encode the player tag from the request i.e. makes # -> %23
    if (Tag.startsWith('#')) {
        Tag = encodeURIComponent(Tag);
    } else {
        Tag = encodeURIComponent(`#${Tag}`);
    }

    req.params.playerTag = Tag;
    next();
}

playersRouter.get('/:playerTag/', parsPlayerTagMiddleware, async (req, res) => {
    const playerTag = req.params.playerTag;

    try {
        console.log("before try");

        response = await axios.get(`https://api.clashofclans.com/v1/players/${playerTag}`, {
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

playersRouter.post('/:playerTag/verifytoken', parsPlayerTagMiddleware, async (req, res) => {
    const playerTag = req.params.playerTag;
    const user_token = req.body.token;

    try {
        console.log("before try");

        response = await axios.post(`https://api.clashofclans.com/v1/players/${playerTag}/verifytoken`, {
            "token": user_token
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const status = response.data.status;
        if (status === 'ok') {
            console.log("Token is valid");
            res.json({ isOwner: true });
        } else {
            console.log("Token is invalid");
            res.json({ isOwner: false });
        }
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.json(error);
    }
});

module.exports = playersRouter; 