const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const path = require('path')

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})
console.log('S3 client initialized')

const fileTypes = {
  jobSeekerProfilePic: {
    folder: 'job-seekers/profile-pictures',
    contentType: 'image',
    maxSize: 5 * 1024 * 1024 // 5MB
  },
  resume: {
    folder: 'job-seekers/resumes',
    contentType: 'application/pdf',
    maxSize: 10 * 1024 * 1024 // 10MB
  },
  jobSeekerCoverPhoto: {
    folder: 'job-seekers/cover-photos',
    contentType: 'image',
    maxSize: 5 * 1024 * 1024 // 5MB
  },
  jobSeekerVideo: {
    folder: 'job-seekers/videos',
    contentType: 'video',
    maxSize: 100 * 1024 * 1024 // 100MB (assuming 1 minute at high quality)
  },
  companyLogo: {
    folder: 'companies/logos',
    contentType: 'image',
    maxSize: 5 * 1024 * 1024 // 5MB
  },
  companyPhoto: {
    folder: 'companies/photos',
    contentType: 'image',
    maxSize: 10 * 1024 * 1024 // 10MB
  },
  companyVideo: {
    folder: 'companies/videos',
    contentType: 'video',
    maxSize: 300 * 1024 * 1024 // 300MB (assuming 3 minutes at high quality)
  }
}

async function uploadFile(fileBuffer, fileName, id, fileType) {
  console.log(
    `Attempting to upload file: ${fileName}, Type: ${fileType}, ID: ${id}`
  )

  if (!fileTypes[fileType]) {
    console.error(`Invalid file type: ${fileType}`)
    throw new Error('Invalid file type')
  }

  const { folder, contentType, maxSize } = fileTypes[fileType]

  if (fileBuffer.length > maxSize) {
    console.error(
      `File size (${fileBuffer.length}) exceeds the maximum limit of ${maxSize}`
    )
    throw new Error(
      `File size exceeds the maximum limit of ${maxSize / (1024 * 1024)}MB`
    )
  }

  const fileExtension = path.extname(fileName)
  const newFileName = `${fileType}-${id}-${Date.now()}${fileExtension}`
  const key = `${folder}/${newFileName}`

  let mimeType
  if (contentType === 'image') {
    mimeType = `image/${fileExtension.slice(1)}`
  } else if (contentType === 'video') {
    mimeType = `video/${fileExtension.slice(1)}`
  } else {
    mimeType = contentType
  }

  console.log(`Uploading file to S3: ${key}, MimeType: ${mimeType}`)

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType
  })

  try {
    console.log('Sending PutObject command to S3...')
    await s3Client.send(command)
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`
    console.log(`File uploaded successfully. URL: ${fileUrl}`)
    return fileUrl
  } catch (err) {
    console.error('Error uploading file to S3:', err)
    console.error('Error stack:', err.stack)
    throw new Error('Failed to upload file to S3: ' + err.message)
  }
}

module.exports = { uploadFile }
