const { uploadImage } = require('../../../utils/cloudinary');
// Módulo para eliminar las imágenes una veza se subieron a cloudinary
const fse = require('fs-extra')
const { createUser } = require('../../controllers/usersControllers')

const postUser = async (req, res) => {
    try {
        const { name, email, password, personalId, location, enable } = req.body;

        if (!name || !email || !password) throw new Error('Missing information to create new user')


        const data = { name, email, password, personalId, location, enable }

        // subir imagen a cloudinary
        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath);

            data.photo = {
                public_id: result.public_id,
                secure_url: result.secure_url
            };
            // Eliminar archivo
            await fse.unlink(req.files.image.tempFilePath);
        }

        const user = await createUser(data)
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
};

module.exports = postUser