function taskManager() {
    const tasksPlace = document.querySelector("#tasksPlace");

    let tasks = []; //for getting and setting the local storage
    let pageStatus ="All";
    //adding task
    this.createTask = (taskTitle, taskDescription, status) => {
        if(status=="completed"||status=="uncompleted"){
            tasksPlace.innerHTML=""
            pageStatus="All"
            this.createTasksAfterReload(false);
        }
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
    this.createTasksAfterReload = (shouldMakeEvent) => {
        const loadedTasks=localStorage.getItem("toDo")
        console.log(loadedTasks)
        if(!loadedTasks)return;
        tasks=JSON.parse(loadedTasks);
        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i]
            const newTaskElement = document.createElement("li");    
            newTaskElement.id = `taskNO${task.taskID}`;
                switch (task.status) {
                    case "completed":
                        newTaskElement.classList.add("box", "tasks","tasks--done")         
                        break;
                    case "uncompleted":
                        newTaskElement.classList.add("box", "tasks");
                        break;         
                    default:
                        newTaskElement.classList.add("box", "tasks","tasks--remove");
                        continue;
                        // break;
                }
            newTaskElement.innerHTML = ` 
            <div class="tasks__text">
                <h3>${task.taskTitle}</h3>
                <p>${task.taskDescription}</p>
            </div>
            <div class="tasks__btns">
                <button id="tick${task.taskID}" class="tasks__btn tasks__btn--tick"><i class="fas fa-check"></i></button>
                <button id="remove${task.taskID}" class="tasks__btn tasks__btn--remove"><i class="fas fa-trash"></i></button>
            </div>
            `
            tasksPlace.appendChild(newTaskElement);
                
            if(shouldMakeEvent==true){
                //creating events for removeing task
                document.querySelector(`#remove${task.taskID}`).addEventListener("click", (e) => {
                    this.removeTask(task.taskID);
                });

                //creating events for finishing tasks
                document.querySelector(`#tick${task.taskID}`).addEventListener("click", (e) => {
                    this.tickTask(task.taskID);
                });

            }
        }//end of the for
    }//end of the createTasksAfterReload() method
    this.changeStatus=(selectedStatus)=>{
        if (selectedStatus=="All") {
            tasksPlace.innerHTML=""
            status="All"
            this.createTasksAfterReload(false);
            return;
        }
        pageStatus=selectedStatus;
        tasksPlace.innerHTML=""
        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            if(selectedStatus==task.status){
                const newTaskElement = document.createElement("li");    
                newTaskElement.id = `taskNO${task.taskID}`;
                if(selectedStatus=="completed"){
                    newTaskElement.classList.add("box", "tasks","tasks--done")         
                }
                else if(selectedStatus=="uncompleted"){
                    newTaskElement.classList.add("box", "tasks")         
                }else{
                    newTaskElement.classList.add("box", "tasks","tasks--removed")         
                }
                newTaskElement.innerHTML = ` 
                <div class="tasks__text">
                    <h3>${task.taskTitle}</h3>
                    <p>${task.taskDescription}</p>
                </div>
                <div class="tasks__btns">
                    <button id="tick${task.taskID}" class="tasks__btn tasks__btn--tick"><i class="fas fa-check"></i></button>
                    <button id="remove${task.taskID}" class="tasks__btn tasks__btn--remove"><i class="fas fa-trash"></i></button>
                </div>
                `
                tasksPlace.appendChild(newTaskElement);
            }else{
                continue;
            }
            }//end of the for
    }//end of changeStatus() method
}

const taskManagerObj = new taskManager();


taskManagerObj.createTasksAfterReload(true);

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
//changing status
document.querySelector("#statusSpecifier").addEventListener("change",(e)=>{
    console.log(e.target.value)
    taskManagerObj.changeStatus(e.target.value)
})
