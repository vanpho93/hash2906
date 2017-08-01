const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

app.get('/signin', parser, (req, res) => res.render('signin'));
app.get('/signup', parser, (req, res) => res.render('signup'));

app.listen(3000, () => console.log('Server started!'));
