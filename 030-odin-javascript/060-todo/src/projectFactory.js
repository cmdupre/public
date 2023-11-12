'use strict'

let uid = 0;

function create(description) {
    const obj = {
        id: `project${uid++}`,
        created: new Date(),
        desc: description
    }

    return createFromObject(obj);
}

function createFromObject(obj) {
    const id = obj.id;
    const created = new Date(obj.created);

    // todo: create a setter
    let desc = obj.desc;

    const getId = () => id;
    const getCreated = () => created;
    const getDescription = () => desc;

    function toObject() {
        return {
            id,
            created,
            desc
        }
    }

    // ensure unique values
    // obj.id is 'project###'
    const thisId = Number(obj.id.slice(7));
    if (thisId >= uid) uid = thisId + 1;

    return {
        getId,
        getCreated,
        getDescription,
        toObject
    };
}

export default (() => {
    return {
        create,
        createFromObject
    }
})();