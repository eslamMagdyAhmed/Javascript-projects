import countryCode from './dial-code/data.js';

if (!localStorage.getItem('users')) localStorage.setItem('users', '[]');

const getData = JSON.parse(localStorage.getItem('users'))
let users = getData;
const errMsg = document.querySelector('.error-msg');
const mainList = document.getElementById('list');
const firstName =  document.getElementById('first-name');
const surName =  document.getElementById('sur-name');
const phoneNumber = document.getElementById('phone-number');
const password =  document.getElementById('password');
const email=  document.getElementById('email');
const add =  document.getElementById('add');
const countryName = document.querySelector('.country-name');
const dialCode = document.querySelector('#dial-code');
const registerBtn = document.getElementById('register');

fetch('./dial-code/country.json').then(response => {
    return response.json()
}).then(country => {
    for(let localCountry in country.countries) {
        const createOption = document.createElement('option');
        createOption.value = localCountry;
        createOption.innerText = localCountry;
        countryName.append(createOption)
        for (let realcountry of country.countries[localCountry].zones) {
            if (realcountry === Intl.DateTimeFormat().resolvedOptions().timeZone) {
                for (let code of countryCode) {
                    if(code.code === localCountry) {
                        dialCode.value = code.dial_code;
                        createOption.selected = localCountry;
                    }
                }
            }
        }
    }
    countryName.addEventListener('change', (e) => {
        for (let code of countryCode) {
            if(code.code === countryName.value) dialCode.value = code.dial_code;
        }
    })
})

const renderUser = (showUser) => {
    localStorage.setItem('users', JSON.stringify(users));
    
    const showInfo = showUser.map((userInfo) => {
        return (`<div class= "container" id ="${userInfo.id}" >
            <div class= "first-name"><span>First name: </span>${userInfo.firstName}</div>
            <div class= "surname"><span>Surname: </span>${userInfo.surName}</div>
            <div class= "phone-number"><span>Phone number: </span>${dialCode.value} ${userInfo.phoneNumber}</div>
            <div class= "password"><span>Password: </span>${userInfo.password}</div>
            <div class= "email"><span>Email: </span>${userInfo.email}</div>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        </div>

    <div class="container-edit display-edit">
        <input type="text" name="firstName" placeholder="First name">
        <input type="text" name="surName" placeholder="Surname">
        <input type="number" name="phone-number" placeholder="New phone number">
        <input type="password" name="password" placeholder="old password">
        <input type="password" name="password" placeholder="New password">
        <input type="password" name="password" placeholder="Confirm password">
        <span class="message"></span>
        <button class= "update">Confirm</button>
        </div>
        `)
    }).join("");
    mainList.innerHTML= showInfo;
}

window.addEventListener('DOMContentLoaded',() => users.length === 0? mainList.innerHTML = "There is no users" : renderUser(users));
registerBtn.addEventListener('click', () => {
   mainList.previousElementSibling.classList.toggle('create')
})
add.addEventListener('click', (e) => {
    if (firstName.value.length === 0 || surName.value.length === 0 || password.value.length === 0 || email.value.length === 0) {
        errMsg.style.cssText = 'height: 45px; padding: 10px';
        errMsg.innerText = 'Please make sure you\'ve filled all fields.';
    } else if (!email.value.includes('@')) {
        errMsg.style.cssText = 'height: 45px; padding: 10px';
        email.style.borderColor = '#f00';
        errMsg.innerText = 'Please include an @ in the email address';
    } else if (!email.value.includes('.com')) {
        errMsg.style.cssText = 'height: 45px; padding: 10px';
        email.style.borderColor = '#f00';
        errMsg.innerText = 'Please include \'.com\' in the email address';
    }
    else {
        email.style.borderColor = "#999"
        errMsg.style.cssText = 'height: 0px; padding: 0px';
        const user = {
            id: new Date(),
            firstName: firstName.value,
            surName: surName.value,
            phoneNumber: phoneNumber.value,
            password: password.value,
            email: email.value,
            myTodos: []
        };
        users.push(user);
        renderUser(users);
        firstName.value = "";
        surName.value = "";
        phoneNumber.value = "";
        password.value = "";
        email.value = "";
    }
})

mainList.addEventListener('click', (e) => {
    const deleteHandler = () => {
        if(e.target.classList.contains("delete-btn")) {
            const deleteUser = users.filter(user => {
                return user.id.toString() !== e.target.parentElement.id
            })
            users = deleteUser;
            renderUser(deleteUser);
            
        }
    }

    const editArea = () => {
        if(e.target.classList.contains("edit-btn")) {
            e.target.parentElement.nextElementSibling.classList.toggle('display-edit')
        }
    }

    const updateInfo = () => {
        if (e.target.classList.contains("update")) {
            const updateElement = e.target.parentElement.children;
            const message = updateElement[6];
            const errorMsg = (msg) => { 
                message.style.display = 'block';
                message.innerText = msg;
            }
            const contentInfo = users.filter(el => el.id == e.target.parentElement.previousElementSibling.id);
            if (updateElement[0].value.length === 0 || updateElement[1].value.length === 0 || updateElement[2].value.length === 0 || updateElement[3].value.length === 0 || updateElement[4].value.length === 0 || updateElement[5].value.length === 0) {
                errorMsg('Please Make sure you filled all fields.')
            } else if (updateElement[3].value !== contentInfo[0].password) {
                errorMsg('Your old Password is incorrect');
            } else if (updateElement[4].value !== updateElement[5].value) {
                errorMsg('Please confirm you password correctly');
             } else {
                contentInfo[0].firstName = updateElement[0].value;
                contentInfo[0].surName = updateElement[1].value;
                contentInfo[0].phoneNumber = updateElement[2].value;
                contentInfo[0].password = updateElement[4].value;
                renderUser(users);
            }
        }
    }
    updateInfo()
    editArea()
    deleteHandler()
})