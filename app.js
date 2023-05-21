const todoInput = document.querySelector(".todo-input"); // input task value
const selectCategory = document.querySelector("#category"); // slelect category
const addTaskBtn = document.querySelector(".add-btn"); // add task btn
const houseChoresCard = document.querySelector(".house-chores"); // house-chores section
const studyListCard = document.querySelector(".study-list"); // study-list section
const alertInfo = document.querySelector(".alert-info"); // alert-info input
const ulHouseChores = document.querySelector(".house-chores-ul"); // house-chores-ul
const ulStudylist = document.querySelector(".study-list-ul "); // study-list-ul

let NEW_TASK;
let ID = 0;
let EDIT_TODO;

const popupBackground = document.querySelector(".popup-background"); // popup
const popup = document.querySelector(".popup"); // popup
const popupInfo = document.querySelector(".popup-info"); // popup-info
const popupInput = document.querySelector(".popup-input"); // popup-input
const acceptEditBtn = document.querySelector(".accept"); // add edit
const closePopup = document.querySelector(".cancel"); // close popup

const categoryBtn = document.querySelector('.category-btn') //select btn
const dropdown = document.querySelector('.dropdown') // option box
const options = document.querySelectorAll('.option') // select options
const selectLabel = document.querySelector('.select-label') // chosen select 

const main = () => {
    addTaskBtn.addEventListener("click", checkInputs);
    todoInput.addEventListener("keyup", chceckEnter);
    ulHouseChores.addEventListener("click", checkTools);
    ulStudylist.addEventListener("click", checkTools);
    closePopup.addEventListener("click", closeEditTask);
    acceptEditBtn.addEventListener("click", changeTaskValue);
    categoryBtn.addEventListener('click', toggleSelect)
    checkTaskLenght();
};
const addNewTask = () => {
    ID++;
    NEW_TASK = document.createElement("li");
    NEW_TASK.innerText = todoInput.value;
    NEW_TASK.classList.add("task");
    NEW_TASK.setAttribute("id", `task-${ID}`);
    createTools();
    clean();
};

options.forEach(option => {
    option.addEventListener('click', (e) => {
        setOption(e)
        toggleSelect(e)
    })
})
const setOption = (e) => {
    const labelElement = document.querySelector(`label[for="${e.target.id}"]`)
    selectLabel.innerText = labelElement.innerText
}
const toggleSelect = (e) => {
    e.preventDefault()
    dropdown.classList.toggle('show')
}

const checkInputs = (e) => {
    e.preventDefault();
    if (todoInput.value === "") {
        alertInfo.textContent = "Wpisz treść zadania";
    }
    else if (selectLabel.innerText === "wybierz kategorię") {
        alertInfo.textContent = "Wybierz kategorię";
    }
    else if (selectLabel.innerText === "Obowiązki domowe") {
        addNewTask();
        NEW_TASK.classList.add("house-chores-task");
        ulHouseChores.appendChild(NEW_TASK);
    }
    else if (selectLabel.innerText === "rzeczy do nauki") {
        addNewTask();
        NEW_TASK.classList.add("study-list-task");
        ulStudylist.appendChild(NEW_TASK);
    }
    checkTaskLenght();
};

const clean = () => {
    alertInfo.textContent = "";
    todoInput.value = "";
    dropdown.classList.remove('show')
    selectLabel.innerText = 'wybierz kategorię'
};
const createTools = () => {
    const toolsPanel = document.createElement("div");
    toolsPanel.classList.add("tools");
    NEW_TASK.appendChild(toolsPanel);
    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete");
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.innerHTML = "EDYTUJ";
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
};
const checkTools = e => {
    if (e.target.closest("button").classList.contains("complete")) {
        e.target.closest("li").classList.toggle("completed");
        e.target.closest("button").classList.toggle("completed");
    }
    else if (e.target.closest("button").classList.contains("edit")) {
        editTask(e);
    }
    else if (e.target.closest("button").classList.contains("delete")) {
        deleteTask(e);
    }
};
const deleteTask = e => {
    const deleteTodo = e.target.closest("li");
    deleteTodo.style.animation = "hidden .5s";
    setTimeout(() => {
        deleteTodo.remove();
        checkTaskLenght();
    }, 500);
};
const editTask = e => {
    const idTask = e.target.closest("li").id;
    EDIT_TODO = document.getElementById(idTask);
    popupInput.value = EDIT_TODO.firstChild.textContent;
    popup.style.display = "flex";
    popupBackground.style.display = "block";
};
const closeEditTask = () => {
    popup.style.display = "none";
    popupBackground.style.display = "none";
    popupInfo.innerText = "";
};
const changeTaskValue = () => {
    if (popupInput.value !== "") {
        EDIT_TODO.firstChild.textContent = popupInput.value;
        closeEditTask();
    }
    else {
        popupInfo.innerText = "Musisz podać wartość";
    }
};
const checkTaskLenght = () => {
    const houseChoresAllTask = document.getElementsByClassName("house-chores-task");
    const studyallTask = document.getElementsByClassName("study-list-task");
    if (houseChoresAllTask.length === 0) {
        ulHouseChores.previousElementSibling.textContent = "Brak zadań na liście";
    }
    else {
        ulHouseChores.previousElementSibling.textContent = "";
    }
    if (studyallTask.length === 0) {
        ulStudylist.previousElementSibling.textContent = "Brak zadań na liście";
    }
    else {
        ulStudylist.previousElementSibling.textContent = "";
    }
};
const chceckEnter = e => {
    if (e.key === "Enter") {
        checkInputs(e);
    }
};
document.addEventListener("DOMContentLoaded", main);
