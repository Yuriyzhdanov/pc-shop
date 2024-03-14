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

function generateFilterRange(id, text, val) {
  const wrap = document.createElement('div')
  const label = document.createElement('label')
  const input = document.createElement('input')
  wrap.appendChild(label)
  wrap.appendChild(input)
  wrap.classList.add('wrap-range')
  label.textContent = text
  label.setAttribute('for', id)
  input.setAttribute('type', 'range')
  input.setAttribute('min', '0')
  input.setAttribute('max', '100000')
  input.setAttribute('value', val)
  input.setAttribute('name', id)
  input.setAttribute('id', id)
  return wrap
}

function generateFilterPrice() {
  const wrapProps = document.createElement('div')
  const h3 = document.createElement('h3')
  const wrapRangeFrom = generateFilterRange('price_from', 'От:', 0)
  const wrapRangeTo = generateFilterRange('price_to', 'До:', 100000)

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
  aLink.setAttribute(
    'href',
    `/shop_computers/products/index.html?${product.id}`
  )
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

  // buttonCart.onclick = onClickAddToCartHandler
  // buttonFavorite.onclick = onClickAddToFavoriteHandler
  // buttonCompare.onclick = onClickAddToCompareHandler
  // divWrapA.onclick = onClickProductCardHandler
  return divContainterProduct
}

function renderContainerProducts(products) {
  const elContainerProduct = document.querySelector('.container-products')
  elContainerProduct.innerHTML = ''
  products.forEach(product => {
    const elTile = generateProduct(product)
    elContainerProduct.appendChild(elTile)
  })
}

function renderWrapFilter(modelFilter) {
  const elWrapFilter = document.querySelector('.wrap-filter')
  const elForm = document.createElement('form')
  const elPrice = generateFilterPrice()
  elForm.setAttribute('action', '')
  for (const key in modelFilter) {
    if (typeof modelFilter[key] === 'object') {
      const elProp = generateFilterProp(key)
      elForm.appendChild(elProp)
      for (const subKey in modelFilter[key]) {
        const elSubHeading = generateFilterSubHeading(subKey)
        for (const itemKey in modelFilter[key][subKey]) {
          const item = modelFilter[key][subKey][itemKey]
          const elCheckbox = generateFilterCheckbox(item, subKey, key)
          elSubHeading.appendChild(elCheckbox)
        }
        elProp.appendChild(elSubHeading)
      }
    }
  }
  elWrapFilter.appendChild(elPrice)
  elWrapFilter.appendChild(elForm)
}

function renderPriceDisplay(priceFrom, priceTo) {
  const elLabelFrom = document.querySelector('.wrap-range > [for=priceFrom]')
  const elLabelTo = document.querySelector('.wrap-range > [for=priceTo]')
  elLabelFrom.textContent = `Цена: от ${priceFrom}`
  elLabelTo.textContent = `Цена: до ${priceTo}`
}

function onClickButtonFilter() {
  const checkboxes = document.querySelectorAll(
    '.wrap-checkbox input[type="checkbox"]:checked'
  )
  const elInputFrom = document.querySelector('#price_from')
  const elInputTo = document.querySelector('#price_to')
  const filterDataIds = Array.from(checkboxes).map(checkbox => checkbox.id)
  handleFiltrate(filterDataIds, elInputFrom.value, elInputTo.value)
}

document
  .querySelector('button.filter')
  .addEventListener('click', onClickButtonFilter)
window.addEventListener('load', handleLoadWindow)
