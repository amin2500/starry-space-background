// JavaScript to add stars dynamically
const numberOfStars = 500;
const starsContainer = document.querySelector('.stars');

for (let i = 0; i < numberOfStars; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  const x = Math.random() * 200;
  const y = Math.random() * 100;
  star.style.left = `${x}vw`;
  star.style.top = `${y}vh`;

  starsContainer.appendChild(star);
}

// Rotating Text Sphere
const radius = 150;
const texts = [
  "HTML", "CSS", "JavaScript", "React", "FIREBASE", "REDUX", "GITHUB", "GIT",
  "HTML", "CSS", "JavaScript", "React", "FIREBASE", "REDUX", "GITHUB", "GIT",
  "HTML", "CSS", "JavaScript", "React", "FIREBASE", "REDUX", "GITHUB", "GIT"
];
const sphere = document.getElementById('sphere');
let isDragging = false;
let lastX = 0;
let lastY = 0;
let currentX = 0;
let currentY = 0;
let velocityX = 0;
let velocityY = 0;
let autoRotateSpeed = 0.5;
let dragSpeed = 0.2;
let inertia = 0.95;

function createSphere(textArray, radius) {
  const fragment = document.createDocumentFragment();
  const count = textArray.length;
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

  for (let i = 0; i < count; i++) {
    const textDiv = document.createElement('div');
    const y = 1 - (i / (count - 1)) * 2;
    const radiusXY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radiusXY;
    const z = Math.sin(theta) * radiusXY;

    textDiv.textContent = textArray[i];
    textDiv.style.transform = `translate3d(${x * radius}px, ${y * radius}px, ${z * radius}px)`;

    fragment.appendChild(textDiv);
  }

  sphere.appendChild(fragment);
}

createSphere(texts, radius);

// Handle mouse down to start dragging
sphere.addEventListener('mousedown', (event) => {
  isDragging = true;
  lastX = event.clientX;
  lastY = event.clientY;
});

// Handle mouse up to stop dragging
document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Handle mouse movement while dragging
document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    let deltaX = event.clientX - lastX;
    let deltaY = event.clientY - lastY;

    currentX += deltaX * dragSpeed;
    currentY += deltaY * dragSpeed;

    velocityX = deltaX * dragSpeed;
    velocityY = deltaY * dragSpeed;

    lastX = event.clientX;
    lastY = event.clientY;

    sphere.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
  }
});

// Apply inertia and default rotation
function animateSphere() {
  if (!isDragging) {
    velocityX *= inertia;
    velocityY *= inertia;

    currentX += autoRotateSpeed;
    currentY += velocityY;

    sphere.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
  }

  requestAnimationFrame(animateSphere);
}

animateSphere();
