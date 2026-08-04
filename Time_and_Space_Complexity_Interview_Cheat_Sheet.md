# Time & Space Complexity Interview Cheat Sheet

## The 4 Questions to Ask for Every Problem

1.  **How much work does one function call or one iteration do?**
2.  **How many times is that work executed?**
3.  **Does recursion branch into multiple recursive calls?**
4.  **What data structures exist simultaneously in memory?**

------------------------------------------------------------------------

# Time Complexity Patterns

  --------------------------------------------------------------------------------
  Pattern             Time Complexity                       Why?
  ------------------- ------------------------------------- ----------------------
  Constant operation  **O(1)**                              One fixed operation

  Single loop         **O(N)**                              Visit N elements once

  Nested loops        **O(N²)**                             N × N iterations

  Three nested loops  **O(N³)**                             N × N × N

  Consecutive loops   **O(N)**                              O(N)+O(N)=O(2N)=O(N)

  Binary Search       **O(log N)**                          Input halves every
                                                            step

  Merge Sort          **O(N log N)**                        N work × log N levels

  Quick Sort          Avg **O(N log N)**, Worst **O(N²)**   Recursive partitioning

  DFS/BFS (Tree)      **O(N)**                              Visit each node once

  DFS/BFS (Graph)     **O(V+E)**                            Visit every vertex and
                                                            edge once

  Heap Insert/Delete  **O(log N)**                          Heap height

  Heap Peek           **O(1)**                              Root access

  HashMap/Set Lookup  Avg **O(1)**                          Hash lookup

  Sliding Window      **O(N)**                              Each pointer moves at
                                                            most N times

  Two Pointers        **O(N)**                              Linear traversal

  DP (1D)             **States × Transition Cost**          Compute each state
                                                            once

  DP (2D Grid)        **O(mn)**                             One computation per
                                                            cell

  Backtracking        **O(branching\^depth)**               Explore recursion tree

  Subsets             **O(2\^N)**                           Two choices per
                                                            element

  Permutations        **O(N!)**                             Choices decrease every
                                                            level

  Combination Sum     **O(N\^(T/M))** (loose upper bound)   Branching factor N,
                                                            depth T/M
  --------------------------------------------------------------------------------

------------------------------------------------------------------------

# Space Complexity Patterns

  Pattern           Space Complexity   Why?
  ----------------- ------------------ -------------------------------
  Local variables   **O(1)**           Constant storage
  Recursion         **O(depth)**       Only one path is active
  DFS (Tree)        **O(height)**      Call stack
  BFS               **O(N)**           Queue stores current frontier
  DP Table          **O(states)**      Store computed states
  2D DP             **O(mn)**          Matrix storage
  Heap              **O(N)**           Heap array
  HashMap / Set     **O(N)**           Store N items
  Output Array      **O(K × L)**       K answers, each of length L

------------------------------------------------------------------------

# When to Add, Multiply, Use Powers, Factorials & Logs

## Add

Sequential work.

``` text
Loop1 + Loop2
O(N) + O(N) = O(N)
```

## Multiply

Nested work.

``` text
Rows × Columns
Nested loops
Output Count × Size
```

## Power

Every recursive call branches.

``` text
Branching Factor = B
Depth = D

Time = O(B^D)
```

Example:

-   Combination Sum → **O(N\^(T/M))**
-   Subsets → **O(2\^N)**

## Factorial

Choices decrease every level.

``` text
N × (N-1) × (N-2) × ...
= N!
```

Example:

-   Permutations
-   N Queens (worst case)

## Logarithm

Problem size shrinks by a constant factor.

Examples:

-   Binary Search
-   Heap operations
-   Balanced BST operations

------------------------------------------------------------------------

# How to Derive Complexity

## Time Complexity

1.  Measure work done in one call/iteration.
2.  Count how many calls/iterations occur.
3.  If recursion branches:
    -   Branching factor = B
    -   Maximum depth = D
    -   Time ≈ **O(B\^D)**
4.  If recursion does not branch:
    -   Time ≈ Number of recursive calls.

## Space Complexity

Ask:

> **What exists simultaneously in memory?**

-   Recursion → Maximum depth
-   Queue → Maximum queue size
-   Stack → Maximum stack size
-   DP → Table size
-   Output → Number of answers × Size of each answer

------------------------------------------------------------------------

# Interview Mental Checklist

For every problem, ask:

1.  How much work does one iteration/call do?
2.  How many times is it executed?
3.  Does recursion branch?
4.  What is the maximum recursion depth?
5.  What data structures remain alive simultaneously?

If you can answer these five questions, you can derive the time and
space complexity for almost any coding interview problem.
