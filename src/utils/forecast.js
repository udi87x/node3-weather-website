const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1395d0a675142f3abb26b2199a91ef70/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const forecastString = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. This high today is a ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + parseInt(body.currently.precipProbability*100,10) + '% chance of rain'
            callback(undefined, forecastString)
        }

    })
}

module.exports = forecast