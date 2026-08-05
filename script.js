const memories = [
  {
    image: "assets/memory-01.jpg",
    title: "A beautiful chapter away from home",
    text: "Even in another country, I still feel lucky to stand beside you and collect moments that feel like home."
  },
  {
    image: "assets/memory-02.jpg",
    title: "The way you look at me",
    text: "This kind of look reminds me that love does not always need big words. Sometimes it is just us, smiling quietly."
  },
  {
    image: "assets/memory-03.jpg",
    title: "Tourist days with my favorite person",
    text: "Every place becomes more special when I get to experience it with you."
  },
  {
    image: "assets/memory-04.jpg",
    title: "Close enough for one picture",
    text: "Moments like this make all the waiting feel worth it."
  },
  {
    image: "assets/memory-05.jpg",
    title: "Simple days, happy hearts",
    text: "I love the easy memories too, the ones where we are just being ourselves."
  },
  {
    image: "assets/memory-06.jpg",
    title: "Still playful, still us",
    text: "I hope we never lose this kind of joy, even when life gets serious."
  },
  {
    image: "assets/memory-07.jpg",
    title: "The kind of night I remember",
    text: "There are memories that feel soft and bright at the same time. This is one of them."
  },
  {
    image: "assets/memory-08.jpg",
    title: "My arms will always be home",
    text: "If I could hold you every day, I would. Until then, I keep these moments close."
  },
  {
    image: "assets/memory-09.jpg",
    title: "Proud of you, always",
    text: "Watching you grow and shine makes me proud in ways I cannot fully explain."
  },
  {
    image: "assets/memory-10.jpg",
    title: "Your wins are my joy",
    text: "I will always celebrate you, your effort, your dreams, and the woman you are becoming."
  },
  {
    image: "assets/memory-11.jpg",
    title: "Faith beside love",
    text: "I am thankful for the love we have, and for the guidance that keeps us strong."
  },
  {
    image: "assets/memory-12.jpg",
    title: "Growing together",
    text: "I love that we are not just staying together. We are growing together."
  },
  {
    image: "assets/memory-13.jpg",
    title: "A night to keep",
    text: "Some memories feel like they belong in a frame because they remind me how far we have come."
  },
  {
    image: "assets/memory-14.jpg",
    title: "Colorful days",
    text: "Even ordinary days become colorful when you are part of them."
  },
  {
    image: "assets/memory-15.jpg",
    title: "Little adventures",
    text: "I want more days like this with you, small trips, quiet laughs, and no distance between us."
  },
  {
    image: "assets/memory-16.jpg",
    title: "Flowers for the girl I love",
    text: "I hope you always remember that someone is thinking of you, caring for you, and loving you deeply."
  },
  {
    image: "assets/memory-17.jpg",
    title: "A sweet little selfie",
    text: "I love the funny, soft, unplanned photos because they feel so real."
  },
  {
    image: "assets/memory-18.jpg",
    title: "Even the silly ones",
    text: "This is us too. Not perfect, not posed, just happy enough to be weird together."
  },
  {
    image: "assets/memory-19.jpg",
    title: "The girl I first noticed",
    text: "Before I knew the future, I already knew there was something about you I could not forget."
  },
  {
    image: "assets/memory-20.jpg",
    title: "Young us",
    text: "Looking back at this makes me smile because it feels like life was already quietly leading me to you."
  },
  {
    image: "assets/memory-21-final.jpg",
    title: "Where it started",
    text: "From school days to long distance, from then until now, I still choose you."
  }
];

const photoButton = document.getElementById("photoButton");
const memoryPhoto = document.getElementById("memoryPhoto");
const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");
const memoryCount = document.getElementById("memoryCount");
const memoryDots = document.getElementById("memoryDots");
const nextMemory = document.getElementById("nextMemory");
const prevMemory = document.getElementById("prevMemory");
const musicModal = document.getElementById("musicModal");
const loveSong = document.getElementById("loveSong");
const playMusic = document.getElementById("playMusic");
const skipMusic = document.getElementById("skipMusic");
const musicToggle = document.getElementById("musicToggle");
const openLetter = document.getElementById("openLetter");
const letterPaper = document.getElementById("letterPaper");

let currentMemory = 0;
let askedForMusic = false;

function updateDaysTogether() {
  const start = new Date("2017-04-12T00:00:00+08:00");
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  const days = Math.max(0, Math.floor(diff / 86400000));
  document.getElementById("daysTogether").textContent = days.toLocaleString();
}

function buildDots() {
  memories.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Open memory ${index + 1}`);
    dot.addEventListener("click", () => showMemory(index));
    memoryDots.appendChild(dot);
  });
}

function showMemory(index) {
  currentMemory = (index + memories.length) % memories.length;
  const memory = memories[currentMemory];

  photoButton.classList.add("changing");

  window.setTimeout(() => {
    memoryPhoto.src = memory.image;
    memoryPhoto.alt = memory.title;
    memoryTitle.textContent = memory.title;
    memoryText.textContent = memory.text;
    memoryCount.textContent = `${currentMemory + 1} / ${memories.length}`;

    [...memoryDots.children].forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentMemory);
    });

    photoButton.classList.remove("changing");
  }, 250);
}

function askForMusicOnce() {
  if (askedForMusic) return;
  askedForMusic = true;
  musicModal.classList.add("show");
}

function showNextMemory() {
  if (currentMemory === 0) askForMusicOnce();
  showMemory(currentMemory + 1);
}

function playSong() {
  loveSong.play().then(() => {
    musicModal.classList.remove("show");
    musicToggle.classList.add("show");
    musicToggle.textContent = "Pause song";
  }).catch(() => {
    musicModal.classList.remove("show");
  });
}

function toggleSong() {
  if (loveSong.paused) {
    loveSong.play();
    musicToggle.textContent = "Pause song";
  } else {
    loveSong.pause();
    musicToggle.textContent = "Play song";
  }
}

document.getElementById("openSurprise").addEventListener("click", () => {
  document.getElementById("memories").scrollIntoView({ behavior: "smooth" });
  window.setTimeout(askForMusicOnce, 700);
});

photoButton.addEventListener("click", showNextMemory);
nextMemory.addEventListener("click", showNextMemory);
prevMemory.addEventListener("click", () => showMemory(currentMemory - 1));
playMusic.addEventListener("click", playSong);
skipMusic.addEventListener("click", () => musicModal.classList.remove("show"));
musicToggle.addEventListener("click", toggleSong);

openLetter.addEventListener("click", () => {
  letterPaper.classList.toggle("open");
  openLetter.textContent = letterPaper.classList.contains("open") ? "Close my letter" : "Open my letter";
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));

updateDaysTogether();
buildDots();
showMemory(0);
