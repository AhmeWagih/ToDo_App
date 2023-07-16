let theInput = document.querySelector(".add-task input");
let addButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
window.onload = function () {
  theInput.focus();
};
addButton.onclick = function () {
  if (theInput.value === "") {
    //Use Sweet Alert Here
    swal("No Tasks Adding", "You Can Not Add Empty Tasks")
  } else {
    let noTaskMsg = document.querySelector(".no-tasks-msg");
    if (document.body.contains(document.querySelector(".no-tasks-msg"))) {
      noTaskMsg.remove();
    };
    let mainSpan = document.createElement("span");
    let deleteElement = document.createElement("span");
    let text = document.createTextNode(theInput.value);
    let deleteText = document.createTextNode("Delete");
    mainSpan.appendChild(text);
    mainSpan.className = "task-box";
    deleteElement.appendChild(deleteText);
    deleteElement.className = "delete";
    mainSpan.appendChild(deleteElement);
    tasksContainer.appendChild(mainSpan);
    theInput.value = "";
    theInput.focus();
    //Check If Task Is Exist Before Not Add It
    let myArray = Array.from(document.querySelectorAll(".task-box"));
      for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].textContent === myArray[i+1].textContent) {
        swal("This Task Is Already Exist", "You Can Not Add This Again");
        myArray[i].remove();
      }
    }
    calcTasks();
  }
};
document.addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    e.target.parentNode.remove();
    if (tasksContainer.childElementCount === 0) {
      createNoTasks();
    }
  }
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
  }
  calcTasks();
})
// Create Delete All Tasks
let deleteAll = document.querySelector(".delete-all");
deleteAll.onclick = function () {
  let arrayFromTaskBox = Array.from(document.querySelectorAll(".task-box"));
  for (let i = 0; i < arrayFromTaskBox.length; i++) {
    arrayFromTaskBox[i].remove();
  }
  let noTaskMsg = document.querySelector(".no-tasks-msg");
  if (document.body.contains(document.querySelector(".no-tasks-msg"))) {
    noTaskMsg.remove();
  };
  createNoTasks();
};
// Create Finish All Tasks
let finishAll = document.querySelector(".finish-all");
finishAll.onclick = function () {
  let arrayFromTaskBox = Array.from(document.querySelectorAll(".task-box"));
  for (let i = 0; i < arrayFromTaskBox.length; i++) {
    arrayFromTaskBox[i].classList.add("finished");
  }
};
// Create Delete All Finish Tasks
let deleteFinished = document.querySelector(".delete-finished");
deleteFinished.onclick = function () {
  let arrayFromTaskBox = Array.from(document.querySelectorAll(".task-box"));
  for (let i = 0; i < arrayFromTaskBox.length; i++) {
    if (arrayFromTaskBox[i].classList.contains("finished")) {
      arrayFromTaskBox[i].remove();
    }
  }
  if (tasksContainer.childElementCount === 0) {
    createNoTasks();
  }
};
function createNoTasks() {
  let msgSpan = document.createElement("span");
  let msgText = document.createTextNode("No Tasks To Show");
  msgSpan.appendChild(msgText);
  msgSpan.className = "no-tasks-msg";
  tasksContainer.appendChild(msgSpan);
};
function calcTasks() {
  tasksCount.innerHTML = document.querySelectorAll(".tasks-content .task-box").length;
  tasksCompleted.innerHTML = document.querySelectorAll(".tasks-content .finished").length;
};
//Add Tasks To Local Storage