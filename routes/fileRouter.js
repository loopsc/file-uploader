const { Router } = require("express");
const filesController = require("../controllers/filesController.js");
const fileRouter = Router();
const { isAuthenticated } = require("../middleware/auth.js");

fileRouter.get("/", isAuthenticated, async (req, res) => {
    const folders = await filesController.getAllFolders(req, res);
    res.render("view-folders", { folders });
});

fileRouter.get("/create-folder", async (req, res) => {
    res.render("create-folder");
});

fileRouter.post("/create-folder", async (req, res) => {
    await filesController.createFolder(req, res);
});

fileRouter.get("/:folderId", async (req, res) => {
    const files = await filesController.getFiles();
    const folder = await filesController.getFolder();
    res.render("view-files", { files, folder });
});

module.exports = fileRouter;
