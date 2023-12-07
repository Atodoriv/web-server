import express from 'express'

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express() 
const publicDirectoryPath = path.join(__dirname, '../pubic')


console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath))



// app.get('', (req,res) => {
//     res.send('<h1>MAIN PAGE!</h1>')
// })

app.get('/help',(req,res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('<h1>About page!</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'forecast',
        location: 'location'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})



