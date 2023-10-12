const { uploadDoctorImage, deleteImage } = require("../../../utils/cloudinary");
const fse = require('fs-extra');
const { updateDoctor } = require("../../controllers/doctorsControllers");

const updateDoctorHandler = async (req, res) => {
    try {
        const { id, name, specialty, description } = req.body;

        const data = {};

        if (name !== '') data.name = name;
        if (specialty !== '') data.specialty = specialty;
        if (description !== '') data.description = description
      
        if (req.files?.image) {

            const result = await uploadDoctorImage(req.files.image.tempFilePath);

            data.photo = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            await fse.unlink(req.files.image.tempFilePath)
        }

        const updatedDoctor = await updateDoctor(id, data);
        res.status(200).json({
            status: 'updated',
            updatedDoctor
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
};

module.exports = updateDoctorHandler;