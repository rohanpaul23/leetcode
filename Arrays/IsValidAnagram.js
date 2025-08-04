var isAnagram = function(s, t) {
    // If lengths differ, they can't be anagrams
    if (s.length !== t.length) {
        return false;
    }

    // Initialize an array of size 26 for character counts (for 'a' to 'z')
    const charCount = Array(26).fill(0);

    // Traverse both strings simultaneously
    for (let i = 0; i < s.length; i++) {
        // Increment count for character in string `s`
        charCount[s.charCodeAt(i) - 97]++;
        
        // Decrement count for character in string `t`
        charCount[t.charCodeAt(i) - 97]--;
    }

    // If all counts are zero, strings are anagrams
    // `every` ensures all values in `charCount` are 0
    return charCount.every(ch => ch === 0);
};
