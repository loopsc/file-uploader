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

async function fetchUser(usernameOrId) {
    try {
        // Find via username
        if (typeof usernameOrId === "string") {
            const user = await prisma.user.findUnique({
                where: { username: usernameOrId },
            });
            return user;
            // Find via id
        } else {
            const user = await prisma.user.findUnique({
                where: { id: usernameOrId },
            });
            return user;
        }
    } catch (error) {
        console.log("Issue with type of identifier");
        console.log(error);
    }
}

module.exports = { createUser, fetchUser };
