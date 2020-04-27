const request = require('request')

const forcast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=640d74294b0c60c112546c28f1a19bdc&query=' + lat + ',' + long + '&units=f'
    
    // inline destructuring of the response object, only need response.body
    request({ url: url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to the API server.', undefined)
        } else if (body.error) {
            callback('Unknown location.', undefined)
        } else {
            const data = body.current.weather_descriptions[0] + ". It's currently " + body.current.temperature + " degress. It feels like " + body.current.feelslike + " degress."
            callback(undefined, data)
        }
    })
}

module.exports = forcast