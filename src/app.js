/* nodemon src/app.js -e js,hbs */
const path = require('path')
const request = require('postman-request')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

/* Initialize the Express framework */
const app = express()

/* Set up the handlebars template engine for html files */
app.set('view engine', 'hbs')

/* Dfine the HBS paths for the views and the partials */
const viewspath = path.join(__dirname, '../templates/views')
app.set('views', viewspath)
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

/* Set up the public folder path */
const publicDirPath = path.join(__dirname, '../public')

/* Specify the root path for static elements */
app.use(express.static(publicDirPath))

/* Render the HBS Views */
/* The options we provide to the object in the render function get injected to the .hbs file */
/* The .hbs file later gets converted to .html */
/* Homepage */
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        namex: 'Loizos Aristeidis'
    })
})

/* About Page */
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        namex: 'Loizos Aristeidis'
    })
})

/* Help Page */
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the Help Page', 
        title: 'Help',
        namex: 'Loizos Aristeidis'
    })
})

/* Return JSON */
app.get('/weather', (req, res) => {   
    // If no address is provided in the query (localhost:3000/weather?address=something)
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    // Call the geocode function from geocode.js, using the query address
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ 
                error 
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

/* req contains all the query string information (e.g. example.com/products?search=something) */
app.get('/products', (req, res) => {   
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

/* Specific 404 Page for subdomains under /help */
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help404',
        namex: 'Loizos Aristeidis',
        pnfmessage: 'No Help Articles Found.'
    })
})

/* General 404 Page - Has to be last because otherwise, the "*" will override the above pages as well */
app.get('*', (req, res) => {   
    res.render('404', {
        title: '404',
        namex: 'Loizos Aristeidis',
        pnfmessage: 'Page Not Found.'
    })
})

/* Starts up the Server on the given port */
/* Access the server locally using localhost:3000 as the URL */
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})