form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  processJokeRequest(e.target);
});

function editPage() {
  const temporaryInfo = document.getElementById("temporary-info");
  if (temporaryInfo) {
    temporaryInfo.remove();
  }
  const oldJokes = document.getElementsByClassName("jokes")[0];
  oldJokes.remove();
  const jokesElement = document.createElement("section");
  jokesElement.classList.add("jokes");
  const element = document.getElementById("main");
  element.appendChild(jokesElement);
}

function getDataFromForm(data) {
  const formData = new FormData(data);
  return Object.fromEntries(formData);
}

function buildUrl(userInput) {
  let url = "";
  userInput.category === "all"
    ? (url = "https://api.chucknorris.io/jokes/random")
    : (url = `https://api.chucknorris.io/jokes/random?category=${userInput.category}`);
  return url;
}

async function requestJoke(url) {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  return jsonResponse.value;
}

function editNames(joke, names) {
  joke = joke.replaceAll(/Chuck/gi, names.firstName);
  if (names.lastName) {
    joke = joke.replaceAll(/Norris'/gi, `${names.lastName}'s`);
    joke = joke.replaceAll(/Norris/gi, names.lastName);
  } else {
    joke = joke.replaceAll(/ Norris'/gi, "'s");
    joke = joke.replaceAll(/ Norris/gi, "");
  }
  addToPage(joke);
}

function addToPage(joke) {
  const para = document.createElement("p");
  para.classList.add("joke");
  const node = document.createTextNode(joke);
  para.appendChild(node);
  const element = document.getElementsByClassName("jokes")[0];
  element.appendChild(para);
}

async function processJokeRequest(formData) {
  editPage();
  userInput = getDataFromForm(formData);
  url = buildUrl(userInput);
  for (let i = 0; i < 10; i++) {
    joke = await requestJoke(url);
    editNames(joke, userInput);
  }
}
