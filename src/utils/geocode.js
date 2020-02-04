const request= require('request')
const geocode = (address, callback) =>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibmlqb25vYmxlMzQiLCJhIjoiY2s1aDZ3OGF3MDBvczNkb2M2Z2h6YW5tciJ9.u4mu39roPl0NXzvjYqpKLw&limit=1';
    request({url,json:true}, (error,{body}={}) =>{ //destructured the response object within the callback function itself and using just the body proprety now.
        
        if(error)
        {
            callback('Unable to connect to location services.',undefined)
          }
        else if(body.features.length===0)
          {
              callback('Unable to find the given address.',undefined)
          }
          else
          {
              callback(undefined,{
                  Latitude: body.features[0].center[1],
                  Longitude: body.features[0].center[0],
                  Location: body.features[0].place_name  

              })
          }

    })  
}
module.exports = geocode