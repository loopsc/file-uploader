const { prisma } = require('../lib/prisma.js');
console.log(prisma);

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
        console.log('Received error: ', err);
    }
}

async function fetchUserById(id) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        return user;
    } catch (err) {
        console.log('Received error: ', err);
    }
}

async function fetchFolder(folderId, userId) {
    const folder = await prisma.folder.findFirst({
        where: { id: folderId, userId },
    });

    return folder;
}

async function fetchAllFolders(userId) {
    const folders = await prisma.folder.findMany({
        where: { userId: userId },
    });
    console.log(folders);
    // return [{ name: "test", size: 20, uploadedAt: "today" }];
    return folders;
}

async function createFolder(name, userId) {
    const folder = await prisma.folder.create({
        data: {
            name: name,
            userId: userId,
        },
    });

    return folder;
}

async function deleteFolder(folderId, userId) {
    await prisma.folder.delete({
        where: { id: folderId, userId },
    });
}

module.exports = {
    createUser,
    fetchUserByUsername,
    fetchUserById,
    createFolder,
    fetchFolder,
    fetchAllFolders,
    deleteFolder,
};
