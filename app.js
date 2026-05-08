let input = document.querySelector('#task');
let addtask = document.querySelector('.addtask');
let tasklist = document.getElementById('tasklist');
let filterButtons= document.querySelectorAll('.filter');
addtask.addEventListener('click',addtaskk);
function addtaskk(){
    const val = input.value ;
    if(val ===''){
        alert('Please enter yout task');return;
    }
    let li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
    <span class = "task-text">${val}</span>
    <button class = 'complete-btn'>Completed</button>
    <button class = 'delete-btn'>Delete</button>
    `
    tasklist.appendChild(li);
    input.value = '';
}
