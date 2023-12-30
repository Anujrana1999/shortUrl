const express = require('express');
const router = express.Router();
const { handleGenerateNewShortUrl, handleGetShortUrl, handleGetAnalyticsShortUrl } = require('../controllers/url')

router.route('/')
    .post(handleGenerateNewShortUrl)
router.route('/:shortId')
    .get(handleGetShortUrl)
router.route('/analytics/:shortId')
    .get(handleGetAnalyticsShortUrl)

module.exports = router;