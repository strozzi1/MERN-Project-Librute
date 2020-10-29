const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const api = require('./routes/api/')

const app = express();

//  Bodyparser Middleware (DEPRECATED, replaced with express.json())
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// connect to Mongo
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// use routes
app.use('/', api);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`SERVER STARTED ON PORT ${port}`));