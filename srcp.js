const assert = require("assert")
let a = [2, 6]
let b = [36, 24]

b.sort()
let bFactorArr = []
let aMultipleArr = []

// get all factors for array b elements
for (let i=0; i<b.length;i++){
  bFactorArr.push([])
  for (let j = 2; j < b[0] ; j++){
    if (b[i] % j == 0){
      bFactorArr[i].push(j)
    }
  }
}

// get all multiples for array a elements
for (let i = 0; i < a.length; i++){
  aMultipleArr.push([])
  for (let j = a[i] ; j < b[0] ; j += a[i] ){
    aMultipleArr[i].push(j)
  }
}

let lowestIdx;
let lowestLen = aMultipleArr[0].length;

aMultipleArr.forEach((elm, index)=>{
  if (elm.length < lowestLen){
    lowestLen = elm.length
    lowestIdx = index
  }
})

assert.equal(lowestIdx, 1) // passes
