function generateFilterProp(caption) {
  const elDiv = document.createElement('div')
  const elH3 = document.createElement('h3')
  elH3.textContent = caption
  elDiv.classList.add('wrap-props')
  elDiv.appendChild(elH3)
  return elDiv
}

function generateFilterSubHeading(caption) {
  const elDiv = document.createElement('div')
  const elH4 = document.createElement('h4')
  caption = getLatToCyrFilter(caption)
  caption = toCaptalize(caption)
  elH4.textContent = caption
  elDiv.appendChild(elH4)
  return elDiv
}

function generateFilterCheckbox(value, caption, key) {
  const elDiv = document.createElement('div')
  const elCheckbox = document.createElement('input')
  const elLabel = document.createElement('label')
  elCheckbox.setAttribute('type', 'checkbox')
  elCheckbox.setAttribute('value', value)
  elCheckbox.setAttribute('name', `${key}-${caption}`)
  elCheckbox.setAttribute('id', `${key}-${caption}-${value}`)
  elLabel.setAttribute('for', `${key}-${caption}-${value}`)
  elLabel.textContent = value
  elDiv.classList.add('wrap-checkbox')
  elDiv.appendChild(elCheckbox)
  elDiv.appendChild(elLabel)
  return elDiv
}

function generateFilterRange(id, labelText, value, minPrice, maxPrice) {
  const wrap = document.createElement('div')
  const label = document.createElement('label')
  const input = document.createElement('input')
  wrap.appendChild(label)
  wrap.appendChild(input)
  wrap.classList.add('wrap-range')
  label.textContent = labelText + ' ' + value
  label.setAttribute('for', id)
  input.setAttribute('type', 'range')
  input.setAttribute('min', minPrice)
  input.setAttribute('max', maxPrice)
  input.setAttribute('value', value)
  input.setAttribute('name', id)
  input.setAttribute('id', id)
  input.addEventListener('input', function () {
    label.textContent = labelText + ' ' + input.value
  })

  return wrap
}

function generateFilterPrice() {
  const wrapProps = document.createElement('div')
  const h3 = document.createElement('h3')
  const wrapRangeFrom = generateFilterRange(
    'price_from',
    'От:',
    model.minPrice,
    model.minPrice,
    model.maxPrice
  )

  const wrapRangeTo = generateFilterRange(
    'price_to',
    'До:',
    model.maxPrice,
    model.minPrice,
    model.maxPrice
  )
  console.log(wrapRangeTo)
  wrapProps.appendChild(h3)
  wrapProps.appendChild(wrapRangeFrom)
  wrapProps.appendChild(wrapRangeTo)
  wrapProps.classList.add('wrap-props')
  h3.textContent = 'Цена'
  return wrapProps
}

function generateLabels(specs) {
  let i = 0
  const divLabels = document.createElement('div')
  for (const spec in specs) {
    const value = specs[spec]
    for (const key in value) {
      i++
      const labelValue = `${spec}-${key}-${value[key]}`
      const brandName = value[key]
      const label = document.createElement('label')
      label.textContent = brandName
      label.setAttribute('for', labelValue)
      divLabels.appendChild(label)
      if (i > 8) {
        return divLabels
      }
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
  const divLabels = generateLabels(product.specs)
  const divRow = document.createElement('div')
  const divNew = document.createElement('div')
  const divButtonCart = document.createElement('div')
  const divButtonFavorite = document.createElement('div')
  const divButtonCompare = document.createElement('div')
  const aLink = document.createElement('a')
  const img = document.createElement('img')
  const h3 = document.createElement('h3')
  const buttonCart = document.createElement('button')
  const buttonFavorite = document.createElement('button')
  const buttonCompare = document.createElement('button')
  const p = document.createElement('p')
  const b = document.createElement('b')
  const URI = 'http://34.71.150.163:8181'

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

  img.src = URI + product.photos.dir + '/' + product.photos.files[0]
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

function generateLeft(product) {
  const slider = document.createElement('div')
  const navigation = document.createElement('div')
  const URI = 'http://34.71.150.163:8181'
  slider.classList.add('slider')
  navigation.classList.add('navigation')
  product.photos.files.forEach((file, index) => {
    const input = document.createElement('input')
    const label = document.createElement('label')
    const img = document.createElement('img')
    input.type = 'radio'
    input.name = 'r'
    input.id = `slider-r${index + 1}`
    if (index === 0) {
      input.checked = true
    }
    let len = product.photos.files.length
    let idx = index + 2 === len ? 1 : index + 2
    label.htmlFor = `slider-r${idx}`
    img.src = URI + product.photos.dir + '/' + file
    img.alt = `img${index + 1}`
    label.appendChild(img)
    navigation.appendChild(label)
    slider.appendChild(input)
  })
  const specsContainer = document.createElement('div')
  specsContainer.classList.add('specs')
  Object.entries(product.specs).forEach(([spec, prop]) => {
    const elP = document.createElement('p')
    const span = document.createElement('span')
    elP.innerHTML = `${spec}: `
    span.textContent =
      prop.brand +
      (prop.power ? ` (${prop.power})` : '') +
      (prop.capacity ? ` (${prop.capacity})` : '') +
      (prop.type && prop.frequency ? ` (${prop.type}, ${prop.frequency})` : '')
    elP.appendChild(span)
    specsContainer.appendChild(elP)
  })
  slider.appendChild(navigation)
  slider.appendChild(specsContainer)
  return slider
}

function generateProductInfo(product) {
  const wrapInfo = document.createElement('div')
  const caption = document.createElement('div')
  const h3 = document.createElement('h3')
  const rating = document.createElement('div')
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
  rating.classList.add('rating')
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
  for (let i = 1; i <= 5; i++) {
    const input = document.createElement('input')
    const label = document.createElement('label')
    input.type = 'radio'
    input.name = 'rating'
    input.id = `r${i}`
    label.htmlFor = `r${i}`
    rating.appendChild(input)
    rating.appendChild(label)
  }
  wrapInfo.appendChild(wrapInfoButtons)
  wrapInfoButtons.appendChild(buttons)
  buttons.appendChild(btnFavorite)
  buttons.appendChild(btnCompare)
  btnFavorite.textContent = 'В избранное'
  btnCompare.textContent = 'Сравнить'
  wrapInfo.appendChild(wrapInfoPrice)
  wrapInfoPrice.appendChild(price)
  price.appendChild(priceParagraph)
  priceParagraph.textContent = `${product.price} `
  priceParagraph.appendChild(span)
  span.textContent = 'грн'
  wrapInfo.appendChild(wrapInfoCart)
  wrapInfoCart.appendChild(cartButton)
  cartButton.appendChild(btnCart)
  btnCart.textContent = 'В корзину'
  return wrapInfo
}

function generateRecomendProd(product) {
  const URI = 'http://34.71.150.163:8181'
  const elPave = document.createElement('div')
  const recomendDiv = document.createElement('div')
  const elLink = document.createElement('a')
  const img = document.createElement('img')
  elPave.classList.add('tile')
  recomendDiv.classList.add('recomend')
  const pElement = document.createElement('p')

  elLink.setAttribute('href', `./product.html?id=${product.id}`)
  elLink.setAttribute('target', '_blank')

  img.src = URI + product.photos.dir + '/' + product.photos.files[0]
  img.alt = product.caption
  pElement.textContent = product.caption

  recomendDiv.appendChild(elLink)
  elLink.appendChild(img)
  recomendDiv.appendChild(pElement)
  elPave.appendChild(recomendDiv)
  return elPave
}
