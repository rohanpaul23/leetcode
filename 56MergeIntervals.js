/**
 * Problem: Merge Intervals
 * ------------------------
 * Given an array of intervals where intervals[i] = [start, end],
 * merge all overlapping intervals, and return the merged list.
 *
 * Overlap rule:
 * Two intervals [a,b] and [c,d] overlap if c <= b (assuming a <= b and c <= d).
 *
 * Approach: Sort + One Pass Merge
 * -------------------------------
 * 1) Sort intervals by start ascending.
 * 2) Keep a result array `merged`.
 * 3) For each interval:
 *    - If `merged` is empty OR current.start > lastMerged.end:
 *        => no overlap, push it.
 *    - Else:
 *        => overlap, extend lastMerged.end = max(lastMerged.end, current.end)
 *
 * Time:  O(n log n) due to sorting
 * Space: O(n) for the output
 *
 * @param {number[][]} intervals
 * @returns {number[][]}
 */
function merge(intervals) {
  // Edge case: no intervals
  if (!intervals || intervals.length === 0) return [];

  // Step 1: sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Step 2: start merged output with the first interval
  const merged = [intervals[0]];

  // Step 3: sweep through remaining intervals
  for (let i = 1; i < intervals.length; i++) {
    const [curStart, curEnd] = intervals[i];

    // `last` is the most recently merged interval in the output
    const last = merged[merged.length - 1];
    const lastStart = last[0];
    const lastEnd = last[1];

    // If current interval starts AFTER the last ends -> no overlap
    if (curStart > lastEnd) {
      merged.push([curStart, curEnd]);
    } else {
      // Overlap -> merge by extending the end if needed
      last[1] = Math.max(lastEnd, curEnd);
    }
  }

  return merged;
}

// Example:
// merge([[1,3],[2,6],[8,10],[15,18]]) => [[1,6],[8,10],[15,18]]
