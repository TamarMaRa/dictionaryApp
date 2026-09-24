const axios = require("axios");

const dictionary = (searchWord, callback) => {
  const url =
    "https://freedictionaryapi.com/api/v1/entries/en/" +
    encodeURIComponent(searchWord);

  axios
    .get(url)
    .then((res) => {
      if (res.data.entries.length === 0) {
        return callback(
          "word doesnt exists in my dictionary, try another search",
          undefined,
        );
      }
      const dir = res.data.entries[0].senses[0];
      callback(undefined, {
        definition: dir.definition,
        synonyms: dir.synonyms,
        antonyms: dir.antonyms,
      });
    })
    .catch((error) => {
      callback("unable to connect to dictionary", undefined);
    });
};

module.exports = dictionary;
