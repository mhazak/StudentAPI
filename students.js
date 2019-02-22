var express = require("express");
var router = express.Router();
var students = [
  {
    id: 001,
    name: "Jay Cutler",
    class: "2",
    Address: "Ylioppilaantie 4A 701/2, OULU 90130"
  },
  {
    id: 002,
    name: "Homer Simpson",
    class: "2",
    Address: "Ylioppilaantie 4B 603/2, OULU 90130"
  },
  {
    id: 003,
    name: "Barrack Obama",
    class: "2",
    Address: "Ylioppilaantie 4A 303/2, OULU 90130"
  },
  {
    id: 004,
    name: "Putin",
    class: "2",
    Address: "Ylioppilaantie 4B 101/2, OULU 90130"
  },
  {
      id: 005,
      name: "Ariana Grande",
      class: "2",
      Address: "Ylioppilaantie 4A 201/1, OULU 90130"
  }
  
];
router.get("/", function(req, res) {
  res.json(students);
});
router.get("/:id([0-9]{3,})", function(req, res) {
  var currStudent = students.filter(function(student) {
    if (student.id == req.params.id) {
      return true;
    }
  });
  if (currStudent.length == 1) {
    res.json(currStudent[0]);
  } else {
    res.status(404); 
    res.json({ message: "Not Found" });
  }
});

router.post("/", function(req, res) {

  var newId = students[students.length - 1].id + 1;
  students.push({
    id: newId,
    name: req.body.name,
    class: req.body.class,
    Address: req.body.Address
  });
  res.json({
    message: "Student is added.",
    location: "/students/" + newId
  });
});

router.put("/:id", function(req, res) {
  var updateIndex = students
    .map(function(student) {
      return student.id;
    })
    .indexOf(parseInt(req.params.id));

  if (updateIndex === -1) {
    students.push({
      id: req.params.id,
      name: req.body.name,
      class: req.body.year,
      Address: req.body.Address
    });
    res.json({
      message: "Student is added.",
      location: "/students/" + req.params.id
    });
  
    } else {
    students[updateIndex] = {
      id: req.params.id,
      name: req.body.name,
      class: req.body.class,
      Address: req.body.Address
    };
    res.json({
      message: "Student id " + req.params.id + " updated.",
      location: "/students/" + req.params.id
    });
  }
});

router.put("/:id", function(req, res) {
  var updateIndex = students
    .map(function(student) {
      return student.id;
    })
    .indexOf(parseInt(req.params.id));

  if (updateIndex === -1) {
    students.push({
      id: req.params.id,
      name: req.body.name,
      class: req.body.class,
      Address: req.body.Address
    });

    res.json({
      message: "Student is added.",
      location: "/students/" + req.params.id
    });
  
    } else {
    students[updateIndex] = {
      id: req.params.id,
      name: req.body.name,
      class: req.body.class,
      Address: req.body.Address
    };
    res.json({
      message: "Student id " + req.params.id + " updated.",
      location: "/students/" + req.params.id
    });
  }
});

router.delete("/:id", (req, res) => {
  let finder = students.findIndex(x => x.id == req.params.id);
  finder >= 0
    ? (students.splice(finder, 1), res.send("Student was removed."))
    : res.send("Student not found.");
});

module.exports = router;