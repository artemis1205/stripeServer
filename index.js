const path = require('path');
const express = require('express');
const Gun = require('gun');
const SEA = require("gun/sea");
require('bullet-catcher')
const cors = require('cors')

const port = (process.env.PORT || 8080);
const host = '0.0.0.0';

function hasValidToken(msg) {
    return msg && msg && msg.headers && msg.headers.token && msg.headers.token === 'thisIsTheTokenForReals'
}

const app = express();
app.use(Gun.serve);

app.use(cors())

const server = app.listen(port, host);

console.log(`server listening on http://${host}:${port}`);

function logIn(msg) {
    console.log(`in msg:${JSON.stringify(msg)}.........`);
}

function logOut(msg) {
    console.log(`out msg:${JSON.stringify(msg)}.........`);
}

var gun = Gun({
    web: server,
    localStorage: false,
    radisk: false,
    isValid: hasValidToken
});

gun._.on('in', logIn);
gun._.on('out', logOut);

function logPeers() {
    console.log(`Peers: ${Object.keys(gun._.opt.peers).join(', ')}`);
}

function logData() {
    console.log(`In Memory: ${JSON.stringify(gun._.graph)}`);
}

setInterval(logPeers, 5000); //Log peer list every 5 secs
setInterval(logData, 20000); //Log gun graph every 20 secs


const view = path.join(__dirname, 'view/main.html');

gun.on('out', { get: { '#': { '*': '' } } })

app.use(express.static('view'));
app.get('*', function(_, res) {
    res.sendFile(view);
});


app.get('/', (req, res) => res.send('Hello World!'))




// Most of this code provided by @thinkingjoules
