var env ={
  //Definining ports here is not necesary, but it might be useful in later projects
  host:{
    defaultPort:'3000',
    port0: '3001'
  },

  //MongoDB related environment veriables.
  mongodb:{
    //If there are multiple MongoDB servers running for a single project, add them here.
    //You also need to write the necessary code to connect them in the app.js
    host:{
      defaultHost: 'mongodb://localhost:27017',
         testHost: 'mongodb://localhost:27018'
    },

    //Dynamic veriables that needs to be changed during CRUD operations.
    //dbName can not be dummy at the beginning, please define it.
    current: {
        mainDB: 'kirpat', // required!!!
            db: 'dummyDatabase',
           col: 'dummyCollection',
           doc: 'dummyDocumentId',
           key: 'dummyFieldKey'
    }
  }
}

module.exports = env;
