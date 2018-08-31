// const compare = (a, b) => a -b
// const swap = (arr, a, b) => ([arr[a], arr[b]] = [arr[b], arr[a]])

// const partition = (arr, start, end) => {
//   let pivot = arr[Math.floor((start + end) / 2)]
//   let i = start
//   let j = end
  
//   while (i <= j) {
//     while(compare(arr[i], pivot) < 0) {
//       i++
//     }
//     while(compare(arr[j], pivot) > 0) {
//       j--
//     }

//     if (i <= j) {
//       swap(arr, i, j)
//       i++
//       j--
//     }
//   }
//   return i
// }

// const quickSort = (arr, start, end) => {
//   let index = partition(arr, start, end)
//   if (start < index - 1) {
//     quickSort(arr, start, index - 1)
//   }
//   if (end > index) {
//     quickSort(arr, index, end)
//   }
// }

// const quick = (arr: Array<any>) => quickSort(arr, 0, arr.length - 1)

// let arr = [1, 3, 2, 4, 5, 8, 5, 6]
// quick(arr)
// console.log(arr)

type IFunctionTemplate = (arr: number[], arg1: number, arg2: number) => any

const compare = (a: number, b: number) => a - b
const swap: IFunctionTemplate = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]]

const partition: IFunctionTemplate = (arr, start, end) => {
  const pivot = Math.floor((start + end) / 2)
  let i = start
  let j = end

  while (i <= j) {
    while (compare(arr[i], arr[pivot]) < 0) {
      i++
    }
    while (compare(arr[j], arr[pivot]) > 0) {
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

const quickSort: IFunctionTemplate = (arr, start, end) => {
  const index = partition(arr, start, end)
  if (start < index - 1) {
    quickSort(arr, start, index - 1)
  }
  if (end > index) {
    quickSort(arr, index, end)
  }
}

const sortArr = (arr: number[]) => quickSort(arr, 0, arr.length - 1)

 let arr1 = [1, 3, 2, 3, 4, 5, 5, 4, 8, 6, 5, 6]
 sortArr(arr1)
 console.log(arr1)