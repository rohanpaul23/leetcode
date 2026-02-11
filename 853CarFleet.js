/**
 * Car Fleet (LeetCode 853)
 *
 * You are given:
 * - `target`: a destination point on a one-lane road
 * - `position[i]`: starting position of car i
 * - `speed[i]`: speed of car i
 *
 * All cars move toward `target`. A car cannot pass another car.
 * If a faster car catches up to a slower car ahead, it becomes part of the same "fleet"
 * and then effectively travels at the slower car's speed.
 *
 * Return the number of car fleets that will arrive at the target.
 *
 * Key idea:
 * - Sort cars by position descending (closest to target first).
 * - Compute each car’s time to reach target: time = (target - position) / speed.
 * - Sweep from closest → farthest:
 *    - If a car behind would arrive sooner (smaller/equal time) than the fleet ahead,
 *      it must catch up before target → merges into that fleet (do NOT count a new fleet).
 *    - If it would arrive later (greater time), it cannot catch up → forms a new fleet.
 *
 * We can track fleets using a stack (or just keep the last fleet time).
 *
 * Time:  O(n log n) for sorting
 * Space: O(n) or O(1) extra depending on implementation
 */
var carFleet = function(target, position, speed) {
  // Pair up position and speed for each car
  const cars = position.map((pos, i) => [pos, speed[i]]);

  // Sort by starting position descending (closest to target first)
  cars.sort((a, b) => b[0] - a[0]);

  // Stack will store fleet "arrival times" in increasing order as we move backward
  const stack = [];

  for (const [pos, spd] of cars) {
    // Time for this car to reach target if it drove alone
    const time = (target - pos) / spd;

    /**
     * If this car's time is <= the time of the fleet in front (stack top),
     * then this car will catch up before reaching the target and merge into that fleet.
     *
     * Why?
     * - Car behind has smaller/equal time => it would arrive earlier or same time if alone,
     *   so it must catch the slower fleet ahead (since it can't pass).
     * - After merging, the merged fleet arrival time stays the front fleet's time (the larger one).
     *
     * So in this case, we do NOT push a new fleet time.
     */
    if (stack.length && time <= stack[stack.length - 1]) {
      continue; // merges into existing fleet
    }

    // Otherwise, it cannot catch the fleet ahead -> forms a new fleet
    stack.push(time);
  }

  // Number of distinct fleet times = number of fleets
  return stack.length;
};
