const request = require('request');
const forecast = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/8633f1600e167c2a41e7913aba003640/'+ lat + ',' + long + '';
    //console.log(url);
    request({url, json: true},(error,{ body }) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined);
        }
        else{
            callback(undefined,{
                temperature : body.currently.temperature,
                summary: body.daily.data[0].summary,
                chanceofRain: body.currently.precipProbability
            })
        }

    })
}

module.exports = forecast;