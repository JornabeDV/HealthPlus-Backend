const { db } = require('../firebase')
const sendEmail = require('./emailSenderControllers');

// --- Create a Date ---

const createDate = async ({ userId, doctorId, date, schedule, email }) => {
    try {
        const doctorData = await db.collection('doctors').doc(doctorId).get()
        const doctor = {
            ...doctorData.data()
        };
        const newDate = {
            userId,
            doctor: doctor.name,
            date,
            schedule,
            specialty: doctor.specialty
        };
        await db.collection('dates').add(newDate)

        //envia mail con la cita
        await sendEmail(email, doctor, date, schedule);


        return {
            status: 'created',
            newDate
        }
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
};

// --- check availability ---
// Con esta forma se hace una consultapara verificar que la cita que sequiere crear sea 

const checkDates = async () => {
    try {
        const dates = await db.collection('dates').get()
        const datesTaken = [];
        dates.forEach((date) => {
            datesTaken.push({
                ...date.data()
            })
        });
        return datesTaken;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};




module.exports = { createDate, checkDates };