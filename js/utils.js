function getLatToCyrFilter(word) {
  const subCategory = {
    brand: 'бренд',
    capacity: 'объём',
    purpose: 'память',
    cores: 'ядро',
    type: 'тип',
    frequency: 'частота',
    power: 'мощность',
    size: 'размер',
    storage: 'Накопитель SSD',
    motherboard: 'Материнская плата',
    processor: 'Процессор',
    RAM: 'Оперативная память',
    power_supply: 'Блок питания',
    case: 'Корпус',
    graphics_card: 'Видеокарта',
    cpu_cooler: 'Кулер для процесора',
  }

  return subCategory[word] ?? '*'
}

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
