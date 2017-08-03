const express = require('express');
const session = require('express-session');
const parser = require('body-parser').urlencoded({ extended: false });
const User = require('./User');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(session({
    secret: 'ge2cqnfjgd7234y',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 30000 }
}));

app.get('/', (req, res) => res.render('home'));

app.get('/private', (req, res) => {
    if(!req.session.daDangNhap) return res.redirect('/signin');
    req.session.count = req.session.count ? req.session.count + 1 : 1;
    res.send(req.session.user);
});

function redirectIfLoggedIn(req, res, next) {
    if(req.session.daDangNhap) return res.redirect('/private');
    next();
}

app.get('/signin', redirectIfLoggedIn, (req, res) => res.render('signin'));
app.get('/signup', redirectIfLoggedIn, (req, res) => res.render('signup'));

app.post('/signin', redirectIfLoggedIn, parser, (req, res) => {
    const { email, password } = req.body;
    const user = new User(email, password);
    user.signIn()
    .then(user => {
        req.session.daDangNhap = true;
        req.session.user = user;
        res.send('Dang nhap thanh cong');
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
