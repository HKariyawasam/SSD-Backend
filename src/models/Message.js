const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
    id: {type: String,required: true},
    description: {type: String,required: true},
    email:{type: String, required:true}
});


const Message = mongoose.model("message", MessageSchema);

module.exports = Message;