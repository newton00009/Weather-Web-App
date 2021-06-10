const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//using path default node module to set path variables
const publicdirectorypath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../public/templates/views')
const partialpath = path.join(__dirname,'../public/templates/partials')


//set handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)



//set static directory to serve
app.use(express.static(publicdirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        msg:"Use this site to get to know about weather ",
        name:'Nilesh Verma'
        
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        msg:"This page is there to help u",
        name:'Nilesh Verma'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Nilesh Verma'
    })
})


app.get('/weather',(req,res)=>{
    
    if(!req.query.address)
    {
       return res.send({
            msg:"plzz provide an address"
        })
    }

        geocode(req.query.address,(error,{longitude,latitude,location}={})=>{

            if(error)
            return res.send({error})

            forecast(longitude,latitude,(error,forecastdata)=>{

                if(error)
                 return  res.send({error})
                 
        

            res.send({
                location:location,
                forecastdata
            })
        
            })

        
        })
        
    
})


app.get('/product',(req,res)=>{

     if(!req.query.search)
     {
        return res.send({msg:'Plz provide a search term'})
     }
    
    res.send({
       product:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"404",
        errmsg:"Help article not found",
        name:'Nilesh Verma'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:"404",
        errmsg:'Page not found',
        name:'Nilesh Verma'

    })
})


app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})