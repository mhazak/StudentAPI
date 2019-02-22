var express = require("express");
var router = express.Router();
var grades = [
  { id: 001, name: "English", Description: "English language.", grade: 5 },
  { id: 002, name: "Java programming", Description: "Java basics.", grade: 5 },
  { id: 003, name: "Bussines", Description: "Introduction into bussines basics.", grade: 5 },
  { id: 004, name: "Python", Description: "Python basics.",grade: 5},
  { id: 005, name: "JavaScript", Description: "Javascript basics.", grade: 5}
];

router.get("/", function(req, res) {
  res.json(grades);
});


router.get("/:id([0-9]{3,})", function(req, res) {
  var currGrade = grades.filter(function(grade) {
      if (grade.id == req.params.id) {
      return true;
    }
  });
  
  if (currGrade.length == 1) {
    res.json(currGrade[0]);
  } else {
    res.status(404); 
    res.json({ message: "Not Found" });
  }
});


router.post("/", function(req, res) {
  var newId = grades[grades.length - 1].id + 1;
  grades.push({
    id: newId,
    name: req.body.name,
    class: req.body.class,
    Description: req.body.Description,
    grade: req.body.grade
  });

  res.json({
    message: "New course grade created.",
    location: "/grades/" + newId
  });
});

router.put("/:id", function(req, res) {
  var updateIndex = grades
    .map(function(grade) {
      return grade.id;
    })
    .indexOf(parseInt(req.params.id));

  if (updateIndex === -1) {
    grades.push({
      id: req.params.id,
      name: req.body.name,
      class: req.body.class,
      Description: req.body.Description,
      grade: req.body.grade
    });

    res.json({
      message: "New grade created.",
      location: "/grades/" + req.params.id
    });
  
} else {
    grades[updateIndex] = {
      id: req.params.id,
      name: req.body.name,
      class: req.body.class,
      Description: req.body.Description,
      grade: req.body.grade
    };

    res.json({
      message: " Grade" + req.params.id + " updated.",
      location: "/grades/" + req.params.id
    });
  }
});

router.delete("/:id", (req, res) => {
  let finder = grades.findIndex(x => x.id == req.params.id);
  finder >= 0
    ? (grades.splice(finder, 1), res.send("The grade was deleted."))
    : res.send("Grade not found.");
});

module.exports = router;