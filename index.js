var express = require("express");
var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");
var multer = require("multer");
var upload = multer();

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

var students = require("./students.js");
var courses = require("./courses.js");
var grades = require("./grades.js");

app.use("/students", students);
app.use("/courses", courses);
app.use("/grades", grades);




app.listen(3000);