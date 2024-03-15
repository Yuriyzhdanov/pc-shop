const product = loadComputers().then ((product)=> console.log(product[0]))
// const product = loadComputers().then ((product)=> generateHTML(product[0]))



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

// main();

const data = [
  {
    caption: "Геймерский ПК Solaris-S",
    id: "89d7cf5d",
    photos: { dir: '/img/products', files: Array(7)},
    price: 311.25,
    purpose: "Для геймеров",
    specs: {
      "Блок питания": { brand: 'GameMax', power: '500W' },
      "Корпус": { brand: 'Chieftec' },
      "Материнская плата": { brand: 'Asus' },
      "Накопитель SSD": { brand: 'Kingston', capacity: '250Gb' },
      "Оперативная память": { brand: 'Patriot', capacity: '16Gb', type: 'DDR4', frequency: '3200Mhz' },
      "Процессор": { brand: 'AMD', frequency: '3.7Ghz' }
    }
  }
];

// !!! >>>>>
function generateLeft(data) {
  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('left');

  const slider = document.createElement('div');
  slider.classList.add('slider');

  const navigation = document.createElement('div');
  navigation.classList.add('navigation');

  data.photos.files.forEach((file, index) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'r';
    input.id = `slider-r${index+1}`;
    if (index === 0) {
      input.checked = true;
    }
    slider.appendChild(input);

    const label = document.createElement('label');
    label.htmlFor = `slider-r${index+1}`;
    const img = document.createElement('img');
    img.src = `${data.photos.dir}/${file}`;
    img.alt = `img${index+1}`;
    label.appendChild(img);
    navigation.appendChild(label);
  });

  slider.appendChild(navigation);
  sliderContainer.appendChild(slider);

  const specsContainer = document.createElement('div');
  specsContainer.classList.add('specs');

  Object.entries(data.specs).forEach(([spec, prop]) => {
    const elP = document.createElement('p');
    elP.innerHTML = `${spec}: <span>${prop.brand}`;
    if (prop.power) {
      elP.innerHTML += ` (${prop.power})`;
    }
    if (prop.capacity) {
      elP.innerHTML += ` (${prop.capacity})`;
    }
    if (prop.type && prop.frequency) {
      elP.innerHTML += ` (${prop.type}, ${prop.frequency})`;
    }
    elP.innerHTML += `</span>`;
    specsContainer.appendChild(elP);
  });

  sliderContainer.appendChild(specsContainer);

  return sliderContainer;
}

// function renderProduct(element) {
//   document.body.appendChild(element);
// }
// const generatedProduct = generateProduct(data[0]);
// renderProduct(generatedProduct);





function generateProductInfo(data) {
  // const containerInfo = document.createElement('div');
  // containerInfo.classList.add('product-info', 'pave');

  const wrapInfo = document.createElement('div');
  wrapInfo.classList.add('wrap-info');

  const caption = document.createElement('div');
  caption.classList.add('caption');
  const h4 = document.createElement('h4');
  h4.textContent = data.caption;
  caption.appendChild(h4);
  wrapInfo.appendChild(caption);

  const rating = document.createElement('div');
  rating.classList.add('rating');
  for (let i = 1; i <= 5; i++) {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'rating';
    input.id = `r${i}`;
    const label = document.createElement('label');
    label.htmlFor = `r${i}`;
    rating.appendChild(input);
    rating.appendChild(label);
  }
  wrapInfo.appendChild(rating);

  const wrapInfoButtons = document.createElement('div');
  wrapInfoButtons.classList.add('wrap-info-buttons');
  const buttons = document.createElement('div');
  buttons.classList.add('buttons');
  const btnFavorite = document.createElement('button');
  btnFavorite.classList.add('btn');
  btnFavorite.textContent = 'В избранное';
  const btnCompare = document.createElement('button');
  btnCompare.classList.add('btn');
  btnCompare.textContent = 'Сравнить';
  buttons.appendChild(btnFavorite);
  buttons.appendChild(btnCompare);
  wrapInfoButtons.appendChild(buttons);
  wrapInfo.appendChild(wrapInfoButtons);

  const wrapInfoPrice = document.createElement('div');
  wrapInfoPrice.classList.add('wrap-info-price');
  const price = document.createElement('div');
  price.classList.add('price');
  const priceParagraph = document.createElement('p');
  priceParagraph.textContent = `${data.price} грн`;
  const span = document.createElement('span');
  span.textContent = 'грн';
  priceParagraph.appendChild(span);
  price.appendChild(priceParagraph);
  wrapInfoPrice.appendChild(price);
  wrapInfo.appendChild(wrapInfoPrice);

  const wrapInfoCart = document.createElement('div');
  wrapInfoCart.classList.add('wrap-info-cart');
  const cartButton = document.createElement('div');
  cartButton.classList.add('cart-button');
  const btnCart = document.createElement('button');
  btnCart.classList.add('btn');
  btnCart.textContent = 'В корзину';
  cartButton.appendChild(btnCart);
  wrapInfoCart.appendChild(cartButton);
  wrapInfo.appendChild(wrapInfoCart);

  containerInfo.appendChild(wrapInfo);

  return containerInfo;

  // return wrapInfo !!!
}


function renderBottom(data) {
   const elBottom = document.querySelector('.bottom');
   const elLeft = generateLeft(data)
   elBottom.appendChild(elLeft)
}

// function renderProductInfo(data) {
//   const productInfo = document.querySelector('product-info');
//   const wrapInfo = generateProductInfo(data)
//   productInfo.appendChild(wrapInfo)
// }

