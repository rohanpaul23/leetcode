/**
 * Returns an array where each element is the product of all other elements in the array except itself.
 * The solution avoids using division and runs in O(n) time.
 * 
 * @param {number[]} nums - Input array of numbers
 * @returns {number[]} - Product array where result[i] = product of all elements except nums[i]
 */
var productExceptSelf = function(nums) {
    const n = nums.length;

    // Result array to store the final products
    const res = new Array(n);

    // leftArray[i] will store the product of all elements to the left of index i
    const leftArray = new Array(n);

    // rightArray[i] will store the product of all elements to the right of index i
    const rightArray = new Array(n);

    // There are no elements to the left of index 0
    leftArray[0] = 1;

    // There are no elements to the right of the last index
    rightArray[n - 1] = 1;

    // Build leftArray: leftArray[i] = nums[0] * nums[1] * ... * nums[i-1]
    for (let i = 1; i < n; i++) {
        leftArray[i] = nums[i - 1] * leftArray[i - 1];
    }

    // Build rightArray: rightArray[i] = nums[i+1] * nums[i+2] * ... * nums[n-1]
    for (let i = n - 2; i >= 0; i--) {
        rightArray[i] = nums[i + 1] * rightArray[i + 1];
    }

    // Multiply left and right arrays to get the result
    for (let i = 0; i < n; i++) {
        res[i] = leftArray[i] * rightArray[i];
    }

    return res;
};

// Time complexity: O(n)
// Space complexity: O(n) for leftArray and rightArray
