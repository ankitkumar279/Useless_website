let scanBtn = document.getElementById("scanBtn");
let fakePopup = document.getElementById("fakeCameraPopup");
let scanSection = document.getElementById("scanSection");
let progressBar = document.getElementById("progressBar");
let resultSection = document.getElementById("resultSection");
let moodResult = document.getElementById("moodResult");
let historyList = document.getElementById("historyList");
let clearHistory = document.getElementById("clearHistory");
let pieChart = document.getElementById("pieChart");

let moods = [
    "You are 90% confused.",
    "Your vibe today: no good.",
    "You are 70% hungry.",
    "Your brain is loading... please wait haha.",
    "You look lost but in a cute face today",
    "Your energy: ERROR 404 not found",
    "You are 100% done with life today"
];

function showHistory() {
    historyList.innerHTML = "";
    let saved = JSON.parse(localStorage.getItem("moodHistory")) || [];
    saved.forEach(function(item) {
        let li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

scanBtn.onclick = function() {
    fakePopup.classList.remove("hidden");
    fakePopup.textContent = "Accessing your camera... wait";

    setTimeout(function() {
        fakePopup.textContent = "Just kidding! haha";
    }, 1500);

    setTimeout(function() {
        fakePopup.classList.add("hidden");
        scanSection.classList.remove("hidden");
        startScan();
    }, 2500);
};

function startScan() {
    progressBar.style.width = "0px";
    let width = 0;
    let interval = setInterval(function() {
        width += 10;
        progressBar.style.width = width + "px";
        if (width >= 200) {
            clearInterval(interval);
            showResult();
        }
    }, 200);
}

function showResult() {
    scanSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    let randomMood = moods[Math.floor(Math.random() * moods.length)];
    moodResult.textContent = randomMood;

    let history = JSON.parse(localStorage.getItem("moodHistory")) || [];
    history.push(randomMood);
    localStorage.setItem("moodHistory", JSON.stringify(history));

    showHistory();
    drawChart();
    speakMood(randomMood);
}

function drawChart() {
    let ctx = pieChart.getContext("2d");
    ctx.clearRect(0, 0, pieChart.width, pieChart.height);

    let random = Math.floor(Math.random() * 100) + 1;
    let angle = (random / 100) * 2 * Math.PI;

    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.arc(100, 100, 100, 0, angle);
    ctx.fillStyle = "green";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.arc(100, 100, 100, angle, 2 * Math.PI);
    ctx.fillStyle = "lightgray";
    ctx.fill();
}

function speakMood(text) {
    if ("speechSynthesis" in window) {
        let msg = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(msg);
    }
}

clearHistory.onclick = function() {
    localStorage.removeItem("moodHistory");
    showHistory();
};

showHistory();
