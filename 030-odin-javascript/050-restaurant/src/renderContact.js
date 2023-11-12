'use strict'

function createElements() {
    const p = document.createElement('p');
    p.classList.add('contact');
    p.style.fontSize = '.9rem';
    p.style.lineHeight = '1.5em';
    p.textContent = 'Call Us Now, then call an uber later!'

    return {
        p
    }
}

function renderContent() {
    const es = createElements();
    const content = document.querySelector('#content');

    content.appendChild(es.p);
}

export default renderContent;