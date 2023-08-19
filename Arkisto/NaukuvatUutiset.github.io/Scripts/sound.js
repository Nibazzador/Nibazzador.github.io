let naukaisu = new Audio("../Media/Sounds/Meow.ogg");
function meow() {
  naukaisu.play();
}

window.onload = function () {
  let divs = document.getElementsByTagName("div");
  for (div of divs) {
    div.addEventListener("mouseover", meow);
  }
  let articles = document.getElementsByTagName("article");
  for (article of articles) {
    article.addEventListener("mouseover", meow);
  }
  let sections = document.getElementsByTagName("section");
  for (section of sections) {
    section.addEventListener("mouseover", meow);
  }
  let iframes = document.getElementsByTagName("iframe");
  for (iframe of iframes) {
    iframe.addEventListener("mouseover", meow);
  }
};
