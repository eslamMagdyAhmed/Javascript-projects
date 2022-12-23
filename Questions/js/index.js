const questions = document.querySelectorAll(".question");
const btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {

    btn.addEventListener('click', e => {
        const answer = e.target.parentElement.parentElement;
        questions.forEach(question => {
            if(question !== answer) question.classList.remove('content-show');
        })
        answer.classList.toggle('content-show');
    })
})
