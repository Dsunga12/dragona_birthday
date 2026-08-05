const memories = [
  ["assets/memory-01.jpg", "Thank you for being patient with me, especially during the times when loving me was not easy."],
  ["assets/memory-02.jpg", "Some people may only see our happy pictures, but only we know how much we have overcome to protect our relationship."],
  ["assets/memory-03.jpg", "Our relationship was never perfect. We had misunderstandings, arguments, and difficult moments, but we always found our way back to each other."],
  ["assets/memory-04.jpg", "We grew up together. You witnessed every version of me, and you still chose to stay by my side."],
  ["assets/memory-05.jpg", "We were still young and learning about life, but even then, I already knew that you were someone special."],
  ["assets/memory-06.jpg", "You are not only my girlfriend. You are my best friend, my safe place, and the person I always want to tell everything to."],
  ["assets/memory-07.jpg", "It all started when we were only 16 years old-two high school students who never imagined that our love would last this long."],
  ["assets/memory-08.jpg", "No matter how much time passes, I will always treasure the memories we created together. Every picture reminds me of how far we have come."],
  ["assets/memory-09.jpg", "Thank you for continuing to choose me, support me, and love me even when we cannot be together physically."],
  ["assets/memory-10.jpg", "This long-distance relationship is another challenge for us, but I believe that we can overcome it just like all the struggles we faced before."],
  ["assets/memory-11.jpg", "Whenever life becomes difficult, we know that we are never alone because God is always our support."],
  ["assets/memory-12.jpg", "Our faith has helped us remain strong, especially during the moments when we felt tired, lost, or uncertain."],
  ["assets/memory-13.jpg", "The distance may separate us physically, but it can never erase the love and memories we have built for nine years."],
  ["assets/memory-14.jpg", "One of the greatest blessings in our relationship is that we share the same faith and devotion to our church."],
  ["assets/memory-15.jpg", "Every place we have visited and every experience we have shared became more meaningful because I experienced them with you."],
  ["assets/memory-16.jpg", "Even after nine years, I still feel lucky whenever I look at you. You are still the person I want to laugh with, travel with, and grow old with."],
  ["assets/memory-17.jpg", "There will always be challenges, misunderstandings, and difficult days, but I promise to keep choosing our relationship and working through them with you."],
  ["assets/memory-18.jpg", "Even when you are moody and sometimes turn into a little dragon, haha, I still love you the same. You may test my patience sometimes, but I would still choose you every single day."],
  ["assets/memory-19.jpg", "I love this wacky side of you because it always makes me smile. Never change, love-your silliness is one of the many reasons why being with you is never boring."],
  ["assets/memory-20.jpg", "We were only 16 years old here, still young and unaware of how far our love would take us. Looking at this photo now reminds me that we truly grew up together, and I am grateful that after all these years, we still have each other."],
  ["assets/memory-21-final.jpg", "After all these years, all the memories, struggles, laughter, and distance, I still choose you. Thank you for growing with me, loving me, and staying by my side. This may be the last photo in this collection, but it is not the end of our story. I love you, always."]
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
const loveSong = document.getElementById("loveSong");
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
  loveSong.play().catch(() => {});
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

restartButton.addEventListener("click", () => {
  ending.classList.add("hidden");
  photoStory.classList.remove("hidden");
  showMemory(0);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

showMemory(0);
