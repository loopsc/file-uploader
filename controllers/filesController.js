const db = require("../db/queries");

async function getFiles() {
    return [{ name: "Homework", size: "10TB", uploadedAt: "today" }];
}

async function getFolder() {
    return { name: "This is My Folder Name" };
}

async function getAllFolders(req, res) {
    const folders = await db.fetchAllFolders(req.user.id);
    return folders;
}

async function createFolder(req, res) {
    const name = req.body["folder-name"];
    const folder = await db.createFolder(name, req.user.id);
    res.redirect("/folders");
}

module.exports = { getFiles, getFolder, getAllFolders, createFolder };
