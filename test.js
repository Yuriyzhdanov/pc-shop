const numbersA = [1, 3, 5, 7]
const numbersB = [11, 13, 17, 23]

const numbersAB = numbersA.concat(numbersB)

numbersA.push(...numbersB)

numbersA

// let result

// result = [1, [3, 5, [7, 11, [13, 17]]]].flat(Infinity)

// result

// numbersB

// numbersAB

// console.log(typeof numbersAB)

// function foo(a, b) {
//   a
//   b
//   console.log(a + b)
// }

// foo(...[2, 5])
// foo(2, 5)

let prices = []
// let result = prices.length ? Math.min(...arr) : 2
// result

function fnA(strFn1, strFn2, def) {
  return Math[strFn1](prices.length ? Math[strFn2](...prices) : def)
}

result = fnA('floor', 'min', 2)
result
result = fnA('ceil', 'max', 3)
result

const fnB = (cb1, cb2, def) => cb1(prices.length ? cb2(...prices) : def)

result = fnB(Math.floor, Math.min, 2)
result

result = fnB(Math.ceil, Math.max, 3)
result
