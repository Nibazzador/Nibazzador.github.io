//////////////////////////// COLOR THEME ////////////////////////////

// List of all imgs that needs to change with theme
const changeableImages = document.querySelectorAll(
  "nav>a>img, #arrow-nav-icon"
);
// !!!IMPORTANT!!!  NAMES OF IMAGES SOURCES NEEDS TO END IN "-dark" AND "-light"  !!!IMPORTANT!!!

// Sets theme class to HTML body.
if (window.matchMedia("(prefers-color-scheme: dark)")) {
  document.body.classList.add("dark-theme");
} else {
  document.body.classList.add("light-theme");
}

const theme = document.body.classList.contains("light-theme")
  ? "light"
  : "dark"; // Gets the current theme to use it in image sources
changeableImages.forEach((image) => {
  // Logic explained: new source = old source from 0 until last "-" (file name) + "-" + theme (dark or light) + from last "." to the end (file format).
  image.src = `${image.src.slice(
    0,
    image.src.lastIndexOf("-")
  )}-${theme}${image.src.slice(image.src.lastIndexOf("."))}`;
});
