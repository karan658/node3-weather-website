const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather ',
        name: 'Karan gupta'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Karan Gupta'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        email: 'karan@ejew.com',
        title: 'Help',
        name: 'Karan gupta'
    })
})
app.get('/weather', (req, res) => {

    let location = req.query.address

    if (!req.query.address) {

        return res.send({
            error: 'error'
        })

    }

    geocode(location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location

            })


        })
    })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        error: 'Help article not found',
        name: 'karan gupta'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Karan gupta'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
