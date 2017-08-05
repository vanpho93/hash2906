const jwt = require('jsonwebtoken');
const SECRET_KEY = 'dah239efj2hda89e';

function getToken(obj) {
    return new Promise((resolve, reject) => {
        jwt.sign(obj, SECRET_KEY, { expiresIn: 5 }, (err, token) => {
            if (err) return reject(err);
            resolve(token);
        });
    });
}

function getObject(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, obj) => {
            if (err) return reject(err);
            resolve(obj);
        });
    });
}

// getToken({ name: 'Pho' })
// .then(token => console.log(token));

// getObject('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGhvIiwiaWF0IjoxNTAxNzcwMzU3LCJleHAiOjE1MDE3NzAzNzd9.QF38vWkKCTO8VkgGpikN3c-s58ss3LzKI0EAXpomH-E')
// .then(obj => console.log(obj));

module.exports = { getObject, getToken };
