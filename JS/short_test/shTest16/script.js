// our two sum function which will return
// all pairs in the array that sum up to S
function twoSum(arr, S) {

  let sums = [];

  // check each element in array
  for (let i = 0; i < arr.length; i++) { 

    // check each other element in the array
    for (let j = i + 1; j < arr.length; j++) {

      // determine if these two elements sum to S
      if (arr[i] + arr[j] === S) {
        sums.push([arr[i], arr[j]]);
      }

    }

  }

  // return all pairs of integers that sum to S
  return sums;

}

// twoSum([3, 5, 2, -4, 8, 11], 19) = document.querySelector('#sum');

// const suma = twoSum([3, 5, 2, -4, 8, 11], 19);
const toWeb = document.querySelector('#sum');
toWeb.textContent = twoSum([3, 5, 2, -4, 8, 11], 19);