const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const uploadCtrl = require('../controller/uploader.controller');

router.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}
));

router
    .route('/')
    /** POST http://localhost:3000/upload - upload files to aws s3 bucket */
    .post(uploadCtrl.uploadFiles)

module.exports = router;
