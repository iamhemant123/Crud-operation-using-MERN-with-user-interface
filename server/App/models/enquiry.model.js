//import mongoose
let mongoose = require('mongoose');
//Schema from mongoose
let Schema = mongoose.Schema;

//schema prototype
let enquirySchema = new Schema({
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,// for entry compulsary
        unique: true//for stop duplicate entry
      },
      phone: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      }});


let enquiryModel= mongoose.model('Enquiry', enquirySchema);

//export enquiryModel
module.exports= enquiryModel;
