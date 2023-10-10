const { disableDoctor } = require("../../controllers/doctorsControllers");

const disableDoctorHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await disableDoctor(id);
        res.status(200).json({
            status: 'disabled',
            doctor
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
};

module.exports = disableDoctorHandler;