//#region catch the elements
let add = document.getElementById("add");
let formAdd = document.getElementById("formAdd");
let ulHolder = document.getElementById("holder");
let formSearch = document.getElementById("formSearch");
let searchInput = document.getElementById("search");
let result = document.getElementById("result");
let empty = document.getElementById("empty");
let icon = document.getElementsByClassName("icon");
let deleteAll = document.getElementById("deleteAll");
let taskStatus = document.getElementsByClassName("status");
let theSwitch = document.getElementsByClassName("switch");
//#endregion

let arrayOfTasks = [];
let filteredArray = [];
let counter = 0;

//#region the functions
let createTheTask = (taskValue) => {
    let values = { value: taskValue, id: Date.now(), complated: false, status: 0, edit: false };

    arrayOfTasks.push(values);

    createSingleLi(arrayOfTasks[arrayOfTasks.length - 1]);

    addToStorage()
}

let createLis = (theArrayOfTasks) => {
    let arrayOfLis = theArrayOfTasks.map((task) => {
        let complate;

        if (task.complated) {
            complate = `<p class="mb-0 word done">${task.value}</p>`
        } else {
            complate = `<p class="mb-0 word">${task.value}</p>`
        }

        return `<li class="d-flex justify-content-between align-items-center list-group-item" id="${task.id}">
                    ${complate}
                    <p class="status position-absolute">Not Started</p>
                    <div class="icons d-flex align-items-center">
                        <div class="switch">
                            <div class="ball"></div>
                        </div>
                        <i class="fa-solid fa-pen-to-square edit" title="Edit" style="color: #1e60a5;"></i>
                        <i class="fa-solid fa-trash-can delete" title="Delete"></i>
                    </div>
                    <i class="fa-solid fa-circle-check icon" style="color: #09c839;"></i>
                </li>`
    })

    ulHolder.innerHTML = arrayOfLis.join("");
}

let createSingleLi = (singleTask) => {
    let task = `<li class="d-flex justify-content-between align-items-center list-group-item" id="${singleTask.id}">
                    <p class="mb-0 word">${singleTask.value}</p>
                    <p class="status position-absolute">Not Started</p>
                    <div class="icons d-flex align-items-center">
                        <div class="switch">
                            <div class="ball"></div>
                        </div>
                        <i class="fa-solid fa-pen-to-square edit" style="color: #1e60a5;"></i>
                        <i class="fa-solid fa-trash-can delete"></i>
                    </div>
                    <i class="fa-solid fa-circle-check icon" style="color: #09c839;"></i>
                </li>`

    ulHolder.innerHTML += task;
}

let displayMessage = (theArray) => {
    if (theArray.length === 0) {
        result.style.display = "block"
    } else {
        result.style.display = "none"
    }
}

let searchTask = (word, theArray) => {
    filteredArray = theArray.filter((ele) => ele.value.toLowerCase().includes(word.toLowerCase()));

    displayMessage(filteredArray);

    createLis(filteredArray);

    changeColorAndText(filteredArray);

    // displayIcon(filteredArray);
}

let addToStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

let getFromStorage = () => {
    if (localStorage.getItem("tasks")) {
        arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));

        createLis(arrayOfTasks);
    }
}

let changeStatus = (id) => {
    // for (let i = 0; i < arrayOfTasks.length; i++) {
    //     if (arrayOfTasks[i].id == id) {
    //         arrayOfTasks[i].complated ? arrayOfTasks[i].complated = false : arrayOfTasks[i].complated = true;
    //     }
    // }

    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == id) {
            arrayOfTasks[i].status++;

            arrayOfTasks[i].status === 2 ? arrayOfTasks[i].complated = true : arrayOfTasks[i].complated = false;
        }
        arrayOfTasks[i].status >= 3 ? arrayOfTasks[i].status = 0 : arrayOfTasks[i].status;
    }
    addToStorage(arrayOfTasks);
}

let changeColorAndText = (theArray) => {
    for (let i = 0; i < theArray.length; i++) {
        if (theArray[i].status == 0) {
            theSwitch[i].childNodes[1].style.cssText = "left: 78%; background-color: #9c0202";
            theSwitch[i].parentElement.previousElementSibling.innerHTML = "Not Started";
            theSwitch[i].parentElement.previousElementSibling.style.cssText = "background-color: #9c0202";
        } else if (theArray[i].status == 1) {
            theSwitch[i].childNodes[1].style.cssText = "left: 50%; background-color: #097aa4";
            theSwitch[i].parentElement.previousElementSibling.innerHTML = "in progress";
            theSwitch[i].parentElement.previousElementSibling.style.cssText = "background-color: #097aa4";
        } else {
            theSwitch[i].childNodes[1].style.cssText = "left: 24%; background-color: #099c02";
            theSwitch[i].parentElement.previousElementSibling.innerHTML = "Done";
            theSwitch[i].parentElement.previousElementSibling.style.cssText = "background-color: #099c02";
        }
    }
}

