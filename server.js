const express = require("express");
const fs = require("fs");
const path = require("path");
const { json } = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
let note = require("./db/db.json") || [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

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
  req.body.id = note.length + 1;

  note.push(req.body);

  fs.writeFileSync("./db/db.json", JSON.stringify(note));
  res.end();
});

app.delete("/api/notes/:id", function (req, res) {
  fs.writeFileSync("./db/db.json", JSON.stringify(note));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
