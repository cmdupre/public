'use strict'

function createElements() {
    const logoImage = document.createElement('img');
    logoImage.classList.add('logo-image');
    logoImage.src = "../res/logo.jpg";
    logoImage.alt = "logo, just beer";

    const logoText = document.createElement('span');
    logoText.classList.add('logo-text');
    logoText.textContent = "Just Beer";

    const logo = document.createElement('div');
    logo.classList.add('logo');

    const copyText = document.createElement('div');
    copyText.classList.add('copy-text');
    copyText.textContent = `
        Welcome to "Just Beer", the restaurant that serves only... 
        beer. One might consider this a bar instead, but that would 
        be foolish thinking. Only the thirsty eat here!`;

    const header = document.createElement('header');
    header.classList.add('header');

    const creditLink = document.createElement('a');
    creditLink.classList.add('credit-link');
    creditLink.href = 'https://www.freepik.com/free-vector/beer-toast-vector-illustration-isolated-white-background_27528969.htm#query=clip%20art%20beer&position=1&from_view=search&track=ais&uuid=9f436bee-ed21-415e-b540-f94b896b577d';
    creditLink.textContent = 'Logo image by callmetak on Freepik';

    const credit = document.createElement('div');
    credit.classList.add('credit');

    const footer = document.createElement('footer');
    footer.classList.add('footer');

    return {
        logoImage,
        logoText,
        logo,
        copyText,
        header,
        creditLink,
        credit,
        footer,
    }
}

function renderContent() {
    const es = createElements();
    const content = document.querySelector('#content');

    content.appendChild(es.header);
    es.header.appendChild(es.logo);
    es.logo.appendChild(es.logoImage);
    es.logo.appendChild(es.logoText);
    es.header.appendChild(es.copyText);
    content.appendChild(es.footer);
    es.footer.appendChild(es.credit);
    es.credit.appendChild(es.creditLink);
}

export default renderContent;