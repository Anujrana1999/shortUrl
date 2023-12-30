const express = require("express")
const path = require('path')
const { connectMongoDb } = require('./connectDb')
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')


const app = express()
const port = 8001

connectMongoDb('mongodb://localhost:27017/shortUrl')
    .then(() => console.log('MongoDb connected'))
    .catch(() => console.log('Connection failed'))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/urls', urlRoute)
app.use('/', staticRoute)


app.listen(port, () => console.log(`Server stared ${port}`))