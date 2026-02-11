/**
 * Problem: Asteroid Collision
 *
 * We are given an array of integers `asteroids`.
 * Each element represents an asteroid:
 *   - Absolute value = size
 *   - Sign = direction
 *       positive  → moving right
 *       negative  → moving left
 *
 * All asteroids move at the same speed.
 *
 * Collision rules:
 *   1. Two asteroids collide only if:
 *        left asteroid moves right  ( + )
 *        right asteroid moves left  ( - )
 *
 *        Pattern:   +   -
 *                   →   ←
 *
 *   2. If sizes are different → smaller explodes.
 *   3. If sizes are equal → both explode.
 *   4. Asteroids moving in the same direction never meet.
 *
 * Return the final state of asteroids after all collisions.
 *
 * Approach: Stack Simulation
 *
 * We process asteroids from left → right.
 * The stack stores asteroids that have survived so far.
 *
 * When we see a new asteroid `a`:
 *   - If no collision possible → push to stack.
 *   - If collision possible → resolve collisions until:
 *        - current asteroid dies
 *        - stack becomes empty
 *        - or no more collision condition exists
 *
 * Time Complexity: O(n)
 * Each asteroid is pushed and popped at most once.
 *
 * Space Complexity: O(n)
 * Stack may store all asteroids.
 */

function asteroidCollision(asteroids) {
  const stack = []; // stack holds surviving asteroids

  // Iterate through each asteroid from left to right
  for (let a of asteroids) {

    /**
     * Collision happens ONLY when:
     * 1) stack is not empty
     * 2) top asteroid is moving right  ( > 0 )
     * 3) current asteroid is moving left ( < 0 )
     *
     * This means they are moving toward each other.
     */
    while (
      stack.length &&
      stack[stack.length - 1] > 0 &&
      a < 0
    ) {
      const top = stack[stack.length - 1];

      /**
       * Compare sizes:
       * Since:
       *   top > 0  → |top| = top
       *   a < 0    → |a| = -a
       */

      // Case 1: top is smaller → destroy top
      if (top < -a) {
        stack.pop();     // remove smaller asteroid
        continue;        // current may collide again
      }

      // Case 2: equal size → destroy both
      if (top === -a) {
        stack.pop();     // remove top
      }

      /**
       * Case 2 and Case 3:
       * In both equal and top-bigger cases,
       * current asteroid is destroyed.
       */
      a = 0;             // mark current as destroyed
      break;             // stop collision loop
    }

    /**
     * If current asteroid survived all collisions,
     * push it to the stack.
     *
     * We use (a !== 0) because:
     *   a = 0 means destroyed
     */
    if (a !== 0) {
      stack.push(a);
    }
  }

  // Stack contains all surviving asteroids
  return stack;
}
