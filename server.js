//Classical import something.something does not work in Nodejs
//You Need to save them in constants.
const http = require('http');

//importing app.js
//while importing from the node_modules folder,
//you don't need to type direcrory like /yolo/file/ etc.
const app = require('./app')
const env = require('./environment')

//setting up the PORT localhost:3000
const port = process.env.PORT || 3000;
//const port = env.host.defaultPort;

//gets requets and returns something as a response
//but the requests are not handled here, for that you need to look at app.js
//with adding app in the createServer, you are actually assigning the request handler,
//which is the express framework that stored in the "app" that we called here and saved in the "app"
const server = http.createServer(app);
server.listen(port);
