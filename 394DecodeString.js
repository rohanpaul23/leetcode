/**
 * Problem: Decode String (LeetCode 394)
 * -----------------------------------
 * You are given an encoded string `s` following this rule:
 *
 *   k[encoded_string]
 *
 * where:
 * - `k` is a positive integer (can be multiple digits like 10, 200, etc.)
 * - `encoded_string` is a substring that must be repeated exactly `k` times
 * - Encoded patterns can be NESTED
 *
 * Return the decoded version of the string.
 *
 * Examples:
 * 1) "3[a]2[bc]"   -> "aaabcbc"
 * 2) "3[a2[c]]"    -> "accaccacc"
 * 3) "10[a]"       -> "aaaaaaaaaa"
 *
 * Key Insight / Approach (Stack + Context Saving)
 * ----------------------------------------------
 * We decode the string in ONE PASS using a stack that stores "previous context"
 * whenever we enter a bracket '['.
 *
 * We maintain:
 * - `num`  : the repeat count currently being built from digits (supports multi-digit)
 * - `curr` : the current decoded string being built at the current nesting level
 * - `stack`: stores pairs in order: [prevString, repeatCount, prevString, repeatCount, ...]
 *
 * How it works:
 * 1) If we see a digit:
 *      We build `num` using:
 *        num = num * 10 + digit
 *      This is how we turn "10" into 10 (not 1 and 0 separately).
 *
 * 2) If we see '[':
 *      This means: "we are about to start a new nested substring"
 *      So we save the current context:
 *        stack.push(curr);  // string built so far before '['
 *        stack.push(num);   // repeat count for the upcoming bracketed string
 *      Then reset:
 *        curr = ""
 *        num = 0
 *
 * 3) If we see ']':
 *      This means: "the current bracketed substring is finished"
 *      So we restore the previous context:
 *        repeatCount = stack.pop();   // the number
 *        prevString  = stack.pop();   // the previous string
 *
 *      Then expand the current substring and attach it back:
 *        curr = prevString + curr.repeat(repeatCount)
 *
 * 4) If we see a normal character (a-z):
 *      Just append it to `curr`.
 *
 * Why stack works for nesting:
 * - Each '[' pushes a new (prevString, repeatCount) context.
 * - Each matching ']' pops exactly that context and merges.
 * This perfectly matches nested structures (LIFO behavior).
 *
 * Complexity:
 * - Time: O(n + output_size)  (decoding needs to produce the final string)
 * - Space: O(n) for the stack in worst case (deep nesting)
 */
var decodeString = function (s) {
  const stack = []; // stores alternating: [prevString, repeatCount, prevString, repeatCount, ...]
  let num = 0;      // current number being built (supports multi-digit)
  let curr = "";    // current decoded string for the current nesting level

  for (let ch of s) {
    // 1) If ch is a digit: build multi-digit number
    if (ch >= "0" && ch <= "9") {
      // Example: if num=1 and ch='0' => num becomes 10
      // digitValue = ASCII(ch) - ASCII('0')
      num = num * 10 + (ch.charCodeAt(0) - "0".charCodeAt(0));
    }

    // 2) If we hit '[': push context and reset for inner substring
    else if (ch === "[") {
      // Save string built so far and the repeat count for the upcoming substring
      stack.push(curr);
      stack.push(num);

      // Reset for decoding inside the brackets
      curr = "";
      num = 0;
    }

    // 3) If we hit ']': pop context and build expanded string
    else if (ch === "]") {
      // Pop repeat count and previous string (reverse order of pushing)
      const repeatCount = stack.pop(); // number
      const prevString = stack.pop();  // string

      // Expand current substring and attach to previous context
      // Example: prev="a", curr="c", repeat=2 => "a" + "c".repeat(2) => "acc"
      curr = prevString + curr.repeat(repeatCount);
    }

    // 4) Otherwise it's a normal letter: append to current substring
    else {
      curr += ch;
    }
  }

  // After processing all characters, curr is the fully decoded string
  return curr;
};

// Quick tests
console.log(decodeString("3[a]2[bc]"));  // "aaabcbc"
console.log(decodeString("3[a2[c]]"));   // "accaccacc"
console.log(decodeString("10[a]"));      // "aaaaaaaaaa"
