/* =========================
   THEME TOGGLE (Light / Dark)
========================= */
// theme button
const themeToggleBtn = document.getElementById("themeToggle");
// a function to change theme based on the theme name
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggleBtn.textContent = theme === "dark" ? "☀️ Theme" : "🌙 Theme";
}
// intiial the,e when the page is open 
(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    applyTheme(saved);
  } else {
    themeToggleBtn.textContent = "🌙 Theme";
  }
})();
// function call when the button is pressed
themeToggleBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(current === "light" ? "dark" : "light");
});


/* =========================
   SMOOTH SCROLLING
========================= */
// this is for jumping to a different section from the buttons in the naigation bar
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", () => setTimeout(() => a.blur(), 150));
});


/* =========================
   FORM INTERACTION 
========================= */
// get the elements in the form
const form = document.getElementById("contactMeForm");
const statusEl = document.getElementById("formStatus");
const nameInput = document.getElementById("nameInput");
// function to handle the submission from the user in the contact form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = (formData.get("name") || "").toString().trim();
  statusEl.textContent = "Sending...";
  statusEl.style.opacity = "0.9";
  setTimeout(() => {
    if (!name) {
      statusEl.textContent = "Please enter your name";
      nameInput.focus();
      return;
    }
    statusEl.textContent = `Thanks, ${name}! Your message was sent successfully.`;
    form.reset();
  }, 600);
});


/* =========================
   POPUP GREETING 
========================= */
// loading the name saved in the local storage and showing the greeting if the name is found, 
// otherwise show the popup to ask for the name
window.onload = function () {
  const savedName = localStorage.getItem("username");
  document.body.classList.add("overlay-active");
  const input = document.getElementById("popup-name");
  const button = document.querySelector(".popup-box button");
  if (savedName) {
    input.style.display = "none";
    button.style.display = "none";
    showGreetingOnly(savedName);
  }
};
// show a greeting message based on the time of the day + the name of the user saved already in the local storage
function getGreeting(name) {
  const hour = new Date().getHours();
  let message = "";
  if (hour < 12) message = "Good morning";
  else if (hour < 18) message = "Good afternoon";
  else message = "Good evening";
  return `${message}, ${name} 👋`;
}
// fetch the username from the localStorage + show the greeting message + hide the popup box after 2.5 seconds
function handleName() {
  const input = document.getElementById("popup-name").value;
  const text = document.getElementById("popup-text");
  if (input === "") {
    text.textContent = "❌ Please enter your name";
    return;
  }
  localStorage.setItem("username", input);
  text.textContent = getGreeting(input);
  document.getElementById("popup-name").style.display = "none";
  document.querySelector(".popup-box button").style.display = "none";
  setTimeout(() => {
    document.getElementById("overlay").classList.add("hidden");
    document.body.classList.remove("overlay-active"); 
}, 2500);
}
// this function is similar to the one above, but only used if the name is already saved in the local storage
function showGreetingOnly(name) {
  const text = document.getElementById("popup-text");
  text.textContent = getGreeting(name);
  document.getElementById("popup-name").style.display = "none";
  document.querySelector(".popup-box button").style.display = "none";
  setTimeout(() => {
    document.getElementById("overlay").classList.add("hidden");
    document.body.classList.remove("overlay-active"); 
}, 2500);
}