require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const commentRoutes = require("./routes/comments.js")
const userRoutes = require("./routes/user.js")
const cors = require("cors")

//Express app
const app = express()

//Middleware
app.use(express.json())

// CORS configuration
app.use(cors({
  origin: 'https://mernalbum-frontend.onrender.com',
}));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
 
//Routes
app.use("/api/comments", commentRoutes)
app.use("/api/user", userRoutes)

//Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to the database & listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
