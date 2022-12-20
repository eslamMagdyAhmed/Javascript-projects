const btn = document.getElementById("btn");
const color = document.querySelector(".color");
const hexbtn = document.getElementById("hex");
const autoBtn = document.querySelector("#autoBtn");
const stopBtn = document.querySelector('#stopBtn');

function changeColor() {
  const createColor = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const randColor = ["#"];
  for (let i = 0; i < 8; i++) {
    const randNum = Math.floor(Math.random() * 15);
    randColor.push(createColor[randNum]);
  }
  return randColor.join("");
}


function contentBody() {
  document.body.style.backgroundImage = `linear-gradient(to right,${changeColor()}, ${changeColor()})`;
  color.textContent = changeColor();
  color.style.color = document.body.style.background;
}

autoBtn.onclick = (e) => {
  const start = setInterval(contentBody, 500);
  e.target.style.display = "none";
  stopBtn.style.display = "block";

  stopBtn.addEventListener('click', (e) => {
    clearInterval(start);
    e.target.style.display = "none";
    autoBtn.style.display = "block";
  })
};

btn.addEventListener("click", contentBody);
