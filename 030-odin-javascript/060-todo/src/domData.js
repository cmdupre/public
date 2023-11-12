'use strict'

import storage from './storage';
import projectFactory from './projectFactory';
import todoFactory from './todoFactory';
import util from './util';

let projects = storage.getProjects();
let todos = storage.getTodos();
let selectedProjectId = 'allprojects';

export default (() => {
    return {
        getProjects: () => projects,

        getTodos: () => todos,

        getTodosForSelectedId: () => todos.filter(util.todoForProjectId(selectedProjectId)),

        getSelectedProjectId: () => selectedProjectId,

        setSelectedProjectId: (value) => selectedProjectId = value,

        addProject(description) {
            const project = projectFactory.create(description);
            projects.push(project);
            selectedProjectId = project.getId();
            storage.saveProjects(projects);
        },

        toggleCompleted(todoId) {
            const todosFiltered = todos.filter(t => t.getId() === todoId);
            if (todosFiltered.length !== 1) return;
            const todo = todosFiltered[0];
            todo.toggleCompleted();
            storage.saveTodos(todos);
        },

        addTodo(description, due, priority) {
            const todo = todoFactory.create(selectedProjectId, description, due, priority);
            todos.push(todo);
            storage.saveTodos(todos);
        },

        sweepCompleted() {
            const filteredTodos = [];
            for (const todo of todos) {
                if (selectedProjectId !== "allprojects" && todo.getProjectId() !== selectedProjectId) {
                    filteredTodos.push(todo);
                    continue;
                }
                if (todo.getCompleted() === false)
                    filteredTodos.push(todo);
            }
            todos = filteredTodos;
            const todosProjectIds = todos.map(t => t.getProjectId());
            const filteredProjects = [];
            for (const project of projects)
                if (todosProjectIds.includes(project.getId()))
                    filteredProjects.push(project);
            projects = filteredProjects;
            storage.saveProjects(projects);
            storage.saveTodos(todos);
            selectedProjectId = 'allprojects';
        }
    }
})();