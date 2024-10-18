// scripts/insertEventCode.js

const { sequelize, EventCode } = require('../models') // Adjust the path as necessary

async function insertEventCode() {
  try {
    await sequelize.sync() // Ensure the table exists

    const eventCodeData = {
      code: 'MSBC13',
      access_end_date: new Date('2024-11-30'), // November 30, 2024
      is_active: true,
      expiration_date: new Date('2023-10-26') // October 26, 2023
    }

    const newEventCode = await EventCode.create(eventCodeData)
    console.log(`Event code ${newEventCode.code} inserted successfully.`)

    console.log('Event code details:', newEventCode.toJSON())
  } catch (error) {
    console.error('Error inserting event code:', error)
  } finally {
    await sequelize.close()
  }
}

insertEventCode()
