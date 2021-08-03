const path = require('path');
const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");

const app = new express();

const Post = require('./database/models/add_clip');

mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))

app.use(fileUpload());
app.use(express.static('public/admin/'));
app.use(express.static('public/logging/'));
app.use(express.static('public/main/'));


app.use(expressEdge.engine);
app.set('views', __dirname + '/views');
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));




// login user page
app.get('/login', (req, res) => {
    res.render('layouts/login');
});

// after login index page for user
app.get('/user', (req, res) => {
    res.render('layouts/index');
});

//mnaging the clips
app.get('/user/manage', (req, res) => {
    res.render('layouts/manage-cliping');
});

//register user page
app.get('/register', (req, res) => {
    res.render('layouts/register');
});

// add new clip page
app.get('/user/add-clip', (req, res) => {
    res.render('layouts/new-clipping');
});

// store newly added clip
app.post('/user/add-clip/store-clip', (req, res) => {
    const {
        image
    } = req.files
    console.log(req.body)
    image.mv(path.resolve(__dirname, 'public/clips', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/clips/${image.name}`
        }, (error, post) => {
            res.redirect('/user');
        });
    })
});

// remove the clip
app.get('/user/remove-clip', (req, res) => {
    res.render('layouts/remove-clipping');
});


// public home page
app.get('/home', (req, res) => {
    res.render('layouts/home');
});


app.listen(4000, () => {
    console.log('App listening on port 4000')
});