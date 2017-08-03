const queryDB = require('./db');
const { hash, compare } = require('bcrypt');

class User {
    constructor(email, password, name, phone) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
    } 

    async signUp() {
        const sql = 'INSERT INTO "User"(email, password, name, phone) VALUES ($1, $2, $3, $4)';
        const hashPassword = await hash(this.password, 8);
        return await queryDB(sql, [this.email, hashPassword, this.name, this.phone]);
    }

    async signIn() {
        // Neu ma nhap pass
        const sql = 'SELECT password FROM "User" WHERE email = $1';
        const result = await queryDB(sql, [this.email]);
        if (!result.rows[0]) throw new Error('Email khong ton tai');
        const hashPasswor = result.rows[0].password;
        const isValid = await compare(this.password, hashPasswor);
        if (!isValid) throw new Error('Sai password');
        return true;
    }
}

// const u = new User('pho1@gmail.com', '123');
// u.signIn()
// .then(() => console.log('Dang nhap thanh cong'))
// .catch(err => console.log(err.toString()));

module.exports = User;
