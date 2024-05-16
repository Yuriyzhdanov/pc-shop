
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
