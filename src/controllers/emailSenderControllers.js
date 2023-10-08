const nodemailer = require('nodemailer');

const sendEmail = async (email, doctor, date, schedule) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        post: 587,
        secure: false,
        auth: {
            user: "healthplus@ethereal.email", // Cambiar por un correo electrónico real
            pass: "contraseña_de_ethereal"
        }
    });

    const mailOptions = {
        from: "Remitente", // Cambiar por el correo electrónico real
        to: email,
        subject: "Scheduled medical appointment",
        text: `
            Dear John Doe, /* Poner el nombre del usuario */
            
            We hope this message finds you well. We would like to remind you of your upcoming appointment with our specialist in ${doctor.specialty} on ${date} at ${schedule}. Your health is our top priority, and we are looking forward to serving you.
            
            Appointment Details:
            - Specialist: ${doctor.name}
            - Specialty: ${doctor.specialty}
            - Date: ${date}
            - Time: ${schedule}
            
            If for any reason you cannot attend this appointment, please let us know in advance so we can reschedule it at your convenience.
            
            We are committed to providing you with the best possible medical care. If you have any questions or need further information, please do not hesitate to contact us.
            
            We look forward to seeing you soon and taking care of your health!
            
            Best regards,
            Health Plus.
            [Contact Phone Number] /* Poner el número de teléfono definitivo */
            [Contact Email Address] /* Poner un correo electrónico diferente al que usamos para las citas */
        `
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
