const express = require("express");
const app = express();
const cors = require("cors");
const mongoose =require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

app.use(cors({credentials: true, origin: true}));

mongoose.connect('mongodb+srv://minhnhat:nhat123@tlcn.e1fkcts.mongodb.net/KLTN?retryWrites=true&w=majority&appName=TLCN')
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({limit:"50mb"}));
app.use(morgan("common"));
app. listen(3000,()=>{
    console.log("Server running.")
});