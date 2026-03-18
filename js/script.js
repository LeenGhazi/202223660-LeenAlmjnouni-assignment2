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

