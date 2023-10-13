const { uploadUserImage } = require("../../../utils/cloudinary");
const fse = require('fs-extra');
const { updateUser } = require("../../controllers/usersControllers");

const updateUserHandler = async (req, res) => {
    try {
        const { uid, name, lastName, date, userId} = req.body;

        const data = {};

        if(name !== '') data.name = name;
        if(lastName !== '') data.lastName = lastName;
        if(date !== '') data.date = date;
        if(userId !== '') data.userId = userId;

        if(req.files?.image) {
            const result = await uploadUserImage(req.files.image.tempFilePath);

            data.photo = {
                public_id: result.public_id,
                secure_url: result.secure_url
            };
            await fse.unlink(req.files.image.tempFilePath);
        };
        const updatedUser = await updateUser(uid, data);
        res.status(200).json({
            status: 'updated',
            updatedUser
        });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = updateUserHandler;