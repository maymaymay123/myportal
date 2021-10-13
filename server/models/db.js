const mongoose = require("mongoose");
require('dotenv').config()

const db = process.env.MONGODBURI
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });
        console.log("DB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1); // 1 with issue, 0 without
    }
};

module.exports = connectDB;