const request = require('request');

const forecast = (lat,long, callback) => {
    const url = 'https://api.darksky.net/forecast/b922ddf52ac6f3e0705fc67d50314eb1/'+lat+','+long

    request({url, json:true}, (error,{body}) =>{
       if(error){
          callback("Unable to connect darksky");
       }else if(body.error){
          callback("Unable to find Darksky URL");
       }else{
          callback(undefined,{
             temp: body.currently.temperature,
             posibility:body.currently.precipProbability
          })
       }
    })
}
module.exports = forecast;