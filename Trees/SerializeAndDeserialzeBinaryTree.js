/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    const result = []; // store serialized node values

    // Inner recursive function for preorder traversal
    function dfs(node) {
        // If node is null, record a sentinel to indicate no child
        if (!node) {
            result.push("#");
            return;
        }

        // 1️⃣ Visit the current node
        result.push(String(node.val));

        // 2️⃣ Traverse the left subtree
        dfs(node.left);

        // 3️⃣ Traverse the right subtree
        dfs(node.right);
    }

    // Start DFS from the root
    dfs(root);

    // Join all values into a comma-separated string
    return result.join(",")
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
    const tokens = data.split(",");
    let index = 0; // keep track of the current position while rebuilding

    // Inner recursive function that builds the tree
    function buildTree() {
        // Take the next token
        const token = tokens[index++];

        // Base case: '#' means this node is null
        if (token === "#") return null;

        // Otherwise, create a new node with the numeric value
        const node = new TreeNode(Number(token));

        // Recursively build the left and right subtrees
        node.left = buildTree();
        node.right = buildTree();

        // Return the fully constructed node
        return node;
    };
    return buildTree();
}