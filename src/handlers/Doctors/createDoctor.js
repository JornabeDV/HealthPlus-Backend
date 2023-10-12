const { uploadDoctorImage } = require('../../../utils/cloudinary');
const fse = require('fs-extra')
const { createDoctor } = require("../../controllers/doctorsControllers");

const postDoctor = async (req, res) => {

    try {
        const { description, name, specialty } = req.body;
        if(!description || !name ||!specialty) throw new Error('Missing information to create the doctor')
        const data = {description, name, specialty};

        if (req.files?.image) {

            const result = await uploadDoctorImage(req.files.image.tempFilePath);

            data.photo = {
                public_id: result.public_id,
                secure_url: result.secure_url
            };
            // Eliminar archivo
            await fse.unlink(req.files.image.tempFilePath);
        } else data.photo = {
            public_id: '',
            secure_url: 'https://res.cloudinary.com/drpge2a0c/image/upload/v1697046001/doctorImages/blank-profile-picture-973460_960_720_wjvnik.webp'
        }

        const newDoctor = await createDoctor(data);
        res.status(201).json({
            status: 'created',
            newDoctor
        })
    } catch (error) {
        res.status(400).json(error.message)
    }

};

module.exports = postDoctor;