English:  
In mathematics, the Euclidean algorithm, or Euclid's algorithm, is an efficient method for computing the greatest common divisor (GCD) of two numbers, the largest number that divides both of them without leaving a remainder. 

中文:  
在数学中，欧几里得算法，或者叫辗转相除法，是一种非常高效的用于计算得到能够同时整除两个数的最大数，即最大公约数方法。

English:  
The Euclidean algorithm is based on the principle that the greatest common divisor of two numbers does not change if the larger number is replaced by its difference with the smaller number. For example, 21 is the GCD of 252 and 105 (as 252 = 21 * 12 and 105 = 21 * 5), and the same number 21 is also the GCD of 105 and 252 - 105 = 147. Since this replacement reduces the larger of the two numbers, repeating this process gives successively smaller pairs of numbers until the two numbers become equal. When that occurs, they are the GCD of the original two numbers.  

中文:  
欧几里得算法的原理是：两个数的最大公约数同时也是两个数差值和两个数中较小数的最大公约数。举个例子：21是252和105的最大公约数，同时21也是105和252 - 105 = 147的最大公约数。因此，通过这种方式，不断替换两个数之间较大的数，直到两个数相等时，这个数就是最大公约数。

English:  
By reversing the steps, the GCD can be expressed as a sum of the ewo original numbers each multiplied by a positive or negative integer, e.g., 21 = 5 * 105 + (-2) * 252. The fact that the GCD can always be expressed in this way is known as Bezout's identity.

中文:  
反转上述步骤，则最大公约数可以被表示成两个数各自乘以一个正数或负数的乘积的和。举个例子：21 = 5 * 105 + (-2) * 252。这一特征也被称作贝祖定理。
