const mongoose = require("mongoose");
require("dotenv").config();

const db = () => {
    try {
        mongoose.connect(process.env.MONGO);
        console.log("Base de datos conectada.");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { db }