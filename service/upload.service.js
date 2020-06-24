const AWS = require('aws-sdk');
const { Storage } = require('@google-cloud/storage');
const dotenv = require("dotenv");
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

/**
 * upload file to aws s3
 * @param {*} file
 */
async function uploadFileToAws(file){
    const fileName = `${new Date().getTime()}_${file.name}`;
    const mimetype = file.mimetype;
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: file.data,
        ContentType: mimetype,
        ACL: 'public-read'
        };
        const res = await new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => err == null ? resolve(data) : reject(err));
          });
        return {fileUrl: res.Location };
}

/**
 * upload file to gcs
 * @param {*} file
 */
async function uploadFileToGcs(file) {
    const bucketName = process.env.GCS_BUCKET_NAME;
    const storage = new Storage({ keyFilename: process.env.GCS_KEYFILE_JSON });
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(`${Date.now()}_${file.name}`);
    const contentType = file.mimetype;

    const stream = blob.createWriteStream({
        resumable: true,
        contentType,
        predefinedAcl: 'publicRead',
    });

    stream.on('error', err => err);

    stream.on('finish', () => ({ fileUrl: `https://storage.googleapis.com/${bucket.name}/${blob.name}` }));

    stream.end(file.data);

    return { fileUrl: `https://storage.googleapis.com/${bucket.name}/${blob.name}` };
}

module.exports= {
    uploadFileToAws,
    uploadFileToGcs
};
