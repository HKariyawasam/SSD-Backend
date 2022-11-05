const mongoose = require("mongoose");
const { Schema } = mongoose;

const FileUploadSchema = new Schema({
    id: {type: String,required: true},
    fileLink: {type: String,required: true},
    email:{type: String, required:true}
});


const FileUpload = mongoose.model("fileUpload", FileUploadSchema);

module.exports = FileUpload;