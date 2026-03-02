const { prisma } = require("../lib/prisma.js");

async function createUser(username, password) {
    console.log("username", username)
    console.log("password", password)

    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
        },
    });
    return user;
}

function test() {
    console.log(prisma);
}

module.exports = { createUser, test };
