const express = require("express");
const { fstat } = require("fs");
const path = require("path");
const { json } = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const note = require("./db/db.json") || [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (_, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (_, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (_, res) {
  res.json(note);
});

app.post("/api/notes", function (req, res) {
  req.body.length = note.length;
  note.push(req.body);

  fs.writeFileSync("./db/db.json", JSON.stringify(note));
  res.end();
});

app.delete("/api/notes/:id", function (req, res) {
  let id = +req.params.id;

  note = note.filter(function (elem) {
    return elem.id !== id;
  });

  fs.writeFileSync("./db/db.json", JSON.stringify(note));
  res.json(note);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
