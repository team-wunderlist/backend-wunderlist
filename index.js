const envReader = require('dotenv');
const server = require('./api/server');

envReader.config();

const port =  process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`\n *** Listening on http://localhost:${port} *** \n`);
})