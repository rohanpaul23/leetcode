/**
 * Problem: Generate Parentheses
 * -----------------------------
 * Given n pairs of parentheses, generate all combinations of well-formed parentheses.
 *
 * Well-formed rules:
 * - You can never close more than you've opened at any point.
 * - Total '(' count must be n and total ')' count must be n.
 *
 * Time:  O(Cn * n) where Cn is the nth Catalan number (number of valid answers),
 *        and building each string costs O(n).
 * Space: O(n) recursion depth (excluding output).
 */
function generateParenthesis(n) {
  const res = [];

  function backtrack(open, close, path) {
    // If we've used n opens and n closes, we formed a valid string
    if (open === n && close === n) {
      res.push(path);
      return;
    }

    // Option 1: add '(' if we still have opens remaining
    if (open < n) {
      backtrack(open + 1, close, path + "(");
    }

    // Option 2: add ')' only if it won't break validity
    // (can't close more than we've opened)
    if (close < open) {
      backtrack(open, close + 1, path + ")");
    }
  }

  backtrack(0, 0, "");
  return res;
}

// Example:
console.log(generateParenthesis(3));
// ["((()))","(()())","(())()","()(())","()()()"]