const memories = [
  ["assets/memory-01.jpg", "Your message for photo 1 goes here."],
  ["assets/memory-02.jpg", "Your message for photo 2 goes here."],
  ["assets/memory-03.jpg", "Your message for photo 3 goes here."],
  ["assets/memory-04.jpg", "Your message for photo 4 goes here."],
  ["assets/memory-05.jpg", "Your message for photo 5 goes here."],
  ["assets/memory-06.jpg", "Your message for photo 6 goes here."],
  ["assets/memory-07.jpg", "Your message for photo 7 goes here."],
  ["assets/memory-08.jpg", "Your message for photo 8 goes here."],
  ["assets/memory-09.jpg", "Your message for photo 9 goes here."],
  ["assets/memory-10.jpg", "Your message for photo 10 goes here."],
  ["assets/memory-11.jpg", "Your message for photo 11 goes here."],
  ["assets/memory-12.jpg", "Your message for photo 12 goes here."],
  ["assets/memory-13.jpg", "Your message for photo 13 goes here."],
  ["assets/memory-14.jpg", "Your message for photo 14 goes here."],
  ["assets/memory-15.jpg", "Your message for photo 15 goes here."],
  ["assets/memory-16.jpg", "Your message for photo 16 goes here."],
  ["assets/memory-17.jpg", "Your message for photo 17 goes here."],
  ["assets/memory-18.jpg", "Your message for photo 18 goes here."],
  ["assets/memory-19.jpg", "Your message for photo 19 goes here."],
  ["assets/memory-20.jpg", "Your message for photo 20 goes here."],
  ["assets/memory-21-final.jpg", "Your final photo message goes here before the ending letter."]
];

const endingLetter = `My love,

Even though we are far from each other, my heart always feels close to you. Distance may keep us apart physically, but it can never change what I feel for you.

Every day, I miss your presence, your smile, your voice, and the comfort of being with you. Sometimes it is hard, but I keep reminding myself that this distance is only temporary. What we have is stronger than the miles between us.

Hello, my love. Please always take care of yourself. Do not forget to eat three times a day and give your body the rest it needs. I may not be there beside you to remind you all the time, but I hope you always remember that someone loves you deeply and cares about you so much.

Always keep your faith strong. And always continue to pray, trust His plans, and be thankful for every blessing. In every challenge, let us always remember our Almighty God, because He is the one guiding us, protecting us, and giving us strength.

I want you to know that I am always here for you. I may not be beside you every day, but my love, support, and loyalty are always with you. I am proud of us for staying strong and choosing each other despite the distance.

Thank you for being patient, understanding, and loving me even when things are not easy. I promise to keep loving you, waiting for you, and doing my best for our future.

One day, we will no longer have to miss each other from afar. We will finally be together, and all this waiting will be worth it.

I love you so much, always and forever.

From your always supportive Boyfriend: Daniel Gwapings😂`;

const questionScreen = document.getElementById("questionScreen");
const storyScreen = document.getElementById("storyScreen");
const questionCopy = document.getElementById("questionCopy");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const photoStory = document.getElementById("photoStory");
const ending = document.getElementById("ending");
const photoFrame = document.getElementById("photoFrame");
const memoryPhoto = document.getElementById("memoryPhoto");
const typedMessage = document.getElementById("typedMessage");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const musicModal = document.getElementById("musicModal");
const loveSong = document.getElementById("loveSong");
const playMusic = document.getElementById("playMusic");
const skipMusic = document.getElementById("skipMusic");
const endingLetterBox = document.getElementById("endingLetter");

let current = 0;
let triedNo = false;
let typeTimer = null;

function typeWords(element, text, speed = 34) {
  window.clearInterval(typeTimer);
  element.textContent = "";
  let index = 0;

  typeTimer = window.setInterval(() => {
    element.textContent += text.charAt(index);
    index += 1;
    if (index >= text.length) window.clearInterval(typeTimer);
  }, speed);
}

function moveNoButton() {
  triedNo = true;
  yesButton.classList.remove("locked");
  questionCopy.textContent = "Okay, now you can click Yes.";

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
  if (!triedNo) {
    questionCopy.textContent = "No first, love. Just try it once.";
    yesButton.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(0)" }
      ],
      { duration: 260 }
    );
    return;
  }

  questionScreen.classList.add("hidden");
  storyScreen.classList.remove("hidden");
  musicModal.classList.remove("hidden");
  showMemory(0);
}

function showMemory(index) {
  current = Math.max(0, Math.min(index, memories.length - 1));
  const [image, message] = memories[current];

  photoFrame.classList.add("changing");

  window.setTimeout(() => {
    memoryPhoto.src = image;
    memoryPhoto.alt = `Memory ${current + 1}`;
    typeWords(typedMessage, message);
    nextButton.textContent = current === memories.length - 1 ? "Read the ending" : "Next";
    photoFrame.classList.remove("changing");
  }, 180);
}

function goNext() {
  if (current >= memories.length - 1) {
    photoStory.classList.add("hidden");
    ending.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    typeWords(endingLetterBox, endingLetter, 18);
    return;
  }

  showMemory(current + 1);
}

function playSong() {
  loveSong.play().then(() => {
    musicModal.classList.add("hidden");
  }).catch(() => {
    musicModal.classList.add("hidden");
  });
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

playMusic.addEventListener("click", playSong);
skipMusic.addEventListener("click", () => musicModal.classList.add("hidden"));

restartButton.addEventListener("click", () => {
  ending.classList.add("hidden");
  photoStory.classList.remove("hidden");
  showMemory(0);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

showMemory(0);
