const deepl = require("deepl-node");

const translate = ({ word1, word2, word3 }, callback) => {
  const authKey = "c5e66b4a-8c85-4d76-9361-3f0f71533bea:fx";
  const deeplClient = new deepl.DeepLClient(authKey);

  deeplClient
    .translateText([word1, word2, word3], null, "HE")
    .then((response, error) => {
      if (error) {
        callback("unable to connect to translate api", undefined);
      } else {
        callback(undefined, {
          translation: response,
        });
      }
    });
};

module.exports = translate;
