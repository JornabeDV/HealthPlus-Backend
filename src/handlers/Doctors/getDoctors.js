const {
    bringDoctors,
    bringDoctorByName,
  } = require("../../controllers/doctorsControllers");
  
  const getDoctors = async (req, res) => {
    const { name } = req.query;
    if (name) {
      try {
        const doctor = await bringDoctorByName(name);
        res.status(200).json(doctor);
      } catch (error) {
        res.status(404).json(error.message);
      }
    } else {
      try {
        const doctors = await bringDoctors();
        res.status(200).json(doctors);
      } catch (error) {
        console.log(error);
        res.status(404).json(error);
      }
    }
  };
  
  module.exports = getDoctors;