const deepl = require("deepl-node");

const translate = (word, callback) => {
  const authKey = "c5e66b4a-8c85-4d76-9361-3f0f71533bea:fx";
  const deeplClient = new deepl.DeepLClient(authKey);

  deeplClient.translateText(word, null, "de").then((response, error) => {
    if (error) {
      callback("unable to connect to translate api", undefined);
    } else {
      callback(undefined, {
        translation: response.text,
      });
    }
  });
};

module.exports = translate;