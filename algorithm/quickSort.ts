const compare = (a, b) => a -b
const swap = (arr, a, b) => ([arr[a], arr[b]] = [arr[b], arr[a]])

const partition = (arr, start, end) => {
  let pivot = arr[Math.floor((start + end) / 2)]
  let i = start
  let j = end
  
  while (i <= j) {
    while(compare(arr[i], pivot) < 0) {
      i++
    }
    while(compare(arr[j], pivot) > 0) {
      j--
    }

    if (i <= j) {
      swap(arr, i, j)
      i++
      j--
    }
  }
  return i
}

const quickSort = (arr, start, end) => {
  let index = partition(arr, start, end)
  if (start < index - 1) {
    quickSort(arr, start, index - 1)
  }
  if (end > index) {
    quickSort(arr, index, end)
  }
}

const quick = (arr: Array<any>) => quickSort(arr, 0, arr.length - 1)

let arr = [1, 3, 2, 4, 5, 8, 5, 6]
quick(arr)
console.log(arr)