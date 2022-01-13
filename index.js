const express = require("express");
const pool = require("./crudrepository.js");
// const mysql = require("mysql");
const cors = require("cors");
const app = express();
const vocabulary = express.Router();
const Validator = require("jsonschema").Validator;
const validator = new Validator();

// Error message for status 500
const backendError = "Backend has made a mistake";

app.use(express.static("frontend/build"));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(`/vocabulary`, vocabulary);

const server = app.listen(8080, () => {
  console.log(`Listening on port ${server.address().port}`);
});

vocabulary.get(`/`, async (req, res) => {
  let result = await pool.findAll();
  res.send(result);
});

vocabulary.get(`/:id([0-9]+)`, async (req, res) => {
  let id = req.params.id;
  let resultId = await pool.findById(id);
  if (resultId.length === 0) {
    res.send("No item with such id exists: " + id);
  } else {
    res.send(resultId);
  }
});

vocabulary.get(`/:tag`, async (req, res) => {
  let tag = req.params.tag;
  let resultTag = await pool.findByTag(tag);
  if (resultTag.length === 0) {
    res.send("No item with such tag exists: " + tag);
  } else {
    res.send(resultTag);
  }
});

vocabulary.delete(`/:id([0-9]+)`, async (req, res) => {
  let id = req.params.id;
  await pool.deleteById(id);
  res.send("");
});

vocabulary.put("/:index([0-9]+)", async (req, res) => {
  try {
    let result = await pool.editById(req.params.index, req.body);
    res.send(result);
  } catch (err) {
    res.statusCode = 404;
    res.send(err);
  }
});

vocabulary.post(`/`, async (req, res) => {
  try {
    const schema = {
      type: "object",
      properties: {
        tag: { type: "string" },
        english: { type: "string" },
        finnish: { type: "string" },
      },
      require: ["tag", "english", "finnish"],
    };

    const validation = validator.validate(req.body, schema);
    if (validation.errors.length > 0) {
      res.status(400).send(validation.errors);
    } else {
      let vocabulary = await pool.save(
        req.body.tag,
        req.body.english,
        req.body.finnish
      );
      res.status(201).send({
        msg: vocabulary,
      });
    }
  } catch {
    res.status(500).send(backendError);
  }
});

const shutdown = () => {
  console.log(" !! Close signal received: closing HTTP server !!");
  server.close(() => {
    console.log("HTTP server closed");
    database.end(() => {
      console.log("Mysql connection closed");
      process.exit(0);
    });
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERMN", shutdown);
