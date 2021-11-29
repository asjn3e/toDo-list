function taskManager() {
    const tasksPlace = document.querySelector("#tasksPlace");

    const tasks = []; //for getting and setting the local storage

    //adding task
    this.createTask = (taskTitle, taskDescription, status) => {
        const newTask = {
            taskID: tasks.length,
            taskTitle,
            taskDescription,
            status,
        }
        const newTaskElement = document.createElement("li");
        newTaskElement.id = `taskNO${newTask.taskID}`;
        newTaskElement.classList.add("box", "tasks")
        newTaskElement.innerHTML = ` 
        <div class="tasks__text">
            <h3>${taskTitle}</h3>
            <p>${taskDescription}</p>
        </div>
        <div class="tasks__btns">
            <button id="tick${newTask.taskID}" class="tasks__btn tasks__btn--tick"><i class="fas fa-check"></i></button>
            <button id="remove${newTask.taskID}" class="tasks__btn tasks__btn--remove"><i class="fas fa-trash"></i></button>
        </div>
        `
        tasksPlace.appendChild(newTaskElement);
        tasks.push(newTask);


        //creating events for removeing task
        document.querySelector(`#remove${newTask.taskID}`).addEventListener("click", (e) => {
            this.removeTask(newTask.taskID);
        });

        //creating events for finishing tasks
        document.querySelector(`#tick${newTask.taskID}`).addEventListener("click", (e) => {
            this.tickTask(newTask.taskID);
        });

        //saving to localstorage
        localStorage.clear();
        localStorage.setItem("toDo",JSON.stringify(tasks));
        
    }
    this.removeTask = (taskId) => {
        console.log(taskId)
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].taskID == taskId) {
                const task = document.querySelector(`#taskNO${taskId}`);
                task.classList.add("tasks--remove");
                tasks[i].status="removed"
                localStorage.clear();
                localStorage.setItem("toDo",JSON.stringify(tasks));
                setTimeout(() => {
                    tasksPlace.removeChild(task);
                }, 600)
                break;
            }
        }
    }
    this.tickTask = (taskId) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].taskID == taskId) {
                const task = document.querySelector(`#taskNO${taskId}`);
                task.classList.add("tasks--done");
                tasks[i].status = "completed";
                localStorage.clear();
                localStorage.setItem("toDo",JSON.stringify(tasks));
                break;
            }
        }
    }
}

const taskManagerObj = new taskManager();




//adding task with events
document.querySelector('#addTaskBTN').addEventListener("click", (e) => {
    e.preventDefault();
    if (document.querySelector("#taskTitle").value == "" || document.querySelector("#taskDescription").value == "") {
        document.querySelector('#primaryTitle').innerHTML = "task title and Description can not be empty"
        setTimeout(() => {
            document.querySelector('#primaryTitle').innerHTML = "Simple Todo List";
        }, 5000)
        return;
    }
    taskManagerObj.createTask(document.querySelector("#taskTitle").value, document.querySelector("#taskDescription").value, "uncompleted")
    document.querySelector("#taskTitle").value="";
    document.querySelector("#taskDescription").innerHTML == "";
})

