const { bringDoctorById } = require('../../controllers/doctorsControllers')

const getDoctorById = async (req, res) => {

    try {
        const { id } = req.params;
        const doctor = await bringDoctorById(id);
        res.status(200).json(doctor)

    } catch (error) {
        res.status(404).send(error.message)
    }
};

module.exports = getDoctorById;