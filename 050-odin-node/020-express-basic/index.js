'use strict'

import Express from "express";

const hostname = '127.0.0.1';
const port = 8000;
const app = Express();

app.set('view engine', 'ejs');

app.listen(port, hostname, () => {
    console.log(`Server listening on ${hostname}:${port}.`);
});

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact-me')
})

app.get('*', (req, res) => {
    res.render('404')
})