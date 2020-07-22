const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=f164f4a600e231f187479dbd516dee3e&query=' + latitude + ',' + longitude 
    request({ url, json: true }, (error, {body}) => {
        if (error) {

            callback('unable to connect to weather service', undefined)
        }
        else if (body.error) {
            callback('unable to find location', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + ' .It is ' + body.current.temperature + 'degree Celsius and it feels like ' + body.current.feelslike + 'degree Celsius. The humidity is ' + body.current.humidity);

        }
        // console.log(body.current.weather_descriptions[0]+ 'It is' +body.current.temperature + 'and it feels like' +body.current.feelslike );

    });
}

module.exports= forecast

