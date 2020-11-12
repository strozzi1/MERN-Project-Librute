const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
//const rateLimit = require('express-rate-limit');
const axios = require('axios');

const { json } = require('express');
const { GOOGLE_API_KEY } = require('../../config/keys');

const app = express();


//app.use(limiter)

router.get('/', (req,res) => res.send("hello world!"));



// @route   GET api/gooble-books
// @desc    Google book search proxy
// @access  Public
router.get('/:query', async (req, res) =>{
    try{
        //const query = `https://www.googleapis.com/books/v1/volumes?q=${req.params.query}&key=${process.env.REACT_APP_GOOGLE_API_KEY || GOOGLE_API_KEY}`
        const search = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.query}&key=${process.env.REACT_APP_GOOGLE_API_KEY || GOOGLE_API_KEY}`);
        if(!search) throw Error('Google Book Search Failed')
        return res.status(200).send(search.data);
    } catch (err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


module.exports = router;