const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());

app.options('*', cors())

app.use(cors({
    origin: 'https://puit.vercel.app',
    credentials:true,
}))

const cards = require("./routes/cardRoute");
const user = require("./routes/userRoute");

app.use("/api/v2",cards);
app.use("/api/v1",user);

module.exports = app;