const express = require("express");

const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("build"));

app.get("/info", (req, res) => {
  const numberOfEntries = Person.countDocuments({}).then((number) => number);
  res.send(`The phonebook has info of ${numberOfEntries} people.
  ${new Date()}`);
});

app.post("/api/people", (req, res, next) => {
  const { body } = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name or number missing",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  return person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((err) => next(err));
});

app.get("/api/people", (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people);
    })
    .catch((err) => next(err));
});

app.get("/api/people/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person);
    })
    .catch((err) => next(err));
});

app.put("/api/people/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((newPerson) => res.json(newPerson))
    .catch((err) => next(err));
});

app.delete("/api/people/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (err, res, req, next) => {
  console.log(err);

  if (err.name === "CastError") {
    res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    res.status(400).send({ error: err.message });
  } else {
    next(err);
  }
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}...`);
});
