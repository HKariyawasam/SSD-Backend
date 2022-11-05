const bcrypt = require('bcryptjs');
const { request } = require('express');
const auth = require('../middleware/jwt')
const { v4: uuidv4 } = require("uuid");
const Message = require('../models/Message')


const createMessage = async (req, res) => {

    const id = uuidv4();
    const description = req.body.description;
    const email = req.body.email;

    const user = new Message({
        id,
        description,
        email
    })

    try {
        let response = await user.save();
        if (response) {
            return res.json({ message: 'New User registered' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Registration Error !!' })
    }

}

//view messages 
const getAllMessages = async (req, res) => {

    try {
        let messages = await Message.find();
        if (messages) {
            return res.status(200).send(messages)
        } else {
            return res.status(404).send({ message: 'No messages available' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' })
    }
}

//view messages of a specific user
const viewMessagesOfUser = async (req, res) => {
    let userEmail = req.params.email;

    try {
        let response = await Message.find({ email: userEmail });
        if (response) {
            return res.json({response});
        } else {
            return res.status(404).send({ message: 'Not Found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}



module.exports = {
    createMessage,
    getAllMessages,
    viewMessagesOfUser
};