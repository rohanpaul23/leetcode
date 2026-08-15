/**
 * const { MaxPriorityQueue } =
 *   require('@datastructures-js/priority-queue');
 */

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  const maxQ = new MaxPriorityQueue();

  // Insert every stone into the max-priority queue.
  for (const stone of stones) {
    maxQ.enqueue(stone);
  }

  // Continue while at least two stones remain.
  while (maxQ.size() > 1) {
    // Remove the two heaviest stones.
    const stone1 = maxQ.dequeue();
    const stone2 = maxQ.dequeue();

    /*
     * Because this is a max-priority queue:
     *
     * stone1 >= stone2
     */
    if (stone1 !== stone2) {
      maxQ.enqueue(stone1 - stone2);
    }
  }

  // Return the last stone, or 0 if no stones remain.
  return maxQ.size() === 1 ? maxQ.dequeue() : 0;
};