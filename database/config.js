const mongoose = require('mongoose')

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CONN);
        console.log('DB Online')
    } catch (error) {
        throw new Error('Error When Initializy the DataBase', error.mesagge);        
    }
}

module.exports = {
    dbConnection
}