/* =========================================================
   TASKFLOW — TO-DO APP
   OIBSIP | Web Development Level 2 | Task 3
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const taskForm = document.getElementById("taskForm");

const taskInput = document.getElementById("taskInput");

const inputError = document.getElementById("inputError");

const pendingTasks =
    document.getElementById("pendingTasks");

const completedTasks =
    document.getElementById("completedTasks");

const pendingCount =
    document.getElementById("pendingCount");

const completedCount =
    document.getElementById("completedCount");

const totalCount =
    document.getElementById("totalCount");

const pendingBadge =
    document.getElementById("pendingBadge");

const completedBadge =
    document.getElementById("completedBadge");

const searchInput =
    document.getElementById("searchInput");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const clearCompletedBtn =
    document.getElementById("clearCompletedBtn");

const themeBtn =
    document.getElementById("themeBtn");


/* =========================================================
   APPLICATION DATA
========================================================= */

let tasks =
    JSON.parse(
        localStorage.getItem("taskflow-tasks")
    ) || [];


let currentFilter = "all";

let searchTerm = "";


/* =========================================================
   SAVE TASKS
========================================================= */

function saveTasks() {

    localStorage.setItem(
        "taskflow-tasks",
        JSON.stringify(tasks)
    );

}


/* =========================================================
   GENERATE TASK ID
========================================================= */

function generateId() {

    return Date.now().toString() +
        Math.random()
            .toString(36)
            .substring(2, 9);

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {

    const date =
        new Date(dateString);


    return date.toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


/* =========================================================
   ADD TASK
========================================================= */

taskForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const text =
            taskInput.value.trim();


        /* Empty input */

        if (!text) {

            showError(
                "Please enter a task."
            );

            taskInput.focus();

            return;

        }


        /* Clear previous error */

        clearError();


        /* Create task */

        const newTask = {

            id: generateId(),

            text: text,

            completed: false,

            createdAt:
                new Date().toISOString(),

            completedAt: null

        };


        /* Add task */

        tasks.unshift(newTask);


        /* Save */

        saveTasks();


        /* Clear input */

        taskInput.value = "";


        /* Refresh UI */

        render();


        taskInput.focus();

    }
);


/* =========================================================
   ERROR MESSAGE
========================================================= */

function showError(message) {

    inputError.textContent =
        message;

}


function clearError() {

    inputError.textContent = "";

}


/* =========================================================
   RENDER APPLICATION
========================================================= */

function render() {

    updateStatistics();

    renderTaskLists();

}


/* =========================================================
   UPDATE STATISTICS
========================================================= */

function updateStatistics() {

    const pending =
        tasks.filter(
            task => !task.completed
        ).length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const total =
        tasks.length;


    pendingCount.textContent =
        pending;

    completedCount.textContent =
        completed;

    totalCount.textContent =
        total;

    pendingBadge.textContent =
        pending;

    completedBadge.textContent =
        completed;

}


/* =========================================================
   FILTER TASKS
========================================================= */

function getFilteredTasks() {

    let filteredTasks =
        [...tasks];


    /* Status filter */

    if (currentFilter === "pending") {

        filteredTasks =
            filteredTasks.filter(
                task => !task.completed
            );

    }


    if (currentFilter === "completed") {

        filteredTasks =
            filteredTasks.filter(
                task => task.completed
            );

    }


    /* Search */

    if (searchTerm) {

        filteredTasks =
            filteredTasks.filter(
                task =>
                    task.text
                        .toLowerCase()
                        .includes(
                            searchTerm.toLowerCase()
                        )
            );

    }


    return filteredTasks;

}


/* =========================================================
   RENDER TASK LISTS
========================================================= */

function renderTaskLists() {

    pendingTasks.innerHTML = "";

    completedTasks.innerHTML = "";


    const filteredTasks =
        getFilteredTasks();


    const pending =
        filteredTasks.filter(
            task => !task.completed
        );


    const completed =
        filteredTasks.filter(
            task => task.completed
        );


    /* Pending */

    if (pending.length === 0) {

        pendingTasks.innerHTML =
            createEmptyState(
                "No pending tasks",
                "You're all caught up! 🎉"
            );

    } else {

        pending.forEach(task => {

            pendingTasks.appendChild(
                createTaskElement(task)
            );

        });

    }


    /* Completed */

    if (completed.length === 0) {

        completedTasks.innerHTML =
            createEmptyState(
                "No completed tasks",
                "Complete a task and it will appear here."
            );

    } else {

        completed.forEach(task => {

            completedTasks.appendChild(
                createTaskElement(task)
            );

        });

    }

}


/* =========================================================
   CREATE EMPTY STATE
========================================================= */

function createEmptyState(
    title,
    message
) {

    const div =
        document.createElement("div");


    div.className =
        "empty-state";


    div.innerHTML = `

        <div class="empty-icon">
            ✓
        </div>

        <h3>
            ${title}
        </h3>

        <p>
            ${message}
        </p>

    `;


    return div;

}


/* =========================================================
   CREATE TASK ELEMENT
========================================================= */

