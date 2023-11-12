'use strict'

function renderContent() {
    const content = document.querySelector('#content');

    const p = document.createElement('p');
    p.textContent = 'On Tap';
    p.style.color = 'steelblue';
    p.style.fontWeight = 'bold';
    content.appendChild(p);

    const ol = document.createElement('ol');
    ol.classList.add('menu-items');
    ol.style.fontSize = '.9rem';
    ol.style.lineHeight = '1.5em';
    content.appendChild(ol);

    let i = 0;
    while (i++ < 5) {
        const li = document.createElement('li');
        li.classList.add('menu-item');
        switch (i) {
            case 1: 
                li.textContent = 'Holy Roller IPA';
                break;
            case 2: 
                li.textContent = 'Hopitoulas IPA';
                break;
            case 3:
                li.textContent = 'Guinness';
                break;
            case 4:
                li.textContent = 'Ghost in the Machine';
                break;
            case 5: 
                li.textContent = 'Miller Light';
                break;
        }
        ol.appendChild(li);
    }
}

export default renderContent;