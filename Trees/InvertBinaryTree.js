// Function to invert (mirror) a binary tree
var invertTree = function(root) {
  // Base case: if the tree (or subtree) is empty, return null
  if (!root) return null;

  // Swap the left and right children of the current node
  [root.left, root.right] = [root.right, root.left];

  // Recursively invert the left subtree (which was originally the right one)
  invertTree(root.left);

  // Recursively invert the right subtree (which was originally the left one)
  invertTree(root.right);

  // Return the current node (after its children have been inverted)
  return root;
};



// Function to invert (mirror) a binary tree using an iterative BFS approach
function invertTree(root) {
  // Base case: if the tree is empty, return null
  if (root == null) return null;

  // Initialize a queue with the root node to start level-order traversal (BFS)
  const queue = new Queue([root]);

  // Continue until all nodes have been processed
  while (!queue.isEmpty()) {
    // Remove (dequeue) one node from the front of the queue
    let node = queue.pop();

    // Swap the left and right children of the current node
    [node.left, node.right] = [node.right, node.left];

    // If the left child exists (after swap), add it to the queue for further processing
    if (node.left != null) queue.push(node.left);

    // If the right child exists (after swap), add it to the queue as well
    if (node.right != null) queue.push(node.right);
  }

  // Return the root node of the inverted tree
  return root;
}
