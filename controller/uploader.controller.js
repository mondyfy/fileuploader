const fileUploadService =  require('../service/upload.service');

/**
 * upload file
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function uploadFiles(req, res, next) {
    try{
        if(req.files && req.files.media){
            const file= req.files.media;
            const uploadRes = await fileUploadService.uploadFile(file);
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

module.exports = { uploadFiles };