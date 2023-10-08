
const { uploadDoctorImage } = require('../../../utils/cloudinary');

const fse = require('fs-extra')
const { createDoctor } = require("../../controllers/doctorsControllers");

const postDoctor = async (req, res) => {
    try {
        const { description, enable, name, price, specialty } = req.body;
        //TODO condicionales
        const data = {description, enable, name, price, specialty};

        if (req.files?.image) {

            const result = await uploadDoctorImage(req.files.image.tempFilePath);


            data.photo = {
                public_id: result.public_id,
                secure_url: result.secure_url
            };
            // Eliminar archivo
            await fse.unlink(req.files.image.tempFilePath);
        }

        const newDoctor = await createDoctor(data);
        res.status(201).json(newDoctor)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
};

module.exports = postDoctor;