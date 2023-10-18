const server = require('./src/app');
// Acá requiero la conección a los modelos
const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
    console.log('Listening at 3001');
})