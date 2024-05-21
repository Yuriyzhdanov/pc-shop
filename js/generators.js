function generateFilterProp(caption) {
  const elDiv = h('div', { class: 'wrap-props' }, '', [h('h3', '', caption)])
  return elDiv
}

// function generateFilterCheckbox(key, value) {
//   const elDiv = document.createElement('div')
//   const elCheckbox = document.createElement('input')
//   const elLabel = document.createElement('label')
//   elCheckbox.type = 'checkbox'
//   elCheckbox.value = value
//   elCheckbox.name = `${key}`
//   elCheckbox.id = `${key}-${value}`
//   elLabel.htmlFor = `${key}-${value}`
//   elLabel.textContent = value
//   elDiv.classList.add('wrap-checkbox')
//   elDiv.appendChild(elCheckbox)
//   elDiv.appendChild(elLabel)

//   return elDiv
// }

function generateFilterCheckbox(key, value) {
  const elDiv = h('div', { class: 'wrap-checkbox' }, '', [
    h('input', {
      type: 'checkbox',
      value: value,
      name: key,
      id: `${key}-${value}`,
    }),
    h('label', { htmlFor: `${key}-${value}` }, value),
  ])
  return elDiv
}

function generateLabelSpecs(specs) {
  const divLabels = document.createElement('div')
  let i = 0
  for (const key in specs) {
    const value = specs[key]
    i++
    const labelValue = `${key}-${value}`
    const label = document.createElement('label')
    label.textContent = value
    label.htmlFor = labelValue
    divLabels.appendChild(label)
    if (i > 8) {
      return divLabels
    }
  }
  return divLabels
}

function generateProduct(product) {
  const divContainterProduct = document.createElement('div')
  const divWrapA = document.createElement('div')
  const divWrapImg = document.createElement('div')
  const divH3 = document.createElement('div')
  const divP = document.createElement('div')
  const divRow = document.createElement('div')
  const divNew = document.createElement('div')
  const divButtonCart = document.createElement('div')
  const divButtonFavorite = document.createElement('div')
  const divButtonCompare = document.createElement('div')
  const divLabels = generateLabelSpecs(product.attributes)
  const aLink = document.createElement('a')
  const img = document.createElement('img')
  const h3 = document.createElement('h3')
  const buttonCart = document.createElement('button')
  const buttonFavorite = document.createElement('button')
  const buttonCompare = document.createElement('button')
  const p = document.createElement('p')
  const b = document.createElement('b')
  divContainterProduct.classList.add('wrap-product')
  divContainterProduct.dataset.productId = product.id
  divWrapImg.classList.add('wrap-img')
  divRow.classList.add('row')
  Math.random() < 0.5 && divNew.classList.add('new')
  buttonCart.classList.add('cart')
  buttonFavorite.classList.add('favorite')
  buttonCompare.classList.add('compare')
  aLink.setAttribute('href', `./product.html?id=${product.id}`)
  aLink.setAttribute('target', '_blank')
  aLink.setAttribute('class', 'a-link')
  divH3.setAttribute('class', 'wrap-h3')
  img.src = `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`
  img.alt = product.caption
  h3.textContent = product.caption
  b.textContent = product.convertedPrice.toFixed()
  divContainterProduct.appendChild(divWrapA)
  divContainterProduct.appendChild(divLabels)
  divContainterProduct.appendChild(divP)
  divContainterProduct.appendChild(divRow)
  divContainterProduct.appendChild(divNew)
  divWrapA.appendChild(aLink)
  aLink.appendChild(divWrapImg)
  aLink.appendChild(divH3)
  divWrapImg.appendChild(img)
  divH3.appendChild(h3)
  divP.appendChild(p)
  p.appendChild(b)
  divRow.appendChild(divButtonCart)
  divRow.appendChild(divButtonFavorite)
  divRow.appendChild(divButtonCompare)
  divButtonCart.appendChild(buttonCart)
  divButtonFavorite.appendChild(buttonFavorite)
  divButtonCompare.appendChild(buttonCompare)
  p.innerHTML += ' грн'
  return divContainterProduct
}

