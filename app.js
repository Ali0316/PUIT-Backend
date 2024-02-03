const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }))

app.use(cors({
    origin: [''],
    methods: ['POST','GET','PUT'],
    credentials:true,
}))

const cards = require("./routes/cardRoute");
const user = require("./routes/userRoute");

app.use("/api/v2",cards);
app.use("/api/v1",user);

module.exports = app;