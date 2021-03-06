const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const api = require('./routes/api/')

const app = express();

//  Bodyparser Middleware (DEPRECATED, replaced with express.json())
app.use(express.json());

// DB Config
const db = process.env.DB_URI || require('./config/keys').mongoURI;
console.log(process.env.DB_URI);
// connect to Mongo
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// use routes
app.use('/', api);

// Serve static assets if in production
if(process.env.NODE_ENV == 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`SERVER STARTED ON PORT ${port}`));