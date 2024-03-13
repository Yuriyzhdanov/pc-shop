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



const id = data.id 
id





///

var array = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25, class: 'new'},
    { name: 'Bob', age: 40 },
    { name: 'Alice', age: 35 },
    { name: 'Eve', age: 20, class: 'new' }
];

function compare(a, b) {
    if (a.class === 'new' && b.class !== 'new') {
        return -1;
    } else if (a.class !== 'new' && b.class === 'new') {
        return 1;
    } 
   }


console.log(array.sort(compare));
