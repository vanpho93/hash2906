const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'ge2cqnfjgd7234y',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 10000 }
}));

// app.get('/', (req, res) => res.render('home'));

app.get('/muave', (req, res) => {
    req.session.daMuaVe = true; 
    res.send('Ban da mua ve');
});

app.get('/vaorap', (req, res) => {
    req.session.count = req.session.count ? req.session.count + 1 : 1;
    if (req.session.daMuaVe) return res.send('Welcome');
    res.send('Ban phai mua ve');
});

app.listen(3000, () => console.log('Server started!'));
