const { Router } = require('express');
const filesController = require('../controllers/filesController.js');
const fileRouter = Router();
const { isAuthenticated } = require('../middleware/auth.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs/promises');

fileRouter.get('/', isAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const folders = await filesController.getAllFolders(userId);
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

    // const files = await filesController.getFiles(folderId, userId);
    const folder = await filesController.getFolder(folderId, userId);
    const files = folder.files;

    res.render('view-files', { files, folder });
});

fileRouter.post('/:folderId/delete', async (req, res) => {
    const folderId = Number(req.params.folderId);
    const userId = req.user.id;

    await filesController.deleteFolder(folderId, userId);
    res.redirect('/folders');
});

fileRouter.post(
    '/:folderId/create',
    upload.single('file'),
    async (req, res) => {
        console.log(req.file);
        const { originalname: filename, path: url, size } = req.file;

        const folderId = Number(req.params.folderId);
        const userId = req.user.id;

        await filesController.createFile({
            filename,
            url,
            size,
            userId,
            folderId,
        });

        res.redirect(`/folders/${folderId}`);
    },
);

fileRouter.post('/:folderId/:fileId/delete', async (req, res) => {
    const fileId = Number(req.params.fileId);
    const userId = req.user.id;

    try {
        const deleted = await filesController.deleteFile(fileId, userId);

        await fs.unlink(deleted.url);
        res.redirect(`/folders/${deleted.folderId}`);
    } catch (err) {
        console.log(`Could not remove file from disk: ${err}`);
    }
});

module.exports = fileRouter;
