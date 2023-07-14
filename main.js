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

/////////////////////////// HIDE HEROPHOTO IF OVERLAPS TEXT /////////////////////////////////////
heroImg = document.querySelector(".hero-photo");
heroPara = document.querySelector(".hero-p");

window.addEventListener("resize", () => {
  if (window.innerWidth < 1281) {
    if (window.innerHeight * 0.4 < heroPara.getBoundingClientRect().bottom) {
      heroImg.style.display = "none";
    } else {
      heroImg.style.display = "block";
    }
  } else {
    heroImg.style.display = "block";
  }
});

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
const navButton = document.querySelector(".arrow-nav");

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

const sections = document.querySelectorAll(targets);

let activeIndex = 0;

window.addEventListener("scroll", () => {
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 0) {
      activeIndex = targets.indexOf(`#${section.id}`);
    }
  });
  navButton.href = targets[activeIndex + 1];
  if (
    targets[activeIndex + 1] === "#footer" ||
    navButton.href.slice(navButton.href.lastIndexOf("/")) === "/undefined"
  ) {
    if (
      Math.round(sections[7].getBoundingClientRect().bottom) ===
      window.innerHeight
    ) {
      navButton.href = "#hero";
      navButton.classList.add("up");
    } else {
      navButton.classList.remove("up");
    }
  } else {
    navButton.classList.remove("up");
  }
});

navButton.addEventListener("click", () => {
  const currentSectionIndex = targets.indexOf(
    navButton.href.slice(navButton.href.lastIndexOf("#"))
  );
  if (sections[currentSectionIndex].getBoundingClientRect().top === 16) {
    navButton.href = `#${sections[currentSectionIndex + 1].id}`;
  }
});
