const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const auth_users = require('./router/auth_users.js').authenticated;
const general = require('./router/general.js').general;
const decoded = require("./router/auth_users.js")
const app = express();

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }))

// app.use("/customer/auth/*", function auth(req, res, next) {
//     //Write the authenication mechanism here
//     const { authorization } = req.headers;
//     console.log("aw",decoded.decoded)
//     // Check if the Authorization header exists and has a valid token format
//     if (!authorization || !authorization.startsWith("Bearer ")) {
//         return res.status(401).json({ error: "Unauthorized b" });
//     }

//     const token = authorization.slice(7); // Remove "Bearer " from the token string
//     try {
//         // Verify and decode the token (this step depends on the library you are using for JWT)
//         const decodedToken = jwt.verify(token, "fingerprint_customer");


//         // Assuming the token contains user information, you might attach it to the request object for later use in the routes
//         req.user = decodedToken;



//         // If the token is valid, continue to the next middleware/route handler
//         next();
//     } catch (error) {
//         // If the token is invalid or expired, return an error response
//         return res.status(401).json({ error: "Unauthorized" });
//     }
// });

const PORT = 5000;

app.use("/customer/auth", auth_users);
app.use("/", general);

app.listen(PORT, () => console.log("Server is running"));
