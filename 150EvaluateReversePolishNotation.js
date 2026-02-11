/**
 * Problem: Evaluate Reverse Polish Notation (LeetCode 150)
 *
 * You are given an array of strings `tokens` that represents an arithmetic expression
 * in Reverse Polish Notation (RPN).
 *
 * Evaluate the expression and return the integer result.
 *
 * Notes / Rules:
 * - Valid operators are: '+', '-', '*', '/'
 * - Each operand is an integer (as a string) or the result of a previous operation
 * - Division between two integers truncates toward zero (IMPORTANT!)
 * - No division by zero
 * - The input is always a valid RPN expression
 * - All intermediate results fit in 32-bit signed integer range
 *
 * RPN refresher:
 * - Operators come AFTER their operands.
 *   Example: ["2","1","+","3","*"] means (2 + 1) * 3
 *
 * Approach: Stack
 *
 * Why stack works:
 * - When we see a number, we push it.
 * - When we see an operator, we pop the last two numbers:
 *     b = pop()  (right operand)
 *     a = pop()  (left operand)
 *   Then compute a (op) b and push the result back.
 * - The final stack will contain exactly one value: the answer.
 *
 * Time Complexity: O(n) where n = tokens.length
 * Space Complexity: O(n) in worst case for the stack
 */
var evalRPN = function (tokens) {
  const stack = [];

  // Helper: truncation toward zero for division in JS
  // - Math.trunc( 1.9) = 1
  // - Math.trunc(-1.9) = -1
  const truncDiv = (a, b) => Math.trunc(a / b);

  for (const token of tokens) {
    // Check if token is one of the operators
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      // Pop in correct order: second pop is the left operand
      const b = stack.pop(); // right operand
      const a = stack.pop(); // left operand

      let result;

      // Compute based on operator
      if (token === "+") {
        result = a + b;
      } else if (token === "-") {
        result = a - b;
      } else if (token === "*") {
        result = a * b;
      } else {
        // Division must truncate toward zero
        result = truncDiv(a, b);
      }

      // Push result back to stack (it becomes an operand for future ops)
      stack.push(result);
    } else {
      // Token is a number (could be negative), convert to integer and push
      stack.push(Number(token));
    }
  }

  // Final result is the only value left on the stack
  return stack[0];
};
