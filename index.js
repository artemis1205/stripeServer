

const path = require('path');
const express = require('express');

require('bullet-catcher')

const cors = require('cors')
const bodyParser = require('body-parser')



const port = (process.env.PORT || 8080);
const host = '0.0.0.0';

function hasValidToken(msg) {
  return msg && msg && msg.headers && msg.headers.token && msg.headers.token === 'thisIsTheTokenForReals'
}

const app = express();


// ----------------------

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

// ----------------------

const server = app.listen(port, host);

console.log(`server listening on http://${host}:${port}`);




app.post('/cancel', async (req, res) => {
  const { sub } = req.body;



  res.json({ 'client_secret': 'hallo' })
})

// Most of this code provided by @thinkingjoules
