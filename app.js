const express = require("express");
const app = express();
const entryRoutes = require("./routes/entryRoutes");
const playAgain = require("./routes/playAgain");
const errorRoutes = require("./routes/errorRoutes");
const mustachExpress = require("mustache-express");
const fs = require("fs");
const port = process.env.PORT || 4000;
const session = require("express-session");
const bodyParser = require("body-parser");
const sessionConfig = require("./sessionConfig");

//set view engine
app.engine("mustache", mustachExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

//middleware
app.use("/", express.static("./public"));
app.use("/", entryRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

app.use("/again", playAgain);
app.use("/error", errorRoutes);

app.listen(port, function() {
  console.log("Application is running on", port);
});
