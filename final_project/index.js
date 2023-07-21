const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const auth_users = require('./router/auth_users.js').authenticated;
const general = require('./router/general.js').general;
const decoded = require("./router/auth_users.js")
const app = express();

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }))

const PORT = 5000;

app.use("/customer/auth", auth_users);
app.use("/", general);

app.listen(PORT, () => console.log("Server is running"));
