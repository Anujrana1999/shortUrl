const { nanoid } = require('nanoid')
const URL = require('../models/url')

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body
    if (!body.url) return res.status(400).json({ error: 'url is required' })
    const shortId = nanoid(8)
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    })
    const allUrls = await URL.find({})
    return res.render('home', {
        id: shortId,
        urls: allUrls
    })
}
async function handleGetShortUrl(req, res) {
    const shortId = req.params.shortId
    const redirect = await URL.findOneAndUpdate({
        shortId,
    },
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                }
            }
        }
    )
    res.redirect(redirect.redirectUrl)
}
async function handleGetAnalyticsShortUrl(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = { handleGenerateNewShortUrl, handleGetShortUrl, handleGetAnalyticsShortUrl }