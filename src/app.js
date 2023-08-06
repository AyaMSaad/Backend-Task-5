var hbs = require ('hbs')
const express = require('express')
const app = express()

const geocode = require('./data1/geocode')
const forecast = require('./data1/forecast')

const port = process.env.PORT || 3000

const path = require ("path")
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))

const viewsDirectory = path.join (__dirname , "../temp/views" )
app.set( "views" , viewsDirectory)

const partialsPath = path.join (__dirname , "../temp/partials")
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs');

app.get('/' , (req , res) => {
    res.render('index' , {
        title: " Weather Forecast",
        desc : "Welcome to my website to know today's weather ",
    })
})

app.get('/weather' , (req , res) => {
    res.render('weather' , {
        title : "Today's Weather",
        desc: "See the weather now and then"
    })
})

app.get('/aya',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:req.query.address,
                location:req.query.address,
                latitude:data.latitude,
                longitude:data.longitude
            })
        })
    })
})

app.get('*' , (req , res)=> {
    res.send('404 Page Not Founded')
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})