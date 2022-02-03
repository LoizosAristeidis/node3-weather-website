const request = require('postman-request')

/* Geocode function */
const geocode = (address, callback) => {   // 5-es6-objects.js
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibG9pem9zYXJpc3RpZGVzIiwiYSI6ImNreXg0MXdjNDBleG4ycXMzM2ExNGFlM20ifQ.gC3YjWViAsmculZ7tFydvw&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)  // Use undefined because the callback accepts (error, data), and we don't have any data
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode