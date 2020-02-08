const path= require('path')
const express= require('express')
const hbs= require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app= express( )   //sets up a web server
const port=process.env.PORT ||3000

//Define paths for express config

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location->render templates
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//rendering views to the server
app.get('', (req,res)=>{
   res.render('index',{
       title:'Weather', 
       Name: 'Nijo Noble'
   })    
   
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        Name: 'Nijo Noble'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help:'Whatver help you need, please ask someone else because I do not have time.',
        title:'Help',
        Name:'Nijo Noble'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
        {
            return res.send({
                error:'Address needs to be provided.'
            })
        }

        //geocoding the address and finding the forecast for the geocoded coordinates
        geocode(req.query.address, (error,{Latitude,Longitude,Location}={}) =>{
            if(error)
            {
              return res.send({
                  error })
            }
        
            forecast(Latitude, Longitude, (error, forecastdata) => {
              if(error)
              {
                 return res.send({
                    error
                })
              }
        
            res.send({
                forecast:forecastdata,
                Location:Location,
                Address:req.query.address
            })
        }) 
        })
        
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
         return res.send({              // return added since a request can accomodate only one response.
            error:'Search term needs to be provided. '
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

  
app.get('/help/*',(req,res)=>{
    res.render('404',{
        Name:'Nijo Noble',
        errorMessage:'Help article not found.',
        message:'This is a partials file error'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        Name:'Nijo Noble',
        errorMessage:'Page not found.',
        message:'This is a partials file error'

    })
})


app.listen(port,()=>{
    console.log('Server all set on port' + port)
})