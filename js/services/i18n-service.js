'use strict'

var gTrans = {
  title: {
    en: 'Welcome to my book shop',
    he: 'ברוכים הבאים לחנות הספרים שלי',
  },
  'book-title': {
    en: 'Book name',
    he: 'שם הספר',
  },

  'rate-filter': {
    en: 'filter by rate',
    he: 'סינון לפי דירוג ',
  },

  'price-filter': {
    en: 'filter by price',
    he: 'סינון לפי מחיר ',
  },

  'select-sort': {
    en: 'Select sorting',
    he: 'בחר סינון',
  },

  'select-sort': {
    en: 'Select sorting',
    he: 'בחר סינון',
  },

  'select-sort': {
    en: 'Select sorting',
    he: 'בחר סינון',
  },

  price: {
    en: 'Price',
    he: 'לפי מחיר',
  },

  rate: {
    en: 'Rating',
    he: 'לפי דירוג',
  },

  'new-book': {
    en: 'Create new book',
    he: 'הוסף ספר חדש',
  },

  'book-desc': {
    en: 'Book Description',
    he: 'תוכן הספר',
  },
  'book-rate': {
    en: 'Book rating',
    he: 'דירוג הספר',
  },

  close: {
    en: 'Close',
    he: 'סגור',
  },

  read: {
    en: 'Read',
    he: 'קרא',
  },

  update: {
    en: 'update',
    he: 'עדכן',
  },

  delete: {
    en: 'delete',
    he: 'מחק',
  },

  sortby: {
    en: 'sort by',
    he: ' דירוג',
  },

  id: {
    en: 'Id',
    he: 'מספר סידורי',
  },

  actions: {
    en: 'Actions',
    he: 'פעולות',
  },

  rating: {
    en: 'Rating',
    he: 'דירוג',
  },

  'sort-select': {
    en: 'Select sorting',
    he: 'בחר דירוג',
  },
}

function getCurrLang() {
  return gCurrLang
}

var gCurrLang = 'en'

function getTranslate(transKey) {
  const key = gTrans[transKey]

  if (!key) return 'UNKNOWN'
  var translateStr = key[gCurrLang] ? key[gCurrLang] : key['en']

  return translateStr
}

function doTranslate() {
  const els = document.querySelectorAll('[data-trans]')
  els.forEach((el) => {
    const translateKey = el.dataset.trans
    const translateVal = getTranslate(translateKey)
    // console.log(translateVal)
    if (typeof el.placeholder === 'string') el.placeholder = translateVal
    else el.innerText = translateVal
  })
}

function setLang(lang) {
  gCurrLang = lang
}

function formatCurrency(num) {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
  }).format(num)
}
