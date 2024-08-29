const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: {},
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    imagen: {
        data: Buffer,
        contentType: String
    },
    celular: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
}, {versionKey: false})

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario