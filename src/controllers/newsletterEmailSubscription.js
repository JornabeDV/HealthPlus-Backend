const nodemailer = require('nodemailer');

const sendEmailNewsletter = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'healthplus048@gmail.com',
                pass: 'aoxj ordm zpzw pevx'
            }
        });

        const mailOptions = {
            from: 'healthplus048@gmail.com',
            to: email,
            subject: 'Newsletter Subscription - Health Plus',
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
                  <h1>Thank you for subscribing to our newsletter!</h1>
                </div>
                <div class="content">
                  <p>Dear ${email},</p>
                  <p>You have successfully subscribed to our newsletter! Now you will receive the latest news and updates from Health Plus.</p>
                 
                  <p>Thanks for trusting us.</p>
                  <p>Sincerely,<br>Health Plus</p>
                </div>
              </div>
            </body>
          </html>
        `
        };

        // Envía el correo
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('There was an error sending the subscription email.');
    }
}

module.exports = sendEmailNewsletter;
