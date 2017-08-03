const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const User = require('./User');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

app.get('/signin', (req, res) => res.render('signin'));
app.get('/signup', (req, res) => res.render('signup'));

app.post('/signin', parser, (req, res) => {
    const { email, password } = req.body;
    const user = new User(email, password);
    user.signIn()
    .then(() => res.send('Dang nhap thanh cong'))
    .catch(() => res.send('Dang nhap that bai'));
});

app.post('/signup', parser, (req, res) => {
    const { email, password, name, phone } = req.body;
    const user = new User(email, password, name, phone);
    user.signUp()
    .then(() => res.send('Dang ky thanh cong'))
    .catch(() => res.send('Email da ton tai'));
});

app.listen(3000, () => console.log('Server started!'));
