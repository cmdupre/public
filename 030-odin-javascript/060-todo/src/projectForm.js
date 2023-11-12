'use strict'

function show(onSubmit) {
    const input = document.createElement('input');
    input.id = 'description';
    input.name = 'description';
    input.type = 'text';
    input.placeholder = 'Description...';
    input.autocomplete = 'off';

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Submit';

    const form = document.createElement('form');
    form.addEventListener('submit', onSubmit);
    form.appendChild(input);
    form.appendChild(submit);

    const addBtn = document.getElementById('add-project-button');
    addBtn.before(form);

    input.focus();
}

function cancelSubmit(e) {
    e.preventDefault();
}

export default (() => {
    return {
        show
    }
})();