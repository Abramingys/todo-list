"use strict"

const root = document.getElementById('root');

//меню
//header
const header = document.createElement('div');
header.className = ('header');
root.append(header);


const buttonDeleteAll = document.createElement('button');
buttonDeleteAll.className = ('button');
buttonDeleteAll.innerText = ('Delete All');

const buttonDeleteLast = document.createElement('button');
buttonDeleteLast.className = ('button');
buttonDeleteLast.innerText = ('Delete Last');

const headerInput = document.createElement('input');
headerInput.className = ('input header__input-text');
headerInput.placeholder = ('Enter add ....');

const buttonAdd = document.createElement('button');
buttonAdd.className = ('button');
buttonAdd.innerText = ('Add');

// info
const info = document.createElement('div');
info.className = ('info');
root.append(info);

const buttonShowAll = document.createElement('button');
buttonShowAll.className = ('button');
buttonShowAll.innerText = ('Show All');

const buttonShowCompeleted = document.createElement('button');
buttonShowCompeleted.className = ('button');
buttonShowCompeleted.innerText = ('Show Compeleted');

const infoSearch = document.createElement('input');
infoSearch.className = ('input header__input-text');
infoSearch.placeholder = ('Search ....');

const infoAll = document.createElement('p');
const infoAllSpan = document.createElement('span');
infoAll.innerText = ('All:');
infoAllSpan.innerText = ('0');

const infoCompleted = document.createElement('p');
const infoCompletedSpan = document.createElement('span');
infoCompleted.id = ('infocompleted');
infoCompletedSpan.id = ('infocompletedspan');
infoCompleted.innerText = ('Completed:');
infoCompletedSpan.innerText = ('0');

info.append(infoAll);
infoAll.append(infoAllSpan);
info.append(infoCompleted);
infoCompleted.append(infoCompletedSpan);
info.append(buttonShowAll);
info.append(buttonShowCompeleted);
info.append(infoSearch);

// list
const todoList = document.createElement('ul');
todoList.className = ('todo-list');
root.append(todoList);

header.append(buttonDeleteAll);
header.append(buttonDeleteLast);
header.append(headerInput);
header.append(buttonAdd);

let checkedCounter = 0;

//Карточка

function createCard() {
    const todoTask = document.createElement('li');
    todoTask.className = ('todo-list__item');
    todoList.append(todoTask);

    const checkbox = document.createElement('input');
    checkbox.className = ('todo-list__checkbox');
    checkbox.type = 'checkbox';

    const input = document.createElement('input');
    input.className = ('input todo-list__input');
    input.placeholder = ('Todo text');
    input.value = headerInput.value;

    const buttonDate = document.createElement('div');
    buttonDate.className = ('buttonDate');

    const buttonRemove = document.createElement('button');
    buttonRemove.className = (' button todo-list__button');
    buttonRemove.innerText = ('X');
    const date = new Date().toLocaleDateString();

    //  изменение при checked на каждую кнопку
    // checkbox.addEventListener('click', () => {
    //     todoTask.classList.toggle('todo-list__item_red');
    //     input.classList.toggle('todo-list__input_crossed');
    // });

    //Удаление, добавил обработчик на каждую кнопку в каждой карточке
    // buttonRemove.addEventListener('click', () => {
    //     todoTask.remove();
    // });

    todoTask.append(checkbox);
    todoTask.append(input);
    todoTask.append(buttonDate);
    buttonDate.append(buttonRemove);
    buttonDate.append(date);


    infoAllSpan.textContent = todoList.children.length;
    headerInput.value = '';
};

// один обработчик событий на ul
todoList.addEventListener('click', function (event) {
    let target = event.target;

    // удаление card
    if (target.tagName === 'BUTTON') {

        if (target.closest('.todo-list__item').firstElementChild.checked) {
            --checkedCounter;
        };

        target.closest('.todo-list__item').remove();
        infoCompletedSpan.textContent = checkedCounter;
        infoAllSpan.textContent = todoList.children.length;
    };

    //  изменение при checked
    if (target.className === 'todo-list__checkbox') {


        target.checked ? ++checkedCounter : --checkedCounter;
        target.closest('.todo-list__item').classList.toggle('todo-list__item_red');
        target.nextElementSibling.classList.toggle('todo-list__input_crossed');
        infoCompletedSpan.textContent = checkedCounter;
    }
});

// добавление карточки
buttonAdd.addEventListener('click', createCard);

// удаление всех карточек
buttonDeleteAll.addEventListener('click', () => {

    checkedCounter = 0;
    todoList.innerHTML = '';
    infoAllSpan.textContent = 0;
    infoAllSpan.textContent = todoList.children.length;
    infoCompletedSpan.textContent = checkedCounter;

});

// удаление последней карточки
buttonDeleteLast.addEventListener('click', () => {

    if (todoList.children.length === 0) {
        return;
    };

    if (todoList.lastElementChild.firstElementChild.checked) {
        --checkedCounter;
        infoCompletedSpan.textContent = checkedCounter;
    };

    todoList.lastElementChild.remove();
    infoAllSpan.textContent = todoList.children.length;
});

buttonShowCompeleted.addEventListener('click', () => {

    todoList.querySelectorAll('.todo-list__item').forEach((elem) => {

        if (!elem.firstChild.checked) {
            elem.style.display = 'none';
        };
    });
});

buttonShowAll.addEventListener('click', () => {

    todoList.querySelectorAll('.todo-list__item').forEach((elem) => {
        if (!elem.firstChild.checked) {
            elem.style.display = 'flex';
        };
    });
});


infoSearch.addEventListener('input', function () {

    todoList.querySelectorAll('.todo-list__input').forEach(function (elem) {
        elem.parentElement.style.display = (elem.value.search(infoSearch.value) != -1) || infoSearch.value == '' ? 'flex' : 'none';
    })

})







