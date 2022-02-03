const request = require('postman-request')

/* Forecast function */
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cd0abe379a6d89fca4d817e2540cef1d&query=' + long + ',' + lat + ''
    request({url, json: true}, (error, {body}) => {   // 5-es6-objects.js
        if (error) {
            callback('Unable to connect to location services!', undefined)  // Use undefined because the callback accepts (error, data), and we don't have any data
        } else if (body.error) {
            callback('Unable to find location. Try using another set of coordinates.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast