let tasks = [];

// Global DOM Variables
let input;
let addtask;
let tasklist;
let filterButtons;

// Initialize Todo Module
export function initTodo() {
  // DOM Selection
  input = document.querySelector("#task");

  addtask = document.querySelector(".addtask");

  tasklist = document.getElementById("tasklist");

  filterButtons = document.querySelectorAll(".filter");

  // Load Saved Tasks
  loadTasks();

  // Add Task Event
  addtask.addEventListener("click", addtaskk);

  // Filter Button Events
  filterButtons.forEach(function (button) {
    button.addEventListener("click", () => {
      const filterValue = button.dataset.filter;

      filterfun(filterValue);
    });
  });
}

// Render Task
function renderTask(task) {
  const li = document.createElement("li");

  li.dataset.id = task.id;

  li.classList.add("task-item");

  if (task.completed) {
    li.classList.add("completed");
  }

  li.innerHTML = `
  
    <span class="task-text">${task.taskText}</span>

    <button class='complete-btn'>
      Completed
    </button>

    <button class='delete-btn'>
      Delete
    </button>

  `;

  tasklist.appendChild(li);

  // Delete Button
  let del = li.querySelector(".delete-btn");

  del.addEventListener("click", () => {
    const tid = Number(li.dataset.id);

    tasks = tasks.filter((task) => {
      return task.id !== tid;
    });

    saveTasks();

    li.remove();
  });

  // Complete Button
  li.querySelector(".complete-btn").addEventListener("click", () => {
    li.classList.toggle("completed");

    const tid = Number(li.dataset.id);

    tasks.forEach((task) => {
      if (tid === task.id) {
        task.completed = !task.completed;
      }
    });

    saveTasks();
  });
}

// Add Task
function addtaskk() {
  const val = input.value;

  if (val === "") {
    alert("Please enter your task");

    return;
  }

  let taskObj = {
    id: Date.now(),

    taskText: val,

    completed: false,
  };

  renderTask(taskObj);

  tasks.push(taskObj);

  saveTasks();

  input.value = "";
}

// Filter Function
function filterfun(filterValue) {
  const allTasks = document.querySelectorAll(".task-item");

  allTasks.forEach(function (task) {
    if (filterValue === "all") {
      task.style.display = "flex";
    } else if (filterValue === "completed") {
      if (task.classList.contains("completed")) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    } else if (filterValue === "pending") {
      if (!task.classList.contains("completed")) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    }
  });
}

// Save Tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks
function loadTasks() {
  const stored = localStorage.getItem("tasks");

  if (stored) {
    tasks = JSON.parse(stored);

    tasks.forEach((task) => {
      renderTask(task);
    });
  }
}
