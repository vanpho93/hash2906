const express = require('express');
const session = require('express-session');
const parser = require('body-parser').urlencoded({ extended: false });
const User = require('./User');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

app.get('/private', (req, res) => {
    // TODO HERE
    // Check log status
});

function redirectIfLoggedIn(req, res, next) {
    // TODO HERE
    // Check if loggedIn
}

app.get('/signin', redirectIfLoggedIn, (req, res) => res.render('signin'));
app.get('/signup', redirectIfLoggedIn, (req, res) => res.render('signup'));

app.post('/signin', redirectIfLoggedIn, parser, (req, res) => {
    const { email, password } = req.body;
    const user = new User(email, password);
    user.signIn()
    .then(user => {
        // TODO HERE
        // tao ra token, req.cookie
        // res.send() or res.redirect
    })
    .catch(() => res.send('Dang nhap that bai'));
});

app.post('/signup', redirectIfLoggedIn, parser, (req, res) => {
    const { email, password, name, phone } = req.body;
    const user = new User(email, password, name, phone);
    user.signUp()
    .then(() => res.send('Dang ky thanh cong'))
    .catch(() => res.send('Email da ton tai'));
});

app.listen(3000, () => console.log('Server started!'));
