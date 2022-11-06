const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const unless = require('express-unless')
const auth = require('./src/middleware/jwt')
const errors = require('./src/middleware/errorHandler')
const https = require('https')
const path = require('path')
const fs = require('fs')

const port = process.env.PORT;
const URL = process.env.URL;

app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());
// app.use('/',(req,res,next)=>{
//     res.send("Send Hello from Server")
// })

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// const server = app.listen(port, () => {
    
//     console.log(`Server Is Running on Port: ${port}`);
// });

const sslServer = https.createServer({
    key:fs.readFileSync(path.join(__dirname,'./CA/localhost/','localhost.decrypted.key')),
    cert:fs.readFileSync(path.join(__dirname,'./CA/localhost/','localhost.crt')),
},app)

const server = sslServer.listen(port, () => {   
    console.log(`Server Is Running on Port: ${port}`);
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
})

auth.authenticateToken.unless = unless
app.use(auth.authenticateToken.unless({
    path: [
        { url: '/api/v1/users/login', methods: ['POST'] },
        { url: '/api/v1/users/register', methods: ['POST'] }
    ]
}))

//user route
let users = require('./src/routes/UserRoutes')
app.use('/api/v1/users', users);
app.use(errors.errorHandler);

//message route
let messages = require('./src/routes/MessageRoutes')
app.use('/api/v1/messages', messages);

//filesuplaod route
let files = require('./src/routes/FileUploadRoutes')
app.use('/api/v1/files', files);