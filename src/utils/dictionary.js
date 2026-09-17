const request = require("request");

const dictionary = (searchWord, callback) => {
  const url =
    "https://freedictionaryapi.com/api/v1/entries/en/" +
    encodeURIComponent(searchWord);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to dictionary", undefined);
    } else if (body.entries.length === 0) {
      callback("word doesnt exists, try another search", undefined);
    } else {
      const dir = body.entries[0].senses[0];
      callback(undefined, {
        definition: dir.definition,
        synonyms: dir.synonyms,
        antonyms: dir.antonyms,
      });
    }
  });
};

module.exports = dictionary;
