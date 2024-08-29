const express = require("express");
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadArrayImagenes = multer().array('imagen', 20) //Para pasar más de una imamgen con hasta un maximo de 20 (podes limitar a la cantidad que quieras).
const uploadImagen = upload.single('imagen') //Para pasar solo una imagen

module.exports = {uploadArrayImagenes, uploadImagen}