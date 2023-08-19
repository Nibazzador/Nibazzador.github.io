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

// /////////////////////////// HIDE HEROPHOTO IF OVERLAPS TEXT /////////////////////////////////////
// heroImg = document.querySelector(".hero-photo");
// heroPara = document.querySelector(".hero-p");

// const checkOverlap = () => {
//   // 1281 & 500 = media query to different layout.
//   if (window.innerWidth < 1281 || window.innerHeight < 500) {
//     if (window.innerHeight * 0.4 < heroPara.getBoundingClientRect().bottom) {
//       heroImg.style.display = "none";
//     } else {
//       heroImg.style.display = "block";
//     }
//   } else {
//     // Without this img stays hidden when media query kicks in.
//     heroImg.style.display = "block";
//   }
// };
// checkOverlap();
// window.addEventListener("resize", checkOverlap);

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

  // HERO IMG OPACITY
  // heroImg.style.opacity = `${Math.floor(
  //   100 - (document.documentElement.scrollTop / window.innerHeight) * 200
  // )}%`;
  // heroImg.style.top = `${Math.floor(
  //   window.innerHeight * 0.4 +
  //     (document.documentElement.scrollTop / window.innerHeight) * 500
  // )}px`;
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
  if (
    navButton.href.slice(navButton.href.lastIndexOf("#")) === "#nav" &&
    window.matchMedia("(min-width: 1281px) and (pointer: fine)").matches
  ) {
    document.getElementsByTagName("html")[0].style.scrollPaddingTop = "0";
  } else {
    document.getElementsByTagName("html")[0].style.scrollPaddingTop = "1rem";
  }
});

//////////////////////////////// PHOTOGALLERY ///////////////////////
const overlay = document.getElementsByClassName("overlay")[0];
const overlayPhoto = document.getElementsByClassName("overlay-photo")[0];
const counterImg = document.getElementsByClassName("counter-img")[0];
const close = document.getElementsByClassName("close")[0];
const prevImg = document.getElementsByClassName("prev-img")[0];
const nextImg = document.getElementsByClassName("next-img")[0];
const loadingBalls = document.querySelectorAll(".loading-ball");

close.addEventListener("click", () => {
  overlayPhoto.innerHTML = "";
  overlay.style.display = "none";
});
prevImg.addEventListener("click", () => {
  let goToNumber = currentNumber + 1;
  if (goToNumber === 25) {
    goToNumber = 1;
  }
  addOverlay(`${goToNumber}.jpg`);
});
nextImg.addEventListener("click", () => {
  let goToNumber = currentNumber - 1;
  if (goToNumber === 0) {
    goToNumber = 24;
  }
  addOverlay(`${goToNumber}.jpg`);
});

const addOverlay = (goTo) => {
  currentNumber = parseInt(goTo.slice(0, goTo.lastIndexOf(".")));

  overlay.style.display = "block";
  overlayPhoto.innerHTML = "";

  counterImg.textContent = `${25 - currentNumber} / 24`;

  const img = document.createElement("img");
  img.setAttribute("src", `Media/Photos/${goTo}`);
  img.setAttribute(
    "srcset",
    `Media/Photos/${currentNumber}-216w.jpg   216w,
    Media/Photos/${currentNumber}-432w.jpg   432w,
    Media/Photos/${currentNumber}-864w.jpg   864w,
    Media/Photos/${currentNumber}-1296w.jpg 1296w,
    Media/Photos/${currentNumber}.jpg       2592w`
  );
  img.setAttribute("alt", "Ottamani kuva");
  overlayPhoto.appendChild(img);
  const loaded = () => {
    img.classList.add("loaded");
    loadingBalls.forEach((ball) => {
      ball.style.display = "none";
    });
  };
  if (img.complete) {
    loaded();
  } else {
    img.addEventListener("load", loaded);
    loadingBalls.forEach((ball) => {
      ball.style.display = `block`;
    });
  }
};

const imgs = document.querySelectorAll(".img-div > img");
imgs.forEach(function (img) {
  const loaded = () => {
    img.classList.add("loaded");
  };
  if (img.complete) {
    loaded();
  } else {
    img.addEventListener("load", loaded);
  }
  img.addEventListener("click", () => {
    addOverlay(img.src.slice(img.src.lastIndexOf("/") + 1));
  });
});
