const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const uploadCtrl = require('../controller/uploader.controller');

router.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}
));

router
    .route('/aws')
    /** POST http://localhost:3000/upload/aws - upload files to aws s3 bucket */
    .post(uploadCtrl.uploadFileToAws)

router
    .route('/gcs')
    /** POST http://localhost:3000/upload/gcs - upload files to gcs */
    .post(uploadCtrl.uploadFileToGcs)

module.exports = router;
