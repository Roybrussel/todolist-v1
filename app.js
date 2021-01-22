const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var tasks = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { kindOfDay: day, listOfTasks: tasks });
});

app.post("/", function (req, res) {
  tasks.push(req.body.task);
  console.log(tasks);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("server is listening on port 3000");
});
