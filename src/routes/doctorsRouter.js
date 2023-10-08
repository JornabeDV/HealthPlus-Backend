const { Router } = require('express');
const fileUpload = require('express-fileupload')  // dependencia que permite subir archivos desde el formulario 


const getDoctors = require('../handlers/Doctors/getDoctors');
const getDoctorById = require('../handlers/Doctors/getDoctorById');
const postDoctor = require('../handlers/Doctors/createDoctor');
const destroyDoctor = require('../handlers/Doctors/destroyDoctor');

const doctorRouter = Router();

doctorRouter.get('/', getDoctors);

doctorRouter.post('/', fileUpload({  // Middleware para que express pueda recibir archivos
  useTempFiles: true,               // guardar el archivo temporalmente hasta que se suba a la nube
  tempFileDir: './uploads'          // en esta ruta
}), postDoctor);

doctorRouter.get('/:id', getDoctorById);
doctorRouter.delete('/:id', destroyDoctor)

module.exports = doctorRouter;