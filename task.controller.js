const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
  const task = {
    description: req.body.description,
    completed: req.body.completed || false,
  };

  Task.create(task)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occurred",
      });
    });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  Task.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error Occurred" });
    });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
  Task.findOne({ where: { id: req.params.id} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred"
      });
    });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;


  Task.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Task was updated successfully." });
      } else {
        res.send({ message: `Cannot update Task` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating Task with id=" + id });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Task was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Task` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Task with id=" + id });
    });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => { };

// Find all published Tasks
exports.findAllPublished = (req, res) => { };