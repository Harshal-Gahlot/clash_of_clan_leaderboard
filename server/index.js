const express = require('express');
const axios = require('axios');
// const cors = require('cors')

const listClanMembersRouter = require('./router/clan/listClanMembers')

const app = express();
const PORT = 3000;    
// app.use(cors()); 

app.use("/api", listClanMembersRouter)

// DEV: just to copy the ip and make new API key every time ip changes, that's how it works sadly.
axios.get('https://api64.ipify.org?format=json').then(
    res => console.log('Your public IP is:', res.data.ip)
);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
