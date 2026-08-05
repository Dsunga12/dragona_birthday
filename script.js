const memories = [
  ["assets/memory-01.jpg", "Note for photo 1", "Write your message for this photo here."],
  ["assets/memory-02.jpg", "Note for photo 2", "Write your message for this photo here."],
  ["assets/memory-03.jpg", "Note for photo 3", "Write your message for this photo here."],
  ["assets/memory-04.jpg", "Note for photo 4", "Write your message for this photo here."],
  ["assets/memory-05.jpg", "Note for photo 5", "Write your message for this photo here."],
  ["assets/memory-06.jpg", "Note for photo 6", "Write your message for this photo here."],
  ["assets/memory-07.jpg", "Note for photo 7", "Write your message for this photo here."],
  ["assets/memory-08.jpg", "Note for photo 8", "Write your message for this photo here."],
  ["assets/memory-09.jpg", "Note for photo 9", "Write your message for this photo here."],
  ["assets/memory-10.jpg", "Note for photo 10", "Write your message for this photo here."],
  ["assets/memory-11.jpg", "Note for photo 11", "Write your message for this photo here."],
  ["assets/memory-12.jpg", "Note for photo 12", "Write your message for this photo here."],
  ["assets/memory-13.jpg", "Note for photo 13", "Write your message for this photo here."],
  ["assets/memory-14.jpg", "Note for photo 14", "Write your message for this photo here."],
  ["assets/memory-15.jpg", "Note for photo 15", "Write your message for this photo here."],
  ["assets/memory-16.jpg", "Note for photo 16", "Write your message for this photo here."],
  ["assets/memory-17.jpg", "Note for photo 17", "Write your message for this photo here."],
  ["assets/memory-18.jpg", "Note for photo 18", "Write your message for this photo here."],
  ["assets/memory-19.jpg", "Note for photo 19", "Write your message for this photo here."],
  ["assets/memory-20.jpg", "Note for photo 20", "Write your message for this photo here."],
  ["assets/memory-21-final.jpg", "Last photo before the end", "Write your last photo message here before the thank-you ending."]
];

const questionScreen = document.getElementById("questionScreen");
const storyScreen = document.getElementById("storyScreen");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const photoStory = document.getElementById("photoStory");
const ending = document.getElementById("ending");
const photoFrame = document.getElementById("photoFrame");
const memoryPhoto = document.getElementById("memoryPhoto");
const progressText = document.getElementById("progressText");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const messageDraft = document.getElementById("messageDraft");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const musicModal = document.getElementById("musicModal");
const loveSong = document.getElementById("loveSong");
const playMusic = document.getElementById("playMusic");
const skipMusic = document.getElementById("skipMusic");
const songToggle = document.getElementById("songToggle");

let current = 0;

function moveNoButton() {
  const padding = 18;
  const maxX = window.innerWidth - noButton.offsetWidth - padding;
  const maxY = window.innerHeight - noButton.offsetHeight - padding;
  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noButton.classList.add("running");
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
}

function openStory() {
  questionScreen.classList.add("hidden");
  storyScreen.classList.remove("hidden");
  musicModal.classList.remove("hidden");
  showMemory(0);
}

function showMemory(index) {
  current = Math.max(0, Math.min(index, memories.length - 1));
  const [image, title, text] = memories[current];
  const savedText = localStorage.getItem(`memory-note-${current}`) || text;

  photoFrame.classList.add("changing");

  window.setTimeout(() => {
    memoryPhoto.src = image;
    memoryPhoto.alt = title;
    progressText.textContent = `Photo ${current + 1} of ${memories.length}`;
    messageTitle.textContent = title;
    messageText.textContent = savedText;
    messageDraft.value = savedText;
    backButton.disabled = current === 0;
    nextButton.textContent = current === memories.length - 1 ? "Go to the end" : "Next photo";
    photoFrame.classList.remove("changing");
  }, 180);
}

function goNext() {
  if (current >= memories.length - 1) {
    photoStory.classList.add("hidden");
    ending.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  showMemory(current + 1);
}

function goBack() {
  showMemory(current - 1);
}

function playSong() {
  loveSong.play().then(() => {
    musicModal.classList.add("hidden");
    songToggle.classList.remove("hidden");
    songToggle.textContent = "Pause song";
  }).catch(() => {
    musicModal.classList.add("hidden");
  });
}

function toggleSong() {
  if (loveSong.paused) {
    loveSong.play();
    songToggle.textContent = "Pause song";
  } else {
    loveSong.pause();
    songToggle.textContent = "Play song";
  }
}

yesButton.addEventListener("click", openStory);
noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
});
noButton.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

photoFrame.addEventListener("click", goNext);
nextButton.addEventListener("click", goNext);
backButton.addEventListener("click", goBack);

messageDraft.addEventListener("input", () => {
  memories[current][2] = messageDraft.value;
  localStorage.setItem(`memory-note-${current}`, messageDraft.value);
  messageText.textContent = messageDraft.value || "Write your message for this photo here.";
});

playMusic.addEventListener("click", playSong);
skipMusic.addEventListener("click", () => musicModal.classList.add("hidden"));
songToggle.addEventListener("click", toggleSong);

restartButton.addEventListener("click", () => {
  ending.classList.add("hidden");
  photoStory.classList.remove("hidden");
  showMemory(0);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

showMemory(0);
