let tasks = [] ;

let input = document.querySelector("#task");
let addtask = document.querySelector(".addtask");
let tasklist = document.getElementById("tasklist");
let filterButtons = document.querySelectorAll(".filter");

//add task
addtask.addEventListener("click", addtaskk);
function addtaskk() {
  const val = input.value;

  if (val === "") {
    alert("Please enter yout task");
    return;
  }

  let li = document.createElement("li");
  li.classList.add("task-item");
  li.innerHTML = `
    <span class = "task-text">${val}</span>
    <button class = 'complete-btn'>Completed</button>
    <button class = 'delete-btn'>Delete</button>
    `;
  tasklist.appendChild(li);
  let del = li.querySelector(".delete-btn");
  del.addEventListener("click", () => {//event listener remain alive after a function is fully executed
    li.remove();
  });
li.querySelector(".complete-btn").addEventListener('click', ()=>{
    li.classList.toggle("completed");
})

  input.value = "";
}

filterButtons.forEach(function(button){//here we take which category the user demands
    button.addEventListener('click',()=>{
        const filterValue = button.dataset.filter;//button.dataset.filter it will return the category user want
        filterfun(filterValue);
    })
})

//filter function
function filterfun(filterValue){
    const allTasks = document.querySelectorAll(".task-item");//we iterate through each task to get category of everyone
    allTasks.forEach(function(task){
        if(filterValue === "all"){//this will give all the tasks
            task.style.display = "flex"
        }else if(filterValue === "completed"){
            if(task.classList.contains('completed')){//if any task is completed it has .completed class present
                task.style.display = "flex";
            }else{
                task.style.display = "none";//user clicked completed but particular task is pending
            }
        }else if(filterValue === "pending"){//if no task completed then no one have completed class so
            if(!task.classList.contains('completed')){
                task.style.display = "flex";
            }else{
                task.style.display = "none";//user clicked pending but particular task is completed
        }
    }
    });
}

function saveTasks(){//browser only stores data in string format
    localStorage.setItem("tasks" , JSON.stringify(tasks));//setItem takes key and value as input comma seperated
}
function loadTasks(){

}