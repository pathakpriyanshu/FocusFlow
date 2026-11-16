const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const userRoute = require("./routes/userroutes");
const loginRoute = require("./routes/loginRoute")
const cookieParser = require("cookie-parser");

require("dotenv").config()
const port = process.env.PORT
const mongo_url = process.env.MONGO_URI

//Middlewares
app.use(express.json());
app.use(cookieParser())
app.use("/api/users", userRoute);
app.use("/api/users", loginRoute)
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

