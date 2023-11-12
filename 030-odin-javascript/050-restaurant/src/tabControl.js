'use strict'

import renderHome from './renderHome';
import renderMenu from './renderMenu';
import renderContact from './renderContact';

function createElements() {
    const tabs = document.createElement('navigation');
    tabs.classList.add('tabs');

    const homeTab = document.createElement('div');
    homeTab.classList.add('tab');
    homeTab.textContent = 'Home';
    homeTab.addEventListener('click', homeTabClicked);

    const menuTab = document.createElement('div');
    menuTab.classList.add('tab');
    menuTab.textContent = 'Menu';
    menuTab.addEventListener('click', menuTabClicked);

    const contactTab = document.createElement('div');
    contactTab.classList.add('tab');
    contactTab.textContent = 'Contact';
    contactTab.addEventListener('click', contactTabClicked);

    return {
        tabs,
        homeTab,
        menuTab,
        contactTab
    }
}

function renderContent() {
    const es = createElements();
    
    const content = document.querySelector('#content');
    content.appendChild(es.tabs);

    es.tabs.appendChild(es.homeTab);
    es.tabs.appendChild(es.menuTab);
    es.tabs.appendChild(es.contactTab);
}

function clearContent() {
    const oldContent = document.querySelector('#content');
    const newContent = document.createElement('div');
    newContent.id = 'content';
    document.body.replaceChild(newContent, oldContent);
}

function homeTabClicked() {
    clearContent();
    renderContent();
    renderHome();
}

function menuTabClicked () {
    clearContent();
    renderContent();
    renderMenu();
}

function contactTabClicked () {
    clearContent();
    renderContent();
    renderContact();
}

export default renderContent;