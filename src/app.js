import express from 'express'
import hbs from 'hbs'
import path from 'path';
import { fileURLToPath } from 'url';
import {geocode} from "./utils/geocode.js"
import {forecast} from "./utils/forecast.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express() 

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath);
app.set('view engine', hbs)
hbs.registerPartials(partialsPath)

// Creating the root path, works even for .hbs files
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather',
        name: 'Andriy Todoriv'

    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About',
        name: 'Andriy Todoriv'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        helpMessage: 'Help page',
        title: 'Help',
        name: 'Andriy Todoriv'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        } else {
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            } else {
                res.send({
                    address: req.query.address,
                    location,
                    forecast: forecastData
                    
                })
            }
        })
        }
    })
    
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
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
    res.render('404.hbs', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Andriy Todoriv'
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title:'404',
        errorMessage: 'Page not found',
        name: 'Andriy Todoriv'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})