// function generateProduct(product) {
//   const divLabels = generateLabelSpecs(product.attributes)

//   const divContainterProduct = h(
//     'div',
//     { class: 'wrap-product', 'data-product-id': product.id },
//     '',
//     [
//       h('div', { class: 'wrap-a' }, '', [
//         h(
//           'a',
//           {
//             href: `./product.html?id=${product.id}`,
//             target: '_blank',
//             class: 'a-link',
//           },
//           '',
//           [
//             h('div', { class: 'wrap-img' }, '', [
//               h('img', {
//                 src: `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`,
//                 alt: product.caption,
//               }),
//             ]),
//             h('div', { class: 'wrap-h3' }, '', [
//               h('h3', '', product.caption),
//             ]),
//           ]
//         ),
//       ]),
//       divLabels,
//       h('div', { class: 'wrap-p' }, '', [
//         h('p', '', [h('b', '', product.convertedPrice.toFixed(2)), ' грн']),
//       ]),
//       h('div', { class: 'row' }, '', [
//         h('div', { class: Math.random() < 0.5 ? 'new' : '' }),
//         h('div', { class: 'cart' }, '', [h('button')]),
//         h('div', { class: 'favorite' }, '', [h('button')]),
//         h('div', { class: 'compare' }, '', [h('button')]),
//       ]),
//     ]
//   )
//   return divContainterProduct
// }

function generateProductSidebar(product) {
  const slider = document.createElement('div')
  const navigation = generateNavigation(product, slider)
  const specsContainer = generateSpecsContainer(product)
  slider.classList.add('slider')
  slider.appendChild(navigation)
  slider.appendChild(specsContainer)
  return slider
}

function generateDataList(captions) {
  const datalist = document.querySelector('#productCaptions')
  captions.forEach(caption => {
    const option = document.createElement('option')
    option.value = caption
    datalist.appendChild(option)
  })
  return datalist
}

function generateNavigation(product, slider) {
  const navigation = document.createElement('div')
  navigation.classList.add('navigation')
  product.photos.forEach((file, index) => {
    const input = document.createElement('input')
    const label = generateLabel(file, index, product)
    input.type = 'radio'
    input.name = 'r'
    input.id = `slider-r${index + 1}`
    if (index === 0) {
      input.checked = true
    }
    navigation.appendChild(label)
    slider.appendChild(input)
  })
  return navigation
}

function generateLabel(file, index, product) {
  const label = document.createElement('label')
  const img = document.createElement('img')
  img.src = `https://web-app.click/pc-shop/photos/products/computers/${file}`
  img.alt = `img${index + 1}`
  const idx = index + 2 > product.photos.length ? 1 : index + 2
  label.htmlFor = `slider-r${idx}`
  label.appendChild(img)
  return label
}

function generateSpecsContainer(product) {
  const specsContainer = document.createElement('div')
  specsContainer.classList.add('specs')
  Object.entries(product.attributes).forEach(([spec, prop]) => {
    const elP = document.createElement('p')
    const span = document.createElement('span')
    elP.innerHTML = `${spec}: `
    span.textContent = prop
    elP.appendChild(span)
    specsContainer.appendChild(elP)
  })
  return specsContainer
}

