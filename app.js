const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

// Getting document ready for Mongoose

let tasks = [];
let workList = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let day = date();
  res.render("list", { listTitle: day, listOfTasks: tasks });
});

app.post("/", function (req, res) {
  let task = req.body.task;

  if (req.body.list === "Work") {
    workList.push(task);
    res.redirect("/work");
  } else {
    tasks.push(task);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", listOfTasks: workList });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("server is listening on port 3000");
});
