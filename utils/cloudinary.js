// Importar el módulo de cloudinary
const { v2 } = require('cloudinary');
require('dotenv').config();

const {
    CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY
} = process.env;

// Configuración
v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY,
    secure: true
})

// Función que sube archivos a cloudinary (usuarios)
const uploadUserImage = async (filePath) => {
    return await v2.uploader.upload(filePath, {
        folder: 'userImages'
    })
};
// Función que sube archivos a cloudinary (doctores)
const uploadDoctorImage = async (filePath) => {
    return await v2.uploader.upload(filePath, {
        folder: 'doctorImages'
    })
};

// Función que elimina archivos de cloudinary
const deleteImage = async (publicId) => {
    return await v2.uploader.destroy(publicId)
};

module.exports = { uploadUserImage, deleteImage, uploadDoctorImage};