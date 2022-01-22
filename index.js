const path = require('path');
const express = require('express');
const Gun = require('gun');
const SEA = require("gun/sea");
require('bullet-catcher')
const cors = require('cors')
const bodyParser = require('body-parser')
const stripe = require('stripe')('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');


const port = (process.env.PORT || 8080);
const host = '0.0.0.0';

function hasValidToken(msg) {
    return msg && msg && msg.headers && msg.headers.token && msg.headers.token === 'thisIsTheTokenForReals'
}

const app = express();
app.use(Gun.serve);

// ----------------------

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

// ----------------------

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




app.post('/pay', async (req, res) => {
    const {email} = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 5000,
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
        receipt_email: email,
      });

      res.json({'client_secret': paymentIntent['client_secret']})
})


// Most of this code provided by @thinkingjoules
