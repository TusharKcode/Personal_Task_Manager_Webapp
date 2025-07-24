const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

//------------------------ ADD TASK TO LIST ----------------------------------
taskForm.addEventListener('submit', function(e){
    e.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

   //------------------ ADD DELETE BUTTON ------------------ 
   const deleteBtn = document.createElement('button');
   deleteBtn.textContent = 'Delete';
   deleteBtn.onclick = () => li.remove();

   li.appendChild(deleteBtn);
   taskList.appendChild(li);

   taskInput.value = '';
});