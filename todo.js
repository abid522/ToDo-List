let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="delete-icon.png" class="delete" data-id="${task.id}" />
    `;
    tasksList.append(li);
}

function renderList() {
    tasksList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const task = tasks.filter(function (task) {
        return task.id === taskId;
    });

    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }
    showNotification('Not able to toggle the task');
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });
    tasks = newTasks;
    renderList();
    showNotification('Task deleted Successfully.');
}

function addTask(task) {
    tasks.push(task);
    renderList();
    showNotification('Task added successfully');
}

function showNotification(text) {
    alert(text);
}

function handleInputKeyPress(e) {
    if (e.key === 'Enter') {
        const text = e.target.value;

        if (!text) {
            showNotification('Task text cannot be empty');
            return;
        }
        const task = {
            text: text,
            id: Date.now().toString(),
            done: false
        }
        addTask(task);
        e.target.value = '';
    }
}

function clickHandler(e) {
    const target = e.target;

    if (target.className === 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
    } else if (target.className === 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
    }
}

function initializeApp() {
    addTaskInput.addEventListener('keyup', handleInputKeyPress);
    document.addEventListener('click', clickHandler);
}

initializeApp();