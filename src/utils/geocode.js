const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicG9jb3Vkb24iLCJhIjoiY2s5Z3p5OHFlMHRlbjNpbGx4c3U0a2hxeCJ9.KMBh4lqFFVGy8g9TVxEWRA&limit=1'
    
    // request makes the API call and its callback function handle the result returned 
    // among other things, request's callback function call the callback function passed to geocode
    // inline destructuring of the response object, only need response.body
    request({url:url, json:true}, (error, {body} = {}) =>{
        if(error){
            callback('Unable to connect to the API server.', undefined)
        } else if(body.features.length === 0){
            callback('Unknown location.', undefined)
        } else{
            const data = {
                longitude: body.features[0].center[0],
                latitute:body.features[0].center[1],
                location: body.features[0].place_name
            }

            callback(undefined, data)
        }
    })
}

module.exports = geocode