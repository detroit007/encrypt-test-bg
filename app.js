const express = require("express");
const session = require("express-session");
const { createServer } = require('node:http');
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const PORT = process.env.PORT || 8080;
const { v4: uuidv4 } = require('uuid');



dotenv.config();
const uuidId = uuidv4();
const app = express();
// const server = createServer(app);
// const io = new Server(server, {cors: {
//   origin: "*"
// }});

app.use(
  cors({
    origin: "*",
    frame: "127.0.0.1:8080",
    // frame: "https://dllhf83nxm41g.cloudfront.net",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up express-session

app.use(
  session({
    secret: uuidId,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(
  "/uploads/pdfs",
  express.static(path.join(__dirname, "./uploads/pdfs"))
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to test basata encryption application. :)" });
});

// require("./routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = {app};