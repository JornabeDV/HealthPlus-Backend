const { deleteDoctor } = require('../../controllers/doctorsControllers');
const { deleteImage } = require('../../../utils/cloudinary');

const destroyDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        // Delete doctor
        const doctor = await deleteDoctor(id);

        // Delete cloudinary imageonly if it's not the placeholder
        if (doctor.photo?.public_id ||
            doctor.photo?.public_id !== 'https://res.cloudinary.com/drpge2a0c/image/upload/v1697037341/userImages/blank-profile-picture-973460_960_720_sgp40b.webp'
            ) {
            await deleteImage(doctor.photo.public_id);
        };
        res.status(200).json({
            status: 'deleted',
            doctor
        });
    } catch (error) {
        res.status(404).json(error.message);
    }
};

module.exports = destroyDoctor;