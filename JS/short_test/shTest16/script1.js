// creat promp for five digits aray insertion and digit for equality 7 of two digits from aray

// our two sum function which will return
// all pairs in the array that sum up to S
function twoSum(arr, S) {
  let sums = [];
  var hashTable = {};

  // check each element in array
  for (let i = 0; i < arr.length; i++) {
    // calculate S - current element
    let sumMinusElement = S - arr[i];

    // check if this number exists in hash table
    // if so then we found a pair of numbers that sum to S
    if (hashTable[sumMinusElement.toString()] !== undefined) {
      sums.push([arr[i], sumMinusElement]);
    }

    // add the current number to the hash table
    hashTable[arr[i].toString()] = arr[i];
  }

  // return all pairs of integers that sum to S
  return sums;
}

let insertion = prompt('Add digits aray with coma seperate them.');
let splitInsertion = insertion.split(',');

let sumaPrompt = prompt('Add result for two numbers from aray.');

document.querySelector('#sum').textContent = "Numbers pairs " + formatOutput(twoSum(splitInsertion, (sumaPrompt)));
function formatOutput(pairs) {
  let formattedPairs = pairs.map(pair => "[" + pair.join('+') + "]");
  return formattedPairs.join('  ');
}

document.querySelector('#sumoff').textContent = "Result of this pair is " + sumaPrompt;

// line 3,5,2,-4,8,11,6,1