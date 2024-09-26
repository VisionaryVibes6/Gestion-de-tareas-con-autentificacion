document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const authBtn = document.getElementById("auth-btn");
    const authMessage = document.getElementById("auth-message");
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const authSection = document.getElementById("auth-section");
    const taskSection = document.getElementById("task-section");
    const logoutBtn = document.getElementById("logout-btn");

    let currentUser = null;

    authBtn.addEventListener("click", registerUser);
    addTaskBtn.addEventListener("click", addTask);
    logoutBtn.addEventListener("click", logout);

    function registerUser() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username && password) {
            currentUser = { username, password };
            authSection.style.display = "none";
            taskSection.style.display = "block";
            authMessage.textContent = "";
            loadTasks();
        } else {
            authMessage.textContent = "Por favor, completa todos los campos.";
        }
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const tasks = getTasks();
            tasks.push(taskText);
            saveTasks(tasks);
            taskInput.value = '';
            renderTasks();
        }
    }

    function getTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        return tasks;
    }

    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const tasks = getTasks();
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "task";
            li.innerHTML = `
                <span>${task}</span>
                <button onclick="deleteTask(${index})">Eliminar</button>
            `;
            taskList.appendChild(li);
        });
    }

    window.deleteTask = function(index) {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    };

    function logout() {
        currentUser = null;
        authSection.style.display = "block";
        taskSection.style.display = "none";
        authMessage.textContent = "Sesión cerrada.";
    }
});
