const title = $('#task-name-input');
const dueDate = $('#taskDueDate');
const description = $('#task-description-input');
const submitForm = document.querySelector('#submit'); 

function readTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    
    if (!tasks) {
        tasks = [];

    }

    return tasks;
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function handleAddTask(event) {
    event.preventDefault();

    const taskName = title.val().trim();
    const taskDescription = description.val().trim();
    const taskDate = dueDate.val();
  
    const newTask = {
      name: taskName,
      description: taskDescription,
      dueDate: taskDate,
      status: 'to-do',
    };

    const tasks = readTasksFromStorage();
    tasks.push(newTask);
  
    saveTasksToStorage(tasks);
  
    printTaskData();
  
   title.val('');
   description.val('');
   dueDate.val('');
    
}

function printTaskData() {
    const tasks = readTasksFromStorage();
  
    const todoList = $('#todo-cards');
    todoList.empty();
  
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
  
    const doneList = $('#done-cards');
    doneList.empty();
  
    for (let task of tasks) {
      if (task.status === 'to-do') {
        todoList.append(createTaskCard(task));
      } else if (task.status === 'in-progress') {
        inProgressList.append(createTaskCard(task));
      } else if (task.status === 'done') {
        doneList.append(createTaskCard(task));
      }
    }
  
    $('.draggable').draggable({
      opacity: 0.7,
      zIndex: 100,
      helper: function (e) {
        const original = $(e.target).hasClass('ui-draggable')
          ? $(e.target)
          : $(e.target).closest('.ui-draggable');
        return original.clone().css({
          width: original.outerWidth(),
        });
      },
    });
  }

  function createTaskCard(task) {
    const taskCard = $('<div>')
      .addClass('card task-card draggable my-3')
      .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
      .addClass('btn btn-danger delete')
      .text('Delete')
      .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);
  
    if (task.dueDate && task.status !== 'done') {
      const now = dayjs();
      const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
  
      if (now.isSame(taskDueDate, 'day')) {
        taskCard.addClass('bg-warning text-white');
      } else if (now.isAfter(taskDueDate)) {
        taskCard.addClass('bg-danger text-white');
        cardDeleteBtn.addClass('border-light');
      }
    }
  
    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);
  
    return taskCard;
  }

  function handleDeleteTask() {
    const taskId = $(this).attr('data-task-id');
    const tasks = readTasksFromStorage();
  
    tasks.forEach((task) => {
      if (task.id === taskId) {
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
  
    saveTasksToStorage(tasks);
  
    printTaskData();
  }

  function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();
  
    const taskId = ui.draggable[0].dataset.taskId;
  
    const newStatus = event.target.id;
  
    for (let task of tasks) {
      if (task.id === taskId) {
        task.status = newStatus;
      }
    }
    saveTasksToStorage(tasks);
    printTaskData();
  }

submitForm.addEventListener('click', handleAddTask)

$(document).ready(function () {
    printTaskData();
  
    $('#taskDueDate').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
  });