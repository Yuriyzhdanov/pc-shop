// const product = loadComputers().then ((product)=> console.log(product[0]))
// const product = loadComputers().then ((product)=> generateHTML(product[0]))

const productPromise = loadComputers();

productPromise.then(products => {
  const firstProduct = products[0];
  console.log(firstProduct);
  renderProductInfo(firstProduct)
  renderLeft(firstProduct);
});

// async function loadProductById(productId) {
//   const url = `${API_COMPUTERS}/${productId}`;
//   return sendRequest(url);
// }

// function extractProductIdFromURL(url) {
//   const match = url.match(/[?&]id=([^&]+)/);
//   console.log(match);

//   return match ? match[1] : null;
// }

// async function main() {
//   const productId = extractProductIdFromURL(window.location.search);
//   const product = await loadProductById(productId);
//   console.log(product.id);
// }



function generateLeft(product) {
  const slider = document.createElement("div");
  const navigation = document.createElement("div");
  const URI = "http://34.71.150.163:8181";

  slider.classList.add("slider");
  navigation.classList.add("navigation");

  product.photos.files.forEach((file, index) => {
    const input = document.createElement("input");
    const label = document.createElement("label");
    const img = document.createElement("img");
    input.type = "radio";
    input.name = "r";
    input.id = `slider-r${index + 1}`;
    if (index === 0) {
      input.checked = true
    }
    let len = product.photos.files.length
    let idx = index + 2 === len ? 1 : index + 2
    label.htmlFor = `slider-r${idx}`;
    img.src = URI + product.photos.dir + "/" + file;
    img.alt = `img${index + 1}`;
    label.appendChild(img);
    navigation.appendChild(label);
    slider.appendChild(input);
  });

  const specsContainer = document.createElement("div");
  specsContainer.classList.add("specs");

  Object.entries(product.specs).forEach(([spec, prop]) => {
    const elP = document.createElement("p");
    const span = document.createElement("span");
    elP.innerHTML = `${spec}: `;
    span.textContent = prop.brand +
      (prop.power ? ` (${prop.power})` : '') +
      (prop.capacity ? ` (${prop.capacity})` : '') +
      (prop.type && prop.frequency ? ` (${prop.type}, ${prop.frequency})` : '');
    elP.appendChild(span);
    specsContainer.appendChild(elP);
  });

  slider.appendChild(navigation);
  slider.appendChild(specsContainer);

  return slider;
}

function generateProductInfo(product) {
  const wrapInfo = document.createElement('div');
  const caption = document.createElement('div');
  const h4 = document.createElement('h4');
  const rating = document.createElement('div');
  const wrapInfoButtons = document.createElement('div');
  const buttons = document.createElement('div');
  const btnFavorite = document.createElement('button');
  const btnCompare = document.createElement('button');
  const wrapInfoPrice = document.createElement('div');
  const price = document.createElement('div');
  const priceParagraph = document.createElement('p');
  const span = document.createElement('span');
  const wrapInfoCart = document.createElement('div');
  const cartButton = document.createElement('div');
  const btnCart = document.createElement('button');

  wrapInfo.classList.add('wrap-info');
  caption.classList.add('caption');
  rating.classList.add('rating');
  wrapInfoButtons.classList.add('wrap-info-buttons');
  buttons.classList.add('buttons');
  btnFavorite.classList.add('btn');
  btnCompare.classList.add('btn');
  wrapInfoPrice.classList.add('wrap-info-price');
  price.classList.add('price');
  wrapInfoCart.classList.add('wrap-info-cart');
  cartButton.classList.add('cart-button');
  btnCart.classList.add('btn');

  h4.textContent = product.caption;
  wrapInfo.appendChild(caption);
  caption.appendChild(h4);
  wrapInfo.appendChild(rating);

  for (let i = 1; i <= 5; i++) {
    const input = document.createElement('input');
    const label = document.createElement('label');

    input.type = 'radio';
    input.name = 'rating';
    input.id = `r${i}`;
    label.htmlFor = `r${i}`;

    rating.appendChild(input);
    rating.appendChild(label);
  }

  wrapInfo.appendChild(wrapInfoButtons);
  wrapInfoButtons.appendChild(buttons);
  buttons.appendChild(btnFavorite);
  buttons.appendChild(btnCompare);
  btnFavorite.textContent = 'В избранное';
  btnCompare.textContent = 'Сравнить';

  wrapInfo.appendChild(wrapInfoPrice);
  wrapInfoPrice.appendChild(price);
  price.appendChild(priceParagraph);
  priceParagraph.textContent = `${product.price} `;
  priceParagraph.appendChild(span);
  span.textContent = 'грн';

  wrapInfo.appendChild(wrapInfoCart);
  wrapInfoCart.appendChild(cartButton);
  cartButton.appendChild(btnCart);
  btnCart.textContent = 'В корзину';

  return wrapInfo;
}


function renderLeft(product) {
  const elLeft = document.querySelector('#left');
  const elSlider = generateLeft(product)
  elLeft.appendChild(elSlider)
}

function renderProductInfo(product) {
  const productInfo = document.querySelector('.product-info');
  const wrapInfo = generateProductInfo(product)
  productInfo.appendChild(wrapInfo)
}
