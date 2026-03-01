/**
 * ============================================================
 * 🧱 Stone Game (LeetCode 877)
 * ============================================================
 *
 * PROBLEM STATEMENT:
 *
 * Alice and Bob are playing a game with an even number of piles
 * arranged in a row. Each pile has a positive number of stones.
 *
 * - The total number of stones is odd (so there can be no tie).
 * - Alice goes first.
 * - On each turn, a player must take the ENTIRE pile
 *   from either the beginning or the end of the row.
 * - Both players play optimally.
 *
 * Return true if Alice wins, otherwise false.
 *
 * ============================================================
 *
 * 🧠 KEY INSIGHT (Very Important):
 *
 * Since:
 *   1) The number of piles is EVEN
 *   2) Total stones is ODD (so no tie possible)
 *
 * Alice can ALWAYS win.
 *
 * Why?
 *
 * Divide piles by index parity:
 *
 *   Even index piles → 0, 2, 4, ...
 *   Odd index piles  → 1, 3, 5, ...
 *
 * Because the number of piles is even:
 *   - Count of even-index piles = count of odd-index piles
 *
 * Alice can compute:
 *   sumEven = sum of stones at even indexes
 *   sumOdd  = sum of stones at odd indexes
 *
 * Since total is odd:
 *   sumEven !== sumOdd
 *
 * One of them must be larger.
 *
 * On her first move, Alice can choose which parity
 * she wants to commit to.
 *
 * From then on, she can ALWAYS pick from that parity,
 * because at every turn, the two ends will be
 * one even index and one odd index.
 *
 * So:
 *   Alice gets max(sumEven, sumOdd)
 *   Bob gets the other one
 *
 * Therefore Alice ALWAYS wins.
 *
 * ============================================================
 */

function stoneGame(piles) {
  // Because of the mathematical proof above,
  // Alice always has a winning strategy.
  return true;
}