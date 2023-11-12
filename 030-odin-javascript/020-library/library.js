function Book(title, author, pages, read)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function()
{
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
}

function addBookToLibrary(book)
{
    const id = `item-${guid++}`;

    const card = document.createElement('li');
    card.classList.add("card");
    card.classList.add(id);
    ul.appendChild(card);

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement('div');
    author.classList.add('author');
    author.textContent = book.author;
    card.appendChild(author);

    const pages = document.createElement('div');
    pages.classList.add('pages');
    pages.textContent = book.pages + ' pages';
    card.appendChild(pages);

    const read = document.createElement('div');
    read.classList.add('read');
    read.textContent = book.read ? 'Read' : 'Not Read Yet';
    card.appendChild(read);
   
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.id = id;
    deleteBtn.textContent = 'x';
    deleteBtn.addEventListener('click', deleteBook);
    card.appendChild(deleteBtn);
}

function deleteBook(e)
{
    const li = document.querySelector(`.${e.target.id}`);
    li.parentElement.removeChild(li);
}

function getNewBook()
{
    clearForm();
    form.classList.remove('hidden');
    newTitle.focus();
}

function submitForm(e)
{
    e.preventDefault();
    form.classList.add('hidden');

    if (newTitle.value === '' || newAuthor.value === '' || newPages.value === '')
    {
        return;
    }

    addBookToLibrary(
        new Book(newTitle.value, newAuthor.value, newPages.value, newRead.checked));
}

function clearForm()
{
    newTitle.value = '';
    newAuthor.value = '';
    newPages.value = '';
    newRead.checked = false;
}

let guid = 0;

const container = document.querySelector('.book-list-container');

const ul = document.createElement('ul');
ul.classList.add('book-list');
container.appendChild(ul);

const form = document.querySelector('#new-book-form');
form.addEventListener('submit', submitForm);

const newTitle = document.querySelector('#title');
const newAuthor = document.querySelector('#author');
const newPages = document.querySelector('#pages');
const newRead = document.querySelector('#read');