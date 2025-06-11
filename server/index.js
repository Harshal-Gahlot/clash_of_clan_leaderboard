const express = require('express');
const axios = require('axios');
const cors = require('cors')

const clansRouter = require('./router/clansRouter')
const playersRouter = require('./router/playersRouter')

const app = express();
const PORT = 3000;    
app.use(cors()); 

app.use("/api/clans", clansRouter)
app.use("/api/players", playersRouter)

// DEV: just to copy the ip and make new API key every time ip changes, that's how it works sadly.
axios.get('https://api.ipify.org?format=json').then(
    res => console.log('Your public IP is:', res.data.ip)
);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
