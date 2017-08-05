const express = require('express');
const cookieParser = require('cookie-parser');
const parser = require('body-parser').urlencoded({ extended: false });
const User = require('./User');
const { getObject, getToken } = require('./jwt');
const { redirectIfLoggedIn, checkToken } = require('./middleware');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(cookieParser());

// app.get('/', (req, res) => res.render('home'));

app.get('/private', checkToken, (req, res) => {
    res.send(req.user);
});

app.get('/signin', redirectIfLoggedIn, (req, res) => res.render('signin'));
app.get('/signup', redirectIfLoggedIn, (req, res) => res.render('signup'));

app.post('/signin', redirectIfLoggedIn, parser, async (req, res) => {
    const { email, password } = req.body;
    const signInUser = new User(email, password);
    try {
        const user = await signInUser.signIn();
        const token = await getToken({ email: user.email, name: user.name });
        res.cookie('token', token).send('Dang nhap thanh cong');
    } catch (err) {
        res.send('Dang nhap that bai');
    }
});

app.post('/signup', redirectIfLoggedIn, parser, (req, res) => {
    const { email, password, name, phone } = req.body;
    const user = new User(email, password, name, phone);
    user.signUp()
    .then(() => res.send('Dang ky thanh cong'))
    .catch(() => res.send('Email da ton tai'));
});

app.listen(3000, () => console.log('Server started!'));
