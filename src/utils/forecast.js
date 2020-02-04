const request= require('request')



const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/48aed651906e4e92bbd135c0f9183195/'+ encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)+'?units=si'
    request({ url, json:  true }, (error , {body}) => {      //option 'json' sets body to JSON representation of value 
    //const data= JSON.parse(response.body);                    //and adds Content-type: application/json header.
    //console.log(data.currently)                               //Additionally, parses the response body as JSON.
                                                                //therefore, the body is no longer in string format, rather in json form,
                                                                //therefore, no need to parse it anymore.
    //console.log(response.body.currently)        
     
    if(error){
        callback('Issues with connectivity',undefined)
    }

    else if(body.error){
            console.log(body.error)
            callback('Invalid coordinates trying to be accesed',undefined)
    }

    else
    {
        callback(undefined, body.daily.data[0].summary+' It is currently '+ body.currently.temperature+' out there. There is a '+ body.currently.precipProbability+'% chance of rain'
        )
        
    }                                                    
}) 
    
}

module.exports = forecast
