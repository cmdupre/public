'use strict'

import todoFactory from "./todoFactory";
import util from "./util"

const todos = [];
todos.push(todoFactory.create('1', 'todo1'));
todos.push(todoFactory.create('2', 'todo2'));
todos.push(todoFactory.create('2', 'todo3'));
todos.push(todoFactory.create('3', 'todo4'));
todos.push(todoFactory.create('3', 'todo5'));
todos.push(todoFactory.create('3', 'todo6'));

// could use test.each...

test('returns correct items from list', () => {
    const filtered = todos.filter(util.todoForProjectId('0'));
    expect(filtered.length).toBe(0);
})

test('returns correct items from list', () => {
    const filtered = todos.filter(util.todoForProjectId(' '));
    expect(filtered.length).toBe(0);
})

test('returns correct items from list', () => {
    const filtered = todos.filter(util.todoForProjectId('1'));
    expect(filtered.length).toBe(1);
})

test('returns correct items from list', () => {
    const filtered = todos.filter(util.todoForProjectId('2'));
    expect(filtered.length).toBe(2);
})

test('returns correct items from list', () => {
    const filtered = todos.filter(util.todoForProjectId('3'));
    expect(filtered.length).toBe(3);
})

test('returns correct items from list', () => {
    const filtered = todos.filter(util.todoForProjectId(null));
    expect(filtered.length).toBe(6);
})

test('returns correct items from list', () => {
    const filtered = todos.filter(util.todoForProjectId(undefined));
    expect(filtered.length).toBe(6);
})

test('returns correct items from list', () => {
    const filtered = todos.filter(util.todoForProjectId(''));
    expect(filtered.length).toBe(6);
})

test('returns correct items from list', () => {
    const filtered = todos.filter(util.todoForProjectId("allprojects"));
    expect(filtered.length).toBe(6);
})

test('returns correct display date', () => {
    const date = new Date("2023-12-15T00:00:44.785Z");
    expect(util.displayDate(date)).toBe('12/15/2023');
})

test('returns correct display date', () => {
    const date = new Date("2024-01-01T00:00:44.785Z");
    expect(util.displayDate(date)).toBe('1/1/2024');
})