const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {type: String,required: true},
    phone: {type: String,required: true, maxLength:10},
    email: {type: String,required: true, minLength:8, maxLength:12, unique:true},
    password: {type: String,required: true},
    type: {type: String,required: true},
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //do not reveal passwordHash
        delete returnedObject.password
    }
})

const User = mongoose.model("user", UserSchema);

module.exports = User;