let chechTasks = () => {
    if (arrayOfTasks.length === 0) {
        empty.style.cssText = "display: block";
        deleteAll.style.cssText = "opacity: 0; width: 0; padding: 0;"
    } else {
        empty.style.cssText = "display: none";
        deleteAll.style.cssText = "opacity: 1; width: 110px; margin-left: 15px; color: white;"
    }
}

let changeEditStatus = (theId) => {
    // to make every edit value = false
    for (let i = 0; i < arrayOfTasks.length; i++) {
        arrayOfTasks[i].edit = false;
    }

    // to chenage the value of "edit" of the task that it's id = theId
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == theId) {
            arrayOfTasks[i].edit = true
        }
    }
}

// let displayIcon = (theArray) => {
//     for (let i = 0; i < theArray.length; i++) {
//         if (theArray[i].complated) {
//             icon[i].style.cssText = "color: #09c839; z-index: 10; right: -35px; opacity: 1"
//         } else {
//             icon[i].style.cssText = "color: #09c839; z-index: -10; right: -70px; opacity: 0"
//         }
//     }
// }
//#endregion

//#region the events 
formAdd.addEventListener("submit", (e) => {
    e.preventDefault();

    // varible to check if the user want to edit or add a new task
    let editing = false;

    // to check if the user clicked on the edit icon and adjust the value
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].edit && add.value !== "") {
            arrayOfTasks[i].value = add.value;
            searchInput.value = "";

            createLis(arrayOfTasks);
            changeColorAndText(arrayOfTasks)

            arrayOfTasks[i].edit = false
            editing = true;

            addToStorage()
            break;
        }
    }

    if (add.value.trim() !== "" && !editing) {
        createTheTask(add.value);
    }


    add.value = "";
    chechTasks();
})

formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    searchTask(searchInput.value, arrayOfTasks);
})

ulHolder.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        // to get the value of the task
        let valueOfTask = e.target.parentElement.previousElementSibling.innerHTML;
        // to get the index of the value i clicked on
        let indexOfValue = arrayOfTasks.findIndex((prop) => prop.value === valueOfTask);
        // to remove the value from the array
        arrayOfTasks.splice(indexOfValue, 1);
        // to remove the value from the local storage
        e.target.parentElement.parentElement.remove();

        addToStorage();
        chechTasks();
    }

    if (e.target.classList.contains("switch")) {
        let text = e.target.parentElement.previousElementSibling;
        let theBall = e.target.childNodes[1];

        if (text.innerHTML === "Not Started") {
            text.innerHTML = "in progress";
            text.style.cssText = "background-color: #097aa4";
            theBall.style.cssText = "left: 50%; background-color: #097aa4";
        } else if (text.innerHTML === "in progress") {
            text.innerHTML = "Done";
            text.style.cssText = "background-color: #099c02";
            theBall.style.cssText = "left: 24%; background-color: #099c02";
            e.target.parentElement.previousElementSibling.previousElementSibling.classList.toggle("done");
        } else {
            text.innerHTML = "Not Started";
            text.style.cssText = "background-color: #9c0202";
            theBall.style.cssText = "left: 78%; background-color: #9c0202";
            e.target.parentElement.previousElementSibling.previousElementSibling.classList.toggle("done");
        }
        changeStatus(e.target.parentElement.parentElement.getAttribute("id"));
        // if (e.target.classList.contains("done")) {
        //     e.target.parentElement.childNodes[5].style.cssText = "color: #09c839; z-index: 10; right: -35px; opacity: 1";
        // }
        // else {
        //     e.target.parentElement.childNodes[5].style.cssText = "color: #09c839; z-index: -10; right: -70px; opacity: 0";
        // }
    }

    if (e.target.classList.contains("edit")) {
        let value = e.target.parentElement.previousElementSibling.previousElementSibling.innerHTML;
        add.value = value;
        changeEditStatus(e.target.parentElement.parentElement.getAttribute("id"));

        add.focus()
    }
})

deleteAll.addEventListener("click", (e) => {
    for (let i = 0; i < ulHolder.childElementCount; i++) {
        let value = ulHolder.childNodes[i].childNodes[1].innerHTML;
        let theIndex = arrayOfTasks.findIndex((task) => task.value === value);
        arrayOfTasks.splice(theIndex, 1);
    }
    ulHolder.innerHTML = "";
    if (searchInput.value !== "") {
        searchInput.focus();
    }
    addToStorage();
    chechTasks();
    // displayIcon(arrayOfTasks);
})
//#endregion

//#region calling of functoins 
getFromStorage();
chechTasks();
// displayIcon(arrayOfTasks);
changeColorAndText(arrayOfTasks);
//#endregion