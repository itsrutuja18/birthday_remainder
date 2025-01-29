// Function to save DOB & time to localStorage
function saveDOB() {
    let dob = document.getElementById("dobInput").value;
    if (dob) {
        localStorage.setItem("dob", dob);
        alert("Your DOB & Time have been saved!");
    } else {
        alert("Please enter a valid date and time.");
    }
}

// Function to check if today is the user's birthday at the saved time
function checkBirthday() {
    let savedDOB = localStorage.getItem("dob");
    if (!savedDOB) return; // Exit if no DOB is saved

    let now = new Date();
    let birthDate = new Date(savedDOB);

    // Check if the day, month, hour, and minute match
    if (
        now.getDate() === birthDate.getDate() &&
        now.getMonth() === birthDate.getMonth() &&
        now.getHours() === birthDate.getHours() &&
        now.getMinutes() === birthDate.getMinutes()
    ) {
        playHappyBirthday();
    } else {
        updateCountdown(birthDate);
    }
}

// Function to play Happy Birthday song
function playHappyBirthday() {
    let audio = new Audio("happy_birthday.mp3"); // Ensure this file exists
    audio.play();
    alert("🎉 Happy Birthday! 🎂🎶");
    launchConfetti(); // Trigger confetti animation
}

// Function to update countdown until birthday
function updateCountdown(birthDate) {
    let now = new Date();
    let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate(), birthDate.getHours(), birthDate.getMinutes());

    // If the birthday has passed this year, set for next year
    if (now > nextBirthday) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    let timeLeft = nextBirthday - now;

    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    console.log(`🎂 Countdown: ${days} days, ${hours} hours, ${minutes} minutes left`);
}

// Confetti animation (basic effect)
function launchConfetti() {
    let confettiDiv = document.createElement("div");
    confettiDiv.innerHTML = "🎉🎊🎈";
    confettiDiv.style.fontSize = "50px";
    confettiDiv.style.position = "fixed";
    confettiDiv.style.top = "20%";
    confettiDiv.style.left = "50%";
    confettiDiv.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(confettiDiv);

    setTimeout(() => {
        confettiDiv.remove();
    }, 5000);
}

// Run check every minute
setInterval(checkBirthday, 60000);
