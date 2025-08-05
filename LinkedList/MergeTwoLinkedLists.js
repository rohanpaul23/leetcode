/**
 * Merges two sorted linked lists into one sorted list.
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    const dummy = new ListNode();  // Dummy head node
    let node = dummy;              // Pointer to build merged list

    // Traverse both lists
    while (list1 && list2) {
        if (list1.val < list2.val) {
            node.next = list1;
            list1 = list1.next;
        } else {
            node.next = list2;
            list2 = list2.next;
        }
        node = node.next;
    }

    // Attach the remaining part (only one of them is non-null)
    node.next = list1 || list2;

    return dummy.next; // Return the merged list starting from real head
};
