/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Removes the N-th node from the end of the list.
 * @param {ListNode} head - The head of the linked list.
 * @param {number} n - The position from the end to remove.
 * @return {ListNode} - The head of the modified list.
 */
var removeNthFromEnd = function(head, n) {
    // Create a dummy node and point its next to the head.
    // This helps in edge cases like removing the first node.
    let dummy = new ListNode(0);
    dummy.next = head;

    // Initialize two pointers at the dummy node
    let fast = dummy;
    let slow = dummy;

    // Move the 'fast' pointer n+1 steps ahead to maintain a gap of n nodes
    // between fast and slow. So when fast is at the end, slow is just before the node to delete.
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // Move both fast and slow one step at a time until fast reaches the end
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    // Skip the node that needs to be removed
    slow.next = slow.next.next;

    // Return the new head (which could be different if head was removed)
    return dummy.next;
};
