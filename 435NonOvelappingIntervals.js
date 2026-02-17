/**
 * LeetCode 435: Non-overlapping Intervals
 *
 * Touching is allowed:
 *   [1,2] and [2,3] do NOT overlap
 *
 * Overlap condition:
 *   currStart < prevEnd  => overlap => must remove one interval
 *
 * Greedy:
 *   Sort by end time, keep intervals that finish earliest.
 *
 * Time:  O(n log n)
 * Space: O(1) extra (ignoring sort)
 */
var eraseOverlapIntervals = function(intervals) {
  if (!intervals || intervals.length <= 1) return 0;

  // Sort by end time
  intervals.sort((a, b) => a[1] - b[1]);

  let removals = 0;
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    // If it overlaps, remove this interval (skip it)
    if (start < prevEnd) {
      removals++;
      // NOTE: we do NOT update prevEnd because we keep the earlier-ending interval
    } else {
      // No overlap, keep it
      prevEnd = end;
    }
  }

  return removals;
};
