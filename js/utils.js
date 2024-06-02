function toCaptalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function getPageName(str) {
  const startWord = '/html/'
  const endWord = '.html'
  const startIndex = str.indexOf(startWord) + startWord.length
  const endIndex = str.indexOf(endWord)
  return str.slice(startIndex, endIndex)
}

function isContainsIgnoreCase(text, query) {
  return text?.toLowerCase?.().includes(query.toLowerCase())
}

function h(tagName, attrs, text, children, listener) {
  const el = document.createElement(tagName)
  for (const key in attrs) {
    el.setAttribute(key, attrs[key])
  }
  el.textContent = text
  if (children) {
    children.forEach(child => el.appendChild(child))
  }
  el.onclick = listener
  return el
}

function sortAttrs(array, type) {
  switch (type) {
    case 'Количество ядер':
    case 'Объем ОЗУ':
      return array.sort((a, b) => parseInt(a) - parseInt(b))
    case 'Объем накопителя':
    case 'Блок питания':
    case 'Частота ОЗУ':
      return array.sort(
        (a, b) =>
          parseInt(a.replace(/[^0-9]/g, '')) -
          parseInt(b.replace(/[^0-9]/g, ''))
      )
    case 'Частота процессора':
      return array.sort(
        (a, b) =>
          parseFloat(a.replace(/[^\d.]/g, '')) -
          parseFloat(b.replace(/[^\d.]/g, ''))
      )
    case 'Тип ОЗУ':
    case 'Тип накопителя':
    case 'Процессор':
    case 'Материнская плата':
      return array.sort()
    default:
      return array.sort()
  }
}

function normalizeStorageCapacity(storageCapacity) {
  return storageCapacity.map(capacity => capacity.replace(/,$/, ''))
}
