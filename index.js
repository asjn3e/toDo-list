function taskManager() {
    const tasksPlace = document.querySelector("#tasksPlace");

    const tasks = [];//for getting and setting the local storage
    
    //adding task
    this.addTask = (taskTitle, taskDescription,status) => {
        const task = {
            taskID:tasks.length,
            taskTitle,
            taskDescription,
            status,
        }
    }
}

const taskManagerObj = new taskManager();

//adding task
document.querySelector('#addTaskBTN').addEventListener("click",(e)=>{
    e.preventDefault();
    taskManagerObj.addTask("","")
})
