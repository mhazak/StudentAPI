var express = require("express");
var router = express.Router();
var courses = [
  { id: 001, name: "English", Description: "English language."},
  { id: 002, name: "Java programming", Description: "Java basics."},
  { id: 003, name: "Bussines", Description: "Introduction into bussines basics."},
  { id: 004, name: "Python", Description: "Python basics."},
  { id: 005, name: "JavaScript", Description: "Javascript basics."}
];
router.get("/", function(req, res) {
  res.json(courses);
});

router.get("/:id([0-9]{3,})", function(req, res) {
  var currCourse = courses.filter(function(course) {
    if (course.id == req.params.id) {
      return true;
    }
  });
  
  if (currCourse.length == 1) {
    res.json(currCourse[0]);
  
} else {
    res.status(404); 
    res.json({ message: "Not Found" });
  }
});

router.post("/", function(req, res) {
  var newId = courses[courses.length - 1].id + 1;
  courses.push({
    id: newId,
    name: req.body.name,
    class: req.body.class,
    Description: req.body.Description
  });
  res.json({
    message: "New course created.",
    location: "/courses/" + newId
  });
});

router.put("/:id", function(req, res) {
  var updateIndex = courses
    .map(function(course) {
      return course.id;
    })
    .indexOf(parseInt(req.params.id));

  if (updateIndex === -1) {
    courses.push({
      id: req.params.id,
      name: req.body.name,
      class: req.body.year,
      Address: req.body.Address
    });

    res.json({
      message: "New student created.",
      location: "/students/" + req.params.id
    });
  
} else {
    courses[updateIndex] = {
      id: req.params.id,
      name: req.body.name,
      class: req.body.class,
      Description: req.body.Description
    };
    
    res.json({
      message: "course id " + req.params.id + " updated.",
      location: "/courses/" + req.params.id
    });
  }
});


router.delete("/:id", (req, res) => {
  let finder = courses.findIndex(x => x.id == req.params.id);
  finder >= 0
    ? (courses.splice(finder, 1), res.send("The course was removed."))
    : res.send("Course not found.");
});

module.exports = router;