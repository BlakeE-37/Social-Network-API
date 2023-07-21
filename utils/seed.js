const connection = require('../config/connection')
const { User, Thought } = require('../models')

connection.once('open', async () => {
    console.log('Connected - Starting Seed')





    console.info('Seeding complete! 🌱');
    process.exit(0);
});