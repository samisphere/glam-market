import { getUser } from "../../data/user.js";

const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const emailField = document.querySelector(".js-email");
const passwordField = document.querySelector(".js-password");
const loginButton = document.querySelector(".login-button");

loginButton.addEventListener("click", () => {
  if (emailInput.value.trim() === "") {
    emailField.classList.add("empty");
  } else {
    emailField.classList.remove("empty");
  }
  if (passwordInput.value === "") {
    passwordField.classList.add("empty");
  } else {
    passwordField.classList.remove("empty");
  }
  if (emailInput.value.trim() === "" || passwordInput.value === "") {
    return;
  }
  const matchingUser = getUser(emailInput.value, passwordInput.value);
  if (!matchingUser) {
    document.querySelector(".error-message").style.display = "flex";
  } else {
    sessionStorage.setItem('loggedInUser', JSON.stringify(matchingUser))
    window.location.href = '../../glam_market.html'
    document.querySelector(".error-message").style.display = "none";
    console.log(`hello ${matchingUser.fullName}`);
    
  }
});


//removing error message
emailInput.addEventListener('input', () => {
  document.querySelector(".error-message").style.display = "none";
  emailField.classList.remove("empty");
})
passwordInput.addEventListener('input', () => {
  document.querySelector(".error-message").style.display = "none";
  passwordField.classList.remove("empty");
})

//password eye icon
const eyeButton = document.querySelector(".eye");
eyeButton.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    eyeButton.innerHTML = `<img src="../../assets/images/icons/open-eye.svg" alt="" />`;
    passwordInput.type = "text";
  } else if (passwordInput.type === "text") {
    eyeButton.innerHTML = `<img src="../../assets/images/icons/closed-eye.svg" alt="" />`;
    passwordInput.type = "password";
  }
});
