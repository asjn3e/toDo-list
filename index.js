function taskManager() {
    const tasksPlace = document.querySelector("#tasksPlace");

    const tasks = [];//for getting and setting the local storage
    
    //adding task
    this.addTask = (taskTitle, taskDescription) => {
        const task = {
            taskTitle,
            taskDescription
        }
        //creating task's html elements
        const newTask = document.createElement("li");
        newTask.classList.add("box","tasks");//add tasks and box classes to li element 
        //create a div for texts inside li
        const newTaskText=document.createElement("div"); 
        const newTaskTextH3=document.createElement("h3");// create a h3 for title 
        newTaskTextH3.innerHTML=taskTitle; // add task title to h3
        const newTaskTextp=document.createElement("p");// create a p for task description 
        newTaskTextp.innerHTML=taskDescription;//add task decription to p
        newTaskText.appendChild(newTaskTextH3);//add h3 to div
        newTaskText.appendChild(newTaskTextp);// add p to div
        newTaskText.classList.add("tasks__text")
        newTask.appendChild(newTaskText)// add div to li 
        //create task's buttons

        const tasksbtns=document.createElement("div");//create btn's parent
        tasksbtns.classList.add("tasks__btns")

        const tickBTN=document.createElement("button");//create tick btn
        tickBTN.innerHTML=`<i class="fas fa-check"></i>`//add tick icon to btn
        tickBTN.classList.add("tasks__btn","tasks__btn--tick")
        const removeBTN=document.createElement("button");//create remove btn
        removeBTN.innerHTML=`<i class="fas fa-trash"></i>`//add trash icon to btn
        removeBTN.classList.add("tasks__btn","tasks__btn--remove")

        
        tasksbtns.appendChild(tickBTN);
        tasksbtns.appendChild(removeBTN);
        newTask.appendChild(tasksbtns)

        console.log(newTask)
        tasksPlace.appendChild(newTask);
        tasks.push(task);
        console.log(tasks)

        //events for tick and remove

        tickBTN.addEventListener("click",(e)=>{
            newTask.classList.add("tasks--done")
        })
        removeBTN.addEventListener("click",(e)=>{
            newTask.classList.add("task--remove")
        })
        removeBTN.addEventListener("click",()=>{
            newTask.classList.add("tasks--remove")
        })
        removeBTN.addEventListener("transitionend",(e)=>{
            newTask.remove()
        })
    }
}
const taskManager1 = new taskManager();

taskManager1.addTask("feed the dog","description time dawdawd");