const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const port = 80;

mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser : true});
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactSchema);



app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

//Endpoints
app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
})
app.get('/contact',(req,res)=>{
    const params ={}
    res.status(200).render('contact.pug',params);
});
app.get('/about',(req,res)=>{
    res.status(200).render('about.pug');
});
app.get('/services',(req,res)=>{
    res.status(200).render('services.pug');
});

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This data is stored in the Database")
    }).catch(()=>{
        res.status(400).send("The item was not saved into the database")
    });
})

//Start The Server
app.listen(port,()=>{
    console.log(`The application successfully started on ${port}`);
});