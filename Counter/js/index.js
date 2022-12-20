let count = 0;
const counter = document.getElementById("counter");
const btns = document.querySelectorAll('.btn');

btns.forEach(function (btn) {
    btn.addEventListener('click', (e) => {
        const item = e.target.id;

        item === "increase" ? count++: item === "decrease"? count-- : count = 0;
        count > 0 ? counter.style.color = "#0f0": count === 0 ? counter.style.color = "#fff": counter.style.color = "#f00";
        return counter.innerHTML = count;
    })
});

