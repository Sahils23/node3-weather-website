const express = require('express');
const path = require('path')
const hbs= require('hbs');
const { emitWarning } = require('process');
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')
const app= express();
//define paths for express connfig

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')


//setup handle bars and view directory
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index.hbs',{
        title : 'weather',
        name : 'sahil shinde'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'about us',
        name : 'aishu shinde'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        msg : 'What kind of help do u want ?',
        title :'help',
        name: 'sakshi pharande'
    })
})

app.get('/weather',(req,res)=>{
    const address=req.query.adress;
    if(!req.query.adress){
        return res.send({
            error : 'Please Provide adress',
        })
    }
    geocode(address,(error,{latitude , longitude , location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address :req.query.adress
            })
        })
    })
    // res.send({
    //     // location : 'Phaltan',
    //     // forecast : `It is partly cloudy in philadelphia`,
    //     // adress : req.query.adress
        
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({
            error : 'You must provide search term'
        })
    }
    console.log(req.query.search); 
   return res.send({
        products  : []
    })
})
app.get('/help/*',(req,res)=>{
  
   res.render('error',{
       title : '404',
       name : 'sahil shinde',
       errorMsg  : 'help article not found'
   })
 })

app.get('*',(req,res)=>{
   res.render('error', {
       title   :'404',
       name  :' sahil shinde',
       errorMsg : 'page not found'
   })
})

app.listen(3000,()=>{
    console.log('server is Listening on 3000...');
})