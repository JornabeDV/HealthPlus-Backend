const { enableDoctor } = require("../../controllers/doctorsControllers");

const enableDoctorHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await enableDoctor(id);
        res.status(200).json({
            status: 'enabled',
            doctor
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
};

module.exports = enableDoctorHandler;