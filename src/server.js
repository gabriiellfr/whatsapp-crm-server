require('dotenv').config();

const httpServer = require('./providers/express');

const { socketService } = require('./services');

const port = process.env.PORT || 3000;
const appName = process.env.APP_NAME || 'Server';

const startServer = async () => {
    httpServer.listen(port, () => {
        console.log('+---------------------------------------+');
        console.log('|                                       |');
        console.log(`|            ${appName}            |`);
        console.log(`|   🚀 Server ready at localhost:${port}   |`);
        console.log('|                                       |');
        console.log('\x1b[37m+---------------------------------------+');
    });

    socketService.setup(httpServer);
};

startServer().catch((err) => {
    console.log(err);
});
