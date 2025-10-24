const generate = document.getElementById("generate");
const formStarts = document.querySelector(".form-starts");
const formEnds = document.querySelector(".form-ends");
const presentDate = document.getElementById("present-date");

const fullNameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const githubInput = document.getElementById("github");
const avatarInput = document.getElementById("avatar");
const uploadBox = document.getElementById("uploadBox");

const ticketName = document.getElementById("ticket-name");
const ticketEmail = document.getElementById("ticket-email");
const ticketBottomName = document.getElementById("ticket-bottom-name");
const ticketGithub = document.getElementById("ticket-github");
const ticketAvatar = document.querySelector(".bottom-left img");
const ticketNumber = document.getElementById("ticket-number");

uploadBox.addEventListener('click', () => avatarInput.click());

avatarInput.addEventListener('change', (e) => {
    handleImageFile(e.target.files[0]);
});

uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.classList.add("dragover");
});

uploadBox.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadBox.classList.remove("dragover");
});

uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("dragover");
    handleImageFile(e.dataTransfer.files[0]);
});

function handleImageFile(file) {
    const belowInput = document.querySelector(".section-1 .below-img-input");
    const warnImage = belowInput.querySelector("img");
    const inputImg = document.querySelector(".img-input img");

    if (file && file.size <= 500 * 1024) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const uploadedSrc = event.target.result;

            inputImg.src = uploadedSrc;
            inputImg.style.objectFit = "cover";
            inputImg.style.borderRadius = "10px";
            inputImg.style.padding = "0px";
            ticketAvatar.src = uploadedSrc;
        };
        reader.readAsDataURL(file);

        belowInput.classList.remove("error");
        warnImage.style.filter = "none";
        belowInput.querySelector("p").textContent =
            "Upload your photo (JPG or PNG, max size: 500KB).";

    } else {
        belowInput.classList.add("error");
        belowInput.querySelector("p").textContent =
            "File too large. Please upload a valid photo under 500KB.";
        warnImage.style.filter = "invert(30%) sepia(88%) saturate(5668%) hue-rotate(0deg) brightness(50%) contrast(50%)";

    }
}

function generateRandomCode(){
    const randomPart = Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, '0');
    ticketNumber.textContent = `#0${randomPart}`;
}

const infoBoxes = document.querySelectorAll(".below-img-input");

generate.addEventListener('click', () => {

    const today = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    presentDate.textContent = today.toLocaleDateString('en-US', options) + ' / Austin, TX';

    const name = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const github = githubInput.value.trim();
    const imageUploaded = avatarInput.files.length > 0;

    const nameBox = fullNameInput.parentElement.nextElementSibling;
    const emailBox = emailInput.parentElement.nextElementSibling;
    const githubBox = githubInput.parentElement.nextElementSibling;

    infoBoxes.forEach((box) => {
        box.classList.remove("error");
    });

    let hasError = false;

    if (!imageUploaded) {
        const belowInput = document.querySelector(".section-1 .below-img-input");
        const warnImage = belowInput.querySelector("img");

        belowInput.classList.add("error");
        belowInput.querySelector("p").textContent = "Please upload your photo.";
        warnImage.style.filter = "hue-rotate(-20deg) brightness(1.8) saturate(2)";
        hasError = true;
    }

    const namePattern = /^[A-Za-z ]+$/;

    if (!name || !(namePattern.test(name))) {
        nameBox.classList.add("error");
        nameBox.querySelector("p").textContent = "Please enter a valid name";
        hasError = true;
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
        emailBox.classList.add("error");
        emailBox.querySelector("p").textContent = "Please enter a valid email address.";
        hasError = true;
    }

    if (!github) {
        githubBox.classList.add("error");
        githubBox.querySelector("p").textContent = "Please enter a valid github username";
        hasError = true;
    } else if (!github.startsWith("@")) {
        githubBox.classList.add("error");
        githubBox.querySelector("p").textContent =
            "GitHub username must start with '@'.";
        hasError = true;
    }

    if (hasError) return;

    ticketName.textContent = name;
    ticketEmail.textContent = email;
    ticketBottomName.textContent = name;
    if (github.startsWith('@')) {
        ticketGithub.textContent = github;
    } else {
        ticketGithub.textContent = `@${github}`;
    }

    formStarts.style.display = 'none';
    formEnds.style.display = 'flex';

    generateRandomCode();
});