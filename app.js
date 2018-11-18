//for improting express
const express = require('express');

//importing "environment.js", so that I don't have to hard code host IPs and stuff.
const env = require('./environment')

//to execute express stuff
const app = express();

//Morgan for logging HTTP requests.
//This is a middleware that recevies HTTP requests first,
//Logs them, and passes them to the Express framefork
//So that we can see those requests on the terminal.
const morgan = require('morgan');
app.use(morgan('dev')); //this is the request passing part

//for extracting the body of incoming requests
const bodyParser = require('body-parser');
//extended let's you receive rich data
app.use(bodyParser.urlencoded({extended: false})); //for now false, you might need true
app.use(bodyParser.json());

//CORS Error Handling.
//To prevent having errors
//cus other computers might have the same IP adress and ports
//they count as same origin, which is a bad thing appearenly (gonna google it)
//If the API is working on a test machine, cool, probably no CORS errors going to occour.
//If the API is working from a server and multiple computers are accesing it, then we need to handle some errors.
//we can bypass the error and complete interactions anyways, using following code...
app.use((req, res, next) =>{
  // '*' for all the origins
  res.header('Access-Control-Allow-Origin', '*');
  //it can be restricted to spesific origins
      //res.header('Access-Control-Allow-Origin','http://yolo.com')
  //Header type restrictions are defined here. (in this case, all of them are allowed)
  res.header('Access-Control-Allow-Headers', '*');
  //it can also be like this
      //res.header('Access-Control-Allow-Header', 'Origin, X-requested-With, Content-Type, Accept, Authorization');
  //A browser always sends OPTIONS request first, can not be avoided
  //You can filter and declare the methods you wanted in your project by taking advantage of it.
  if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, GET, DELETE');
    //You don't need to fill the json. You are already sending necessary info.
    return res.status(200).json({});
  }
  next(); //without next, you might lock the script here, and can not route requests using the following router lines.
});

//importing Database Routes from the directory.
const dbMongoRoutes = require('./api/routes/dbMongoRoutes');
//Request Handler. Whenever a request received, this middleware directs it.
//Whenever a request comes to localhost:3000,
//this middleware directs it to dbMongoRoutes
app.use('/', dbMongoRoutes);


//ERROR HANDLING
//Any request that has a route that,
//the ones other than I directed above (the code I wrote earlier),
//will return a predefined error as a response.
app.use((req, res, next) =>{
  //Error is a default object, no need to import.
  const error = new Error('Error - Either no such route defined, or the request type is wrong.');
  error.status = 404;
  next(error); //re-directs to error request
});

app.use((error, req, res, next) => {
  //Either 404 or 500
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message //'Not found, chump :3'
    }
  });
});

module.exports =  app;
