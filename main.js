// todo list start
const inputBox = document.querySelector(".box-2-todo-input");
const listContainer = document.querySelector(".box-2-todo-ul");
const formTodo = document.querySelector(".box-2-todo-form");

formTodo.addEventListener("submit", function addTask(e) {
  e.preventDefault();
  if (inputBox.value === "") {
    alert("You should write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
});

listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function loadData() {
  listContainer.innerHTML = localStorage.getItem("data");
}

loadData();

//  todo list end

// quote API start
const quoteElement = document.querySelector(".box-1-quote");

fetch("https://api.quotable.io/random?maxLength=35")
  .then((response) => response.json())
  .then((data) => {
    // Process and display the received quote data
    const quote = data.content;
    quoteElement.textContent = quote;
    // console.log(quote.length);
  });
// quote API end

// time and date start
const date = document.querySelector(".box-1-time");
function updateTime() {
  const newDate = new Date();
  // const localTime = newDate.toLocaleTimeString();
  const hr = newDate.getHours();
  const min = newDate.getMinutes();
  const time = hr + ":" + min;
  date.textContent = time;
}

setInterval(updateTime, 1000);
// time and date end

// password generator start

const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function getLowercase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  const len = lenEl.value;

  let password = "";

  if (upperEl.checked) {
    password += getUppercase();
  }

  if (lowerEl.checked) {
    password += getLowercase();
  }

  if (numberEl.checked) {
    password += getNumber();
  }

  if (symbolEl.checked) {
    password += getSymbol();
  }

  for (let i = password.length; i < len; i++) {
    const x = generateX();
    password += x;
  }

  pwEl.innerText = password;
}

function generateX() {
  const xs = [];
  if (upperEl.checked) {
    xs.push(getUppercase());
  }

  if (lowerEl.checked) {
    xs.push(getLowercase());
  }

  if (numberEl.checked) {
    xs.push(getNumber());
  }

  if (symbolEl.checked) {
    xs.push(getSymbol());
  }

  if (xs.length === 0) return "";

  return xs[Math.floor(Math.random() * xs.length)];
}

generateEl.addEventListener("click", generatePassword);

copyEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = pwEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

// password generator end

// Desktop wallpaper start

const imageGallery = document.querySelector(".image-gallery");
const nextImg = document.querySelector(".next-img");

const img = document.createElement("img");
img.classList.add("new-image");
let currentImageIndex = 0;
const imageUrls = ["https://picsum.photos/1920/1080"];

img.src = imageUrls[currentImageIndex];
imageGallery.appendChild(img);

nextImg.onclick = () => {
  currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
  fetch(imageUrls[currentImageIndex])
    .then((response) => {
      img.src = response.url;
    })
    .catch((error) => console.error(error));
};

// Desktop wallpaper end

// switch toggle button start

function toggleDarkMode() {
  const body = document.body;
  const box1 = document.querySelector(".box-1");
  const box2Todo = document.querySelector(".box-2-todo");
  const box2Gallery = document.querySelector(".box-2-gallery");
  const box3PwContainer = document.querySelector(".pw-container");
  body.classList.toggle("dark-mode-body");
  box1.classList.toggle("dark-mode");
  box2Todo.classList.toggle("dark-mode");
  box2Gallery.classList.toggle("dark-mode");
  box3PwContainer.classList.toggle("dark-mode");
}

// switch toggle button end
