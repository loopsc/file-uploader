const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function createUser(req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.createUser(username, hashedPassword);
    console.log(user);
    res.redirect("/");
}

async function signout(req, res) {
    req.logout((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect("/");
    });
}
module.exports = { createUser, signout };
