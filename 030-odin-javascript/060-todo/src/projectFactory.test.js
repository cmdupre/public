'use strict'

import projectFactory from './projectFactory.js'

test('create new project with defaults', () => {
    const description = 'Project 1';
    const project = projectFactory.create(description);

    expect(project.getId()).toBe('project0');
    expect(project.getCreated().getDate()).toBe(new Date().getDate());
    expect(project.getDescription()).toBe(description);
})

test('outputs object for json stringify', () => {
    const description = 'Project 1';
    const project = projectFactory.create(description);
    const jsonObject = project.toObject();

    expect(jsonObject.id).toBe('project1');
    expect(jsonObject.desc).toBe(description);
})

test('create new todo from json string', () => {
    const created = new Date();
    const json = `{"id":"project10","created":"${created}","desc":"Project 1"}`;
    const jsonObject = JSON.parse(json);
    const project = projectFactory.createFromObject(jsonObject);

    expect(project.getId()).toBe('project10');
    expect(project.getCreated().getDate()).toBe(created.getDate());
    expect(project.getDescription()).toBe('Project 1');
})

test('next create should return valid project id (last was project10)', () => {
    const project = projectFactory.create('');
    expect(project.getId()).toBe('project11');
})

test('fix missing equal sign when assigning new uid (last was project11)', () => {
    const json = '{"id":"project12","created":"2023-12-02T17:05:17.222Z","desc":"Project 1"}';
    const jsonObject = JSON.parse(json);
    const project = projectFactory.createFromObject(jsonObject);

    const nextProject = projectFactory.create('');
    expect(nextProject.getId()).toBe('project13');
})