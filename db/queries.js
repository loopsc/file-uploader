const { prisma } = require("../lib/prisma.js");

async function createUser(username, password) {
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
        },
    });
    return user;
}

async function fetchUserByUsername(username) {
    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        return user;
    } catch (error) {
        console.log("Received error: ", err);
    }
}

async function fetchUserById(id) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        return user;
    } catch (err) {
        console.log("Received error: ", err);
    }
}

module.exports = { createUser, fetchUserByUsername, fetchUserById };
