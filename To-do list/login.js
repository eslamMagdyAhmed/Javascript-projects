const loginEmail = document.querySelector('#email');
const loginPassword = document.querySelector('#password');
const loginBtn = document.querySelector('#login');
const forgotEmail = document.querySelector('#check-email');
const forgotPass = document.querySelector('#forgot-password');
const forgotPassBtn = document.querySelector('#forgot-btn');
const signUp = document.querySelector('#sign-up');
const checkBtn = document.querySelector('#confirm');
const message = document.querySelector('.message');
localStorage.setItem('user', '[]');
const data = [...JSON.parse(localStorage.getItem('users'))];
if (data.length === 0) { 
    loginBtn.addEventListener('click', (e) => {
        if (loginEmail.value.length === 0 || loginPassword.value.length === 0) {
            setTimeout(_ => message.innerText = "The email or password field is empty", 200)
        } else {
            message.innerText = 'The email or password incorrect'
        }
    })} else {
    data.forEach(user => {
        loginBtn.addEventListener('click', (e) => {
            message.innerText = ""
            if (loginEmail.value.length === 0 || loginPassword.value.length === 0) {
                setTimeout(_ => message.innerText = "The email or password field is empty", 200)
            } else if (user.email !== loginEmail.value || user.password !== loginPassword.value) setTimeout(_ => message.innerText = "The email or password incorrect", 200);
            else {
                const getUser = data.filter((me => me.email == loginEmail.value))
                window.location.href = "./todo-page/todo.html";
                console.log(getUser)
                localStorage.setItem('user', JSON.stringify(getUser));
            }
        });
    });
}
signUp.addEventListener('click', () => location.href = './index.html');
forgotPassBtn.addEventListener('click', () => {
    forgotEmail.parentElement.style.display = 'flex';
    loginEmail.parentElement.style.display = 'none';
})
checkBtn.addEventListener('click', (e) => {
    const userData = data.filter(el => el.email === forgotEmail.value);
    const message = e.target.parentElement.children[3]
    if (forgotEmail.value.length === 0 || forgotPass.value.length === 0) {
        message.innerText = 'Cannot confirm fields empty'
    } else if (userData.length === 0) {
        message.innerText = 'Your email is incorrect'
    } else {
        setInterval(() => {
            window.location.reload()
        },2000)
        message.innerText = 'Your password has been changed successfully.';
        message.style.color = "#090";
        userData[0].password = forgotPass.value;
        localStorage.setItem('users', JSON.stringify(data));
    }
})