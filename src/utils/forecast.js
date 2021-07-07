const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + encodeURIComponent (latitude)+ ',' + encodeURIComponent(longitude) + '?key=492UH8MCPZ5GWBELBVH7GN59H' ;
  
   

    request({ url, json: true }, (error, {body}) => {
        
        if (error) {
            
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.days[0].description + ' It is currently ' + ((body.days[0].temp - 32)*5/9).toFixed(2)+ ' degress out. There is a ' + body.days[0].precipprob + '% chance of rain.') 
        }
    })
}

module.exports = forecast