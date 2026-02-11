//import enquiryModel enquirySchema
const enquiryModel = require("../../models/enquiry.model");


//insert api
let enquiryInsert = (req, res) => {
      let { name, email, phone, message } = req.body;
      let enquiry = new enquiryModel({
            name,
            email,
            phone,
            message
      });
      enquiry.save().then(() => {
            res.send({ status: 1, message: "Enquiry saved successfully" });
      }).catch((err) => {
            res.send({ status: 0, message: "Error saving enquiry", error: err });
      });
}

//list and view api for show all data
let enquiryList = async (req, res) => {
      let enquiry = await enquiryModel.find();
      res.send({ status: 1, enquiryList: enquiry });
}

//delete api
let enquiryDelete = async (req, res) => {
      let enquiryId = req.params.id;
      let deletedEnquiry = await enquiryModel.findByIdAndDelete(enquiryId);
      res.send({ status: 1, message: "Enquiry deleted successfully", id: enquiryId, delRes: deletedEnquiry });
}

//edit api
let enquiryEdit = async (req, res) => {
      let enquiryId = req.params.id;
      let editEnquiry = await enquiryModel.findById(enquiryId);
      res.send({ status: 1, editEnquiry })
}

//update api
let enquiryUpdate = async (req, res) => {
      let enquiryId = req.params.id;
      let { name, email, phone, message } = req.body;
      let updatedObj = {
            name,
            email,
            phone,
            message
      }
      let updateRes = await enquiryModel.findByIdAndUpdate(enquiryId, updatedObj);
      res.send({ status: 1, message: "Enquiry updated successfully", id: enquiryId, updateRes: updateRes });
}


//export module for insert,view,delete,edit,update api
module.exports = { enquiryInsert, enquiryList, enquiryDelete, enquiryEdit, enquiryUpdate };