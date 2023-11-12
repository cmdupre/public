'use strict'

import util from './util';
import projectForm from './projectForm';
import todoForm from './todoForm';
import data from './domData';

const projects = document.querySelector('.projects');
const todos = document.querySelector('.todos');

function renderContent() {
    renderProjects();
    renderTodos();
}

function renderProjects() {
    const ul = document.createElement('ul');
    ul.classList.add('projects-list');

    if (data.getProjects().length > 0) {
        let li = document.createElement('li');
        li.classList.add('project');
        li.classList.add('all');
        li.id = "allprojects";
        li.textContent = "All Projects";
        li.addEventListener('click', projectClicked);
        ul.appendChild(li);
    }

    for (let project of data.getProjects()) {
        let li = document.createElement('li');
        li.classList.add('project');
        li.id = project.getId();
        li.textContent = project.getDescription();
        li.addEventListener('click', projectClicked);
        ul.appendChild(li);
    }

    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add Project';
    addBtn.id = 'add-project-button';
    addBtn.addEventListener('click', addProjectClicked);
    ul.appendChild(addBtn);

    if (projects.hasChildNodes())
        projects.replaceChild(ul, projects.firstChild);
    else
        projects.appendChild(ul);

    if (data.getProjects().length > 0)
        document.getElementById(data.getSelectedProjectId()).classList.add('selected');
}

function renderTodos() {
    const ul = document.createElement('ul');
    ul.classList.add('todos-list');

    for (let todo of data.getTodosForSelectedId()) {
        const li = document.createElement('li');
        li.classList.add('todo');
        li.id = todo.getId();
        ul.appendChild(li);

        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = todo.getDescription();
        li.appendChild(description);

        const priority = document.createElement('p');
        priority.classList.add('priority');
        priority.textContent = `Priority: ${todo.getPriority()}`;
        li.appendChild(priority);

        const due = document.createElement('date');
        due.classList.add('due-date');
        due.textContent = `Due date: ${util.displayDate(todo.getDue())}`;
        li.appendChild(due);

        const completedLabel = document.createElement('label');
        completedLabel.classList.add('completed');
        completedLabel.textContent = "Completed:";
        li.appendChild(completedLabel);

        const completed = document.createElement('input');
        completed.type = 'checkbox';
        completed.id = `completed-${todo.getId()}`;
        completed.name = 'completed';
        completed.classList.add('completed');
        completed.textContent = "Completed:";
        completed.checked = todo.getCompleted();
        completed.addEventListener('click', completedClicked);
        completedLabel.appendChild(completed);
    }

    const buttons = document.createElement('li');
    buttons.classList.add('todo-buttons');
    ul.appendChild(buttons);

    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add Todo';
    addBtn.id = 'add-todo-button';
    addBtn.addEventListener('click', addTodoClicked);
    buttons.appendChild(addBtn);

    const sweepBtn = document.createElement('button');
    sweepBtn.textContent = 'Sweep';
    sweepBtn.id = 'sweep-button';
    sweepBtn.addEventListener('click', sweepClicked);
    buttons.appendChild(sweepBtn);

    if (todos.hasChildNodes())
        todos.replaceChild(ul, todos.firstChild);
    else
        todos.appendChild(ul);
}

function projectClicked(e) {
    data.setSelectedProjectId(e.target.id);
    renderContent();
}

function addProjectClicked() {
    disableButtons();
    projectForm.show(submitProject);
}

function submitProject(e) {
    e.preventDefault();

    const description = document
        .getElementById('description')
        .value;

    if (description.trim() !== '') {
        data.addProject(description);
        renderContent();
    }
}

function completedClicked(e) {
    const todoId = e.target.id.split('-')[1];
    data.toggleCompleted(todoId);
}

function addTodoClicked() {
    disableButtons();
    todoForm.show(submitTodo);
}

function submitTodo(e) {
    e.preventDefault();

    const description = document
        .getElementById('description')
        .value;

    const priorityText = document
        .getElementById('priority')
        .value;

    const priority = (priorityText.trim() === '')
        ? "100"
        : priorityText;

    const dueText = document
        .getElementById('due')
        .value;

    const due = (dueText.trim() === '')
        ? new Date()
        : new Date(dueText);

    if (description.trim() !== '') {
        data.addTodo(description, due, priority);
        renderContent();
    }
}

function sweepClicked() {
    disableButtons();
    data.sweepCompleted();
    data.setSelectedProjectId('allprojects');
    renderContent();
}

function disableButtons() {
    document.getElementById('add-project-button').disabled = true;
    document.getElementById('add-todo-button').disabled = true;
    document.getElementById('sweep-button').disabled = true;
}

export default (() => {
    return {
        renderContent
    }
})();