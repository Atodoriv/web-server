import request from 'postman-request'

export const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXRvZG9yaXYiLCJhIjoiY2xwczhtaGV2MDFkcjJzbzk1a2hjaDJieCJ9.5i-Is1x5Jb3lPvpDEiSs2A&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
                callback('Unable to connect to mapbox.com', undefined)
        } else if (body.features.length === 0) {
                callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}