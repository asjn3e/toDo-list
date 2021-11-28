function taskManager() {
    const tasksPlace = document.querySelector("#tasksPlace");

    const tasks = [];//for getting and setting the local storage
    
    //adding task
    this.addTask = (taskTitle, taskDescription,status) => {
        const newTask = {
            taskID:tasks.length,
            taskTitle,
            taskDescription,
            status,
        }
        const newTaskElement=document.createElement("li");
        newTaskElement.id=`taskNO${newTask.taskID}`;
        newTaskElement.classList.add("box","tasks")
        newTaskElement.innerHTML=` 
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

    }

    //returning tasks array
    this.tasksArray=()=>{
        return tasks;
    }
    this.removeTask=(taskId)=>{
        console.log(taskId)
        tasks.forEach((element,index)=>{
            if(element.taskID==taskId){
                tasks[index].status="removed";
                const task=document.querySelector(`#taskNO${taskId}`);
                task.classList.add("tasks--remove");
                tasksPlace.removeChild(task);
            }
        })
    }
}

const taskManagerObj = new taskManager();
//



//adding task with events
document.querySelector('#addTaskBTN').addEventListener("click",(e)=>{
    e.preventDefault();
    if(document.querySelector("#taskTitle").value=="" || document.querySelector("#taskDescription").value==""){
        document.querySelector('#primaryTitle').innerHTML="task title and Description can not be empty"
        setTimeout(()=>{
            document.querySelector('#primaryTitle').innerHTML="Simple Todo List";
        },5000)
        return;
    }
    taskManagerObj.addTask(document.querySelector("#taskTitle").value,document.querySelector("#taskDescription").value,"uncompleted")
    
    //events for removing tasks
    for(let i=0;i<taskManagerObj.tasksArray().length;i++){
        console.log(i)
        document.querySelector(`#remove${i}`).addEventListener("click",()=>{
            taskManagerObj.removeTask(i);
            console.log(i)
            console.log(taskManagerObj.tasksArray())
        });
    }
})
//removing task
