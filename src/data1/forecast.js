
const request = require ('request')
const forecast = (latitude , longitude , callback ) => {
const url = "https://api.weatherapi.com/v1/current.json?key=36911c73294b489db7911628233007&q=" + latitude + "," + longitude
    request ({url, json : true} , (error , response) => {
        if(error) {
             callback ("Unable to connect weather service" , undefined)
        } else if(response.body.error){
             callback (response.body.error.message , undefined)
        } else {
                callback (undefined , response.body.location.name + ' It is ' + response.body.current.condition.text
                + " and Temp is " + response.body.current.temp_c )
        }
    })
    }
 module.exports = forecast;