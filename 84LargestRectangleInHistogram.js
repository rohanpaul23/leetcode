/**
 * Largest Rectangle in Histogram
 * Monotonic Increasing Stack (stores indices)
 *
 * Time: O(n)
 * Space: O(n)
 */
function largestRectangleArea(heights) {
  const stack = []; // stack of indices, heights are increasing: heights[stack[0]] < ...
  let maxArea = 0;

  // Go one step beyond the array with a sentinel height 0 to flush the stack
  for (let i = 0; i <= heights.length; i++) {
    const currHeight = (i === heights.length) ? 0 : heights[i];

    // If current bar is smaller, finalize rectangles for taller bars on stack
    while (stack.length > 0 && currHeight < heights[stack[stack.length - 1]]) {
      const topIndex = stack.pop();          // bar whose rectangle we finalize
      const height = heights[topIndex];

      // After popping, the new stack top is the previous smaller bar
      const leftSmallerIndex = stack.length > 0 ? stack[stack.length - 1] : -1;

      // Rectangle spans from (leftSmallerIndex + 1) to (i - 1)
      const width = i - leftSmallerIndex - 1;

      maxArea = Math.max(maxArea, height * width);
    }

    // Push current index to keep stack increasing
    stack.push(i);
  }

  return maxArea;
}

// Tests
console.log(largestRectangleArea([2,1,5,6,2,3])); // 10
console.log(largestRectangleArea([2,4]));         // 4
console.log(largestRectangleArea([2,1,2]));       // 3
