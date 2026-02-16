/**
 * ============================================================
 * 🧩 Trie (Prefix Tree) Implementation
 * ============================================================
 *
 * A Trie is a tree-like data structure used to store strings.
 *
 * Each node represents a character.
 * Each path from root → node represents a prefix.
 *
 * Each node contains:
 *  - children → mapping from character → next Trie node
 *  - isEnd → boolean marking if a complete word ends here
 *
 * Example:
 * Insert "apple"
 *
 * root
 *   |
 *   a
 *   |
 *   p
 *   |
 *   p
 *   |
 *   l
 *   |
 *   e (isEnd = true)
 *
 * Time Complexity:
 *   insert: O(L)
 *   search: O(L)
 *   startsWith: O(L)
 *   where L = length of word
 * ============================================================
 */


/**
 * Trie Constructor
 *
 * When we create a new Trie:
 * - We initialize a root node.
 * - Root node does NOT represent any character.
 * - It is just a starting point.
 */
var Trie = function() {
    this.root = {
        children: {},   // stores child nodes (char → node)
        isEnd: false    // root itself is not a word
    };
};


/**
 * ------------------------------------------------------------
 * INSERT METHOD
 * ------------------------------------------------------------
 * Inserts a word into the Trie.
 *
 * For each character:
 * 1. If it does not exist in children → create a new node.
 * 2. Move pointer to that child.
 * After processing all characters:
 * 3. Mark the last node as end of word.
 *
 * Example:
 * insert("cat")
 *
 * root
 *   |
 *   c
 *   |
 *   a
 *   |
 *   t (isEnd = true)
 */
Trie.prototype.insert = function(word) {
    let current = this.root;  // Start from root

    for (let char of word) {
        // If this character path doesn't exist, create it
        if (!current.children[char]) {
            current.children[char] = {
                children: {},
                isEnd: false
            };
        }

        // Move pointer to next node
        current = current.children[char];
    }

    // After processing all characters,
    // mark the final node as end of word
    current.isEnd = true;
};


/**
 * ------------------------------------------------------------
 * SEARCH METHOD
 * ------------------------------------------------------------
 * Returns true if the full word exists in the Trie.
 *
 * Important:
 * - We must reach the final node
 * - AND that node must have isEnd === true
 *
 * Why?
 * Because prefix ≠ full word.
 *
 * Example:
 * Insert "apple"
 *
 * search("app") should return false
 * because "app" is only a prefix, not a complete word.
 */
Trie.prototype.search = function(word) {
    let current = this.root;

    for (let char of word) {
        // If character path does not exist → word not present
        if (!current.children[char]) {
            return false;
        }

        // Move pointer
        current = current.children[char];
    }

    // Only return true if this node marks a full word
    return current.isEnd === true;
};


/**
 * ------------------------------------------------------------
 * STARTSWITH METHOD
 * ------------------------------------------------------------
 * Returns true if there exists ANY word
 * that starts with the given prefix.
 *
 * Difference from search:
 * - We do NOT care about isEnd
 * - As long as the prefix path exists → return true
 *
 * Example:
 * Insert "apple"
 *
 * startsWith("app") → true
 * search("app") → false
 */
Trie.prototype.startsWith = function(prefix) {
    let current = this.root;

    for (let char of prefix) {
        // If prefix path breaks → no word has this prefix
        if (!current.children[char]) {
            return false;
        }

        current = current.children[char];
    }

    // If we successfully traversed entire prefix,
    // it means at least one word starts with it
    return true;
};
