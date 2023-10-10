const nodemailer = require('nodemailer');

const sendEmail = async (email, doctor, date, schedule, user) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "healthplus048@gmail.com", 
            pass: "aoxj ordm zpzw pevx"
        }
    });

    const mailOptions = {
        from: "healthplus048@gmail.com",
        to: email,
        subject: "Scheduled medical appointment",
        html: `
          <html>
            <head>
              <style>
                /* Agrega estilos CSS aquí para mejorar la apariencia */
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                }
                .header {
                  background-color: #007BFF;
                  color: #fff;
                  padding: 10px 0;
                  text-align: center;
                }
                .content {
                  padding: 20px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Scheduled Medical Appointment</h1>
                </div>
                <div class="content">
                  <p>
                    Dear ${user.name} ${user.lastName},
                  </p>
                  <p>
                    We hope this message finds you well. We would like to remind you of your upcoming appointment with our specialist in ${doctor.specialty} on ${date} at ${schedule}. Your health is our top priority, and we are looking forward to serving you.
                  </p>
                  <h2>Appointment Details:</h2>
                  <ul>
                    <li>Specialist: ${doctor.name}</li>
                    <li>Specialty: ${doctor.specialty}</li>
                    <li>Date: ${date}</li>
                    <li>Time: ${schedule}hs.</li>
                  </ul>
                  <p>
                    If for any reason you cannot attend this appointment, please let us know in advance so we can reschedule it at your convenience.
                  </p>
                  <p>
                    We are committed to providing you with the best possible medical care. If you have any questions or need further information, please do not hesitate to contact us.
                  </p>
                  <p>
                    We look forward to seeing you soon and taking care of your health!
                  </p>
                  <p>
                    Best regards,<br>
                    Health Plus.<br>
                    Phone: +5493516867775<br>
                    Email: <a href="mailto:healthplus048@gmail.com">healthplus048@gmail.com</a>
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      };
      

    return await transporter.sendMail(mailOptions);
};

module.exports = sendEmail