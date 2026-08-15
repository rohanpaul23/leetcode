/**
 * const { MinPriorityQueue } =
 *   require('@datastructures-js/priority-queue');
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  // Smaller number remains at the top.
  const minHeap = new MinPriorityQueue();

  for (const num of nums) {
    // Add the current number.
    minHeap.enqueue(num);

    /*
     * Keep only the k largest numbers.
     *
     * If there are more than k numbers,
     * remove the smallest one.
     */
    if (minHeap.size() > k) {
      minHeap.dequeue();
    }
  }

  /*
   * The heap now contains the k largest numbers.
   * The smallest among them is the kth largest overall.
   */
  return minHeap.front();
};