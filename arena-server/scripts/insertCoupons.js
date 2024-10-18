// insertCoupons.js

const { sequelize, Coupon } = require('../models') // Adjust the path as necessary

async function insertCoupons() {
  try {
    await sequelize.sync() // Ensure the table exists

    const coupons = [
      {
        code: 'Arena30',
        duration: 30,
        expiration_date: new Date('2024-11-15'),
        is_active: true
      },
      {
        code: 'Arena365',
        duration: 365,
        expiration_date: new Date('2024-11-15'),
        is_active: true
      },
      {
        code: 'ArenaVIPs',
        duration: 36500, // Indefinite duration
        expiration_date: new Date('2024-11-15'),
        is_active: true
      },
      {
        code: 'ArenaBeta',
        duration: 30,
        expiration_date: new Date('2024-11-15'),
        is_active: true
      }
    ]

    for (const couponData of coupons) {
      await Coupon.create(couponData)
      console.log(`Coupon ${couponData.code} inserted successfully.`)
    }

    console.log('All coupons have been inserted.')
  } catch (error) {
    console.error('Error inserting coupons:', error)
  } finally {
    await sequelize.close()
  }
}

insertCoupons()
