const server = require('./src/app');
// Acá requiero la conección a los modelos

server.listen(3001, () => {
    console.log('Listening at 3001');
})