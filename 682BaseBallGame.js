/**
 * You are keeping the scores for a baseball game with strange rules.
 *
 * Operations:
 * 1. Integer x → Record a new score of x
 * 2. "+" → Record sum of previous two scores
 * 3. "D" → Record double of previous score
 * 4. "C" → Invalidate (remove) previous score
 *
 * Return the sum of all scores after processing all operations.
 *
 * @param {string[]} operations
 * @return {number}
 */
var calPoints = function (operations) {
  const stack = [];

  for (let op of operations) {
    if (op === "+") {
      // Sum of last two scores
      const last = stack[stack.length - 1];
      const secondLast = stack[stack.length - 2];
      stack.push(last + secondLast);
    } 
    else if (op === "D") {
      // Double the last score
      stack.push(stack[stack.length - 1] * 2);
    } 
    else if (op === "C") {
      // Remove the last score
      stack.pop();
    } 
    else {
      // It's a number
      stack.push(Number(op));
    }
  }

  // Sum all remaining scores
  return stack.reduce((sum, score) => sum + score, 0);
};
