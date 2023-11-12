'use strict'

import storage from "./storage.js";
import projectFactory from "./projectFactory.js";

const testStorage = (function () {
    let item = null;

    return {
        setItem: (ignoreKey, value) => item = value,
        getItem: (ignoreKey) => item,
    }
})();

test('can save projects to storage', () => {
    const projects = [];
    projects.push(projectFactory.create('Project 1'));
    projects.push(projectFactory.create('Project 2'));

    storage.saveProjects(projects, testStorage);
    expect(testStorage.getItem().length).toBe(149);
    expect(testStorage.getItem().substring(0, 7)).toBe('[{"id":');
})

test('can retrieve projects from storage after save', () => {
    const reconProjects = storage.getProjects(testStorage);
    expect(reconProjects.length).toBe(2);
    expect(reconProjects[0].getId()).toBe('project0');
    expect(reconProjects[1].getId()).toBe('project1');
    expect(reconProjects[0].getDescription()).toBe('Project 1');
    expect(reconProjects[1].getDescription()).toBe('Project 2');
})