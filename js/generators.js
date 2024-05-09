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

function generateFilterCheckbox(key, value) {
  const elDiv = document.createElement('div')
  const elCheckbox = document.createElement('input')
  const elLabel = document.createElement('label')
  elCheckbox.type = 'checkbox'
  elCheckbox.value = value
  elCheckbox.name = `${key}`
  elCheckbox.id = `${key}-${value}`
  elLabel.htmlFor = `${key}-${value}`
  elLabel.textContent = value
  elDiv.classList.add('wrap-checkbox')
  elDiv.appendChild(elCheckbox)
  elDiv.appendChild(elLabel)

  return elDiv
}

function generateLabelSpecs(specs) {
  const divLabels = document.createElement('div');
  let i = 0;
  for (const key in specs) {
    const value = specs[key];
    i++;
    const labelValue = `${key}-${value}`;
    const label = document.createElement('label');
    label.textContent = value;
    label.htmlFor = labelValue;
    divLabels.appendChild(label);
    if (i > 8) {
      return divLabels;
    }
  }
  return divLabels;
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
  b.textContent = product.convertedPrice.toFixed(2)
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

function generateProductSidebar(product) {
  const slider = document.createElement('div')
  const navigation = generateNavigation(product, slider)
  const specsContainer = generateSpecsContainer(product)
  slider.classList.add('slider')
  slider.appendChild(navigation)
  slider.appendChild(specsContainer)
  return slider
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
  const idx = index + 2 === product.photos.files.length ? 1 : index + 2
  label.htmlFor = `slider-r${idx}`
  label.appendChild(img)
  return label
}

function generateSpecsContainer(product) {
  const specsContainer = document.createElement('div')
  specsContainer.classList.add('specs')
  Object.entries(product.specs).forEach(([spec, prop]) => {
    const elP = document.createElement('p')
    const span = document.createElement('span')
    elP.innerHTML = `${spec}: `
    span.textContent = getSpecText(prop)
    elP.appendChild(span)
    specsContainer.appendChild(elP)
  })
  return specsContainer
}

function getSpecText(prop) {
  let text = prop.brand
  if (prop.power) text += ` (${prop.power})`
  if (prop.capacity) text += ` (${prop.capacity})`
  if (prop.type && prop.frequency) text += ` (${prop.type}, ${prop.frequency})`
  return text
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
  img.src =
    'https://web-app.click/pc-shop/photos/products/computers/' +
    product.photos.files[0]
  img.alt = product.caption
  pElement.textContent = product.caption
  recomendDiv.appendChild(elLink)
  elLink.appendChild(img)
  recomendDiv.appendChild(pElement)
  elPave.appendChild(recomendDiv)
  return elPave
}

function generateSwitchPage(pagesCount) {
  const elPaginator = document.createElement('div')
  elPaginator.classList.add('paginator')
  for (let i = 0; i <= pagesCount; i++) {
    const pageLink = document.createElement('a')
    pageLink.href = '#'
    pageLink.classList.add('page')
    pageLink.textContent = i
    elPaginator.appendChild(pageLink)
  }
  return elPaginator
}
