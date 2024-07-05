// backend/utils/fileUpload.js
const multer = require('multer')
const AWS = require('aws-sdk')

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '')
  }
})

const upload = multer({ storage }).single('image') // Assuming 'image' is the field name in your form

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

async function uploadToS3(file) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype
  }

  try {
    const data = await s3.upload(params).promise()
    return data.Location // The URL of the uploaded image
  } catch (error) {
    console.log(error)
    throw new Error('Error uploading to S3')
  }
}

module.exports = { upload, uploadToS3 }
