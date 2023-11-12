'use strict'

import todoFactory from "./todoFactory"

test('create new todo with defaults', () => {
    const projectId = 'project0';
    const description = 'Todo 1';

    const todo = todoFactory.create(projectId, description);

    expect(todo.getProjectId()).toBe(projectId);
    expect(todo.getId()).toBe('todo0');
    expect(todo.getCreated().getDate()).toBe(new Date().getDate());
    expect(todo.getDescription()).toBe(description);
    expect(todo.getPriority()).toBe('100');
    expect(todo.getDue().getDate()).toBe(new Date().getDate());
    expect(todo.getCompleted()).toBe(false);
})

test('outputs object for json stringify', () => {
    const projectId = 'project0';
    const description = 'Todo 1';

    const todo = todoFactory.create(projectId, description);

    const jsonObject = todo.toObject();

    expect(jsonObject.pid).toBe(projectId);
    expect(jsonObject.id).toBe('todo1');
    expect(jsonObject.desc).toBe(description);
    expect(jsonObject.pri).toBe('100');
    expect(jsonObject.completed).toBe(false);
})

test('create new todo from json string', () => {
    const created = new Date();
    const due = new Date(created.getDate() + 100);
    const projectId = 'project0';
    const description = 'Todo 1';
    const json = `{"pid":"project0","id":"todo10","created":"${created}","desc":"Todo 1","pri":100,"dd":"${due}","completed":false}`;
    const jsonObject = JSON.parse(json);

    const todo = todoFactory.createFromObject(jsonObject);

    expect(todo.getProjectId()).toBe(projectId);
    expect(todo.getId()).toBe('todo10');
    expect(todo.getCreated().getDate()).toBe(created.getDate());
    expect(todo.getDescription()).toBe(description);
    expect(todo.getPriority()).toBe(100);
    expect(todo.getDue().getDate()).toBe(due.getDate());
    expect(todo.getCompleted()).toBe(false);
})

test('next create should return valid id (last was todo10)', () => {
    const todo = todoFactory.create('', '');
    expect(todo.getId()).toBe('todo11');
})

test('fix missing equal sign when assigning new uid (last was todo11)', () => {
    const json = '{"pid":"project0","id":"todo12","created":"2023-12-02T16:49:44.785Z","desc":"Todo 1","pri":100,"dd":"2023-12-02T16:49:44.785Z","completed":false}';
    const jsonObject = JSON.parse(json);
    const todo = todoFactory.createFromObject(jsonObject);

    const nextTodo = todoFactory.create('');
    expect(nextTodo.getId()).toBe('todo13');
})

test('create new todo from json string, should check completed', () => {
    const created = new Date();
    const due = new Date(created.getDate() + 100);
    const projectId = 'project0';
    const description = 'Todo 1';
    const json = `{"pid":"project0","id":"todo10","created":"${created}","desc":"Todo 1","pri":100,"dd":"${due}","completed":true}`;
    const jsonObject = JSON.parse(json);

    const todo = todoFactory.createFromObject(jsonObject);

    expect(todo.getCompleted()).toBe(true);
})
