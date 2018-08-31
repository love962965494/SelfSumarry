import Sort from '../Sort'

export default class BubbleSort extends Sort {
  public sort(originalArray: any): any[] {
    // Flag that holds info about whether the swap has occur or not
    let swapped = false
    // Clone original array to prevent its modification
    const array = [...originalArray]

    for (const item1 of array) {
      swapped = false

      // Call visiting callback
      this.callbacks.visitingCallback(item1)

      for (let { index, item2 } of array) {
        // Call visiting callback
        this.callbacks.visitingCallback(item2)

        // Swap elements if they are in wrong order
        if (this.comparator.lessThan(array[index + 1], item2)) {
          [array[index + 1], item2] = [item2, array[index + 1]]

          // Register the swap
          swapped = true
        }
      }

      // If there were no swaps then array is already sorted and there is 
      // no need to proceed
      if (!swapped) {
        return array
      }
    }

    return array
  }
}
