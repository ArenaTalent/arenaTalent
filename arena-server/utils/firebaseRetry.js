// utils/firebaseRetry.js

const admin = require('firebase-admin')
const { User } = require('../models')

async function retryFirebaseUserCreation() {
  try {
    // Find all users without a firebase_uid
    const usersWithoutFirebaseUid = await User.findAll({
      where: {
        firebase_uid: null
      }
    })

    console.log(
      `Found ${usersWithoutFirebaseUid.length} users without Firebase UID`
    )

    for (const user of usersWithoutFirebaseUid) {
      try {
        // Create Firebase user
        const firebaseUser = await admin.auth().createUser({
          email: user.email,
          password: 'tempPassword123!', // You might want to generate a random password here
          displayName: `${user.first_name} ${user.last_name}`
        })

        // Update user with Firebase UID
        await user.update({ firebase_uid: firebaseUser.uid })

        // Send password reset email
        await admin.auth().generatePasswordResetLink(user.email)

        console.log(`Successfully created Firebase user for ${user.email}`)
      } catch (error) {
        console.error(`Error creating Firebase user for ${user.email}:`, error)
      }
    }

    console.log('Finished retrying Firebase user creation')
  } catch (error) {
    console.error('Error in retryFirebaseUserCreation:', error)
  }
}

module.exports = { retryFirebaseUserCreation }
