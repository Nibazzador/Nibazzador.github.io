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
  // 1281 = media query to different layout.
  if (window.innerWidth < 1281) {
    if (window.innerHeight * 0.4 < heroPara.getBoundingClientRect().bottom) {
      heroImg.style.display = "none";
    } else {
      heroImg.style.display = "block";
    }
  } else {
    // Without this img stays hidden when media query kicks in.
    heroImg.style.display = "block";
  }
});

//////////////////////////// NAV CARDS Z-INDEX ////////////////////////////

const cards = document.querySelectorAll(".nav-links > a");
let cardsOrder = Array.from(cards);
cards.forEach(function (card) {
  card.addEventListener("mouseover", function () {
    // Deletes just hovered card and then adds it to first position.
    cardsOrder = cardsOrder.filter((c) => c !== card);
    cardsOrder.unshift(card);
    // Sets z-index for every card with formula: 20-index of card in cardsOrder array.
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
    if (section.getBoundingClientRect().top <= 16) {
      activeIndex = targets.indexOf(`#${section.id}`);
    }
  });
  // Now activeIndex is the index of last section that is on/above screen.
  navButton.href = targets[activeIndex + 1];

  // If whole footer is shown.
  if (
    Math.round(sections[7].getBoundingClientRect().bottom) ===
    window.innerHeight
  ) {
    navButton.href = "#hero";
    navButton.classList.add("up");
  } else {
    navButton.classList.remove("up");
  }
  if (navButton.href.slice(navButton.href.lastIndexOf("/")) === "/undefined") {
    // Happens if footer takes 100% of screen.
    navButton.href = "#hero";
    navButton.classList.add("up");
  }
});

navButton.addEventListener("click", () => {
  const currentSectionIndex = targets.indexOf(
    navButton.href.slice(navButton.href.lastIndexOf("#"))
  );
  // Changes href to next section if href = current section where user is.
  // Happens when user has used navButton but hasn't scrolled since.
  // Numbers are for different rems, since scroll-padding-top is 1rem.
  if (
    sections[currentSectionIndex].getBoundingClientRect().top < 100 &&
    0 < sections[currentSectionIndex].getBoundingClientRect().top
  ) {
    navButton.href = `#${sections[currentSectionIndex + 1].id}`;
  }
});
