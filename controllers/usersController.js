const db = require("../db/queries");

async function createUser(req, res) {
    const { username, password } = req.body;
    const user = await db.createUser(username, password);
    console.log(user)
    res.redirect("/")
}

module.exports = { createUser };