function generateProductInfo(product) {
  const wrapInfo = document.createElement('div')
  const caption = document.createElement('div')
  const h3 = document.createElement('h3')
  const rating = generateRating()
  const wrapInfoButtons = document.createElement('div')
  const buttons = document.createElement('div')
  const btnFavorite = document.createElement('button')
  const btnCompare = document.createElement('button')
  const wrapInfoPrice = document.createElement('div')
  const price = document.createElement('div')
  const priceParagraph = document.createElement('p')
  const span = document.createElement('span')
  const wrapInfoCart = document.createElement('div')
  const cartButton = document.createElement('div')
  const btnCart = document.createElement('button')
  wrapInfo.classList.add('wrap-info')
  caption.classList.add('caption')
  wrapInfoButtons.classList.add('wrap-info-buttons')
  buttons.classList.add('buttons')
  btnFavorite.classList.add('btn')
  btnCompare.classList.add('btn')
  wrapInfoPrice.classList.add('wrap-info-price')
  price.classList.add('price')
  wrapInfoCart.classList.add('wrap-info-cart')
  cartButton.classList.add('cart-button')
  btnCart.classList.add('btn')
  h3.textContent = product.caption
  wrapInfo.appendChild(caption)
  caption.appendChild(h3)
  wrapInfo.appendChild(rating)
  wrapInfo.appendChild(wrapInfoButtons)
  wrapInfoButtons.appendChild(buttons)
  buttons.appendChild(btnFavorite)
  buttons.appendChild(btnCompare)
  btnFavorite.textContent = 'В избранное'
  btnCompare.textContent = 'Сравнить'
  wrapInfo.appendChild(wrapInfoPrice)
  wrapInfoPrice.appendChild(price)
  price.appendChild(priceParagraph)
  priceParagraph.textContent = `${product.convertedPrice.toFixed(2)}`
  priceParagraph.appendChild(span)
  span.textContent = 'грн'
  wrapInfo.appendChild(wrapInfoCart)
  wrapInfoCart.appendChild(cartButton)
  cartButton.appendChild(btnCart)
  btnCart.textContent = 'В корзину'
  return wrapInfo
}

function generateRating() {
  const wrapDiv = document.createElement('div')
  wrapDiv.classList.add('wrap-rating')
  const ratingDiv = document.createElement('div')
  for (let i = 0; i <= 5; i++) {
    const radioInput = document.createElement('input')
    radioInput.setAttribute('type', 'radio')
    radioInput.setAttribute('name', 'rating')
    radioInput.setAttribute('id', 'r' + i)
    if (i === 0) {
      radioInput.setAttribute('checked', 'checked')
    }
    wrapDiv.appendChild(radioInput)
  }
  ratingDiv.classList.add('rating')
  for (let i = 1; i <= 5; i++) {
    const label = document.createElement('label')
    label.setAttribute('for', 'r' + i)
    ratingDiv.appendChild(label)
  }
  wrapDiv.appendChild(ratingDiv)
  return wrapDiv
}

function generateRecomendProd(product) {
  const elPave = document.createElement('div')
  const recomendDiv = document.createElement('div')
  const elLink = document.createElement('a')
  const img = document.createElement('img')
  elPave.classList.add('tile')
  recomendDiv.classList.add('recomend')
  const pElement = document.createElement('p')
  elLink.setAttribute('href', `./product.html?id=${product.id}`)
  elLink.setAttribute('target', '_blank')
  img.src = `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`
  img.alt = product.caption
  pElement.textContent = product.caption
  recomendDiv.appendChild(elLink)
  elLink.appendChild(img)
  recomendDiv.appendChild(pElement)
  elPave.appendChild(recomendDiv)
  return elPave
}

function generateSimilarProd(product) {
  const elPave = document.createElement('div')
  const similarDiv = document.createElement('div')
  const elLink = document.createElement('a')
  const img = document.createElement('img')
  elPave.classList.add('tile')
  similarDiv.classList.add('similar')
  const pElement = document.createElement('p')
  elLink.setAttribute('href', `./product.html?id=${product.id}`)
  elLink.setAttribute('target', '_blank')
  img.src = `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`
  img.alt = product.caption
  pElement.textContent = product.caption
  similarDiv.appendChild(elLink)
  elLink.appendChild(img)
  similarDiv.appendChild(pElement)
  elPave.appendChild(similarDiv)
  return elPave
}

function generatePagination(pagesCount, curPage) {
  const elPagination = document.createElement('div')
  elPagination.classList.add('pagination')
  for (let i = 0; i <= pagesCount; i++) {
    const pageLink = document.createElement('a')
    pageLink.href = '#header'
    pageLink.textContent = i
    pageLink.addEventListener('click', onClickPaginationPage)
    pageLink.classList.add('page')
    if (i === curPage) {
      pageLink.classList.add('active')
    }
    elPagination.appendChild(pageLink)
  }
  return elPagination
}
