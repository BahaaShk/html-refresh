const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input" , () => {
  lengthDisplay.textContent = lengthSlider.value
})

generateButton.addEventListener("click", makePassword)

function makePassword() {
  const length = Number(lengthSlider.value);
  const includeUppercase = uppercaseCheckbox.checked
  const includeLowercase = lowercaseCheckbox.checked
  const includeNumbers = numbersCheckbox.checked
  const includeSymbols = symbolsCheckbox.checked

  if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
    alert('Please check at least 1 of the options');
    return 
  }

  const newPassword = createRandomPassword(length, includeUppercase, includeLowercase, includeNumbers,includeSymbols);

  passwordInput.value = newPassword
  updateStrengthMeter(newPassword)
}

function updateStrengthMeter(password){
  const passwordLength = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

  let strengthScore = 0;
  strengthScore += Math.min(passwordLength * 2, 40)

  if(hasUppercase) strengthScore += 15;
  if(hasLowercase) strengthScore += 15;
  if(hasNumbers) strengthScore += 15;
  if(hasSymbols) strengthScore += 15;

  if(passwordLength < 8){
    strengthScore = Math.min(strengthScore, 40)
  }

  const safeScore = Math.max(5, Math.min(100, strengthScore))
  strengthBar.style.width = safeScore + "%";
  let strengthLabelText = "";
  let barColor = "";

  if(strengthScore < 40){
    //weak password
    barColor = "#fc8181"
    strengthLabelText = "Weak"
  } else if (strengthScore < 70){
        //medium password
    barColor = "#fbd38d"
    strengthLabelText = "Medium"
  } else {
    //Strong password
    barColor = "#68d391"
    strengthLabelText = "Strong"
  }

  strengthBar.style.backgroundColor = barColor;
  strengthLabel.textContent = strengthLabelText
}

function createRandomPassword(length, includeUppercase,includeLowercase, includeNumbers, includeSymbols){
let allCharacters = "";

if(includeUppercase) allCharacters += uppercaseLetters;
if(includeLowercase) allCharacters += lowercaseLetters;
if(includeNumbers) allCharacters += numberCharacters;
if(includeSymbols) allCharacters += symbolCharacters;

let password = '';

for(let i = 0; i < length; i++){
  const randomIndex = Math.floor(Math.random() * allCharacters.length);
  password += allCharacters[randomIndex]
}

return password
}

window.addEventListener('DOMContentLoaded', makePassword)

copyButton.addEventListener("click" , () => {
  if(!passwordInput.value) return

  navigator.clipboard.writeText(passwordInput.value).then(() => showCopySuccess()).catch((error) => console.log("could not copy: ", error))
})

function showCopySuccess() {
   copyButton.classList.remove("far", "fa-copy")
  copyButton.classList.add("fas", "fa-check")
  copyButton.style.color = "#48bb78";

  setTimeout(() => {
  copyButton.classList.remove("fas", "fa-check")
  copyButton.classList.add("far", "fa-copy")
  copyButton.style.color = ""
  }, 2000)
}