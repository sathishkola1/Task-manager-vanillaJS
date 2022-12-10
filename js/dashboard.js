let token = localStorage.getItem('auth')
if(!token){
    window.location.href='./sign-in.html'
}

getTasks().then((res)=>{displayTasks()}).catch((err)=>console.log("Cannot fetch tasks!"))
let tasksList = []
async function getTasks(){
    try {
        let results = await fetch("http://127.0.0.1:3000/api/tasks/",{
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    }
            })
        return tasksList = await results.json()
    } catch (error) {
        throw error
    }
}

function displayTasks(){
    let viewCompleted = document.getElementById("completed").className == 'btn btn-dark'
    let html= ''
    tasksList.forEach(task => {
        if(task.completed == viewCompleted){
            html+=`
            <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="mr-2">${task.title}</span>
            <span>
            <button id = "edit_${task._id}" onclick="openEditModal(this.id)" class="btn btn-secondary mr-2" data-toggle="modal" data-target="#edit-modal">Edit</button>
            <button id = "delete_${task._id}" onclick="deleteTask(this.id)" class="btn btn-danger">Delete</button>
            </span>
            </li>
            `
        }
    })
    document.getElementById("tasks").innerHTML = html
}

async function addTask(){
    try {
        let title = document.getElementById("add-title").value
        let description = document.getElementById("add-description").value 
        let completed = document.getElementById("add-iscompleted").checked
        await fetch("http://127.0.0.1:3000/api/tasks/",{
            method : "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
            body: JSON.stringify({ title,description,completed})
        })
        getTasks().then((res)=>{displayTasks()}).catch((err)=>console.log("Cannot fetch tasks!"))
    } catch (error) {
        console.log("Cannot add task!")
    }
}

async function updateTask(id){
    try {
        let title = document.getElementById("edit-title").value
        let description = document.getElementById("edit-description").value 
        let completed = document.getElementById("edit-iscompleted").checked
        await fetch(`http://127.0.0.1:3000/api/tasks/${id}`,{
            method : "PATCH",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
            body: JSON.stringify({ title,description,completed})
        })
        getTasks().then((res)=>{displayTasks()}).catch((err)=>console.log("Cannot fetch tasks!"))
    } catch (error) {
        console.log("Cannot update task!")
    }
}

function openEditModal(id){
    id = id.substr(5)
    let task = tasksList.find( task => task._id === id )
    document.getElementById("edit-title").value = task.title
    document.getElementById("edit-description").value = task.description
    document.getElementById("edit-iscompleted").checked = task.completed
    let length = document.getElementsByTagName("button").length
    document.getElementsByTagName("button")[length-1].id = id
}

async function deleteTask(id){
    try {
        id = id.substr(7)
        await fetch(`http://127.0.0.1:3000/api/tasks/${id}`,{
            method : "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
        })
        getTasks().then((res)=>{displayTasks()}).catch((err)=>console.log("Cannot fetch tasks!"))
    } catch (error) {
        console.log("Cannot delete task!")
    }
}

function toggle(state){
    if(state == 'completed' && document.getElementById("completed").className != 'btn btn-dark' ){
        document.getElementById("completed").className = 'btn btn-dark'
        document.getElementById("incompleted").className = 'btn btn-outline-dark disabled'
        displayTasks()
    }
    else if (state == 'incompleted' && document.getElementById("incompleted").className != 'btn btn-dark'){
        document.getElementById("completed").className = 'btn btn-outline-dark disabled'
        document.getElementById("incompleted").className = 'btn btn-dark'
        displayTasks()
    }
}


