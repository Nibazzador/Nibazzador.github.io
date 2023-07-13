//////////////////////////// COLOR THEME ////////////////////////////

// Sets theme class to HTML body.
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.body.classList.add("dark-theme");
} else {
  document.body.classList.add("light-theme");
}

//////////////////////////// NAV CARDS Z-INDEX ////////////////////////////

let cards = document.querySelectorAll(".nav-links > a");
let cardsOrder = Array.from(cards);
cards.forEach(function (card) {
  card.addEventListener("mouseover", function () {
    cardsOrder = cardsOrder.filter((c) => c !== card);
    cardsOrder.unshift(card);
    cardsOrder.forEach(
      (card) =>
        (cardsOrder[cardsOrder.indexOf(card)].style.zIndex = `${
          20 - cardsOrder.indexOf(card)
        }`)
    );
  });
});

/////////////////////////// LINK BUTTON /////////////////////////////////////
navButton = document.querySelector(".arrow-nav");

let observers = [];
let observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: [1],
};
const targets = [
  "#hero",
  "#nav",
  "#front-end",
  "#kuvaus",
  "#tyokokemus",
  "#yhteystiedot",
  "#mina",
  "#footer",
];
let callbackCount = 0;
const changeHref = (ez) => {
  if (ez !== "footer") {
    navButton.setAttribute("href", targets[targets.indexOf(`#${ez}`) + 1]);
    navButton.classList.remove("up");
  } else {
    navButton.setAttribute("href", "#hero");
    navButton.classList.add("up");
  }
};

intersectionCallback = (entries) => {
  entries.forEach((entry) => {
    changeHref(entry.target.id);
    callbackCount++;
    if (callbackCount === 8) {
      navButton.setAttribute("href", "#nav");
    }
  });
};
for (let i = 0; i < 8; i++) {
  observers[i] = new IntersectionObserver(
    intersectionCallback,
    observerOptions
  );
  observers[i].observe(document.querySelector(`${targets[i]}`));
}
navButton.addEventListener("click", () => {
  if (window.location.href.split("#")[1] === navButton.href.split("#")[1]) {
    changeHref(navButton.href.split("#")[1]);
  }
});

/////////////////////////// HIDE HEROPHOTO IF OVERLAPS TEXT /////////////////////////////////////
heroImg = document.querySelector(".hero-photo");
heroPara = document.querySelector(".hero-p");

window.addEventListener("resize", () => {
  if (window.innerWidth < 1281) {
    console.log("ASD");
    if (window.innerHeight * 0.4 < heroPara.getBoundingClientRect().bottom) {
      heroImg.style.display = "none";
    } else {
      heroImg.style.display = "block";
    }
  } else {
    heroImg.style.display = "block";
  }
});
