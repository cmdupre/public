const container = document.querySelector('.container');
const sizeButton = document.querySelector('.size');

sizeButton.addEventListener('click', changeSize);

createGrid(16);

function getRandomInteger(max)
{
    return Math.floor(Math.random() * max);
}

function mark()
{
    const red = getRandomInteger(256);
    const grn = getRandomInteger(256);
    const blu = getRandomInteger(256);

    this.style.removeProperty('background-color');
    this.style.setProperty('background-color', `rgb(${red}, ${grn}, ${blu})`);
}

function changeSize()
{
    const answer = prompt('What size ya want, hommie?');

    while (container.firstChild)
    {
        container.firstChild.removeEventListener('mouseover', null);
        container.removeChild(container.firstChild);
    }

    createGrid(answer);
}

function createGrid(size)
{
    container.style.removeProperty('grid-template-columns');
    container.style.setProperty('grid-template-columns', `repeat(${size}, 1fr)`);

    const numberOfPixels = size * size;

    for (i = 0; i < numberOfPixels; i++)
    {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.classList.add('pixel--bg-white');
        container.appendChild(pixel);

        pixel.addEventListener('mouseover', mark, { once: true });
    }
}