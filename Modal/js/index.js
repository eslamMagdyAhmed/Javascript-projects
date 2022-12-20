const btn = document.getElementById("btn");
const message = document.getElementsByClassName("message");
const closing = document.getElementById("closing-btn");
btn.addEventListener("click",function() {
    message[0].style.display = "flex";
})

window.addEventListener('click', (e) => {
    
    if(e.target.classList.contains('message') || e.target.classList.contains('closing')) {
        message[0].style.display = "none";
    }

})