const db = require('../db/queries');

async function getFiles() {
    return [{ name: 'Homework', size: '10TB', uploadedAt: 'today' }];
}

async function getFolder(folderId, userId) {
    const folder = await db.fetchFolder(folderId, userId);
    return folder;
}

async function getAllFolders(req, res) {
    const folders = await db.fetchAllFolders(req.user.id);
    return folders;
}

async function createFolder(folderName, userId) {
    await db.createFolder(folderName, userId);
}

async function deleteFolder(folderId, userId) {
    await db.deleteFolder(folderId, userId);
    console.log('Folder deleted');
}

module.exports = {
    getFiles,
    getFolder,
    getAllFolders,
    createFolder,
    deleteFolder,
};
