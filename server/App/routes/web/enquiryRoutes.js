//import express
let express = require('express');

//import module for insert,view,delete,edit,update api
const { enquiryInsert, enquiryList, enquiryDelete, enquiryEdit, enquiryUpdate } = require('../../controllers/web/enquiryController');

//use router function from express
let enquiryRouter = express.Router();

//create all api url
enquiryRouter.post('/insert',enquiryInsert );
enquiryRouter.get('/view',enquiryList );
enquiryRouter.delete("/delete/:id",enquiryDelete);
enquiryRouter.get("/single/:id",enquiryEdit);
enquiryRouter.put("/update/:id",enquiryUpdate)

//export module for enquiryRouter
module.exports = enquiryRouter;