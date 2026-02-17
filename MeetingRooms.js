/**
 * Problem: Meeting Rooms (Can Attend All Meetings)
 * -----------------------------------------------
 * Given an array of meeting intervals, determine if a person can attend all meetings
 * without any time conflicts.
 *
 * Each interval is [start, end] where start < end.
 *
 * Important rule:
 * - Touching endpoints are NOT a conflict.
 *   Example: (0, 8) and (8, 10) is OK because the first ends exactly when the second starts.
 *
 * Examples:
 *   [(0,30),(5,10),(15,20)] => false  (overlaps with (0,30))
 *   [(5,8),(9,15)]          => true   (no overlaps)
 *
 * Key idea:
 * - If we sort meetings by start time, we only need to check neighbors.
 * - After sorting, a conflict exists if:
 *     current.start < previous.end
 *   (NOT <=, because equal endpoints are allowed)
 *
 * Time:  O(n log n) due to sorting
 * Space: O(1) extra (ignoring sort implementation details)
 */

/**
 * Definition of Interval:
 * class Interval {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

class Solution {
  /**
   * @param {Interval[]} intervals
   * @returns {boolean}
   */
  canAttendMeetings(intervals) {
    // If there are 0 or 1 meetings, there can't be a conflict.
    if (!intervals || intervals.length <= 1) return true;

    // Sort intervals by their start time (earliest meeting first).
    intervals.sort((a, b) => a.start - b.start);

    // Track the end time of the last meeting we accepted.
    let prevEnd = intervals[0].end;

    // Start checking from the 2nd meeting.
    for (let i = 1; i < intervals.length; i++) {
      const cur = intervals[i];

      /**
       * Conflict check:
       * - If current meeting starts BEFORE the previous one ends, they overlap.
       *   Example: prev = (0,30), cur = (5,10)
       *            5 < 30  => overlap => conflict
       *
       * - If current meeting starts EXACTLY when previous ends, it's fine.
       *   Example: prev = (0,8), cur = (8,10)
       *            8 < 8   => false => no conflict
       */
      if (cur.start < prevEnd) return false;

      // No conflict, so update prevEnd to the end of the current meeting.
      prevEnd = cur.end;
    }

    // If we never found an overlap, all meetings can be attended.
    return true;
  }
}