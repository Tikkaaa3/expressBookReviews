const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const auth = require("../index.js")




public_users.post("/register", (req,res) => {
  try {
    const { username, password } = req.body;
    if (users.some(user => user.username === username)) {
      return res.status(409).json({ message: "Username already exists" });
    }
    const newUser = {
      id: auth(users.length + 1),
      username: username,
      password: password,
    };
    users.push(newUser);

    res.send.status(201).json({ message: "User registered successfully" });

}catch (error) {
  console.error("Error during registration:", error);
  return res.status(500).json({ message: "Internal Server Error" });
}
})

public_users.post("/login", (req,res) => {
  console.log("login fdfdn",req.user)
  //Write your code here
  return res.status(300).json({message: "LOGIN Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {
  let bb = JSON.stringify(books,undefined,2)
  return res.status(300).send(bb);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  let book_info = books[req.params.isbn]
  JSON.stringify(book_info,undefined,2)
  console.log(book_info)
  return res.status(300).send(book_info)
 });
  
// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  let authorName = req.params.author
  
  const booksArray = Object.values(books);
  
  res.send(booksArray.filter((book) => book.author === authorName))
});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
  let title = req.params.title
  
  const booksArray = Object.values(books);
  
  res.send(booksArray.filter((book) => book.title === title))
});

//  Get book review
public_users.get('/review/:isbn', (req, res) => {
  let isbn = req.params.isbn
  if (books[isbn]) {
    reviews=books[isbn].reviews;
    res.send(reviews)
    console.log("reviews", reviews);
  } else {
    console.log("Book not found.");
  }
}

  
);

module.exports.general = public_users;
