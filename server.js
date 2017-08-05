const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('token', 'sdiqe9yr9e8w');
    res.send('home');
});

app.get('/check', (req, res) => {
    console.log(req.cookies);
    res.send('home');
});

app.listen(3000, () => console.log('Server started!'));
