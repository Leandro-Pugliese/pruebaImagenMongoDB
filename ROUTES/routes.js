const express = require("express");
const router = express.Router();
const { crearUsuario, verUsuario } = require("../CONTROLLERS/usuarioController");
const { uploadArrayImagenes, uploadImagen } = require("../ASSETS/multer");
// const multer = require('multer')
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// const upload = multer().array('imagen', 20)

// Rutas
router.post("/crear-usuario", uploadImagen,  crearUsuario);
router.post("/usuario",  verUsuario);

module.exports = router