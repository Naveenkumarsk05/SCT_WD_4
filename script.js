document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskDateTime = document.getElementById("taskDateTime");
    let taskText = taskInput.value.trim();
    let taskTime = taskDateTime.value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    let task = {
        text: taskText,
        dateTime: taskTime,
        completed: false
    };

    saveTask(task);
    taskInput.value = "";
    taskDateTime.value = "";
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function loadTasks() {
    displayTasks();
}

function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let taskContent = document.createElement("span");
        taskContent.innerHTML = `${task.text} ${task.dateTime ? `- <small>${task.dateTime}</small>` : ""}`;
        if (task.completed) taskContent.classList.add("completed");

        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("task-buttons");

        let completeBtn = document.createElement("button");
        completeBtn.innerText = "✔";
        completeBtn.classList.add("complete");
        completeBtn.onclick = () => toggleComplete(index);

        let editBtn = document.createElement("button");
        editBtn.innerText = "✏";
        editBtn.classList.add("edit");
        editBtn.onclick = () => editTask(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑";
        deleteBtn.classList.add("delete");
        deleteBtn.onclick = () => deleteTask(index);

        buttonsDiv.appendChild(completeBtn);
        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(deleteBtn);

        li.appendChild(taskContent);
        li.appendChild(buttonsDiv);
        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let newTask = prompt("Edit Task:", tasks[index].text);
    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}
