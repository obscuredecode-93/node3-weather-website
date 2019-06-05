const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast'); 

console.log(__dirname);
console.log();

const app = express();
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
app.set('views', viewsPath)

app.set('view engine','hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'obscuredecode'
    }) 
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'obscuredecode'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'obscuredecode'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error:'Address not found'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} ={}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                location,
                forecast: forecastData.forecast,
                address:req.query.address
            });
          })
    });
})

app.get('/products',(req,res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        text_404: "help article not found",
        name:'Andrew Mead'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        text_404: 'page not found',
        name:'Andrew Mead'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});