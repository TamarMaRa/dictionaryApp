const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const dictionary = require("./utils/dictionary");
const randomWord = require("./utils/randomWord");
const translate = require("./utils/translate");
const { text } = require("stream/consumers");
const { error } = require("console");

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirPath));
app.use(cors());
app.use(express.json());

app.get("", (req, res) => {
  res.render("index", {
    title: "Dictionary app",
    name: "Tamara Aldubi",
  });
});

app.get("/word", (req, res) => {
  const word = req.query.word;
  if (!word) {
    return res.send({
      error: "you must provide a search word",
    });
  }

  dictionary(word, (error, { definition, synonyms, antonyms } = {}) => {
    if (error) {
      return res.send({ error });
    }
    res.send({
      definition,
      synonyms,
      antonyms,
    });
  });
});

app.get("/random", (req, res) => {
  randomWord((error, randomWord) => {
    if (error) {
      return res.send({ error });
    }
    res.send({
      randomWord,
    });
  });
});

app.get("/api/translate", (req, res) => {
  translate(req.query, (error, { translation } = {}) => {
    if (error) {
      return res.send({ error });
    }
    res.send({
      translation,
    });
  });
});

app.listen(3001, () => {
  console.log("server on port 3001");
});
