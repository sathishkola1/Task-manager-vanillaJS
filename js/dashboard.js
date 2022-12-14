let token = localStorage.getItem('auth')
if (!token) {
    window.location.href = './sign-in.html'
}

let taskId = null

getTasks().then((res) => { displayTasks() }).catch((err) => console.log("Cannot fetch tasks!"))
let tasksList = []
async function getTasks() {
    try {
        let results = await fetch("https://task-manager-3pi7.onrender.com/api/tasks", {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if (results.status !== 200) {
            throw "Cannot find tasks"
        }
        return tasksList = await results.json()
    } catch (error) {
        throw error
    }
}

function displayTasks() {
    let viewCompleted = document.getElementById("completed").className == 'btn btn-dark'
    let html = ''
    tasksList.forEach(task => {
        if (task.completed == viewCompleted) {
            html += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="mr-2">${task.title}</span>
            <span>
            <button id = "edit_${task._id}" onclick="openEditModal(this.id)" class="btn btn-secondary mr-2" data-toggle="modal" data-target="#modal">Edit</button>
            <button id = "delete_${task._id}" onclick="deleteTask(this.id)" class="btn btn-danger">Delete</button>
            </span>
            </li>
            `
        }
    })
    document.getElementById("tasks").innerHTML = html
}


async function addOrUpdateTask() {
    try {
        let title = document.getElementById("title").value
        let description = document.getElementById("description").value
        let completed = document.getElementById("iscompleted").checked
        let res
        if (taskId) {
            res = await fetch(`https://task-manager-3pi7.onrender.com/api/tasks/${taskId}`, {
                method: "PATCH",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, completed })
            })
            if(res.status!==200){
                throw "Error updating task"
            }
            closeModal()
            getTasks().then((res) => { displayTasks() }).catch((err) => console.log("Cannot display tasks!"))
            return
        }
        res = await fetch("https://task-manager-3pi7.onrender.com/api/tasks/", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, completed })
        })
        if(res.status!==201){
            throw "Error adding task"
        }
        getTasks().then((res) => { displayTasks() }).catch((err) => console.log("Cannot fetch tasks!"))
    } catch (error) {
        console.log("Cannot add task!")
    }
}

function openEditModal(id) {
    id = id.substr(5)
    let task = tasksList.find(task => task._id === id)
    document.getElementById("title").value = task.title
    document.getElementById("description").value = task.description
    document.getElementById("iscompleted").checked = task.completed
    taskId = id
}

function closeModal() {
    document.getElementById("title").value = null
    document.getElementById("description").value = null
    document.getElementById("iscompleted").checked = null
    taskId = null
}

function openAddModal() {
    document.getElementById("title").value = null
    document.getElementById("description").value = null
    document.getElementById("iscompleted").checked = null
    taskId = null
}

async function deleteTask(id) {
    try {
        id = id.substr(7)
        let res = await fetch(`https://task-manager-3pi7.onrender.com/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(res.status!==200){
            throw "Error deleting task"
        }
        getTasks().then((res) => { displayTasks() }).catch((err) => console.log("Cannot fetch tasks!"))
    } catch (error) {
        console.log("Cannot delete task!")
    }
}

function toggle(state) {
    if (state == 'completed' && document.getElementById("completed").className != 'btn btn-dark') {
        document.getElementById("completed").className = 'btn btn-dark'
        document.getElementById("incompleted").className = 'btn btn-outline-dark disabled'
        displayTasks()
    }
    else if (state == 'incompleted' && document.getElementById("incompleted").className != 'btn btn-dark') {
        document.getElementById("completed").className = 'btn btn-outline-dark disabled'
        document.getElementById("incompleted").className = 'btn btn-dark'
        displayTasks()
    }
}


