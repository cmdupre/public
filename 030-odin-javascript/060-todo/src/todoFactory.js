'use strict'

let uid = 0;

function create(projectId, description, due = new Date(), priority = '100') {
    const obj = {
        pid: projectId,
        id: `todo${uid++}`,
        created: new Date(),
        desc: description,
        pri: priority,
        dd: due,
        completed: false
    }

    return createFromObject(obj);
}

function createFromObject(obj) {
    const pid = obj.pid;
    const id = obj.id;
    const created = new Date(obj.created);

    let desc = obj.desc;
    let pri = obj.pri;
    let dd = new Date(obj.dd);
    let completed = obj.completed;

    const getProjectId = () => pid;
    const getId = () => id;
    const getCreated = () => created;
    const getDescription = () => desc;
    const getPriority = () => pri;
    const getDue = () => dd;
    const getCompleted = () => completed;

    const toggleCompleted = () => completed = !completed;

    function toObject() {
        return {
            pid,
            id,
            created,
            desc,
            pri,
            dd,
            completed
        }
    }

    // ensure unique values
    // obj.id is 'todo###'
    const thisId = Number(obj.id.slice(4));
    if (thisId >= uid) uid = thisId + 1;

    return {
        getProjectId,
        getId,
        getCreated,
        getDescription,
        getPriority,
        getDue,
        getCompleted,
        toggleCompleted,
        toObject
    }
}

export default (() => {
    return {
        create,
        createFromObject
    }
})();