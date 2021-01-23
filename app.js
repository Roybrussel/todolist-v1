const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let tasks = [];
let workList = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

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

app.listen(3000, function () {
  console.log("server is listening on port 3000");
});
