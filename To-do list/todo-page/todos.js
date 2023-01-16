//create Logout button to make him go to login page
const user = JSON.parse(localStorage.getItem('user'))
const title = document.querySelector('.title')
const todosInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('.add-btn');
const list = document.querySelector('.todo-list');
const logoutBtn = document.querySelector('.logout');
const todosFilter = document.querySelector('#todo-filter');
if (localStorage.getItem('user') === '[]' || localStorage.getItem('user') === null) location.href = '../login.html';
logoutBtn.addEventListener('click', () => location.href = '../login.html')
title.innerText = `Good ${new Date().getHours() < 12 ? "Morning" : "Evening"} ${user[0].firstName} Here is your todo list`;

const renderTodos = (userTodos) => {
    const allData = JSON.parse(localStorage.getItem('users'))
    for (let i = 0; i < allData.length; i++) {
        if (allData[i].id === user[0].id) { 
            allData[i] = user[0];
        }
    }
    
    localStorage.setItem('users', JSON.stringify(allData));
    localStorage.setItem('user', JSON.stringify(user))
    const showTodo = userTodos.map((todo) => {
        return `<li class="todo${todo[1] === true ? " completed" : ""}">
        <p class="todo-title ${todo[1] === true ? " checked" : ""}">${todo[0]}</p>
        <div class="btn-container">
        <button class="complete-btn">✓</button>
        <button class="delete-btn">X</button>
        </div>
        </li>`
    }
    ).join("")
    return list.children[0].innerHTML = showTodo
}
window.addEventListener('DOMContentLoaded', () => {renderTodos(user[0].myTodos)})

addBtn.addEventListener('click', (e) => {
    if (todosInput.value !== "") {
        user[0].myTodos.push([todosInput.value, false]);
        todosInput.value = ""
        todosInput.focus();
        renderTodos(user[0].myTodos)
    } else {
        todosInput.focus();
    }
})

list.addEventListener('click', (e) => {
    const checkClassName = e.target.classList;
    if (checkClassName.contains('delete-btn')) {
        user[0].myTodos.splice(user[0].myTodos.indexOf(e.target.parentElement.parentElement.children[0].innerText, 1))
        renderTodos(user[0].myTodos)
    }
    if (checkClassName.contains('complete-btn')) {
        const checked = () => user[0].myTodos.find((todo) => todo[0] === e.target.parentElement.parentElement.children[0].innerText)
        checked()[1] = !checked()[1];
        renderTodos(user[0].myTodos)
    }
})

todosFilter.addEventListener('change', (e) => {
    const checkValue = e.target.value;
    const checkedTodos = (stat) => user[0].myTodos.filter(checked => checked[1] === stat);
    switch (checkValue) {
        case 'checked':
            renderTodos(checkedTodos(true));
            break;
        case 'uncheked':
            renderTodos(checkedTodos(false));
            break;
        default:
            renderTodos(user[0].myTodos)
        }
})
