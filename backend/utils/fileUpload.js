// backend/utils/fileUpload.js
const multer = require('multer')
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

// Multer Storage Configuration
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '') // Store files in memory
  }
})

// File Filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true) // Allow image files
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

// Create the Multer Upload Object
const upload = multer({ storage: storage, fileFilter: fileFilter })

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1' // Replace with your region if different
})

// Upload File to S3 Function
async function uploadFileToS3(file) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${uuidv4()}-${file.originalname}`, // Unique filename
    Body: file.buffer,
    ContentType: file.mimetype
  }

  try {
    const data = await s3.upload(params).promise()
    return data.Location // Return the S3 image URL
  } catch (error) {
    console.error('Error uploading to S3:', error)
    throw error // Re-throw the error to be handled in the controller
  }
}

// Delete File from S3 Function
async function deleteFileFromS3(filename) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename
  }

  try {
    await s3.deleteObject(params).promise()
    return true
  } catch (error) {
    console.error('Error deleting from S3:', error)
    throw new Error('Error deleting file')
  }
}

module.exports = { upload, uploadFileToS3, deleteFileFromS3 }
