// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const addTask = document.querySelector('#submit');
let title = document.querySelector('#task-title');
let dueDate = document.getElementById('due-date');
let description = document.querySelector('#description');

$('#btn-save').click(function() {
    $('#formModal').modal('hide');
 });
 $('#submit').click(function() {
    $('#formModal').modal('hide');
 });  

addTask.addEventListener('click', function(){
    title = title.value;
    description = description.value; 
    dueDate = dueDate.value;   
});

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

    
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
