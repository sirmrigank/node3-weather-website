const request = require("request");

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYmFiaXRhOTQxNiIsImEiOiJjanlvMmJjZTgxMDNmM2dybzcyeDl6MjNtIn0.EYcE1hqKnNBftC2f0kWmEg&limit=1'
    request({url, json:true},(error, {body}) =>{
        if(error){
            callback("Unable to connect network");
        }else if(body.features.length ===0){
            callback("Unable to find url address")
        }else{
            callback(undefined,{
                lat :body.features[0].center[1],
                long :body.features[0].center[0],
                location :body.features[0].place_name
            })
        }
    })
}

module.exports = geocode