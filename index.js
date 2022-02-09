

const path = require('path');
const express = require('express');
const Gun = require('gun');
const SEA = require("gun/sea");
require('bullet-catcher')
require("dotenv").config()
const cors = require('cors')
const bodyParser = require('body-parser')
const stripe = require('stripe')(('sk_test_51KA0UmIxrCLGcFjgvXNaPk4CRvaAJ0oQQREi9yABWzGWwxyplAgQop6YyL27xhdSqLqxpImZwISbyGGZ6r456RqF00N0Zx6l6c');
const nodemailer = require("nodemailer")

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




app.post('/cancel', async (req, res) => {
  const { sub } = req.body;



  res.json({ 'client_secret': 'hallo' })
})

// Most of this code provided by @thinkingjoules
