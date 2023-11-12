'use strict'

import projectFactory from "./projectFactory";
import todoFactory from "./todoFactory";

const projectsKey = 'projects';
const todosKey = 'todos';

function saveToStorage(key, values, storage = localStorage) {
    const objects = [];
    for (const value of values)
        objects.push(value.toObject());
    storage.setItem(key, JSON.stringify(objects));
}

function getFromStorage(key, storage = localStorage) {
    return JSON.parse(storage.getItem(key) || '[]');
}

export default (() => {
    return {
        saveProjects: (projects, storage) => saveToStorage(projectsKey, projects, storage),

        saveTodos: (todos, storage) => saveToStorage(todosKey, todos, storage),

        getProjects: (storage) => {
            const values = getFromStorage(projectsKey, storage);
            const projects = [];
            for (const value of values)
                projects.push(projectFactory.createFromObject(value));
            return projects;
        },

        getTodos: (storage) => {
            const values = getFromStorage(todosKey, storage);
            const todos = [];
            for (const value of values)
                todos.push(todoFactory.createFromObject(value));
            return todos;
        },
    }
})();