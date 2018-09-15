var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var compare = function (a, b) { return a - b; };
var swap = function (arr, i, j) {
    return _a = [arr[j], arr[i]], _b = __read(_a, 2), arr[i] = _b[0], arr[j] = _b[1], _a;
    var _a, _b;
};
var partition = function (arr, start, end) {
    var pivot = Math.floor((start + end) / 2);
    var i = start;
    var j = end;
    while (i <= j) {
        while (compare(arr[i], arr[pivot]) < 0) {
            i++;
        }
        while (compare(arr[j], arr[pivot]) > 0) {
            j--;
        }
        if (i <= j) {
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i;
};
var quickSort = function (arr, start, end) {
    var index = partition(arr, start, end);
    if (start < index - 1) {
        quickSort(arr, start, index - 1);
    }
    if (end > index) {
        quickSort(arr, index, end);
    }
};
var sortArr = function (arr) { return quickSort(arr, 0, arr.length - 1); };
var arr1 = [1, 3, 2, 3, 4, 5, 5, 4, 8, 6, 5, 6];
sortArr(arr1);
console.log(arr1);
//# sourceMappingURL=quickSort.js.map