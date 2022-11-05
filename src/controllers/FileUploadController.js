const bcrypt = require('bcryptjs');
const { request } = require('express');
const auth = require('../middleware/jwt')
const { v4: uuidv4 } = require("uuid");
const FileUpload = require('../models/FileUpload')


const filesUpload = async (req, res) => {

    const id = uuidv4();
    const fileLink = req.body.fileLink;
    const email = req.body.email;

    const fileUpload = new FileUpload({
        id,
        fileLink,
        email
    })


    try {
        let response = await fileUpload.save();
        if (response) {
            return res.status(201).send({ data: 'File uploaded successfully' });
        } else {
            return res.status(500).send({ data: 'Internal server error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ data: 'Server Error!!' })
    }

}

//view all files 
const getAllFiles = async (req, res) => {

    try {
        let files = await FileUpload.find();
        if (files) {
            return res.status(200).send({data: files})
        } else {
            return res.status(404).send({ data: 'No file available' });
        }
    } catch (err) {
        return res.status(500).send({ data: 'Internal server error' })
    }
}

//view files of a specific user
const viewFilesOfUser = async (req, res) => {
    let userEmail = req.params.email;

    try {
        let response = await FileUpload.find({ email: userEmail });
        if (response) {
            return res.status(200).send({data:response });
        } else {
            return res.status(404).send({ message: 'Not Found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}



module.exports = {
    filesUpload,
    getAllFiles,
    viewFilesOfUser
};