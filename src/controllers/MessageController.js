const bcrypt = require('bcryptjs');
const { request } = require('express');
const auth = require('../middleware/jwt')
const { v4: uuidv4 } = require("uuid");
const Message = require('../models/Message')


const createMessage = async (req, res) => {

    const id = uuidv4();
    const description = req.body.description;
    const email = req.body.email;

    const message = new Message({
        id,
        description,
        email
    })


    try {
        let response = await message.save();
        if (response) {
            return res.status(201).send({ data: 'New Message saved successfully' });
        } else {
            return res.status(500).send({ data: 'Internal server error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ data: 'Server Error !!' })
    }

}

//view messages 
const getAllMessages = async (req, res) => {

    try {
        let messages = await Message.find();
        if (messages) {
            return res.status(200).send({data: messages})
        } else {
            return res.status(404).send({ data: 'No messages available' });
        }
    } catch (err) {
        return res.status(500).send({ data: 'Internal server error' })
    }
}

//view messages of a specific user
const viewMessagesOfUser = async (req, res) => {
    let userEmail = req.params.email;

    try {
        let response = await Message.find({ email: userEmail });
        if (response) {
            return res.status(200).send({data:response });
        } else {
            return res.status(404).send({ data: 'Not Found' });
        }
    } catch (err) {
        return res.status(500).send({ data: 'Internal server error' });
    }
}



module.exports = {
    createMessage,
    getAllMessages,
    viewMessagesOfUser
};