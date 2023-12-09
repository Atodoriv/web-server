import request from 'postman-request'

export const forecast = ((latitude, longitude,  callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b0c5370d7d6118a973adb6ea4ceeeaa2&query=' + latitude + ',' + longitude
    request({url, json: true },  (error, {body}) => {
            if (error) {
                callback('Unable to connect to weather service', undefined)
            } else if (body.error){
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out')
            }
        })  

})

