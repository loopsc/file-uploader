const db = require("../db/queries");
const bcrypt = require("bcryptjs")

async function createUser(req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await db.createUser(username, hashedPassword);
    console.log(user);
    res.redirect("/");
}

module.exports = { createUser };
