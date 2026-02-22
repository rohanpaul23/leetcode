/**
 * Problem: Letter Combinations of a Phone Number
 * ---------------------------------------------------------
 * Given a string `digits` containing digits from 2-9 (inclusive),
 * return all possible letter combinations that the number could represent.
 *
 * Phone mapping:
 * 2 -> "abc"   3 -> "def"
 * 4 -> "ghi"   5 -> "jkl"
 * 6 -> "mno"   7 -> "pqrs"
 * 8 -> "tuv"   9 -> "wxyz"
 *
 * Return the answer in any order.
 *
 * Example:
 *   digits = "23"
 *   Output = ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 *
 * ---------------------------------------------------------
 * Approach: Backtracking (DFS)
 * ---------------------------------------------------------
 * We build the combination character by character.
 *
 * dfs(i):
 * - i is the index in `digits` we are filling right now.
 * - If i === digits.length, we formed a full combination -> store it.
 * - Otherwise, look up letters for digits[i], and try each letter:
 *     - choose letter
 *     - recurse to i+1
 *     - undo choice (backtrack)
 *
 * ---------------------------------------------------------
 * Time Complexity:
 * ---------------------------------------------------------
 * Let n = digits.length.
 * Each digit branches up to 4 letters (7 and 9 have 4).
 * Worst case: O(4^n) combinations.
 * Building each string costs O(n) -> O(n * 4^n) time.
 *
 * Space Complexity:
 * ---------------------------------------------------------
 * - Recursion depth + current path: O(n)
 * - Output size: O(n * 4^n) in worst case (required by problem)
 */

function letterCombinations(digits) {
  if (!digits || digits.length === 0) return [];

  const map = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
  };

  const res = [];
  const path = [];

  function dfs(i) {
    // If we've picked one letter for each digit, we have a complete combo
    if (i === digits.length) {
      res.push(path.join(""));
      return;
    }

    const letters = map[digits[i]]; // letters available for current digit

    // Try each possible letter for this digit
    for (const ch of letters) {
      path.push(ch);   // choose
      dfs(i + 1);      // explore next digit
      path.pop();      // unchoose (backtrack)
    }
  }

  dfs(0);
  return res;
}   