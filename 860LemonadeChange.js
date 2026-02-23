/**
 * Problem: Lemonade Change
 * ---------------------------------------------------------
 * Each lemonade costs $5.
 * Customers pay in order with a $5, $10, or $20 bill.
 * You start with NO change.
 *
 * For each customer:
 * - If they pay $5  -> no change needed
 * - If they pay $10 -> you must give back $5
 * - If they pay $20 -> you must give back $15
 *
 * Return true if you can give correct change to every customer, else false.
 *
 * Greedy Insight:
 * ---------------------------------------------------------
 * Track how many $5 and $10 bills you have.
 *
 * Why this works:
 * - $5 bills are the most important because they are required for giving change.
 * - When handling $20 (need $15 change), prefer giving:
 *      $10 + $5  (if possible)
 *   instead of:
 *      $5 + $5 + $5
 *   because keeping more $5 bills helps with future $10 customers.
 *
 * Time Complexity: O(n)  (one pass through bills)
 * Space Complexity: O(1) (only two counters)
 */

function lemonadeChange(bills) {
  let five = 0; // count of $5 bills in hand
  let ten = 0;  // count of $10 bills in hand

  for (const bill of bills) {
    if (bill === 5) {
      // Customer pays exact amount, we gain one $5
      five++;
    } else if (bill === 10) {
      // Need to give back $5
      if (five === 0) return false; // can't make change
      five--;
      ten++; // we receive one $10
    } else { // bill === 20
      // Need to give back $15
      // Best option: give $10 + $5 if possible
      if (ten > 0 && five > 0) {
        ten--;
        five--;
      } else if (five >= 3) {
        // Otherwise, give three $5 bills
        five -= 3;
      } else {
        // No way to make $15 change
        return false;
      }
    }
  }

  return true;
}