const bcrypt = require('bcryptjs');
const { request } = require('express');
const auth = require('../middleware/jwt')
const User = require('../models/User')

const register = async (req, res) => {

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
            return res.json({ message: 'New User registered' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Registration Error !!' })
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
                return res.json({...user.toJSON(), token});
            }
            else {
                return res.status(400).send({ message: 'Incorrect Credentials' })
            }
        } else {
            return res.status(404).send({ message: 'Such user does not exist' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'Such user does not exist check your credentials' })
    }

}

//view users 
const getAllUsers = async (req, res) => {

    try {
        let users = await User.find();
        if (users) {
            // return res.json(users)
            return res.status(200).send(users)
        } else {
            return res.status(404).send({ message: 'No users available' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' })
    }
}

module.exports = {
    register,
    login,
    getAllUsers
};