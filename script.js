const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const messageArea = document.getElementById("messageArea");

// YES BUTTON
yesBtn.addEventListener("click", () => {
  messageArea.innerHTML = "YAAAY!! I LOVE YOU MY BABUDIII";
  launchConfetti();
});

// NO BUTTON (backup)
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

// MOUSE DODGE
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;

  const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
  const dodgeRadius = 60;

  if (distance < dodgeRadius) {
    moveNoButton();
  }
});

// TOUCH DODGE
document.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  const rect = noBtn.getBoundingClientRect();
  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;

  const distance = Math.hypot(
    touch.clientX - btnCenterX,
    touch.clientY - btnCenterY
  );
  if (distance < 140) moveNoButton();
});

function moveNoButton() {
  const rect = noBtn.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  noBtn.style.position = "fixed";

  const padding = 20;
  const maxX = window.innerWidth - rect.width - padding;
  const maxY = window.innerHeight - rect.height - padding;

  let newX, newY;
  let attempts = 0;

  do {
    newX = padding + Math.random() * (maxX - padding);
    newY = padding + Math.random() * (maxY - padding);
    attempts++;
  } while (
    attempts < 30 &&
    newX < yesRect.right &&
    newX + rect.width > yesRect.left &&
    newY < yesRect.bottom &&
    newY + rect.height > yesRect.top
  );

  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";
}

function launchConfetti() {
  const confettiCount = 180;
  const duration = 2500;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";

    const size = 6 + Math.random() * 6;
    confetti.style.width = size + "px";
    confetti.style.height = size + 4 + "px";

    const hue = Math.floor(Math.random() * 360);
    confetti.style.backgroundColor = `hsl(${hue}, 80%, 60%)`;

    const fallTime = 1.5 + Math.random() * 1.5;
    confetti.style.animationDuration = fallTime + "s";
    confetti.style.animationDelay = Math.random() * 0.8 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), duration + 1500);
  }
}
