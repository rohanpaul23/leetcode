/**
 * Finds the length of the longest consecutive sequence in an unsorted array.
 * 
 * @param {number[]} nums - Array of unsorted integers
 * @return {number} - Length of the longest consecutive elements sequence
 */
var longestConsecutive = function(nums) {
    let longestLength = 0;

    // Map to store each number with a visited flag (false = not visited yet)
    const map = new Map();

    // Initialize map with all numbers and set visited flag to false
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], false);
    }

    // Iterate through each number in the array
    nums.forEach(num => {
        let currLength = 1;

        // Expand the sequence in the forward direction (num + 1, num + 2, ...)
        let nextNum = num + 1;
        while (map.has(nextNum) && map.get(nextNum) === false) {
            currLength++;
            map.set(nextNum, true); // mark as visited
            nextNum++;
        }

        // Expand the sequence in the backward direction (num - 1, num - 2, ...)
        let prevNum = num - 1;
        while (map.has(prevNum) && map.get(prevNum) === false) {
            currLength++;
            map.set(prevNum, true); // mark as visited
            prevNum--;
        }

        // Update the longest sequence length if current is greater
        longestLength = Math.max(longestLength, currLength);
    });

    return longestLength;
};
