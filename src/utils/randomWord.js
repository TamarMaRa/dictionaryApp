const request = require("request");

const randomWord = (callback) => {
  const url =
    "https://random-words-api.kushcreates.com/api?language=en&words=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to random word api", undefined);
    } else {
      callback(undefined, {
        randomWord: body.word,
      });
    }
  });
};

module.exports = randomWord;
