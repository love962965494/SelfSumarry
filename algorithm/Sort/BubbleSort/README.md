## Bubble Sort

English:  
Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list to be sorted, compares each pair of adjacent items and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.

中文:  
冒泡排序，也被称作下沉排序，是一种简单的排序算法，通过循环遍历需要排序的列表，比较相邻的元素，如果它们的排序位置错误就交换它们。重复上述过程直到没有元素需要交换位置时，此时列表排序完成。

<img src="https://camo.githubusercontent.com/383b23979d4d7f279f8fb285b36bcdd357b10a35/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f632f63382f427562626c652d736f72742d6578616d706c652d33303070782e676966" alt="排序算法演示图">

### Complexity
|    Name    |      Best     |    Average    |      Worst    | Memory | Stable |
| :--------: | :-----------: | :-----------: | :-----------: | :----: | :----: |
| Bubble sort| n<sup>2</sup> | n<sup>2</sup> | n<sup>2</sup> |    1   |   Yes  |