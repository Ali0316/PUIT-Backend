const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// app.options("*", cors())

app.use(cors({
    origin: process.env.ORIGIN,
    credentials:true,
}))

// app.use(cors({
//     origin: '*',
//     credentials: true,
//   }));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,POST,DELETE,PATCH,OPTIONS"
//   );
//   next();
// });

app.use(express.json());
app.use(cookieParser());

const cards = require("./routes/cardRoute");
const user = require("./routes/userRoute");

app.use("/api/v2", cards);
app.use("/api/v1", user);

module.exports = app;
