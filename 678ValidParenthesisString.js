/**
 * Valid Parenthesis String (LeetCode 678)
 * '(' must be matched with ')'
 * '*' can act as '(' or ')' or empty
 *
 * We track a range:
 *   minOpen = minimum possible unmatched '(' so far
 *   maxOpen = maximum possible unmatched '(' so far
 */
var checkValidString = function(s) {
  let minOpen = 0;
  let maxOpen = 0;

  for (const ch of s) {
    if (ch === '(') {
      // definitely adds an open
      minOpen++;
      maxOpen++;
    } else if (ch === ')') {
      // definitely consumes an open
      minOpen--;
      maxOpen--;
    } else {
      // ch === '*'
      // could be ')' => reduce opens (minOpen--)
      // could be '(' => increase opens (maxOpen++)
      // could be empty => handled within the range
      minOpen--;
      maxOpen++;
    }

    // If maxOpen < 0, we have too many ')' even in best case => impossible
    if (maxOpen < 0) return false;

    // minOpen can't be negative; if it is, treat some '*' as '(' or empty
    if (minOpen < 0) minOpen = 0;
  }

  // If we can end with 0 unmatched '(' => valid
  return minOpen === 0;
};