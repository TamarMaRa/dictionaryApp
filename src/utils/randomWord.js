const axios = require("axios");

const randomWord = (callback) => {
  const url =
    "https://random-words-api.kushcreates.com/api?language=en&words=1";

  axios
    .get(url)
    .then((res) => {
      callback(undefined, {
        randomWord: res.data[0].word,
      });
    })
    .catch((error) => {
      callback("unable to connect to random word api", undefined);
    });
};

module.exports = randomWord;
