/**
 * ============================================================
 * 🏛 Dota2 Senate (LeetCode 649)
 * ============================================================
 *
 * PROBLEM STATEMENT:
 * You are given a string `senate` where each character is:
 *   - 'R' = Radiant senator
 *   - 'D' = Dire senator
 *
 * The senators act in the order they appear in the string, and this
 * order repeats in a cycle (after the last senator, it goes back to the first).
 *
 * On a senator's turn, they will BAN exactly one senator from the opposite party.
 * A banned senator is removed and will never act again.
 *
 * The game continues until all senators of one party are banned.
 *
 * Return:
 *   - "Radiant" if the Radiant party wins
 *   - "Dire" if the Dire party wins
 *
 * Both parties play optimally (they always make the move that helps them win).
 *
 * ============================================================
 *
 * DETAILED SOLUTION APPROACH (Queue Simulation):
 *
 * Key idea:
 * - The only thing that matters is WHO gets to act first among the next available
 *   Radiant and Dire senators.
 *
 * We use two queues:
 *   radiantQueue = indices of alive 'R' senators
 *   direQueue    = indices of alive 'D' senators
 *
 * Example: senate = "RDD"
 *   radiantQueue = [0]
 *   direQueue    = [1, 2]
 *
 * Simulation step (repeat until one queue is empty):
 * 1) Take the earliest available Radiant and Dire senators:
 *      rIndex = radiantQueue.shift()
 *      dIndex = direQueue.shift()
 *
 * 2) Whoever has the smaller index acts first (because they appear earlier in time).
 *    - If rIndex < dIndex:
 *        Radiant acts first and bans that Dire senator (dIndex is removed).
 *        The Radiant senator survives and will act again in the next cycle.
 *        So we push rIndex + n back into radiantQueue.
 *
 *    - Else:
 *        Dire acts first and bans that Radiant senator.
 *        The Dire senator survives and will act again -> push dIndex + n.
 *
 * Why do we add +n?
 * - The game is cyclic. Adding +n means "this senator comes back in the NEXT round"
 *   and ensures correct chronological order:
 *      round 1 indices: 0..n-1
 *      round 2 indices: n..2n-1
 *      round 3 indices: 2n..3n-1
 *
 * Stopping condition:
 * - As soon as one queue becomes empty, that party has no senators left,
 *   so the other party wins immediately.
 *
 * ============================================================
 *
 * TIME COMPLEXITY:
 * - Each senator is enqueued once initially.
 * - Each round removes exactly one senator forever.
 * - So we perform O(n) pops/pushes overall.
 * => Time: O(n)
 *
 * SPACE COMPLEXITY:
 * - Queues store up to n indices.
 * => Space: O(n)
 *
 * ============================================================
 */

function predictPartyVictory(senate) {
  const n = senate.length;

  // Store indices (positions) of alive senators for each party.
  const radiantQueue = [];
  const direQueue = [];

  // 1) Initialize queues with the positions of R and D senators.
  for (let i = 0; i < n; i++) {
    if (senate[i] === "R") radiantQueue.push(i);
    else direQueue.push(i);
  }

  // 2) Simulate the game until one party runs out of senators.
  while (radiantQueue.length > 0 && direQueue.length > 0) {
    // Get the next available senator from each party (earliest in time).
    const rIndex = radiantQueue.shift();
    const dIndex = direQueue.shift();

    // Whoever has the smaller index gets to act first and bans the opponent.
    if (rIndex < dIndex) {
      // Radiant acts first: bans this Dire senator (dIndex removed permanently).
      // Radiant senator survives, comes back next round -> push rIndex + n.
      radiantQueue.push(rIndex + n);
    } else {
      // Dire acts first: bans this Radiant senator.
      // Dire senator survives, comes back next round -> push dIndex + n.
      direQueue.push(dIndex + n);
    }
  }

  // 3) Winner is the party that still has senators remaining.
  return radiantQueue.length > 0 ? "Radiant" : "Dire";
}