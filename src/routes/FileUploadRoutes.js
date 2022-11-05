const express = require('express');

const router = express.Router();

let fileUploadsController = require('../controllers/FileUploadController')

router.post('/', fileUploadsController.filesUpload);
router.get('/', fileUploadsController.getAllFiles);
router.get('/:email', fileUploadsController.viewFilesOfUser);

module.exports = router;