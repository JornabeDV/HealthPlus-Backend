const { uploadDoctorImage } = require("../../../utils/cloudinary");
const fse = require("fs-extra");
const { createDoctor } = require("../../controllers/doctorsControllers");

const postDoctor = async (req, res) => {
  try {
    const { espDescription, description, name, specialty, email } = req.body;
    if (!espDescription || !description || !name || !specialty || !email)
      throw new Error("Missing information to create the doctor");

    let espSpecialty = "";
    let data = {
      description,
      espDescription,
      name,
      specialty,
      espSpecialty,
      email,
    };

    switch (specialty) {
      case "Radiology":
        espSpecialty = "Radiología";
        break;
      case "Dermatology":
        espSpecialty = "Dermatología";
        break;
      case "Rheumatology":
        espSpecialty = "Reumatología";
        break;
      case "Psychiatry":
        espSpecialty = "Psiquiatría";
        break;
      case "Gastroenterology":
        espSpecialty = "Gastroenterologia";
        break;
      case "Endocrinology":
        espSpecialty = "Endocrinología";
        break;
      case "Urology":
        espSpecialty = "Urología";
        break;
      case "Cardiology":
        espSpecialty = "Cardiología";
      default:
        break;
    }
    data.espSpecialty = espSpecialty;

    if (req.files?.image) {
      const result = await uploadDoctorImage(req.files.image.tempFilePath);

      data.photo = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      // Eliminar archivo
      await fse.unlink(req.files.image.tempFilePath);
    } else
      data.photo = {
        public_id: "",
        secure_url:
          "https://res.cloudinary.com/drpge2a0c/image/upload/v1697046001/doctorImages/blank-profile-picture-973460_960_720_wjvnik.webp",
      };

    const newDoctor = await createDoctor(data);
    res.status(201).json({
      status: "created",
      newDoctor,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

module.exports = postDoctor;