const { error } = require("console");
const { console } = require("inspector");

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

   //------------------ SEND TO SERVER ------------------
   fetch('/tasks', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: taskText})
   })
   .then(response => response.json())
   .then(data => {
    console.log('Server: ', data.message);
   })
   .catch(error => {
    console.error('Error: ', error);
   });

   //------------------------ LOAD TASKS ON PAGE LOAD ------------------
window.addEventListener('DOMContentLoaded', () => {
    fetch('/tasks')
        .then(res => res.json())
        .then(tasks => {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.text;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => li.remove();

                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        })
        .catch(err => console.error('Failed to load tasks:', err));
});

});