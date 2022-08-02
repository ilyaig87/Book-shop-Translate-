'use strict'

function onInit() {
  renderFilterByQueryStringParams()
  doTranslate()
  renderBooks()
}

function renderBooks() {
  var books = getBooksToShow()
  var strHTMLs = books.map(
    (book) =>
      `<article class="book-preview">
      <tr>
      <td> ${book.id}</td>
        <td>${book.title}</td>
        <td>$${book.price.toFixed(2)}</td>
        <td>${book.rate}</td>
             <td >
        <button data-trans="read" class="read" onclick="onReadBook('${
          book.id
        }')">Read</button>
        <button data-trans="update" class="update" onclick="onUpdateBook('${
          book.id
        }')">Update</button>
        <button data-trans="delete" class="delete" onclick="onDeleteBook('${
          book.id
        }')">Delete</button>
        </td>        
        \t</tr>  
        </article> 
        `
  )

  strHTMLs = strHTMLs.join('')
  strHTMLs =
    `<tr>
                      <th data-trans="id">${getTranslate('id')}</th>
                  <th data-trans="book-title">${getTranslate('title')}</th>
                  <th data-trans="price">${getTranslate('price')}</th>
                  <th data-trans="rating">${getTranslate('rating')}</th>
                  <th data-trans="actions">${getTranslate('actions')}</th>
              </tr>` + strHTMLs

  //   console.log('strHTMLs:', strHTMLs)
  document.querySelector('.booksTable').innerHTML = strHTMLs
  doTranslate()
}

function onAddBook() {
  addBook()
  renderBooks()
  if (gCurrLang === 'en') {
    flashMsg(`New book Added to the list `)
  } else {
    flashMsg(`הספר החדש נוסף `)
  }
}

function onDeleteBook(bookId) {
  deleteBook(bookId)
  renderBooks()
  if (gCurrLang === 'en') {
    flashMsg(`Book deleted!`)
  } else {
    flashMsg(`הספר נמחק! `)
  }
}

function onUpdateBook(bookId) {
  var newPrice
  var book = getBookById(bookId)

  if (gCurrLang === 'en') newPrice = +prompt('price?', book.price)
  else newPrice = +prompt('מה המחיר אותו תרצה לעדכן את הספר', book.price)

  if (newPrice && book.price !== newPrice) {
    book = updateBook(bookId, newPrice)
    renderBooks()
    if (gCurrLang === 'en') {
      flashMsg(`Book updated to: ${book.price}$`)
    } else {
      flashMsg(`הספר עודכן: ${book.price}$`)
    }
  }
}

function onReadBook(bookId) {
  const book = getBookById(bookId)
  const elModal = document.querySelector('.modal')
  gCurrBook = book
  elModal.querySelector('h3').innerText = book.title
  elModal.querySelector('h4').innerText = book.price + '$'
  elModal.querySelector('p').innerText = book.desc
  elModal.querySelector('h7 span').innerText = gCurrBook.rate

  elModal.classList.add('open')
}

function getBookById(bookId) {
  const book = gBooks.find((book) => bookId === book.id)
  return book
}

function onCloseModal() {
  document.querySelector('.modal').classList.remove('open')
}

function onBookRateUp() {
  bookRateUp()
  document.querySelector('h7 span').innerHTML = gCurrBook.rate
  renderBooks()
}

function onBookRateDown() {
  bookRateDown()
  document.querySelector('h7 span').innerHTML = gCurrBook.rate
  renderBooks()
}

function onSetFilterBy(filterBy) {
  setBookFilter(filterBy)
  // console.log('filterBy:', filterBy)

  renderBooks()

  const queryStringParams = `?minPrice=${filterBy.minPrice}&minRate=${filterBy.minRate}`

  const newUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    queryStringParams

  window.history.pushState({ path: newUrl }, '', newUrl)
}

function onSetSortBy() {
  const value = document.querySelector('.sort-by').value
  const sortBy = {
    [value]: 1,
  }
  console.log('sortBy:', sortBy)

  setBookSort(sortBy)
  renderBooks()
}

function renderFilterByQueryStringParams() {
  const queryStringParams = new URLSearchParams(window.location.search)
  const filterBy = {
    minPrice: +queryStringParams.get('minPrice') || 0,
    minRate: +queryStringParams.get('minRate') || 0,
  }
  if (!filterBy.minPrice && !filterBy.minPrice) return

  document.querySelector('.filter-price-range').value = filterBy.minPrice
  document.querySelector('.filter-rating-range').value = filterBy.minRate
  setBookFilter(filterBy)
}

function onNextPage() {
  nextPage()
  renderBooks()
}
function onPrevPage() {
  prevPage()
  renderBooks()
}
function onFirstPage() {
  firstPage()
  renderBooks()
}

function flashMsg(msg) {
  const el = document.querySelector('.user-msg')
  el.innerText = msg
  el.classList.add('open')
  setTimeout(() => {
    el.classList.remove('open')
  }, 3000)
}

function onSetLang(lang) {
  setLang(lang)
  // TODO: if lang is hebrew add RTL class to document.body
  if (lang === 'he') document.body.classList.add('rtl')
  else document.body.classList.remove('rtl')
  doTranslate()
  renderBooks()
}
