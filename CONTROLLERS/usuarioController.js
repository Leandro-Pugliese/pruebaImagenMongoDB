const express = require("express");
const Usuarios = require("../MODELS/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sharp = require("sharp"); //Modulo para modificar formato y calidad de imagenes.

//Función para modificar/manejar imagenes.
const modificarImagen = async (buffer) => {
    try {
        let nuevoBuffer = sharp(buffer).webp({ quality: 50 });
        nuevoBuffer = await nuevoBuffer.toBuffer();
        return nuevoBuffer;
    } catch (error) {
        return console.log(error);
    }
}
// Función para firmar el token
const signToken = (_id, email) => jwt.sign({_id, email}, process.env.JWT_CODE, { expiresIn: '1d' });

const crearUsuario = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    const {nombre, email, celular, password } = req.body; //Nombre, email, imagen, celular, password
    try {
        console.log(nombre)
        const nombreEnMayusculas = nombre.toUpperCase();
        const usuarioNombre = await Usuarios.findOne({nombre: nombreEnMayusculas})
        if (usuarioNombre) {
            return res.status(403).send("El nombre de usuario ya esta en uso.");
        }
        const usuarioEmail = await Usuarios.findOne({email: email});
        if (usuarioEmail) {
            return res.status(403).send("El email ingresado pertenece a un usuario ya registrado.");
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        //Modificamos la imagen antes de usarla en la creación del usuario (podemos transformarla al formato que nos guste, todas iguales en la db para eviar problemas de renderizado luego en el front, esto es opcional).
        // let imagenModificada = await modificarImagen(req.file.buffer); //Modifico la calidad y formato de la imagen.
        // console.log(imagenModificada)
        const usuario = await Usuarios.create({
            nombre: nombreEnMayusculas,
            email: email,
            imagen: {
                data: req.file.buffer, //(para subir cualquier formato)  //imagenModificada (convierte a un buffer de webp la imagen y le baja la calidad al 50% para que pese menos).
                contentType: req.file.mimetype //(para subir cualquier formato)   //"image/webp" las convierto siempre a webp con sharp.
            },
            celular: celular,
            password: hashedPassword,
            salt
        });
        // No paso el token cuando creas el usuario, te hago iniciar sesión si o si.
        const msj = "Usuario creado exitosamente."
        return res.status(201).send({msj, usuario});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

const verUsuario = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nombreEnMayusculas = nombre.toUpperCase();
        const usuario = await Usuarios.findOne({nombre: nombreEnMayusculas});
        if (!usuario) {
            return res.status(403).send("Usuario no encontrado en la base de datos.");
        }
        return res.status(200).send(usuario);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

module.exports = { crearUsuario, verUsuario }