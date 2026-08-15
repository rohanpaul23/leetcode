/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.left = (left === undefined ? null : left);
 *     this.right = (right === undefined ? null : right);
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
    /**
     * Returns:
     *
     * [
     *   maximum money if current node is robbed,
     *   maximum money if current node is skipped
     * ]
     */
    function dfs(node) {
        // An empty house provides no money.
        if (node === null) {
            return [0, 0];
        }

        // Get both possibilities from the left child.
        const [robLeft, skipLeft] = dfs(node.left);

        // Get both possibilities from the right child.
        const [robRight, skipRight] = dfs(node.right);

        /*
         * If we rob the current node, we must skip both children.
         */
        const robCurrent =
            node.val + skipLeft + skipRight;

        /*
         * If we skip the current node, each child can be
         * robbed or skipped. Choose whichever gives more money.
         */
        const skipCurrent =
            Math.max(robLeft, skipLeft) +
            Math.max(robRight, skipRight);

        return [robCurrent, skipCurrent];
    }

    const [robRoot, skipRoot] = dfs(root);

    // The root has no parent, so choose the better possibility.
    return Math.max(robRoot, skipRoot);
};