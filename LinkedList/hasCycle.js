/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * Detects if a linked list has a cycle using Floyd's Tortoise and Hare algorithm.
 * 
 * @param {ListNode} head - Head of the linked list
 * @return {boolean} - Returns true if a cycle is detected, otherwise false
 */
var hasCycle = function(head) {
    let slowPtr = head; // Moves one step at a time
    let fastPtr = head; // Moves two steps at a time

    // Traverse the list
    while (fastPtr && fastPtr.next != null) {
        // Move slow by one and fast by two
        slowPtr = slowPtr.next;
        fastPtr = fastPtr.next.next;

        // If slow and fast meet, there's a cycle
        if (slowPtr === fastPtr) {
            return true;
        }
    }

    // If we reach here, fastPtr hit null => no cycle
    return false;
};
