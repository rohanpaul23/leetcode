/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Reorders the linked list to follow this pattern:
 * L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...
 * @param {ListNode} head - Head of the singly linked list
 * @return {void} - Modifies the list in-place
 */
var reorderList = function(head) {
    // Base cases: if the list has 0, 1 or 2 nodes, no need to reorder
    if (!head || !head.next || !head.next.next) return;

    // Step 1: Find the middle node using slow and fast pointers
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;         // moves 1 step
        fast = fast.next.next;    // moves 2 steps
    }

    // After this loop:
    // - 'slow' is at the middle node
    // - The list is divided into two halves:
    //     [head → ... → slow] and [slow.next → ... → null]

    // Step 2: Reverse the second half of the list starting from slow.next
    let prev = null;
    let curr = slow.next;

    slow.next = null; // Break the list into two halves

    while (curr !== null) {
        let next = curr.next;  // store next node
        curr.next = prev;      // reverse pointer
        prev = curr;           // move prev forward
        curr = next;           // move curr forward
    }

    // Now, 'prev' is the head of the reversed second half

    // Step 3: Merge the two halves alternately
    let first = head;    // pointer to the first half
    let second = prev;   // pointer to the reversed second half

    while (second) {
        // Save next nodes before modifying pointers
        let temp1 = first.next;
        let temp2 = second.next;

        // Link first node to second, and second to next of first
        first.next = second;
        second.next = temp1;

        // Move both pointers forward
        first = temp1;
        second = temp2;
    }

    // The list is now reordered in-place
};
