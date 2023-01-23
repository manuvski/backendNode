const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectToDb = async () => {
    await mongoose.connect('mongodb://localhost:27017/nasa_db', {});
    console.log('DB Connected')
}
module.exports = connectToDb

