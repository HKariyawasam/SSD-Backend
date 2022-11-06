const bcrypt = require('bcryptjs');
const { request } = require('express');
const auth = require('../middleware/jwt')
const User = require('../models/User')

const register = async (req, res) => {
console.log("request ", req)
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const pwd = req.body.password;
    const type = req.body.type;

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(pwd, salt);

    const user = new User({
        name,
        phone,
        email,
        password,
        type,
    })

    try {
        let response = await user.save();
        if (response) {
            return res.status(201).send({ data: 'New User registered' });
        } else {
            return res.status(500).send({ data: 'Internal server error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ data: 'Registration Error !!' })
    }

}

//user login
const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email: email });
        if (user) {

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = auth.generateAccessToken(email);
                // call toJSON method applied during model instantiation
                return res.status(200).send({ ...user.toJSON(), token });
            }
            else {
                return res.status(400).send({ data: 'Incorrect Credentials' })
            }
        } else {
            return res.status(404).send({ data: 'Such user does not exist' });
        }
    } catch (err) {
        return res.status(400).send({ data: 'Such user does not exist check your credentials' })
    }

}

//view users 
const getAllUsers = async (req, res) => {

    try {
        let users = await User.find();
        if (users) {
            // return res.json(users)
            return res.status(200).send({ data: users })
        } else {
            return res.status(404).send({ data: 'No users available' });
        }
    } catch (err) {
        return res.status(500).send({ data: 'Internal server error' })
    }
}

module.exports = {
    register,
    login,
    getAllUsers
};