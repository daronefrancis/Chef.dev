const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

// const cors = require('cors')

const app = express();

require("dotenv").config();
require("./config/database");

app.use(logger("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Put API routes here, before the "catch all" route
app.use("/api/profiles", require("./routes/api/profiles"));
app.use("/api/posts", require("./routes/api/posts"));

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
