const { Router } = require('express');
const filesController = require('../controllers/filesController.js');
const fileRouter = Router();
const { isAuthenticated } = require('../middleware/auth.js');

fileRouter.get('/', isAuthenticated, async (req, res) => {
    const folders = await filesController.getAllFolders(req, res);
    res.render('view-folders', { folders });
});

fileRouter.get('/create-folder', async (req, res) => {
    res.render('create-folder');
});

fileRouter.post('/create-folder', async (req, res) => {
    const folderName = req.body['folder-name'];
    const userId = req.user.id;

    await filesController.createFolder(folderName, userId);
    res.redirect('/folders');
}); 

fileRouter.get('/:folderId', async (req, res) => {
    const folderId = Number(req.params.folderId);
    const userId = req.user.id;

    const files = await filesController.getFiles();
    const folder = await filesController.getFolder(folderId, userId);

    res.render('view-files', { files, folder });
});

fileRouter.post('/:folderId/delete', async (req, res) => {
    const folderId = Number(req.params.folderId);
    const userId = req.user.id;

    await filesController.deleteFolder(folderId, userId);
    res.redirect('/folders');
});

module.exports = fileRouter;
