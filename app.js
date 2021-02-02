const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const tasksSchema = {
  name: String,
};

const Task = mongoose.model("task", tasksSchema);

// const task1 = new Task({
//   name: "Welcome to your to-do list!",
// });

// const task2 = new Task({
//   name: "Hit the + buton to add a new item.",
// });

// const task3 = new Task({
//   name: "<-- Hit this to delete an item.",
// });

// const defaultTasks = [task1, task2, task3];

// Task.insertMany(defaultTasks, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully saved default tasks to database.");
//   }
// });

app.get("/", function (req, res) {
  Task.find({}, function (err, foundTasks) {
    res.render("list", { listTitle: "Today", listOfTasks: foundTasks });
  });
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
