console.log("client side js file loaded");

const searchBtn = document.getElementById("search-btn");
const randomBtn = document.getElementById("random-btn");
const translateBtn = document.getElementById("translate-btn");

const input = document.getElementById("input-search");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
const messageThree = document.getElementById("message-3");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const searchWord = input.value;
  messageOne.textContent = "loading...";
  messageTwo.textContent = "";
  messageThree.textContent = "";
  translateBtn.style.display = "none";

  fetch("http://localhost:3001/word?word=" + searchWord).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }

      let synonyms = data.synonyms.length !== 0 ? data.synonyms : "no results";
      let antonyms = data.antonyms.length !== 0 ? data.antonyms : "no results";
      messageOne.textContent = "definition: " + data.definition;
      messageTwo.textContent = "synonyms: " + synonyms;
      messageThree.textContent = "antonyms: " + antonyms;
      translateBtn.style.display = "inline";
    });
  });
});

randomBtn.addEventListener("click", (e) => {
  e.preventDefault();

  input.setAttribute("placeholder", "loading...");
  messageOne.textContent = "";
  messageTwo.textContent = "";
  messageThree.textContent = "";
  translateBtn.style.display = "none";

  fetch("http://localhost:3001/random").then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }

      input.value = data.randomWord.randomWord;
    });
  });
});

translateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const messages = new URLSearchParams();
  messages.append("word1", messageOne.textContent);
  messages.append("word2", messageTwo.textContent);
  messages.append("word3", messageThree.textContent);

  fetch("http://localhost:3001/translate?" + messages.toString(), {
    method: "GET",
  }).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      } else {
        messageOne.textContent = data.translation[0].text;
        messageTwo.textContent = data.translation[1].text;
        messageThree.textContent = data.translation[2].text;
        translateBtn.style.display = "none";
      }
    });
  });
});
