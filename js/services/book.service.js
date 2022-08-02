'use strict'

const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 5

_createBooks()

var bookNames = [
  'The Road Ahead',
  'Harry Potter 1',
  'Harry Potter 2',
  'Harry Potter 3',
  'Harry Potter 4',
  'Harry Potter 5',
  'Dr. Dulitel',
  'Game of Thrones 1',
  'Game of Thrones 2',
  'Game of Thrones 3',
  'Game of Thrones 4',
  'Game of Thrones 5',
  'Mockingjay',
  'The Hunger Games1',
  'The Hunger Games2',
]

// console.log(gBooks)

var gPageIdx = 0
var gRate = 0
var gIdx = 1
var gBooks
var gCurrBook
var gFilterBy = { minPrice: 1, minRate: 0 }

function nextPage() {
  document.querySelector('.first-btn').disabled = false
  document.querySelector('.prev-btn').disabled = false

  gPageIdx++
  if (gPageIdx >= Math.ceil(gBooks.length / PAGE_SIZE) - 1) {
    document.querySelector('.next-btn').disabled = true
  }
}
// setPageNum(gBooks)
function setPageNum(books) {
  var strHtml = `<article class="book-preview">`
  var elCurrPage = document.querySelector('.page-nums')
  for (var i = 0; i < Math.ceil(books.length / PAGE_SIZE); i++) {
    strHtml += `<button${i}></button>`
  }
  elCurrPage.innerHTML = strHtml
}

function prevPage() {
  gPageIdx--
  document.querySelector('.next-btn').disabled = false

  if (gPageIdx === 0) {
    document.querySelector('.prev-btn').disabled = true
    document.querySelector('.first-btn').disabled = true
  }
}
function firstPage() {
  gPageIdx--

  if (gPageIdx * PAGE_SIZE <= gBooks.length) {
    gPageIdx = 0
    document.querySelector('.prev-btn').disabled = true
    document.querySelector('.next-btn').disabled = false
  }
}

function getBooksToShow() {
  var books = gBooks.filter(
    (book) => book.rate >= gFilterBy.minRate && book.price >= gFilterBy.minPrice
  )

  const startIdx = gPageIdx * PAGE_SIZE
  // console.log('startIdx:', startIdx)

  books = books.slice(startIdx, startIdx + PAGE_SIZE)

  return books
}

function _createBooks(num) {
  var books = loadFromStorage(STORAGE_KEY)
  if (!books || !books.length) {
    books = []
    for (let i = 0; i < num; i++) {
      books.push(_createBook(bookNames[i]))
    }
  }
  gBooks = books
  _saveBooksToStorage()
}

function _createBook(name, price) {
  return {
    id: makeId(),
    title: name,
    price: price,
    desc: makeLorem(40),
    rate: getRandomIntInclusive(0, 10),
  }
}

function addBook() {
  var bookName = bookNames[getRandomIntInclusive(0, bookNames.length - 1)]
  var price = getRandomIntInclusive(10, 50)
  var rate = gRate
  gBooks.push(_createBook(bookName, price, rate))
  _saveBooksToStorage()
}

function deleteBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => bookId === book.id)
  gBooks.splice(bookIdx, 1)
  _saveBooksToStorage()
}

function updateBook(bookId, newPrice) {
  const book = gBooks.find((book) => book.id === bookId)
  book.price = newPrice
  _saveBooksToStorage()
  return book
}

function bookRateUp() {
  var book = getBookById(gCurrBook.id)
  if (book.rate >= 10) return
  book.rate++

  _saveBooksToStorage()
}

function bookRateDown() {
  var book = getBookById(gCurrBook.id)
  if (book.rate === 0) return
  book.rate--

  _saveBooksToStorage()
}

function setBookFilter(filterBy) {
  if (filterBy.minPrice !== undefined) gFilterBy.minPrice = +filterBy.minPrice
  if (filterBy.minRate !== undefined) gFilterBy.minRate = +filterBy.minRate
  return gFilterBy
}

function setBookSort(sortBy = {}) {
  if (sortBy.price !== undefined) {
    gBooks.sort((book1, book2) => book1.price - book2.price)
  }
  if (sortBy.maxRate !== undefined) {
    gBooks.sort((book1, book2) => book1.rate - book2.rate)
  }
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks)
}
