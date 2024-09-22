const button = document.getElementById("randomButton");
const container = document.querySelector(".container");

button.addEventListener("mouseover", () => {
  const containerRect = container.getBoundingClientRect();
  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;

  const randomX = Math.random() * (containerRect.width - buttonWidth);
  const randomY = Math.random() * (containerRect.height - buttonHeight);

  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;
});

button.addEventListener("click", (event) => {
  event.preventDefault();
  alert("You can't click me!");
});
