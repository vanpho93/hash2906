const { getObject, getToken } = require('./jwt');

function redirectIfLoggedIn(req, res, next) {
    const { token } = req.cookies;
    if(!token) return next();
    getObject(token)
    .then(user => res.redirect('/private'))
    .catch(err => {
        res.clearCookie('token');
        next();
    });
}

const checkToken = async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) return res.redirect('/signin');
    try {
        const user = await getObject(token);
        req.user = user;
        const newToken = await getToken({ name: user.name, email: user.email });
        res.cookie('token', newToken);
        next();
    } catch(err) {
        res.redirect('/signin');
    } 
}

module.exports = { redirectIfLoggedIn, checkToken };
