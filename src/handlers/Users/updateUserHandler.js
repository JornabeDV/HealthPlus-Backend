const { uploadUserImage } = require("../../../utils/cloudinary");
const fse = require('fs-extra');
const { updateUser } = require("../../controllers/usersControllers");

const updateUserHandler = async (req, res) => {
    try {
        const { uid, name, lastName, date, userId} = req.body;
        // console.log(name, id, uid);
        const data = { uid, name, lastName, date, userId };
        console.log(data);
        console.log(req.files);

        if(req.files?.img) {
            const result = await uploadUserImage(req.files.img.tempFilePath);

            data.photo = {
                public_id: result.public_id,
                secure_url: result.secure_url
            };
            console.log(data);
            await fse.unlink(req.files.img.tempFilePath);
        };
        const updatedUser = updateUser(data);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

module.exports = updateUserHandler;