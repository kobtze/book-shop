'use strict';

const KEY = 'books';
var gBooks;
var gWriters = ['Ernest Hemingway', 'Virginia Woolf', 'Oscar Wilde', 'Lewis Carroll', 'George Orwell']

const PAGE_SIZE = 10;
var gPageIdx = 0;

function _createBook(author, title, price) {
    if (!author) author = gWriters[getRandomIntInclusive(0, gWriters.length - 1)];
    if (!title) title = generateName();
    if (!price) price = getRandomIntInclusive(200, 1000) / 20
    return {
        isbn: makeIsbn(),
        author: author,
        title: title,
        price: price,
        image: getRandomIntInclusive(1,5),
        desc: makeLorem()
    }
}

function createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 20; i++) {
            books.push(_createBook())
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}


function getBooks() {
    return gBooks
}

function removeBook(isbn) {
    var bookIdx = gBooks.findIndex(function(book) {
        return isbn === book.isbn
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function addBook() {
    var book = _createBook()
    gBooks.unshift(book)
    _saveBooksToStorage;
}