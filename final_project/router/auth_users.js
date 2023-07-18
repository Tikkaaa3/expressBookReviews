const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];



const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

regd_users.post("/login", (req, res) => {

  console.log("users",users)
  let validusers = users.filter((user) => {
    return (user.username === req.body.username)
  });
  if (validusers.length > 0) {
    console.log("validusers",validusers)
    console.log("validusersToken",validusers[0].token)
    const decoded = jwt.verify(validusers[0].token,"fingerprint_customer")
    console.log("data",decoded)

    if(decoded.password_token===req.body.password){
      return res.send("Logged in successfully")
    }
    return res.status(500).json({ message: "hatalı giriş" });
  } else {
    return res.status(500).json({ message: "yok karşim" });

  }
});


// Add a book review
regd_users.put("/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

