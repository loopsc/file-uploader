const { Router } = require("express");
const filesController = require("../controllers/filesController.js");
const fileRouter = Router();

fileRouter.get("/", async (req, res) => {
    const folders = await filesController.getAllFolders();
    res.render("view-folders", { folders });
});

fileRouter.get("/:folderId", async (req, res) => {
    const files = await filesController.getFiles();
    const folder = await filesController.getFolder();
    res.render("view-files", { files, folder });
});

module.exports = fileRouter;
