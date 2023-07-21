const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];



const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find the user with the provided username and password
  const validUser = users.find((user) => user.username === username && user.password === password);
  if (validUser) {
    // Generate a JWT with the username as payload
    const token = jwt.sign({ username: validUser.username }, "fingerprint_customer");

    return res.status(200).json({ token: token, message: "Logged in successfully" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  // Remove the "Bearer " prefix from the token
  const rawToken = token.split(' ')[1];

  jwt.verify(rawToken, "fingerprint_customer", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = {
      username: decoded.username,
    };

    next();
  });
}


// Add a book review
regd_users.put("/review/:isbn", authenticateToken, (req, res) => {
  const { isbn } = req.params;
  const review = req.body.review;
  const username = req.user.username; // Access the username from req.user

  // Check if the ISBN exists in the books object
  if (!books[isbn]) {
    return res.status(404).json({ error: 'ISBN not found.' });
  }

  // Add or update the review for the given ISBN and username
  books[isbn]['reviews'][username] = review;
  console.log("review", review)
  // Optional: If you want to update your booksdb.js file, you'll need to write the changes back to the file.
  // Since this is an in-memory implementation, changes will not persist after the server restarts.
  // You'll need to use a database to store and retrieve data permanently.

  return res.status(201).json({ message: 'Review added/updated successfully.', review: review , username});
});

regd_users.delete("/review/:isbn",authenticateToken, (req, res) => {
  const { isbn } = req.params;
  const username = req.user.username; // Access the username from req.user

  if (!books[isbn]) {
    return res.status(404).json({ error: 'ISBN not found.' });
  }

  if (!books[isbn]['reviews'][username]) {
    return res.status(404).json({ error: 'Review not found for this user and ISBN.' });
  }

  // Delete the review for the given ISBN and username
  delete books[isbn]['reviews'][username];

  // Optional: If you want to update your booksdb.js file, you'll need to write the changes back to the file.
  // Since this is an in-memory implementation, changes will not persist after the server restarts.
  // You'll need to use a database to store and retrieve data permanently.

  return res.status(200).json({ message: 'Review deleted successfully.' });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

