/**
 * Insert Interval
 *
 * Given:
 *  - intervals: sorted and non-overlapping
 *  - newInterval: interval to insert
 *
 * Rule:
 *  - [1,2] and [2,3] ARE overlapping
 *
 * Strategy:
 *  1) Add intervals that end BEFORE newInterval starts
 *  2) Merge overlapping intervals
 *  3) Add the merged new interval
 *  4) Add remaining intervals
 *
 * Time: O(n)
 * Space: O(n)
 */
function insert(intervals, newInterval) {
  const result = [];
  let i = 0;

  // Destructure newInterval into working variables
  // These are primitives (numbers), copied by value.
  let [newStart, newEnd] = newInterval;

  // ----------------------------------------
  // 1️⃣ Add all intervals completely BEFORE
  // Condition: interval.end < newStart
  // Strict < because touching counts as overlap
  // ----------------------------------------
  while (i < intervals.length && intervals[i][1] < newStart) {
    result.push(intervals[i]);
    i++;
  }

  // ----------------------------------------
  // 2️⃣ Merge all overlapping intervals
  // Overlap happens when:
  // interval.start <= newEnd
  // <= because touching counts as overlap
  // ----------------------------------------
  while (i < intervals.length && intervals[i][0] <= newEnd) {
    // Expand new interval boundaries
    newStart = Math.min(newStart, intervals[i][0]);
    newEnd = Math.max(newEnd, intervals[i][1]);
    i++;
  }

  // Push the fully merged interval
  result.push([newStart, newEnd]);

  // ----------------------------------------
  // 3️⃣ Add remaining intervals (completely after)
  // These intervals start strictly after newEnd
  // ----------------------------------------
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}
