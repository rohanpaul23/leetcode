/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Merges two sorted linked lists into one sorted list.
 * This is the same logic as in the Merge Two Sorted Lists problem (Leetcode 21).
 * 
 * @param {ListNode} l1 - head of first sorted list
 * @param {ListNode} l2 - head of second sorted list
 * @return {ListNode} - head of merged sorted list
 */
function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0); // dummy head to simplify merging logic
    let tail = dummy;

    // Traverse both lists and attach the smaller node to the merged list
    while (l1 && l2) {
        if (l1.val < l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next; // move forward in the merged list
    }

    // Append the remaining part of the list (if any)
    tail.next = l1 || l2;

    return dummy.next; // return the real head
}

/**
 * Merges k sorted linked lists using divide and conquer.
 * 
 * @param {ListNode[]} lists - array of k sorted linked list heads
 * @return {ListNode} - head of the final merged sorted list
 */
var mergeKLists = function(lists) {
    if (!lists || lists.length === 0) return null;

    // Start recursive merging from full range
    return mergeRange(lists, 0, lists.length - 1);
};

/**
 * Helper function to recursively merge lists in range [left, right]
 * 
 * @param {ListNode[]} lists - array of list heads
 * @param {number} left - start index of subrange
 * @param {number} right - end index of subrange
 * @return {ListNode} - merged list from lists[left] to lists[right]
 */
function mergeRange(lists, left, right) {
    // Base case: only one list to return
    if (left === right) return lists[left];

    // Divide the range into two halves
    const mid = Math.floor((left + right) / 2);

    // Recursively merge left and right halves
    const leftMerged = mergeRange(lists, left, mid);
    const rightMerged = mergeRange(lists, mid + 1, right);

    // Merge the two sorted halves
    return mergeTwoLists(leftMerged, rightMerged);
}
