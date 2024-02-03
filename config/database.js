const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database: ', error);
        process.exit(1);
    }
}

module.exports = connectDatabase;