const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const userRoutes = require("./routes/userroutes");

require("dotenv").config()
const port = process.env.PORT
const mongo_url = process.env.MONGO_URI

//Middlewares
app.use(express.json());
app.use("/api/users", userRoutes);
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



mongoose.connect(mongo_url)
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.log(`Can not connect due to ${error}`)
    })


app.get('/', (req, res) => {
    res.send("Welcome")
})

