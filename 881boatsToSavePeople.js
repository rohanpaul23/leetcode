/**
 * PROBLEM STATEMENT
 * -----------------
 * You are given an array `people` where `people[i]` represents the weight of the ith person.
 * You are also given an integer `limit`, which is the maximum weight a single boat can carry.
 *
 * Rules:
 * - Each boat can carry at most TWO people.
 * - The combined weight of people on a boat must NOT exceed `limit`.
 * - You have an unlimited number of boats.
 *
 * TASK:
 * Return the MINIMUM number of boats required to carry all people.
 *
 * EXAMPLES:
 * people = [1,2], limit = 3 → 1 boat  -> (1,2)
 * people = [3,2,2,1], limit = 3 → 3 boats -> (1,2), (2), (3)
 * people = [3,5,3,4], limit = 5 → 4 boats -> (3), (3), (4), (5)
 *
 * SOLUTION APPROACH (Greedy + Two Pointers)
 * ----------------------------------------
 * 1. Sort the array in ascending order.
 * 2. Use two pointers:
 *    - `i` → lightest person
 *    - `j` → heaviest person
 * 3. Always assign the heaviest remaining person to a boat.
 * 4. If the lightest person can share the boat with the heaviest
 *    (i.e., people[i] + people[j] <= limit), pair them.
 * 5. Otherwise, the heaviest person goes alone.
 * 6. Count boats until all people are assigned.
 *
 * WHY THIS WORKS:
 * - The heaviest person must go on some boat anyway.
 * - Pairing them with the lightest person gives the best chance
 *   to save a boat.
 *
 * TIME COMPLEXITY: O(n log n) due to sorting
 * SPACE COMPLEXITY: O(1) extra space (ignoring sort internals)
 */

/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
function numRescueBoats(people, limit) {
  // Step 1: Sort people by weight (ascending)
  people.sort((a, b) => a - b);

  // Pointer to the lightest person
  let i = 0;

  // Pointer to the heaviest person
  let j = people.length - 1;

  // Counter for boats used
  let boats = 0;

  // Step 2: Process people until all are assigned to boats
  while (i <= j) {
    // Check if the lightest and heaviest person can share a boat
    if (people[i] + people[j] <= limit) {
      // If yes, move the light pointer
      // (both people will be assigned to the same boat)
      i++;
    }

    // The heaviest person is always assigned a boat
    j--;

    // One boat is used in every iteration
    boats++;
  }

  // Step 3: Return the minimum number of boats
  return boats;
}
