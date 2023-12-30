const express = require('express')
const URL = require('../models/url')

const router = express.Router()

router.get('/', async (req, res) => {
    const allUrls = await URL.find({})
    return res.render('home', {
        id: 0,
        urls: allUrls
    })
})

module.exports = router;