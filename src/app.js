const path = require("path");
const express = require("express");
const app = express();
const dictionary = require("./utils/dictionary");
const randomWord = require("./utils/randomWord");

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirPath));

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

app.listen(3001, () => {
  console.log("server on port 3001");
});
