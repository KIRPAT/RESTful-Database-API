const express = require('express');
const router =  express.Router();
const env = require('../../environment');
const apiTool = require('../../apiTool');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const mongoHost = env.mongodb.host.testHost;
const mainDB = env.mongodb.current.mainDB;

/*
MongoClient.connect(mongoHost, { useNewUrlParser: true }, function(err, client){
  assert.equal(null, err);
  const db = client.db(mainDB);
  console.log("-Connected to MongoDB database!-\nHost > "+mongoHost+
              "\nMain Database > "+mainDB+
              "\n--------------------------------");
  client.close;
});
*/

//Example url structure with five layers
// host/:dbName/:collectionName/:_id/:fieldName
// Host Layer / Database Layer / Collection Layer / Document Layer / Field Layer
// Hint: Ctrl+f to find corresponding layer.
// For the clean table: https://docs.google.com/spreadsheets/d/1ZRqfYvO7V3WECDWmgJTmC2M6SJjsmy8ZVwzqAFwpMKA/edit?usp=sharing

//!!!!WARNING!!!!
//DELETE operations are dangerous! Use with caution.
//You might accidently drop important collections or whole databases.


//////////////////////////////////////Host Layer
//GET - Database List WARNING I don't know what to do.
router.get('/', (req, res, next) => {
res.status(200).json({message: "Function not implemented yet."});
});
//////////////////////////////////////////////


/////////////////////////////////Database Layer
//GET - Fetch Collection Names From a Database
router.get('/:dbName', (req, res, next) => {
  const dbName = req.params.dbName;
res.status(200).json({message: "Function not implemented yet."});
});

//POST - Create A Database
router.post('/:dbName', (req, res, next) => {
  // Database Name
  const dbName = req.params.dbName;
  const url = mongoHost+'/'+dbName;
  const metaData = apiTool.metaData();
// WARNING  write the code for checking if database name exists
//--------
 MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
    assert.equal(null, err);
    console.log("Connected to server,");
    const db = client.db(dbName);

    console.log("Connected to Database: "+dbName);
    console.log("META Date: "+ metaData.date);

    db.collection('META').insertOne(metaData, function(err, r) {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);
        console.log('META ID: '+r.insertedId);
        var _id = r.insertedId;
        client.close;
        console.log("done");
        res.status(200).json({
          message:"Datbase created!",
          dbName: dbName,
          info:{
             metaData,
             metaDataCollection: "META"
          }
        });
    });
 });

});
//DELETE - Drop A Database
router.delete('/:dbName', (req, res, next) => {
const dbName = req.params.dbName;
res.status(200).json({message: "Function not implemented yet."});
});

//PATCH - Change a Database Name
router.patch('/:dbName', (req, res, next) => {
const dbName = req.params.dbName;
res.status(200).json({message: "Function not implemented yet."});
});
//////////////////////////////////////////////


///////////////////////////// Collection Layer
//GET - Fetch All Fields of All Documents (from a Collection)
router.get('/:dbName/:collectionName', (req, res, next) => {
  const dbName = req.params.dbName;
  const colName = req.params.collectionName;

  var resultArray = []; //Gonna store documents here.
   MongoClient.connect(mongoHost, {useNewUrlParser: true}, function(err, client) {
     assert.equal(null, err);
     const cursor = client.db(dbName).collection(colName).find();
     //This is where we push documents into the array.
     cursor.forEach(function(doc, err) {
       assert.equal(null, err);
       resultArray.push(doc);
     }, function() {
       client.close();
       res.status(200).json({
         length: resultArray.length,
         docs: resultArray
       });
     });
   });

});

//POST - Create a Collection
router.post('/:dbName/:collectionName', (req, res, next) => {
  const dbName = req.params.dbName;
  const colName = req.params.collectionName;

  MongoClient.connect(mongoHost, {useNewUrlParser: true}, function(err, client){
    assert.equal(null, err);
    client.db(dbName).createCollection(colName, function(err,result){
      if (result) {
        console.log("Success! Collection, "+colName+", either created! (or already exists)");
        res.status(201).json({
          message: "Success! Collection, "+colName+", either created! (or already exists)"
        });
        client.close();
      } else if(err) { //WARNING I would like to show an error message if the collection already exists. Fix it later.
        console.log("Collection creation failed!");
        res.status(500).json({
          message: "Collection creation failed!"
        });
        client.close();
      }
    });
   });

});

//DELETE - Drop a Collection
router.delete('/:dbName/:collectionName', (req, res, next) => {
  const dbName = req.params.dbName;
  const colName = req.params.collectionName;

  MongoClient.connect(mongoHost, {useNewUrlParser: true}, function(err, client){
    assert.equal(null, err);
    client.db(dbName).collection(colName).drop(function(err, delOK){
      if (delOK){
        console.log("Collection, "+colName+" deleted!");
        client.close();
        res.status(201).json({message: "Collection, "+colName+", deleted!"});
      } else if (err){
        console.log("Collection does not exist!");
        client.close();
        res.status(500).json({message: "Collection does not exist!"});
      }
    });
  });
});

//PATCH - Change a Collection Name
router.patch('/:dbName/:collectionName', (req, res, next) => {
  const dbName = req.params.dbName;
  const colName = req.params.collectionName;
  const newColName = req.body.name;

  MongoClient.connect(mongoHost, {useNewUrlParser: true}, function(err, client){
    assert.equal(null, err);
    client.db(dbName).collection(colName).renameCollection(newColName);
    console.log("The colleciton: "+colName+", is now, "+newColName+"!" );
    client.close();
    req.status(201).json({message: "The colleciton: "+colName+", is now, "+newColName+"!"});
  });

});
//////////////////////////////////////////////


///////////////////////////// Document Layer
//GET - Fetch All Fields of a Document
router.get('/:dbName/:collectionName/:_id', (req, res, next) => {
  const dbName = req.params.dbName;
  const colName = req.params.collectionName;
  const _id = req.params._id;
});

//PATCH - Edit Field(s) of a Document
router.patch('/:dbName/:collectionName/:_id', (req, res, next) => {
  const dbName = req.params.dbName;
  const colName = req.params.collectionName;
  const _id = req.params._id;
});

//DELETE - Delete a Document
router.delete('/:dbName/:collectionName/:_id', (req, res, next) => {
  const dbName = req.params.dbName;
  const colName = req.params.collectionName;
  const _id = req.params._id;
});

//POST - Create a Document and (optionally) Add Fields In It
router.post('/:dbName/:collectionName/newDoc', (req, res, next) => {
  const dbName = req.params.dbName;
  const colName = req.params.collectionName;
});
/////////////////////////////////////////////


/////////////////////////////////Field Layer
//GET - Fetch a Field
router.get('/:dbName/:collectionName/:_id/:fieldName', (req, res, next) => {
  const dbName = req.params.dbName;
  const colName = req.params.collectionName;
  const _id = req.params._id;
  const fieldName = req.params.fieldName;
});

//PATCH - Change the Key or the Value (or both) of a Field
router.patch('/:dbName/:collectionName/:_id/:fieldName', (req, res, next) => {
  const dbName = req.params.dbName;
  const colName = req.params.collectionName;
  const _id = req.params._id;
  const fieldName = req.params.fieldName;
});

//POST - Create a Field in a Collection
router.post('/:dbName/:collectionName/:_id/newField', (req, res, next) => {
  const dbName = req.params.dbName;
  const colName = req.params.collectionName;
  const _id = req.params._id;
});

/////////////////////////////////////////////

module.exports = router;
