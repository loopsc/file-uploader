const db = require('../db/queries');

async function getFiles(folderId, userId) {
    // return [{ name: 'Homework', size: '10TB', uploadedAt: 'today' }];

    const files = await db.fetchAllFiles(folderId, userId);
    return files;
}

async function getFolder(folderId, userId) {
    const folder = await db.fetchFolder(folderId, userId);
    return folder;
}

async function getAllFolders(userId) {
    const folders = await db.fetchAllFolders(userId);
    return folders;
}

async function createFolder(folderName, userId) {
    await db.createFolder(folderName, userId);
}

async function deleteFolder(folderId, userId) {
    await db.deleteFolder(folderId, userId);
    console.log('Folder deleted');
}

async function createFile({ filename, url, size, userId, folderId }) {
    const folder = await db.fetchFolder(folderId, userId);
    // We check if the current user has access to this folder then we can add
    if (folder) {
        await db.createFile({ filename, url, size, folderId });
        console.log('File added successfully');
    } else {
        console.log('The current user has no access to this folder');
    }
}

async function deleteFile(fileId, userId) {
    const file = await db.deleteFile(fileId, userId);
    return file;
}

module.exports = {
    getFiles,
    getFolder,
    getAllFolders,
    createFolder,
    deleteFolder,
    createFile,
    deleteFile,
};
