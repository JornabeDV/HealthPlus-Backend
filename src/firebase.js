require('dotenv').config();
const admin = require('firebase-admin');

// Especifica la ruta relativa al archivo JSON de credenciales
const serviceAccount = require('../firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { auth, db };