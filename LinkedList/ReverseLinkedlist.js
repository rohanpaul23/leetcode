/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Reverses a singly linked list.
 * @param {ListNode} head - Head of the original linked list
 * @return {ListNode} - New head of the reversed linked list
 */
var reverseList = function(head) {
    let prev = null;      // At the start, previous node is null since new tail will point to null
    let curr = head;      // Start traversing from the head of the original list

    while (curr != null) {             // Traverse the list until the end
        let next = curr.next;         // Store the next node temporarily
        curr.next = prev;             // Reverse the current node's pointer
        prev = curr;                  // Move prev to current node
        curr = next;                  // Move to the next node in the original list
    }

    // After the loop, prev points to the new head of the reversed list
    return prev;
};
