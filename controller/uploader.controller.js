const fileUploadService =  require('../service/upload.service');

/**
 * upload file to AWS S3
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function uploadFileToAws(req, res, next) {
    try{
        if(req.files && req.files.media){
            const file= req.files.media;
            const uploadRes = await fileUploadService.uploadFileToAws(file);
            return res.send(uploadRes);
        }
        const errMsg= {
            message: 'FILES_NOT_FOUND',
            messageCode: 'FILES_NOT_FOUND',
            statusCode: 404,
        }
        return res.status(404).send(errMsg);
    } catch(error){
        return next(error);
    }
}

/**
 * upload file to GCS
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function uploadFileToGcs(req, res, next) {
    try{
        if(req.files && req.files.media){
            const file= req.files.media;
            const uploadRes = await fileUploadService.uploadFileToGcs(file);
            return res.send(uploadRes);
        }
        const errMsg= {
            message: 'FILES_NOT_FOUND',
            messageCode: 'FILES_NOT_FOUND',
            statusCode: 404,
        }
        return res.status(404).send(errMsg);
    } catch(error){
        return next(error);
    }
}

module.exports = { uploadFileToAws, uploadFileToGcs };