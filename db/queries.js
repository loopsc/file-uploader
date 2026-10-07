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
    const user = await prisma.user.findUnique({
        where: { username: username },
    });
    return user;
}

async function fetchUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id: id },
    });
    return user;
}

async function fetchFolder(folderId, userId) {
    const folder = await prisma.folder.findFirst({
        where: { id: folderId, userId },
    });

    return folder;
}

async function fetchFolderAndFiles(folderId, userId) {
    const folder = await prisma.folder.findFirst({
        where: { id: folderId, userId },
        include: { files: true },
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

async function createFile({ filename, url, size, folderId }) {
    await prisma.file.create({
        data: {
            name: filename,
            url: url,
            size: size,
            folderId: folderId,
        },
    });
}

async function fetchFile(fileId, userId) {
    const file = await prisma.file.findFirstOrThrow({
        where: {
            id: fileId,
            folder: { userId: userId },
        },
    });

    return file;
}

async function fetchAllFiles(folderId, userId) {
    const filesArr = await prisma.file.findMany({
        where: { folderId, folder: { userId } },
    });
    return filesArr;
}


async function deleteFile(fileId, userId) {
    const file = await prisma.file.delete({
        where: { id: fileId, folder: { userId } },
    });

    return file;
}

module.exports = {
    createUser,
    fetchUserByUsername,
    fetchUserById,
    createFolder,
    fetchFolder,
    fetchFolderAndFiles,
    fetchAllFolders,
    deleteFolder,
    createFile,
    fetchFile,
    fetchAllFiles,
    deleteFile,
};
