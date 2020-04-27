const path = require('path') // a core node mudule
const express = require('express')
const hbs = require('hbs')
const geocode  = require('./utils/geocode')
const forcast  = require('./utils/forcast')

// create the express app
const app = express()
// use heroku port or the 3000 for local dev
const port = process.env.PORT || 3000

// define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup views engine and views and partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) // reusable html components

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.com (the root)
app.get('', (req, res) => {
    // the rendered html will be in public dir at request
    res.render('index', {
        title: 'Weather',
        name: 'Andy Smith'
    })
})

// app.com/about
app.get('/about', (req, res) => {
    // the rendered html will be in public dir at request
    res.render('about', {
        title: 'About',
        name: 'Andy Smith'
    })
})

// app.com/help
app.get('/help', (req, res) => {
    // the rendered html will be in public dir at request
    res.render('help', {
        title: 'Help',
        name: 'Andy Smith',
        helpText: 'Some help text'
    })
})

// app.com/weather
app.get('/weather', (req, res) => {

    // URL checker
    if(!req.query.address){
        return res.send({
            error:'You must provide an address.'
        })
    }

    // run geocode
    geocode(req.query.address, (error, {latitute, longitude, location} = {}) =>{

        // if geocode returns an error
        if(error){
            return res.send({error: error})
        }

        // else, run forcast
        forcast(latitute, longitude, (error, forcastData) => {

            // if forcast returns an error
            if(error){
                return res.send({error: error})
            }
            
            // else
            res.send({
                forcast: forcastData,
                location: location,
                address:req.query.address
            })
        })

    })
})

app.get('/product', (req, res) =>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        })
    }

    console.log(req.query)
    res.send({
        product: []
    })
})

// app.com/help/{any_text}
app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Andy Smith',
        errorMessage: 'Help article not found.'

    })
})

// MUST PUT AFTER OTHER ROUTES
// '*' -> match any routes
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andy Smith',
        errorMessage: 'Page not found.'

    })
})

// start running the server
app.listen(port, () => {
    console.log('Server is up on port 3000.')
})