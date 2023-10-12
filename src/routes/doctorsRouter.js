const { Router } = require('express');
const fileUpload = require('express-fileupload')

const getDoctors = require('../handlers/Doctors/getDoctors');
const getDoctorById = require('../handlers/Doctors/getDoctorById');
const postDoctor = require('../handlers/Doctors/createDoctor');
const destroyDoctor = require('../handlers/Doctors/destroyDoctor');
const disableDoctorHandler = require('../handlers/Doctors/disableDoctorHandler');
const enableDoctorHandler = require('../handlers/Doctors/enableDoctorHandler');
const createComments = require('../handlers/Doctors/createComments');
const updateDoctorHandler = require('../handlers/Doctors/updateDoctorHandler');

const doctorRouter = Router();

doctorRouter.get('/', getDoctors);

doctorRouter.post('/', fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}), postDoctor);

doctorRouter.put('/profile', fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}), updateDoctorHandler);

doctorRouter.post('/comment', createComments);
doctorRouter.put('/disable/:id', disableDoctorHandler);
doctorRouter.put('/enable/:id', enableDoctorHandler);
doctorRouter.get('/:id', getDoctorById);
doctorRouter.delete('/:id', destroyDoctor);

module.exports = doctorRouter;