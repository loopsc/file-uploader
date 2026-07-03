const db = require("../db/queries");

async function getFiles() {
    return [{ name: "Homework", size: "10TB", uploadedAt: "today" }];
}

async function getFolder() {
    return { name: "This is My Folder Name" };
}

async function getAllFolders() {
    return [
        { name: "Folder1", size: "10TB", uploadedAt: "today" },
        { name: "Folder2", size: "100TB", uploadedAt: "tomorrow" },
    ];
}

module.exports = { getFiles, getFolder, getAllFolders };