function createTaskElement(task) {

    const card =
        document.createElement("article");


    card.className =
        "task-card";


    if (task.completed) {

        card.classList.add(
            "completed"
        );

    }


    card.dataset.id =
        task.id;


    /* Complete button */

    const completeButton =
        document.createElement("button");


    completeButton.className =
        "complete-btn";


    completeButton.type =
        "button";


    completeButton.setAttribute(
        "aria-label",
        task.completed
            ? "Mark task as pending"
            : "Mark task as completed"
    );


    completeButton.textContent =
        task.completed
            ? "✓"
            : "";


    completeButton.addEventListener(
        "click",
        () => toggleTask(task.id)
    );


    /* Content */

    const content =
        document.createElement("div");


    content.className =
        "task-content";


    const text =
        document.createElement("div");


    text.className =
        "task-text";


    text.textContent =
        task.text;


    const time =
        document.createElement("small");


    time.className =
        "task-time";


    time.textContent =
        task.completed &&
        task.completedAt

            ? `Completed ${formatDate(task.completedAt)}`

            : `Added ${formatDate(task.createdAt)}`;


    content.appendChild(text);

    content.appendChild(time);


    /* Actions */

    const actions =
        document.createElement("div");


    actions.className =
        "task-actions";


    /* Edit button */

    const editButton =
        document.createElement("button");


    editButton.className =
        "task-action edit-btn";


    editButton.type =
        "button";


    editButton.textContent =
        "✎";


    editButton.setAttribute(
        "aria-label",
        "Edit task"
    );


    editButton.addEventListener(
        "click",
        () => editTask(task.id)
    );


    /* Delete button */

    const deleteButton =
        document.createElement("button");


    deleteButton.className =
        "task-action delete-btn";


    deleteButton.type =
        "button";


    deleteButton.textContent =
        "×";


    deleteButton.setAttribute(
        "aria-label",
        "Delete task"
    );


    deleteButton.addEventListener(
        "click",
        () => deleteTask(task.id)
    );


    actions.appendChild(
        editButton
    );

    actions.appendChild(
        deleteButton
    );


    /* Build card */

    card.appendChild(
        completeButton
    );

    card.appendChild(
        content
    );

    card.appendChild(
        actions
    );


    return card;

}


/* =========================================================
   TOGGLE TASK
========================================================= */

function toggleTask(id) {

    tasks =
        tasks.map(task => {

            if (task.id === id) {

                const completed =
                    !task.completed;


                return {

                    ...task,

                    completed:

                        completed,

                    completedAt:

                        completed

                            ? new Date()
                                .toISOString()

                            : null

                };

            }


            return task;

        });


    saveTasks();

    render();

}


/* =========================================================
   DELETE TASK
========================================================= */

function deleteTask(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmed) {

        return;

    }


    tasks =
        tasks.filter(
            task => task.id !== id
        );


    saveTasks();

    render();

}


/* =========================================================
   EDIT TASK
========================================================= */

function editTask(id) {

    const task =
        tasks.find(
            task => task.id === id
        );


    if (!task) {

        return;

    }


    const card =
        document.querySelector(
            `.task-card[data-id="${id}"]`
        );


    if (!card) {

        return;

    }


    const content =
        card.querySelector(
            ".task-content"
        );


    const actions =
        card.querySelector(
            ".task-actions"
        );


    const editInput =
        document.createElement("input");


    editInput.className =
        "edit-input";


    editInput.type =
        "text";


    editInput.value =
        task.text;


    editInput.maxLength =
        150;


    content.innerHTML = "";

    content.appendChild(
        editInput
    );


    actions.innerHTML = "";


    /* Save button */

    const saveButton =
        document.createElement("button");


    saveButton.className =
        "task-action edit-btn";


    saveButton.type =
        "button";


    saveButton.textContent =
        "✓";


    saveButton.addEventListener(
        "click",
        () => saveEditedTask(
            id,
            editInput.value
        )
    );


    /* Cancel button */

    const cancelButton =
        document.createElement("button");


    cancelButton.className =
        "task-action delete-btn";


    cancelButton.type =
        "button";


    cancelButton.textContent =
        "×";


    cancelButton.addEventListener(
        "click",
        () => render()
    );


    actions.appendChild(
        saveButton
    );

    actions.appendChild(
        cancelButton
    );


    editInput.focus();


    editInput.select();


    /* Enter = save */

    editInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                saveEditedTask(
                    id,
                    editInput.value
                );

            }


            if (
                event.key === "Escape"
            ) {

                render();

            }

        }
    );

}


/* =========================================================
   SAVE EDITED TASK
========================================================= */

function saveEditedTask(
    id,
    newText
) {

    const text =
        newText.trim();


    if (!text) {

        alert(
            "Task cannot be empty."
        );

        return;

    }


    tasks =
        tasks.map(task => {

            if (task.id === id) {

                return {

                    ...task,

                    text: text

                };

            }


            return task;

        });


    saveTasks();

    render();

}


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    event => {

        searchTerm =
            event.target.value.trim();

        render();

    }
);


/* =========================================================
   FILTER BUTTONS
========================================================= */

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                currentFilter =
                    button.dataset.filter;


                filterButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                render();

            }
        );

    }
);


/* =========================================================
   CLEAR COMPLETED
========================================================= */

clearCompletedBtn.addEventListener(
    "click",
    () => {

        const completed =
            tasks.filter(
                task => task.completed
            );


        if (completed.length === 0) {

            return;

        }


        const confirmed =
            confirm(
                `Delete ${completed.length} completed task(s)?`
            );


        if (!confirmed) {

            return;

        }


        tasks =
            tasks.filter(
                task => !task.completed
            );


        saveTasks();

        render();

    }
);


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const savedTheme =
    localStorage.getItem(
        "taskflow-theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark"
    );

    themeBtn.textContent =
        "☀";

}


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        const darkMode =
            document.body.classList.contains(
                "dark"
            );


        if (darkMode) {

            themeBtn.textContent =
                "☀";

            localStorage.setItem(
                "taskflow-theme",
                "dark"
            );

        } else {

            themeBtn.textContent =
                "☾";

            localStorage.setItem(
                "taskflow-theme",
                "light"
            );

        }

    }
);


/* =========================================================
   INITIAL RENDER
========================================================= */

render();