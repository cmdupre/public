'use strict'

function show(onSubmit) {
    const description = document.createElement('input');
    description.id = 'description';
    description.name = 'description';
    description.type = 'text';
    description.placeholder = 'Description...';
    description.autocomplete = 'off';

    const priority = document.createElement('input');
    priority.id = 'priority';
    priority.name = 'priority';
    priority.type = 'text';
    priority.placeholder = 'Priority...';

    const due = document.createElement('input');
    due.id = 'due';
    due.name = 'due';
    due.type = 'date';
    due.placeholder = 'Due Date...';

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Submit';

    const form = document.createElement('form');
    form.addEventListener('submit', onSubmit);
    form.appendChild(description);
    form.appendChild(priority);
    form.appendChild(due);
    form.appendChild(submit);

    const todoBtns = document.querySelector('.todo-buttons');
    todoBtns.before(form);

    description.focus();
}

function cancelSubmit(e) {
    e.prevenDefault();
}

export default (() => {
    return {
        show
    }
})();