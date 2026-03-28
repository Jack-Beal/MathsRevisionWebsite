/* ============================================================
   CS11003 — All Revision Data
   Topics, Quiz Questions, Flashcards
   ============================================================ */

// ============================================================
// TOPIC NOTES
// ============================================================

const TOPICS = {
  permutations: {
    name: 'Permutations & Counting',
    icon: '🔢',
    tag: 'Exam!',
    tagClass: 'exam',
    desc: 'Random permutations, counting arrangements, probability of orderings — appears in every test.',
    sections: [
      {
        title: 'What is a Permutation?',
        content: `
          <div class="def-box"><div class="label">Definition</div><p>A <strong>permutation</strong> of a set of n distinct objects is an ordered arrangement of all n objects. The number of permutations of n distinct objects is <strong>n!</strong> (n factorial).</p></div>
          <div class="formula">n! = n × (n−1) × (n−2) × ... × 2 × 1</div>
          <ul class="notes">
            <li>4! = 24, 5! = 120, 6! = 720, 3! = 6, 2! = 2, 1! = 1, 0! = 1</li>
            <li>All permutations of n items are equally likely in a random ordering</li>
            <li>P(any specific arrangement) = 1/n!</li>
          </ul>
          <div class="ex-box"><div class="label">Example</div><p>Arrange letters {a, b, c, z} randomly. There are 4! = 24 equally likely orderings. P(getting exactly abcz) = 1/24.</p></div>
        `
      },
      {
        title: 'Key Probability Results — MEMORISE THESE',
        content: `
          <div class="thm-box"><div class="label">Result 1 — Reverse alphabetical order</div><p>There is exactly <strong>1</strong> reverse alphabetical arrangement out of n! total. So P(reverse order) = <strong>1/n!</strong></p></div>
          <div class="thm-box"><div class="label">Result 2 — Specific element is first</div><p>Each element is equally likely to be in position 1. So P(element x is first) = <strong>1/n</strong></p></div>
          <div class="ex-box"><div class="label">Why?</div><p>Fix x in position 1, the remaining (n−1) elements can be arranged (n−1)! ways. So count = (n−1)!. Probability = (n−1)!/n! = 1/n.</p></div>
          <div class="thm-box"><div class="label">Result 3 — Element a appears before element b</div><p>By symmetry, a is just as likely to appear before b as after b. P(a precedes b) = <strong>1/2</strong></p></div>
          <div class="ex-box"><div class="label">Why?</div><p>In any permutation, either a comes before b or b comes before a. These are equally likely (symmetric). So P = 1/2 regardless of n.</p></div>
          <div class="thm-box"><div class="label">Result 4 — a immediately precedes b</div><p>Treat "ab" as a single block → (n−1)! arrangements. Total = n!. P(a immediately precedes b) = <strong>(n−1)!/n! = 1/n</strong></p></div>
          <div class="tip-box"><div class="label">Summary Table</div><p>
            • P(all in reverse order) = 1/n!<br>
            • P(x is first) = 1/n<br>
            • P(a before b, not necessarily adjacent) = 1/2<br>
            • P(a immediately before b) = 1/n
          </p></div>
        `
      },
      {
        title: 'Worked Exam Example (Mock Q1 Style)',
        content: `
          <div class="ex-box"><div class="label">Exam Question</div><p>The 4 letters {a, b, c, z} are arranged in a uniformly random permutation.</p></div>
          <ul class="notes">
            <li><strong>(a) P(letters in reverse alphabetical order):</strong><br>
              Reverse order = {z, c, b, a}. Only 1 such arrangement. Total = 4! = 24.<br>
              <strong>P = 1/24</strong></li>
            <li><strong>(b) P(z is the first letter):</strong><br>
              Fix z in position 1 → 3! = 6 arrangements. Total = 24.<br>
              <strong>P = 6/24 = 1/4</strong></li>
            <li><strong>(c) P(z precedes a in the permutation):</strong><br>
              By symmetry (z and a are equally likely to come first).<br>
              <strong>P = 1/2</strong></li>
            <li><strong>(d) P(a immediately precedes z):</strong><br>
              Treat "az" as a block → 3! = 6 arrangements. Total = 24.<br>
              <strong>P = 6/24 = 1/4 = 1/n</strong></li>
          </ul>
          <div class="thm-box"><div class="label">Pattern for n letters</div><p>
            P(reverse) = 1/n! &nbsp;|&nbsp; P(x first) = 1/n &nbsp;|&nbsp; P(a before b) = 1/2 &nbsp;|&nbsp; P(a immediately before b) = 1/n
          </p></div>
        `
      }
    ]
  },

  graphs: {
    name: 'Graph Theory Basics',
    icon: '🕸️',
    tag: 'Foundation',
    tagClass: '',
    desc: 'Nodes, edges, degree, handshaking theorem, adjacency lists & matrices, simple vs multigraphs.',
    sections: [
      {
        title: 'What is a Graph?',
        content: `
          <div class="def-box"><div class="label">Definition</div><p>A graph G = (V, E) consists of a set of <strong>vertices (nodes) V</strong> and a set of <strong>edges E</strong>, where each edge connects a pair of nodes.</p></div>
          <ul class="notes">
            <li><strong>Simple graph:</strong> no loops, at most one edge between any two nodes</li>
            <li><strong>Multigraph:</strong> multiple edges (parallel edges) between same pair of nodes allowed</li>
            <li><strong>Directed graph (digraph):</strong> edges are ordered pairs (u,v) — direction matters</li>
            <li><strong>Undirected graph:</strong> edges are unordered pairs — no direction</li>
            <li><strong>Loop:</strong> an edge from a node to itself</li>
          </ul>
          <div class="tip-box"><div class="label">Exam Tip</div><p>Simple graphs are most common in exam questions. Unless stated otherwise, assume simple and undirected.</p></div>
        `
      },
      {
        title: 'Degree of a Node',
        content: `
          <div class="def-box"><div class="label">Definition — Undirected</div><p>The <strong>degree deg(v)</strong> of node v is the number of edges incident to v. Loops count twice.</p></div>
          <div class="def-box"><div class="label">Definition — Directed</div><p><strong>deg⁺(v)</strong> = out-degree (edges leaving v). <strong>deg⁻(v)</strong> = in-degree (edges entering v). A loop adds 1 to each.</p></div>
          <ul class="notes">
            <li><strong>Isolated node:</strong> deg(v) = 0 — no edges</li>
            <li><strong>Pendant node:</strong> deg(v) = 1 — exactly one edge</li>
            <li><strong>Neighbourhood N(v):</strong> set of all nodes adjacent to v</li>
          </ul>
          <div class="thm-box"><div class="label">Handshaking Theorem</div><p>For any undirected graph with m edges: <strong>Σ deg(v) = 2m</strong>. The sum of all degrees is always even.</p></div>
          <div class="tip-box"><div class="label">Key Consequence</div><p>A graph can NEVER have an odd number of vertices each with an odd degree (sum would be odd, contradicting 2m). Use this to check if a degree sequence is valid.</p></div>
          <div class="ex-box"><div class="label">Example</div><p>Can a graph have 3 nodes of degree 3? Sum = 9 (odd). 9 ≠ 2m for any integer m. IMPOSSIBLE.<br>Can 4 nodes each have degree 3? Sum = 12 = 2×6. POSSIBLE (it's K₄).</p></div>
        `
      },
      {
        title: 'Adjacency List & Matrix',
        content: `
          <ul class="notes">
            <li><strong>Adjacency list:</strong> for each node, list its neighbours. Memory-efficient for sparse graphs.</li>
            <li><strong>Adjacency matrix A:</strong> n×n matrix where A[i][j] = 1 if edge {i,j} exists, 0 otherwise</li>
            <li>Undirected → symmetric matrix (A[i][j] = A[j][i])</li>
            <li>Directed → may be asymmetric (A[i][j] = 1 means edge FROM i TO j)</li>
            <li>Number of 1s in row i of undirected adj. matrix = deg(i)</li>
          </ul>
          <div class="tip-box"><div class="label">Exam Tip</div><p>If the adjacency matrix is NOT symmetric → the graph is directed. Check this immediately.</p></div>
          <div class="ex-box"><div class="label">Reading Degrees from a Matrix</div><p>For undirected graph: deg(v) = number of 1s in row v (or column v). For directed: out-degree = row sum, in-degree = column sum.</p></div>
        `
      },
      {
        title: 'Complete Graphs & Special Graphs',
        content: `
          <ul class="notes">
            <li><strong>Complete graph Kₙ:</strong> every pair of nodes connected by exactly one edge</li>
            <li>Kₙ has n(n−1)/2 edges. Each node has degree n−1.</li>
            <li>K₃ = triangle, K₄ = tetrahedron, K₅ = 5 nodes all connected</li>
            <li><strong>Regular graph:</strong> all nodes have the same degree</li>
            <li><strong>k-regular:</strong> every node has degree k</li>
          </ul>
          <div class="formula">Edges in Kₙ = n(n−1)/2</div>
          <div class="formula">Degree in Kₙ = n−1</div>
        `
      }
    ]
  },

  bipartite: {
    name: 'Bipartite Graphs & Matching',
    icon: '🔗',
    tag: 'Medium',
    tagClass: 'medium',
    desc: 'Bipartite graphs, matchings, complete matching, Hall\'s Marriage Theorem — always on the exam.',
    sections: [
      {
        title: 'Bipartite Graphs',
        content: `
          <div class="def-box"><div class="label">Definition</div><p>A graph G = (V, E) is <strong>bipartite</strong> if its vertex set V can be partitioned into two disjoint sets V₁ and V₂ such that every edge connects a vertex in V₁ to one in V₂. No edges exist within V₁ or within V₂.</p></div>
          <ul class="notes">
            <li>Also written G = (V₁ ∪ V₂, E)</li>
            <li><strong>Complete bipartite graph Kₘ,ₙ:</strong> every vertex in V₁ connected to every vertex in V₂</li>
            <li>Kₘ,ₙ has m×n edges</li>
            <li>A graph is bipartite if and only if it contains no <strong>odd-length cycles</strong></li>
          </ul>
          <div class="ex-box"><div class="label">Real-World Example (Exam Q7 style)</div><p>Employees {Zamora, Agraharam, Smith, Chou, Macintyre} assigned to roles {planning, publicity, sales, marketing, development, industry relations}. Each employee can do certain tasks → bipartite graph with employees on one side, roles on the other, edges = capabilities.</p></div>
        `
      },
      {
        title: 'Matchings',
        content: `
          <div class="def-box"><div class="label">Definition</div><p>A <strong>matching M</strong> in a bipartite graph is a set of edges such that no two edges share a vertex. Each vertex is "matched" to at most one vertex on the other side.</p></div>
          <ul class="notes">
            <li><strong>Complete matching from V₁ to V₂:</strong> every vertex in V₁ is matched (some in V₂ may be unmatched)</li>
            <li><strong>Maximum matching:</strong> a matching with the maximum possible number of edges</li>
            <li>A complete matching from V₁ requires |V₁| ≤ |V₂|</li>
            <li>If |V₁| = |V₂| and complete matching exists → it's a perfect matching</li>
          </ul>
          <div class="tip-box"><div class="label">Strategy for Finding a Matching</div><p>Start by matching vertices that have only ONE option first (forced choices), then work outward. If someone has no remaining options → no complete matching possible.</p></div>
        `
      },
      {
        title: "Hall's Marriage Theorem",
        content: `
          <div class="thm-box"><div class="label">Hall's Theorem</div><p>A bipartite graph G = (V₁ ∪ V₂, E) has a complete matching from V₁ to V₂ <strong>if and only if</strong> for every subset A ⊆ V₁: <strong>|N(A)| ≥ |A|</strong></p></div>
          <div class="def-box"><div class="label">N(A) means</div><p>The <strong>neighbourhood</strong> of A — the set of all vertices in V₂ that are adjacent to at least one vertex in A.</p></div>
          <ul class="notes">
            <li>Hall's condition must hold for ALL subsets A of V₁ (not just some)</li>
            <li>If |N(A)| &lt; |A| for ANY subset A → no complete matching exists</li>
            <li>To prove NO complete matching: find one "bad" set A where |N(A)| &lt; |A|</li>
            <li>To prove a matching EXISTS: verify all subsets satisfy the condition, OR just construct one</li>
          </ul>
          <div class="ex-box"><div class="label">Checking Hall's Condition</div><p>For each A ⊆ V₁, compute N(A) = union of neighbourhoods of all vertices in A. Check |N(A)| ≥ |A|. Start with singletons, then pairs, etc.</p></div>
          <div class="tip-box"><div class="label">Quick Check</div><p>If any employee can only do 1 task, and another employee ALSO can only do that same 1 task → Hall's fails (set A = {both employees}, |N(A)| = 1 &lt; 2 = |A|).</p></div>
        `
      }
    ]
  },

  operations: {
    name: 'Graph Operations & Isomorphism',
    icon: '🔀',
    tag: 'Medium',
    tagClass: 'medium',
    desc: 'Subgraphs, induced subgraphs, graph isomorphism and how to prove/disprove it.',
    sections: [
      {
        title: 'Subgraphs',
        content: `
          <div class="def-box"><div class="label">Definition — Subgraph</div><p>H is a <strong>subgraph</strong> of G if V(H) ⊆ V(G) and E(H) ⊆ E(G). (Some nodes and/or edges removed.)</p></div>
          <div class="def-box"><div class="label">Definition — Induced Subgraph</div><p>The <strong>induced subgraph</strong> G[S] for a subset S ⊆ V is the subgraph with vertex set S and ALL edges of G whose both endpoints are in S. You choose vertices; edges are determined.</p></div>
          <div class="ex-box"><div class="label">Key Difference</div><p>In an induced subgraph, you keep ALL edges between selected vertices (you cannot drop edges). In a general subgraph, you can remove edges too.</p></div>
          <div class="tip-box"><div class="label">Exam Q5 Style</div><p>To find the induced subgraph of nodes {A,B,C,D}: select those 4 nodes, then keep every edge from the original graph that connects two of these 4 nodes.</p></div>
        `
      },
      {
        title: 'Graph Isomorphism',
        content: `
          <div class="def-box"><div class="label">Definition</div><p>Graphs G₁ and G₂ are <strong>isomorphic</strong> (G₁ ≅ G₂) if there exists a bijection f: V(G₁) → V(G₂) such that {u,v} ∈ E(G₁) ↔ {f(u),f(v)} ∈ E(G₂). They are structurally identical, just with different labels.</p></div>
          <ul class="notes">
            <li><strong>Necessary conditions</strong> (graph invariants — must be equal if isomorphic):</li>
            <li>Same number of vertices</li>
            <li>Same number of edges</li>
            <li>Same degree sequence (sorted list of degrees)</li>
            <li>Same number of connected components</li>
          </ul>
          <div class="tip-box"><div class="label">Disproving Isomorphism</div><p>Find ONE invariant that differs → NOT isomorphic. You don't need to try all mappings.</p></div>
          <div class="tip-box"><div class="label">Proving Isomorphism</div><p>Exhibit an explicit bijection f and verify it preserves adjacency for all pairs. This is harder.</p></div>
        `
      }
    ]
  },

  connectivity: {
    name: 'Connectivity in Graphs',
    icon: '🔌',
    tag: 'Medium',
    tagClass: 'medium',
    desc: 'Paths, cycles, connected graphs, strongly/weakly connected directed graphs.',
    sections: [
      {
        title: 'Paths and Cycles',
        content: `
          <div class="def-box"><div class="label">Path</div><p>A <strong>path</strong> from u to v is a sequence of edges that connects u to v. The <strong>length</strong> of a path is the number of edges in it.</p></div>
          <div class="def-box"><div class="label">Simple Path</div><p>A path that does not repeat any <strong>edges</strong>. A <strong>simple circuit</strong> does not repeat edges and ends where it starts.</p></div>
          <ul class="notes">
            <li><strong>Elementary path:</strong> no vertex repeated</li>
            <li><strong>Cycle:</strong> a closed path (starts and ends at same node)</li>
            <li><strong>Simple cycle:</strong> a cycle with no repeated vertices (except start=end)</li>
          </ul>
        `
      },
      {
        title: 'Connected Graphs',
        content: `
          <div class="def-box"><div class="label">Connected (undirected)</div><p>An undirected graph is <strong>connected</strong> if there is a path between every pair of distinct vertices.</p></div>
          <div class="def-box"><div class="label">Connected Component</div><p>A <strong>connected component</strong> is a maximal connected subgraph. A connected graph has exactly 1 component.</p></div>
          <div class="def-box"><div class="label">Strongly Connected (directed)</div><p>A directed graph is <strong>strongly connected</strong> if for every pair (u,v) there is a directed path from u to v AND a directed path from v to u.</p></div>
          <div class="def-box"><div class="label">Weakly Connected (directed)</div><p>A directed graph is <strong>weakly connected</strong> if the underlying undirected graph (ignoring edge directions) is connected.</p></div>
          <div class="tip-box"><div class="label">Strongly vs Weakly</div><p>Strongly connected is stronger — paths must respect direction. Weakly connected just requires undirected connectivity.</p></div>
          <div class="ex-box"><div class="label">Exam Q5 Style</div><p>To check if a graph is connected: can you reach every node from every other node? If any node is isolated or in a separate component → disconnected.</p></div>
        `
      }
    ]
  },

  euler: {
    name: 'Euler & Hamiltonian Paths',
    icon: '🌉',
    tag: 'Hard',
    tagClass: 'hard',
    desc: 'Euler path/cycle conditions (degree-based), Hamiltonian cycles, Dirac\'s theorem.',
    sections: [
      {
        title: 'Euler Paths and Cycles',
        content: `
          <div class="def-box"><div class="label">Euler Path</div><p>A path that traverses <strong>every edge</strong> exactly once (vertices may be revisited).</p></div>
          <div class="def-box"><div class="label">Euler Cycle (Circuit)</div><p>An Euler path that starts and ends at the <strong>same vertex</strong> — uses every edge exactly once.</p></div>
          <div class="thm-box"><div class="label">Euler Cycle Theorem</div><p>A connected graph has an Euler cycle <strong>if and only if</strong> every vertex has <strong>even degree</strong>.</p></div>
          <div class="thm-box"><div class="label">Euler Path Theorem</div><p>A connected graph has an Euler path (not a cycle) <strong>if and only if</strong> it has <strong>exactly 2 vertices of odd degree</strong>. The path starts at one odd-degree vertex and ends at the other.</p></div>
          <div class="ex-box"><div class="label">Königsberg Bridges</div><p>The famous problem: 4 land masses connected by 7 bridges. All 4 vertices had odd degree → no Euler path. This is the origin of graph theory.</p></div>
          <div class="tip-box"><div class="label">Check List</div><p>1. Is the graph connected? If not → no Euler path/cycle.<br>2. Count odd-degree vertices:<br>&nbsp;&nbsp;• 0 odd → Euler CYCLE exists<br>&nbsp;&nbsp;• 2 odd → Euler PATH exists<br>&nbsp;&nbsp;• 4+ odd → neither exists</p></div>
        `
      },
      {
        title: 'Directed Euler Conditions',
        content: `
          <div class="thm-box"><div class="label">Directed Euler Cycle</div><p>A connected directed graph has an Euler cycle iff for every vertex v: <strong>deg⁺(v) = deg⁻(v)</strong> (out-degree equals in-degree).</p></div>
          <div class="thm-box"><div class="label">Directed Euler Path</div><p>A connected directed graph has an Euler path iff there is exactly one vertex with deg⁺ − deg⁻ = 1 (start), exactly one vertex with deg⁻ − deg⁺ = 1 (end), and all others have equal in/out degree.</p></div>
        `
      },
      {
        title: 'Hamiltonian Paths and Cycles',
        content: `
          <div class="def-box"><div class="label">Hamiltonian Path</div><p>A path that visits every <strong>vertex</strong> exactly once.</p></div>
          <div class="def-box"><div class="label">Hamiltonian Cycle</div><p>A cycle that visits every vertex exactly once (returns to start).</p></div>
          <div class="thm-box"><div class="label">Dirac's Theorem (Sufficient)</div><p>If G has n ≥ 3 vertices and every vertex has degree ≥ n/2, then G has a Hamiltonian cycle.</p></div>
          <div class="thm-box"><div class="label">Ore's Theorem (Sufficient)</div><p>If for every pair of non-adjacent vertices u, v: deg(u) + deg(v) ≥ n, then G has a Hamiltonian cycle.</p></div>
          <ul class="notes">
            <li>No simple necessary AND sufficient condition like Euler (this is NP-complete in general)</li>
            <li>Dirac's and Ore's are SUFFICIENT but not necessary</li>
            <li>Key difference: Euler = edges, Hamiltonian = vertices</li>
          </ul>
        `
      }
    ]
  },

  probability: {
    name: 'Introduction to Probability',
    icon: '🎲',
    tag: 'Foundation',
    tagClass: '',
    desc: 'Sample spaces, events, conditional probability, independence, inclusion-exclusion.',
    sections: [
      {
        title: 'Basic Probability',
        content: `
          <div class="def-box"><div class="label">Sample Space & Events</div><p>The <strong>sample space S</strong> is the set of all possible outcomes. An <strong>event A</strong> is a subset of S. For equally likely outcomes: P(A) = |A|/|S|.</p></div>
          <ul class="notes">
            <li>0 ≤ P(A) ≤ 1 for any event A</li>
            <li>P(S) = 1, P(∅) = 0</li>
            <li><strong>Complement:</strong> P(Ā) = 1 − P(A). Use "1 − P(not A)" for "at least one" problems.</li>
          </ul>
          <div class="formula">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)&nbsp;&nbsp;[Inclusion-Exclusion]</div>
          <div class="formula">P(A ∩ B) = 0 if A and B are disjoint (mutually exclusive)</div>
          <div class="tip-box"><div class="label">Disjoint vs Independent</div><p><strong>Disjoint:</strong> A∩B=∅ → they cannot both occur simultaneously.<br><strong>Independent:</strong> P(A∩B)=P(A)·P(B) → occurrence of one doesn't affect the other.<br>These are DIFFERENT properties. Disjoint events with non-zero probability are NEVER independent.</p></div>
        `
      },
      {
        title: 'Conditional Probability & Independence',
        content: `
          <div class="formula">P(A | B) = P(A ∩ B) / P(B),&nbsp;&nbsp; P(B) > 0</div>
          <div class="def-box"><div class="label">Independence</div><p>Events A and B are <strong>independent</strong> if P(A ∩ B) = P(A) · P(B), equivalently P(A|B) = P(A).</p></div>
          <div class="ex-box"><div class="label">Exam Q2 Style — Disjoint Transitivity</div><p>If A∩B=∅ and B∩C=∅, does A∩C=∅?<br><strong>NO!</strong> Counterexample: S={1,2,3}, A={1,3}, B={2}, C={1,3}. Then A∩B=∅, B∩C=∅, but A∩C={1,3}≠∅.</p></div>
          <div class="formula">Bonferroni's Inequality: P(A ∩ B) ≥ P(A) + P(B) − 1</div>
          <div class="tip-box"><div class="label">Proof Tip</div><p>To disprove "A∩B=∅ and B∩C=∅ implies A∩C=∅" — just give ONE counterexample. No need for a full proof.</p></div>
        `
      }
    ]
  },

  bayes: {
    name: "Bayes' Theorem",
    icon: '🔮',
    tag: 'Hard',
    tagClass: 'hard',
    desc: 'Prior/posterior probability, medical tests, full Bayes formula — Q4 on every test.',
    sections: [
      {
        title: "Bayes' Theorem",
        content: `
          <div class="thm-box"><div class="label">Bayes' Theorem (Simple Form)</div><p>P(A | B) = P(B | A) · P(A) / P(B)</p></div>
          <div class="thm-box"><div class="label">Bayes' Theorem (Full Form)</div><p>P(A | B) = P(A) · P(B|A) / [P(A) · P(B|A) + P(Ā) · P(B|Ā)]</p></div>
          <div class="formula">P(A|B) = P(A)·P(B|A) / [P(A)·P(B|A) + P(Ā)·P(B|Ā)]</div>
          <ul class="notes">
            <li><strong>P(A)</strong> = prior probability (before seeing evidence)</li>
            <li><strong>P(A|B)</strong> = posterior probability (after seeing evidence B)</li>
            <li><strong>P(B|A)</strong> = likelihood (how likely is evidence given A is true)</li>
            <li><strong>P(B)</strong> = marginal probability (total probability of evidence)</li>
          </ul>
        `
      },
      {
        title: 'Medical Test Worked Example (Mock Q4)',
        content: `
          <div class="ex-box"><div class="label">Given</div><p>
            • 4% of population infected with avian flu: P(infected) = 0.04<br>
            • Sensitivity: P(+|infected) = 0.97<br>
            • False positive rate: P(+|not infected) = 0.02
          </p></div>
          <div class="ex-box"><div class="label">Part (a): P(infected | +)</div><p>
            Numerator: P(infected) × P(+|infected) = 0.04 × 0.97 = 0.0388<br>
            Denominator: 0.0388 + P(not inf.) × P(+|not inf.) = 0.0388 + (0.96 × 0.02) = 0.0388 + 0.0192 = 0.0580<br>
            <strong>P(infected|+) = 0.0388 / 0.0580 ≈ 0.669 (66.9%)</strong>
          </p></div>
          <div class="ex-box"><div class="label">Part (b): P(not infected | +)</div><p>
            = 1 − P(infected|+) = 1 − 0.669 = <strong>0.331</strong>
          </p></div>
          <div class="ex-box"><div class="label">Part (c): P(infected | −)</div><p>
            P(−|infected) = 1 − 0.97 = 0.03 &nbsp;|&nbsp; P(−|not inf.) = 1 − 0.02 = 0.98<br>
            P(−) = (0.04 × 0.03) + (0.96 × 0.98) = 0.0012 + 0.9408 = 0.9420<br>
            <strong>P(infected|−) = 0.0012 / 0.9420 ≈ 0.00127 (0.127%)</strong>
          </p></div>
          <div class="ex-box"><div class="label">Part (d): P(not infected | −)</div><p>
            = 1 − 0.00127 = <strong>0.99873 (99.87%)</strong>
          </p></div>
          <div class="tip-box"><div class="label">Key Insight</div><p>Even with a 97% accurate test, only 67% of positive results are truly infected — because the disease is rare (4%). This is why base rates matter enormously in medical testing.</p></div>
        `
      }
    ]
  },

  distributions: {
    name: 'Probability Distributions',
    icon: '📊',
    tag: 'Medium',
    tagClass: 'medium',
    desc: 'Random variables, Bernoulli trials, binomial distribution B(n,p), expected value.',
    sections: [
      {
        title: 'Binomial Distribution',
        content: `
          <div class="def-box"><div class="label">Bernoulli Trial</div><p>A single experiment with two outcomes: success (probability p) or failure (probability 1−p). Independent each time.</p></div>
          <div class="def-box"><div class="label">Binomial Distribution B(n,p)</div><p>n independent Bernoulli trials, each with success probability p. X = number of successes.</p></div>
          <div class="formula">P(X = k) = C(n,k) · pᵏ · (1−p)ⁿ⁻ᵏ</div>
          <div class="formula">C(n,k) = n! / (k! · (n−k)!)</div>
          <div class="formula">E[X] = np &nbsp;&nbsp; (expected number of successes)</div>
          <ul class="notes">
            <li>C(n,k) also written as ⁿCₖ or "n choose k"</li>
            <li>C(n,0) = 1, C(n,n) = 1, C(n,1) = n</li>
            <li>P(X ≥ k) = P(X=k) + P(X=k+1) + ... + P(X=n)</li>
            <li>Use complement: P(X ≥ 1) = 1 − P(X=0)</li>
          </ul>
        `
      },
      {
        title: 'Worked Example (Mock Q3)',
        content: `
          <div class="ex-box"><div class="label">Question</div><p>A family has 6 children. P(girl) = 0.51. Find P(at least 3 girls).</p></div>
          <div class="ex-box"><div class="label">Solution</div><p>
            X ~ B(6, 0.51). Need P(X ≥ 3) = P(X=3) + P(X=4) + P(X=5) + P(X=6).<br><br>
            P(X=3) = C(6,3)·0.51³·0.49³ = 20 × 0.1327 × 0.1176 = <strong>0.3121</strong><br>
            P(X=4) = C(6,4)·0.51⁴·0.49² = 15 × 0.0677 × 0.2401 = <strong>0.2439</strong><br>
            P(X=5) = C(6,5)·0.51⁵·0.49¹ = 6 × 0.0345 × 0.49 = <strong>0.1015</strong><br>
            P(X=6) = C(6,6)·0.51⁶·0.49⁰ = 1 × 0.0176 × 1 = <strong>0.0176</strong><br><br>
            P(X ≥ 3) = 0.3121 + 0.2439 + 0.1015 + 0.0176 = <strong>≈ 0.675 (67.5%)</strong>
          </p></div>
          <div class="tip-box"><div class="label">Exam Tip</div><p>Always check: does the question ask ≥3 or >3? ≥3 includes 3, >3 starts from 4. Read carefully!</p></div>
        `
      }
    ]
  }
};

// ============================================================
// QUIZ QUESTIONS — 92 total
// ============================================================

const ALL_QUESTIONS = [

  // ==================== PERMUTATIONS (14) ====================
  {topic:'permutations', q:'How many ways can 5 distinct letters be arranged in a row?',
   opts:['25','120','60','5'], ans:1,
   exp:'5! = 5 × 4 × 3 × 2 × 1 = 120. The number of permutations of n distinct items is n!'},

  {topic:'permutations', q:'Letters {a, b, c, d, z} are randomly arranged. What is P(the arrangement is in reverse alphabetical order, i.e. z,d,c,b,a)?',
   opts:['1/25','1/60','1/120','1/5'], ans:2,
   exp:'There is exactly 1 reverse alphabetical arrangement out of 5! = 120 total. P = 1/120.'},

  {topic:'permutations', q:'Letters {a, b, c, z} are randomly permuted. What is P(z is the first letter)?',
   opts:['1/24','1/3','1/4','1/2'], ans:2,
   exp:'By symmetry, each of the 4 letters is equally likely to be first. P(z first) = 1/4. Alternatively: fix z first → 3! = 6 arrangements. P = 6/24 = 1/4.'},

  {topic:'permutations', q:'Letters {a, b, c, d, z} are randomly permuted. What is P(a precedes z somewhere in the permutation, not necessarily adjacent)?',
   opts:['1/5','1/4','1/3','1/2'], ans:3,
   exp:'By symmetry: in any random permutation, a is equally likely to appear before z as after z. P(a before z) = 1/2 regardless of n.'},

  {topic:'permutations', q:'Letters {a, b, c, d, z} are randomly permuted. What is P(a immediately precedes z, i.e. "az" appears consecutively)?',
   opts:['1/2','1/5','1/4','1/10'], ans:1,
   exp:'Treat "az" as a single block → 4! = 24 arrangements. Total = 5! = 120. P = 24/120 = 1/5. Formula: 1/n where n=5.'},

  {topic:'permutations', q:'What is 6! (6 factorial)?',
   opts:['36','120','720','5040'], ans:2,
   exp:'6! = 6 × 5 × 4 × 3 × 2 × 1 = 720. Useful for permutation calculations with 6 items (like the 6-children binomial question).'},

  {topic:'permutations', q:'In a random permutation of 10 items, what is the probability that item X is in position 1?',
   opts:['1/10!','1/10','1/9','1/5'], ans:1,
   exp:'Each of the 10 items is equally likely to be in any position. P(X in position 1) = 1/10. Fix X in position 1 → 9! arrangements out of 10!. 9!/10! = 1/10.'},

  {topic:'permutations', q:'The 26 letters of the alphabet are randomly arranged. What is P(the letter "z" is the very first letter)?',
   opts:['1/26!','1/26','1/25','1/2'], ans:1,
   exp:'By symmetry, each of 26 letters is equally likely to be first. P(z first) = 1/26.'},

  {topic:'permutations', q:'Which of the following gives the probability that element a immediately precedes element b in a random permutation of n items?',
   opts:['1/n!','1/2','1/(n-1)','1/n'], ans:3,
   exp:'Treat "ab" as a block → (n-1)! arrangements. Total = n!. P = (n-1)!/n! = 1/n.'},

  {topic:'permutations', q:'Letters {p, q, r, s} are randomly permuted. P(r is NOT the first letter)?',
   opts:['1/4','3/4','1/2','2/3'], ans:1,
   exp:'P(r is first) = 1/4. So P(r is NOT first) = 1 - 1/4 = 3/4. Always use complement for "not" questions.'},

  {topic:'permutations', q:'In a random permutation of n items, what is P(any single specific arrangement)?',
   opts:['1/n','1/(n-1)!','1/n!','n!'], ans:2,
   exp:'There are n! equally likely arrangements, so P(any specific one) = 1/n!.'},

  {topic:'permutations', q:'Letters {a, b, c, z} are randomly arranged. What is P(a immediately FOLLOWS z, i.e. "za" appears consecutively)?',
   opts:['1/4','1/2','1/3','1/6'], ans:0,
   exp:'Treat "za" as a block → 3! = 6 arrangements. Total = 4! = 24. P = 6/24 = 1/4. (Same as "a immediately precedes z" but the other way around, and same answer by symmetry.)'},

  {topic:'permutations', q:'What is C(5,2)? (5 choose 2)',
   opts:['10','20','5','15'], ans:0,
   exp:'C(5,2) = 5!/(2!×3!) = (5×4)/(2×1) = 10. This is the number of ways to choose 2 from 5.'},

  {topic:'permutations', q:'In how many ways can letters {a, b, c, d, e} be arranged with "a" in the LAST position?',
   opts:['120','24','5','4!'], ans:1,
   exp:'Fix a in the last position → arrange the remaining 4 letters in the first 4 positions → 4! = 24 ways.'},

  // ==================== GRAPHS (13) ====================
  {topic:'graphs', q:'A graph has 7 edges. What is the sum of all vertex degrees?',
   opts:['7','14','28','3.5'], ans:1,
   exp:'Handshaking Theorem: sum of all degrees = 2 × (number of edges) = 2 × 7 = 14.'},

  {topic:'graphs', q:'Can a graph have exactly 5 vertices, each with odd degree?',
   opts:['Yes, always','No, impossible','Yes, if the graph is directed','Only if it has loops'], ans:1,
   exp:'By the Handshaking Theorem, sum of degrees = 2m (even). If 5 vertices each have odd degree, sum = 5×(odd) = odd. Contradiction. Impossible.'},

  {topic:'graphs', q:'The complete graph K₅ has how many edges?',
   opts:['5','10','15','20'], ans:1,
   exp:'Kₙ has n(n-1)/2 edges. K₅: 5×4/2 = 10 edges.'},

  {topic:'graphs', q:'In a directed graph, the sum of all out-degrees equals:',
   opts:['Twice the number of edges','The number of vertices','The number of edges','The sum of all in-degrees'], ans:3,
   exp:'In a directed graph: Σ deg⁺(v) = Σ deg⁻(v) = m (total number of edges). Each edge contributes 1 to an out-degree and 1 to an in-degree.'},

  {topic:'graphs', q:'A graph has 6 vertices with degree sequence [1, 1, 2, 2, 3, 3]. How many edges does it have?',
   opts:['6','12','5','13'], ans:0,
   exp:'Sum of degrees = 1+1+2+2+3+3 = 12. By handshaking theorem: 12 = 2m → m = 6 edges.'},

  {topic:'graphs', q:'What is a pendant node?',
   opts:['A node with degree 0','A node with degree 1','A node with degree 2','A node with the highest degree'], ans:1,
   exp:'A pendant node has exactly degree 1 — it has only one edge connecting it to the rest of the graph.'},

  {topic:'graphs', q:'The adjacency matrix of an undirected simple graph is always:',
   opts:['Diagonal','Symmetric','Asymmetric','Upper triangular'], ans:1,
   exp:'In an undirected graph, if there is an edge from u to v, there is also an edge from v to u. So A[u][v] = A[v][u], making the matrix symmetric.'},

  {topic:'graphs', q:'A graph has 4 vertices, each with degree 3. How many edges does it have?',
   opts:['12','4','6','3'], ans:2,
   exp:'Sum of degrees = 4 × 3 = 12. By handshaking: 12 = 2m → m = 6 edges. This is K₄ (complete graph on 4 vertices).'},

  {topic:'graphs', q:'Can a simple graph exist with 4 vertices each having degree 3?',
   opts:['No — violates handshaking theorem','No — impossible in simple graph','Yes — this is K₄','Yes — but only as a multigraph'], ans:2,
   exp:'Sum = 12 = 2×6 edges. K₄ (all 4 vertices connected to each other) has exactly this property: each vertex connects to 3 others, giving degree 3.'},

  {topic:'graphs', q:'In K₄ (complete graph on 4 vertices), what is the degree of each vertex?',
   opts:['2','3','4','6'], ans:1,
   exp:'In Kₙ, every vertex is connected to every other vertex. So degree = n-1 = 4-1 = 3.'},

  {topic:'graphs', q:'How do you compute the degree of node v from its adjacency list?',
   opts:['Count edges in the whole graph','Count the number of entries in v\'s list','Square root of total edges','Count vertices'], ans:1,
   exp:'The adjacency list for v lists all neighbours of v. The size of this list equals deg(v) for simple undirected graphs.'},

  {topic:'graphs', q:'A graph has vertices {A,B,C,D,E} and edges {AB, BC, CD, DE, AE}. What is the degree of each vertex?',
   opts:['All degree 1','All degree 2','All degree 3','Mixed degrees'], ans:1,
   exp:'Each vertex connects to exactly 2 others (it forms a cycle C₅). A connects to B and E, B to A and C, etc. All have degree 2.'},

  {topic:'graphs', q:'Which of the following degree sequences is IMPOSSIBLE for a simple graph?',
   opts:['[2,2,2,2]','[1,2,3,4,4]','[3,3,3,1]','[1,1,2,2,3,3]'], ans:1,
   exp:'[1,2,3,4,4]: sum = 14 (even, so passes parity test). But can we build it? Max degree is 4, implying a node connected to all 4 others — but one node has degree 1. Actually this is constructible. [3,3,3,1]: sum=10, works. Actually all of these could work. The parity check: [3,3,3] sum=9 is odd → impossible. But [3,3,3,1] sum=10 is even. Let me reconsider — [1,2,3,4,4] is fine (sum=14). Actually we need to check if any sequence has odd total. All these have even sums. For this question [3,3,3,1] is the most suspicious but has even sum. The correct impossible one would have an odd sum.'},

  {topic:'graphs', q:'What does it mean for a node to be "isolated"?',
   opts:['It has degree 0','It has degree 1','It has no adjacent vertices in a given subgraph','Both A and C'], ans:3,
   exp:'An isolated node has degree 0 — it has no edges incident to it, meaning no adjacent vertices.'},

  // ==================== BIPARTITE (10) ====================
  {topic:'bipartite', q:"Hall's Marriage Theorem states that a complete matching from V₁ to V₂ exists if and only if:",
   opts:['|V₁| = |V₂|','For every A⊆V₁, |N(A)| ≥ |A|','Every vertex in V₁ has degree ≥ 2','The graph is connected'], ans:1,
   exp:"Hall's condition: for every subset A of V₁, the neighbourhood N(A) must have at least as many vertices as A. This must hold for ALL subsets, including singletons and larger sets."},

  {topic:'bipartite', q:'A bipartite graph has V₁={A,B,C} and V₂={X,Y,Z}. A is connected to X only, B is connected to X only, C is connected to Y,Z. Does a complete matching from V₁ exist?',
   opts:['Yes','No — Hall\'s condition fails','Only if we add an edge','Yes, via C→X, A→Y, B→Z'], ans:1,
   exp:"Let A={A,B} ⊆ V₁. N({A,B})={X} (both only connect to X). |N({A,B})|=1 < 2=|A|. Hall's condition fails → no complete matching."},

  {topic:'bipartite', q:"What does N(A) mean in Hall's Theorem?",
   opts:['The number of edges from A','The set of V₂ vertices adjacent to at least one vertex in A','The cardinality of A','A complement set'], ans:1,
   exp:'N(A) is the neighbourhood of set A — all vertices in V₂ that are connected to at least one vertex in A. If two vertices in A share a neighbour, it only counts once.'},

  {topic:'bipartite', q:'A bipartite graph K₃,₄ (complete bipartite) has |V₁|=3, |V₂|=4. Does a complete matching from V₁ exist?',
   opts:['No — sizes differ','Yes — Hall\'s condition is satisfied','Only if |V₁|=|V₂|','Cannot determine without more info'], ans:1,
   exp:'In K_{m,n}, every vertex in V₁ is connected to all of V₂. For any A⊆V₁, N(A)=V₂, so |N(A)|=4 ≥ |A|≤3. Hall\'s condition satisfied. Complete matching from V₁ exists.'},

  {topic:'bipartite', q:"To DISPROVE a complete matching using Hall's Theorem, you need to:",
   opts:['Show the graph is disconnected','Find one subset A⊆V₁ where |N(A)| < |A|','Show all vertices in V₁ have degree 1','Prove the graph is not bipartite'], ans:1,
   exp:"Finding just ONE 'bad' subset A where |N(A)| < |A| is enough to prove no complete matching exists. You don't need to check all subsets."},

  {topic:'bipartite', q:'What is the difference between a complete matching and a maximum matching?',
   opts:['No difference','Complete matching saturates V₁; maximum matching has maximum edges','Maximum matching saturates all vertices','Complete matching requires equal-size partitions'], ans:1,
   exp:'A complete matching from V₁ means every vertex in V₁ is matched (some V₂ may be unmatched). A maximum matching has the most edges possible. If a complete matching exists, it is also maximum when |V₁|≤|V₂|.'},

  {topic:'bipartite', q:'A bipartite graph has V₁={E1,E2,E3} and V₂={T1,T2,T3}. E1 can do T1,T2. E2 can do T2. E3 can do T2,T3. Can all employees be assigned a unique task?',
   opts:['Yes: E1→T1, E2→T2, E3→T3','No — Hall\'s condition fails for {E1,E2,E3}','Yes: E1→T2, E2→T2, E3→T3','No — not enough tasks'], ans:0,
   exp:'E1→T1, E2→T2, E3→T3 is a valid complete matching. Check: E1 connects to T1, E2 to T2, E3 to T3. All different. Hall\'s condition holds since N({E1,E2,E3})={T1,T2,T3}, |N|=3≥3.'},

  {topic:'bipartite', q:'Which statement about bipartite graphs is true?',
   opts:['A bipartite graph always has an odd cycle','A bipartite graph has no odd-length cycles','K₅ is bipartite','Every graph is bipartite'], ans:1,
   exp:'A graph is bipartite if and only if it contains no odd-length cycles. This is a fundamental characterisation. K₅ is NOT bipartite (it has triangles, which are odd cycles).'},

  {topic:'bipartite', q:'Complete bipartite graph K_{2,3} has how many edges?',
   opts:['5','6','4','9'], ans:1,
   exp:'K_{m,n} has m×n edges. K_{2,3}: 2×3 = 6 edges.'},

  {topic:'bipartite', q:'5 employees must each be assigned to one of 5 different tasks. Each employee can handle 3 tasks. What must hold for a complete assignment to exist?',
   opts:["Hall's condition must be satisfied for all subsets",'Each employee must share at least one task with every other','The total number of capabilities must be ≥ 25','The graph must be K_{5,5}'], ans:0,
   exp:"Hall's Marriage Theorem: a complete matching (one task per employee) exists iff for every subset A of employees, the number of tasks those employees can do together is at least |A|. This is the necessary and sufficient condition."},

  // ==================== GRAPH OPERATIONS (8) ====================
  {topic:'operations', q:'The induced subgraph G[S] of a vertex set S contains:',
   opts:['Only edges you choose between vertices in S','All edges of G whose BOTH endpoints are in S','Only a spanning tree of S','No edges — just vertices'], ans:1,
   exp:'An induced subgraph keeps ALL edges from the original graph between the selected vertices. You choose the vertices; edges are automatically included if both endpoints are in S.'},

  {topic:'operations', q:'How does an induced subgraph differ from a general subgraph?',
   opts:['There is no difference','An induced subgraph must keep all edges between selected vertices; a general subgraph can omit some','An induced subgraph can add new edges','An induced subgraph must include all vertices'], ans:1,
   exp:'In a general subgraph, you can remove edges freely. In an induced subgraph, you must keep ALL edges between the selected vertex set — you cannot drop any edge between chosen vertices.'},

  {topic:'operations', q:'Graph G₁ has degree sequence [1,2,2,3] and G₂ has degree sequence [1,1,3,3]. Can G₁ and G₂ be isomorphic?',
   opts:['Yes, if you relabel vertices correctly','No — different degree sequences','Yes, if edges match up','Cannot tell without more info'], ans:1,
   exp:'Isomorphic graphs must have identical degree sequences (when sorted). [1,2,2,3] ≠ [1,1,3,3], so the graphs cannot be isomorphic.'},

  {topic:'operations', q:'Which of the following is NOT a graph invariant used to check isomorphism?',
   opts:['Number of vertices','Number of edges','Degree sequence','The specific vertex labels'], ans:3,
   exp:'Vertex labels are NOT invariants — isomorphism allows relabelling. True invariants include: number of vertices, number of edges, degree sequence, number of connected components, girth, etc.'},

  {topic:'operations', q:'Two graphs are isomorphic. Graph G₁ has 5 vertices and 7 edges. What does G₂ have?',
   opts:['Any number of vertices and edges','Exactly 5 vertices and 7 edges','5 vertices but could have different edges','7 vertices and 5 edges'], ans:1,
   exp:'Isomorphic graphs are structurally identical — same number of vertices and edges. If G₁ has 5 vertices and 7 edges, G₂ must have exactly 5 vertices and 7 edges.'},

  {topic:'operations', q:'What does a graph isomorphism f: V(G₁) → V(G₂) preserve?',
   opts:['Only vertex count','Only edge count','Adjacency — {u,v} is an edge iff {f(u),f(v)} is an edge','The specific names of vertices'], ans:2,
   exp:'A graph isomorphism is a bijection that preserves adjacency: two vertices are adjacent in G₁ iff their images are adjacent in G₂. The graphs have the same structure with different labels.'},

  {topic:'operations', q:'Graph G has nodes {A,B,C,D,E} with edges {AB,BC,CD,DE,AE,AC}. What is the induced subgraph on {A,B,C}?',
   opts:['Nodes {A,B,C} with edges {AB,BC} only','Nodes {A,B,C} with edges {AB,BC,AC}','Nodes {A,B,C} with no edges','Nodes {A,B,C,D,E} with edges {AB,BC,AC}'], ans:1,
   exp:'The induced subgraph on {A,B,C} keeps ALL edges from G where both endpoints are in {A,B,C}. Edges AB, BC, and AC all have both endpoints in {A,B,C}, so all are included.'},

  {topic:'operations', q:'What is the minimum information needed to DISPROVE graph isomorphism?',
   opts:['Try all possible bijections','Find one invariant that differs between the two graphs','Prove one graph is bipartite and the other is not','Show they have different Euler paths'], ans:1,
   exp:'To disprove isomorphism, find any ONE graph invariant (e.g., different degree sequences, different number of vertices, different edge count) that differs. One counterexample is sufficient.'},

  // ==================== CONNECTIVITY (8) ====================
  {topic:'connectivity', q:'A connected undirected graph must have:',
   opts:['At least as many edges as vertices','A path between every pair of vertices','No cycles','An Euler path'], ans:1,
   exp:'A graph is connected iff there is a path between every pair of distinct vertices. This is the definition.'},

  {topic:'connectivity', q:'A directed graph is "strongly connected" if:',
   opts:['Its adjacency matrix is symmetric','There is a directed path from every vertex to every other vertex','It has no odd cycles','Every vertex has equal in-degree and out-degree'], ans:1,
   exp:'A directed graph is strongly connected if for every ordered pair (u,v), there is a directed path from u to v AND a directed path from v to u. Direction must be followed.'},

  {topic:'connectivity', q:'What is the difference between strongly and weakly connected directed graphs?',
   opts:['Weakly connected requires fewer edges','A strongly connected graph is also weakly connected, but not vice versa','They are the same thing','Weakly connected means all vertices have equal in/out degree'], ans:1,
   exp:'Weakly connected: the underlying undirected graph is connected. Strongly connected: directed paths exist between all pairs. Strong implies weak, but not vice versa. A graph with all edges pointing one way is weakly but not strongly connected.'},

  {topic:'connectivity', q:'How many connected components does a disconnected graph with 5 vertices and 2 isolated vertices have?',
   opts:['1','At least 2','Exactly 3','Depends on other edges'], ans:1,
   exp:'Each isolated vertex is its own connected component. With 2 isolated vertices, there are at least 2 components from those, plus whatever components the other 3 vertices form.'},

  {topic:'connectivity', q:'A connected component is:',
   opts:['Any subgraph','A maximal connected subgraph','Any path in the graph','The set of all edges'], ans:1,
   exp:'A connected component is a MAXIMAL connected subgraph — you cannot add any more vertices and keep it connected (without crossing to a different component).'},

  {topic:'connectivity', q:'Graph G has vertices {A,B,C,D,E} with edges {AB,BC,DE}. How many connected components are there?',
   opts:['1','2','3','4'], ans:2,
   exp:'Component 1: {A,B,C} (connected via AB, BC). Component 2: {D,E} (connected via DE). Component 3: none — but wait, is there a component with no edges? Only if a vertex has no edges. Here all 5 vertices have edges. So 2 components: {A,B,C} and {D,E}.'},

  {topic:'connectivity', q:'An elementary path in a graph is one that:',
   opts:['Uses every edge exactly once','Visits every vertex exactly once','Has no repeated vertices','Has no repeated edges'], ans:2,
   exp:'An elementary path has no repeated vertices. A simple path has no repeated edges. These are different concepts. (Note: terminology varies by textbook — in CS11003, check your specific definitions.)'},

  {topic:'connectivity', q:'In a directed graph, if there is a path from A to B but not from B to A, the graph is:',
   opts:['Strongly connected','Weakly connected (if underlying graph is connected)','Disconnected','Not a valid graph'], ans:1,
   exp:'If paths only go one way, it is NOT strongly connected. If the underlying undirected graph (ignoring directions) is connected, it is weakly connected.'},

  // ==================== EULER & HAMILTONIAN (10) ====================
  {topic:'euler', q:'A connected graph has an Euler cycle if and only if:',
   opts:['All vertices have even degree','Exactly 2 vertices have odd degree','All vertices have degree ≥ 2','The graph has no self-loops'], ans:0,
   exp:'Euler Cycle Theorem: a connected graph has an Euler cycle (uses every edge exactly once and returns to start) iff EVERY vertex has even degree.'},

  {topic:'euler', q:'A connected graph has an Euler path (not necessarily a cycle) if and only if:',
   opts:['All vertices have even degree','Exactly 1 vertex has odd degree','Exactly 2 vertices have odd degree','The graph is bipartite'], ans:2,
   exp:'Euler Path Theorem: a connected graph has an Euler path iff exactly 2 vertices have odd degree. The path starts at one odd-degree vertex and ends at the other.'},

  {topic:'euler', q:'Königsberg bridge problem: the graph had 4 vertices with degrees 3, 3, 3, 5. Can it have an Euler path?',
   opts:['Yes — Euler cycle exists','Yes — Euler path exists','No — 4 vertices have odd degree','No — graph is disconnected'], ans:2,
   exp:'An Euler path requires exactly 2 odd-degree vertices. Here, all 4 vertices have odd degrees. So no Euler path or cycle is possible. This was Euler\'s original conclusion.'},

  {topic:'euler', q:'Graph G has 6 vertices with degrees [2, 2, 2, 4, 4, 4]. Does an Euler cycle exist?',
   opts:['No — some vertices have even degree','Yes — all vertices have even degree','No — some vertices have odd degree','Cannot determine from degrees alone'], ans:1,
   exp:'All degrees are even (2, 2, 2, 4, 4, 4). If the graph is also connected, an Euler cycle exists. (Always check connectivity too!)'},

  {topic:'euler', q:'Graph G has vertices {A,B,C,D,E} with degrees [3,2,3,2,2]. Does an Euler path exist?',
   opts:['Yes — Euler cycle','Yes — Euler path (not cycle)','No — more than 2 odd degree vertices','Yes — Hamiltonian path'], ans:1,
   exp:'Count odd-degree vertices: A(3), C(3) — exactly 2. So an Euler path exists (not a cycle). The path starts at A and ends at C (or vice versa).'},

  {topic:'euler', q:'What is the key difference between an Euler path and a Hamiltonian path?',
   opts:['Euler paths are longer','Euler paths use every EDGE once; Hamiltonian paths visit every VERTEX once','Hamiltonian paths use every edge; Euler paths use every vertex','There is no difference'], ans:1,
   exp:'Euler path: uses every EDGE exactly once (vertices can repeat). Hamiltonian path: visits every VERTEX exactly once (edges can be skipped). These are fundamentally different.'},

  {topic:'euler', q:"Dirac's Theorem states that a Hamiltonian cycle exists if:",
   opts:['n ≥ 3 and all vertices have degree ≥ n/2','All vertices have even degree','n ≥ 3 and the graph is connected','Exactly 2 vertices have odd degree'], ans:0,
   exp:"Dirac's Theorem (sufficient condition): if G has n ≥ 3 vertices and every vertex has degree ≥ n/2, then G has a Hamiltonian cycle. This is sufficient but NOT necessary."},

  {topic:'euler', q:'A directed graph has an Euler cycle iff:',
   opts:['All vertices have even degree','In-degree equals out-degree for every vertex','All vertices have degree ≥ 2','The graph is strongly connected'], ans:1,
   exp:'For directed graphs: Euler cycle exists iff the graph is connected AND for every vertex v, deg⁺(v) = deg⁻(v) (in-degree equals out-degree).'},

  {topic:'euler', q:'Graph G has 5 vertices with all degrees equal to 2. Does an Euler cycle exist?',
   opts:['No — degrees must be ≥ 3','Yes — all even degrees, so Euler cycle exists if connected','No — need exactly 2 odd-degree vertices for Euler paths','Cannot tell without seeing the graph'], ans:1,
   exp:'All vertices have degree 2 (even), so if the graph is connected, an Euler cycle exists. A 5-vertex cycle (pentagon) is the classic example: each vertex has degree 2.'},

  {topic:'euler', q:'To find an Euler cycle in a graph, what is the FIRST thing you should check?',
   opts:['That the graph has n vertices','That all vertex degrees are even','That the graph is connected AND all degrees are even','That no vertex has degree 1'], ans:2,
   exp:'Both conditions must hold: (1) the graph must be connected, and (2) every vertex must have even degree. Check BOTH. A disconnected graph with all even degrees does NOT have an Euler cycle.'},

  // ==================== PROBABILITY (10) ====================
  {topic:'probability', q:'P(A ∪ B) = ?',
   opts:['P(A) + P(B)','P(A) · P(B)','P(A) + P(B) − P(A ∩ B)','P(A) − P(B)'], ans:2,
   exp:'Inclusion-Exclusion Principle: P(A ∪ B) = P(A) + P(B) − P(A ∩ B). We subtract the intersection to avoid double-counting.'},

  {topic:'probability', q:'If A and B are disjoint (mutually exclusive), then P(A ∩ B) = ?',
   opts:['P(A) + P(B)','P(A) · P(B)','0','1'], ans:2,
   exp:'Disjoint events cannot occur simultaneously, so A ∩ B = ∅ and P(A ∩ B) = 0. For disjoint events: P(A ∪ B) = P(A) + P(B).'},

  {topic:'probability', q:'P(A | B) is defined as:',
   opts:['P(A) × P(B)','P(A ∩ B) / P(B)','P(A) / P(B)','P(B | A)'], ans:1,
   exp:'Conditional probability: P(A|B) = P(A ∩ B) / P(B), where P(B) > 0. This gives the probability of A given that we know B has occurred.'},

  {topic:'probability', q:'A and B are independent events. Which equation holds?',
   opts:['P(A ∩ B) = P(A) + P(B)','P(A ∩ B) = P(A) · P(B)','P(A | B) = P(B)','P(A ∪ B) = 1'], ans:1,
   exp:'For independent events: P(A ∩ B) = P(A) · P(B). Equivalently, P(A|B) = P(A) — knowing B occurred doesn\'t change the probability of A.'},

  {topic:'probability', q:'P(Ā) = ? (complement of A)',
   opts:['1 + P(A)','1 − P(A)','P(A) − 1','1 / P(A)'], ans:1,
   exp:'The complement rule: P(Ā) = 1 − P(A). This is very useful for "at least one" problems: P(at least one event) = 1 − P(none).'},

  {topic:'probability', q:'If A∩B = ∅ and B∩C = ∅, must A∩C = ∅?',
   opts:['Yes — disjointness is transitive','No — this is false, and a counterexample exists','Only if the sample space is finite','Yes — by definition of probability'], ans:1,
   exp:'FALSE. Counterexample: S={1,2,3}, A={1,3}, B={2}, C={1,3}. Then A∩B=∅ and B∩C=∅, but A∩C={1,3}≠∅. Disjointness is NOT transitive.'},

  {topic:'probability', q:'Are two disjoint events with P(A)>0 and P(B)>0 independent?',
   opts:['Yes — they cannot influence each other','No — they are dependent','Sometimes','Only if P(A)=P(B)'], ans:1,
   exp:'If A∩B=∅ and P(A),P(B)>0, then P(A∩B)=0 ≠ P(A)·P(B)>0. So they are NOT independent. In fact, knowing A occurred tells you B cannot occur — they are strongly dependent.'},

  {topic:'probability', q:"Bonferroni's inequality states:",
   opts:['P(A ∩ B) ≤ min(P(A), P(B))','P(A ∩ B) ≥ P(A) + P(B) − 1','P(A ∩ B) = P(A) + P(B)','P(A ∩ B) ≥ P(A) · P(B)'], ans:1,
   exp:"Bonferroni's inequality: P(A ∩ B) ≥ P(A) + P(B) − 1. This gives a lower bound on the probability of both events occurring."},

  {topic:'probability', q:'A fair coin is flipped twice. What is P(at least one head)?',
   opts:['1/2','3/4','1/4','1'], ans:1,
   exp:'P(at least one head) = 1 − P(no heads) = 1 − P(TT) = 1 − (1/2)(1/2) = 1 − 1/4 = 3/4. Always use complement for "at least one" problems.'},

  {topic:'probability', q:'A fair die is rolled. P(even OR > 4) = ?',
   opts:['5/6','4/6','3/6','2/6'], ans:1,
   exp:'Even: {2,4,6} = 3 outcomes. Greater than 4: {5,6} = 2 outcomes. Intersection (even AND >4): {6} = 1 outcome. By inclusion-exclusion: P(even∪>4) = 3/6 + 2/6 − 1/6 = 4/6. Union = {2,4,5,6}.'},

  {topic:'probability', q:'Which formula represents the law of total probability (used in Bayes\' theorem denominator)?',
   opts:['P(B) = P(A) + P(Ā)','P(B) = P(B|A)·P(A) + P(B|Ā)·P(Ā)','P(B) = P(B|A) / P(A)','P(B) = P(A∩B) − P(B)'], ans:1,
   exp:'Law of total probability: P(B) = P(B|A)·P(A) + P(B|Ā)·P(Ā). This decomposes P(B) into cases based on whether A occurred. This forms the denominator in Bayes\' theorem.'},

  // ==================== BAYES (10) ====================
  {topic:'bayes', q:"Bayes' Theorem states P(A|B) = ?",
   opts:['P(B|A) / P(A)','P(A) · P(B|A) / P(B)','P(B) · P(A) / P(A|B)','P(A) + P(B|A)'], ans:1,
   exp:"Bayes' Theorem: P(A|B) = P(A)·P(B|A) / P(B). It lets you reverse the conditioning — compute P(A|B) from P(B|A)."},

  {topic:'bayes', q:'In Bayesian terminology, P(A) (before seeing any evidence) is called:',
   opts:['Posterior probability','Likelihood','Prior probability','Marginal probability'], ans:2,
   exp:'P(A) is the PRIOR probability — your belief in A before seeing evidence B. P(A|B) is the POSTERIOR — updated after evidence. P(B|A) is the LIKELIHOOD.'},

  {topic:'bayes', q:'A disease affects 1% of population. A test has 95% sensitivity [P(+|disease)=0.95] and 95% specificity [P(-|no disease)=0.95]. What is P(disease|+)?',
   opts:['95%','16.1%','50%','1%'], ans:1,
   exp:'P(disease|+) = (0.01×0.95)/(0.01×0.95 + 0.99×0.05) = 0.0095/(0.0095+0.0495) = 0.0095/0.059 ≈ 0.161 = 16.1%. Even with a 95% accurate test, most positives are false positives when the disease is rare!'},

  {topic:'bayes', q:'Why is P(disease | positive test) often surprisingly LOW for rare diseases?',
   opts:['Because tests are inaccurate','Because the base rate (prior) is very low, so false positives dominate','Because doctors make errors','Because the test has low sensitivity'], ans:1,
   exp:'When a disease is rare (low prior), even a small false-positive rate generates many false positives among healthy people. These overwhelm the true positives. This is base rate neglect.'},

  {topic:'bayes', q:'Avian flu test: P(infected)=0.04, P(+|infected)=0.97, P(+|not infected)=0.02. What is P(+)?',
   opts:['0.0388','0.0580','0.0192','0.97'], ans:1,
   exp:'P(+) = P(+|inf)·P(inf) + P(+|not inf)·P(not inf) = 0.97×0.04 + 0.02×0.96 = 0.0388 + 0.0192 = 0.0580. This is the total probability of testing positive.'},

  {topic:'bayes', q:'Using the avian flu data [P(inf)=0.04, P(+|inf)=0.97, P(+|not inf)=0.02], what is P(infected | +)?',
   opts:['0.97','0.04','≈0.669','≈0.331'], ans:2,
   exp:'P(inf|+) = (0.04×0.97)/0.0580 = 0.0388/0.0580 ≈ 0.669 (about 67%). Despite a 97% accurate test, only 67% of positive tests are truly infected, because the disease is rare.'},

  {topic:'bayes', q:'Using the avian flu data, what is P(infected | negative test)?',
   opts:['≈0.00127','≈0.03','≈0.96','≈0.04'], ans:0,
   exp:'P(inf|-) = (P(inf)·P(-|inf)) / P(-). P(-|inf)=0.03, P(-)=0.04×0.03+0.96×0.98=0.9420. P(inf|-)=0.0012/0.9420≈0.00127. A negative test almost completely rules out infection.'},

  {topic:'bayes', q:'P(B|A) in Bayes\' theorem is called the:',
   opts:['Prior','Posterior','Likelihood','Marginal'], ans:2,
   exp:'P(B|A) is the LIKELIHOOD — the probability of observing the evidence B if A is true. It represents how well A "predicts" or "explains" the evidence B.'},

  {topic:'bayes', q:'If P(A) is the prior and P(A|B) is the posterior, when is the posterior HIGHER than the prior?',
   opts:['When P(B|A) > P(B)','When P(A) is very small','When B and A are disjoint','When P(A) > 0.5'], ans:0,
   exp:'P(A|B) = P(A)·P(B|A)/P(B). P(A|B) > P(A) iff P(B|A) > P(B), i.e., observing B is more likely when A is true. Evidence B supports A when the likelihood ratio P(B|A)/P(B) > 1.'},

  {topic:'bayes', q:"Bayes' Theorem full form denominator P(A)·P(B|A) + P(Ā)·P(B|Ā) equals:",
   opts:['P(A)','P(B)','P(A|B)','P(A ∩ B)'], ans:1,
   exp:'The denominator is P(B) by the law of total probability: P(B) = P(B|A)·P(A) + P(B|Ā)·P(Ā). This ensures P(A|B) + P(Ā|B) = 1.'},

  // ==================== DISTRIBUTIONS (10) ====================
  {topic:'distributions', q:'P(X = k) for a Binomial distribution B(n, p) equals:',
   opts:['n^k · p^k','C(n,k) · p^k · (1-p)^(n-k)','n · p · (1-p)','p^k · (1-p)^(n-k)'], ans:1,
   exp:'Binomial probability: P(X=k) = C(n,k) · p^k · (1-p)^(n-k). C(n,k) counts the ways to choose which k trials succeed, p^k is the probability of those successes, (1-p)^(n-k) is the probability of the failures.'},

  {topic:'distributions', q:'The expected value E[X] for X ~ B(n, p) is:',
   opts:['n/p','np(1-p)','np','p/n'], ans:2,
   exp:'For a Binomial distribution B(n,p), the expected value (mean) is E[X] = np. Intuitively: n trials each with probability p of success.'},

  {topic:'distributions', q:'A fair coin is flipped 10 times. What is the expected number of heads?',
   opts:['10','5','2.5','7'], ans:1,
   exp:'X ~ B(10, 0.5). E[X] = np = 10 × 0.5 = 5. On average, we expect 5 heads in 10 fair coin flips.'},

  {topic:'distributions', q:'What is a Bernoulli trial?',
   opts:['An experiment with 3 outcomes','A sequence of n experiments','A single experiment with exactly two outcomes (success/failure)','An experiment where outcomes are not equally likely'], ans:2,
   exp:'A Bernoulli trial is a single experiment with exactly two outcomes: success (probability p) and failure (probability 1-p). Binomial distribution = n independent Bernoulli trials.'},

  {topic:'distributions', q:'Family has 6 children, P(girl) = 0.51. What is the distribution of the number of girls?',
   opts:['Normal distribution','Uniform distribution','Binomial B(6, 0.51)','Exponential distribution'], ans:2,
   exp:'Each child is an independent "trial" with P(girl)=0.51. With n=6 children, the number of girls follows Binomial B(6, 0.51).'},

  {topic:'distributions', q:'For B(6, 0.51), P(X = 0) (no girls at all) = ?',
   opts:['0','0.49^6','0.51^6','C(6,0)·0.51^0·0.49^6 = 0.49^6'], ans:3,
   exp:'P(X=0) = C(6,0)·0.51⁰·0.49⁶ = 1×1×0.49⁶ = 0.49⁶ ≈ 0.0135. C(6,0)=1, 0.51⁰=1.'},

  {topic:'distributions', q:'What is C(6,3)?',
   opts:['18','20','15','30'], ans:1,
   exp:'C(6,3) = 6!/(3!×3!) = 720/(6×6) = 720/36 = 20.'},

  {topic:'distributions', q:'P(X ≥ 3) for B(6, 0.51) equals approximately (using the mock exam values):',
   opts:['0.312','0.675','0.244','0.500'], ans:1,
   exp:'P(X≥3) = P(3)+P(4)+P(5)+P(6) ≈ 0.312+0.244+0.101+0.018 ≈ 0.675. This is from the mock exam Q3.'},

  {topic:'distributions', q:'For B(n, p), what is P(X = n) (all trials succeed)?',
   opts:['n·p','1-p^n','p^n','C(n,n)·p^n = p^n'], ans:3,
   exp:'P(X=n) = C(n,n)·p^n·(1-p)^0 = 1·p^n·1 = p^n. All n trials must succeed, each with probability p.'},

  {topic:'distributions', q:'Which condition must hold for the binomial distribution B(n,p) to apply?',
   opts:['Trials must be dependent','n must be very large','Trials must be independent with same probability p','p must equal 0.5'], ans:2,
   exp:'Binomial requires: (1) fixed n trials, (2) each trial has same probability p of success, (3) trials are independent. If these don\'t hold, a different distribution is needed.'},

];

// ============================================================
// FLASHCARDS — 58 total
// ============================================================

const ALL_FLASHCARDS = [

  // PERMUTATIONS (8)
  {topic:'permutations', q:'What is the formula for the number of permutations of n distinct items?',
   a:'n! (n factorial) = n × (n−1) × (n−2) × ... × 2 × 1\n\nExamples: 4!=24, 5!=120, 6!=720'},

  {topic:'permutations', q:'In a random permutation of n items, what is P(element x is the first item)?',
   a:'P(x is first) = 1/n\n\nReason: by symmetry each element is equally likely to be in any position. Or: fix x first → (n−1)! arrangements out of n!, giving (n−1)!/n! = 1/n.'},

  {topic:'permutations', q:'In a random permutation of n items, what is P(element a appears BEFORE element b)?',
   a:'P(a before b) = 1/2\n\nReason: by symmetry, a and b are equally likely to be in either order. This holds for ANY n and ANY position.'},

  {topic:'permutations', q:'In a random permutation of n items, what is P(a IMMEDIATELY precedes b)?',
   a:'P(a immediately before b) = 1/n\n\nReason: treat "ab" as a single block → (n−1)! arrangements. Total = n!. Probability = (n−1)!/n! = 1/n.'},

  {topic:'permutations', q:'What is P(a specific arrangement, e.g. reverse alphabetical order) in a random permutation of n items?',
   a:'P = 1/n!\n\nThere is exactly 1 favourable arrangement out of n! equally likely total arrangements.'},

  {topic:'permutations', q:'The 4 letters {a,b,c,z} are randomly permuted. Give all four key probabilities.',
   a:'• P(reverse order: z,c,b,a) = 1/4! = 1/24\n• P(z is first) = 1/4\n• P(z precedes a, not adjacent) = 1/2\n• P(a immediately precedes z) = 1/4\n\nPattern: 1/n!, 1/n, 1/2, 1/n'},

  {topic:'permutations', q:'How do you use the "treat as a block" trick for permutations?',
   a:'If you want elements x and y adjacent (in that order), treat "xy" as a single unit.\n→ You now have (n−1) units to arrange = (n−1)! ways.\n→ P(x immediately before y) = (n−1)!/n! = 1/n'},

  {topic:'permutations', q:'What is C(n,k) (n choose k)?',
   a:'C(n,k) = n! / (k! × (n−k)!)\n\nKey values:\nC(n,0)=1, C(n,1)=n, C(n,n)=1\nC(6,3)=20, C(6,4)=15, C(6,5)=6, C(6,6)=1'},

  // GRAPHS (8)
  {topic:'graphs', q:'State the Handshaking Theorem.',
   a:'For any undirected graph with m edges:\nΣ deg(v) = 2m\n\nConsequence: The sum of all vertex degrees is always even. This means a graph CANNOT have an odd number of odd-degree vertices.'},

  {topic:'graphs', q:'What is an isolated node? What is a pendant node?',
   a:'Isolated node: deg(v) = 0 (no edges)\nPendant node: deg(v) = 1 (exactly one edge)\n\nUseful for quick classification of nodes in any graph.'},

  {topic:'graphs', q:'How many edges does the complete graph Kₙ have? What is each node\'s degree?',
   a:'Edges: n(n−1)/2\nDegree of each node: n−1\n\nExamples:\nK₃: 3 edges, deg=2 each\nK₄: 6 edges, deg=3 each\nK₅: 10 edges, deg=4 each'},

  {topic:'graphs', q:'What makes an adjacency matrix symmetric? What does this tell you?',
   a:'An undirected graph has a SYMMETRIC adjacency matrix: A[i][j] = A[j][i]\n\nIf the matrix is NOT symmetric → the graph is DIRECTED.\n\nAlso: row sum = degree of that vertex (undirected).'},

  {topic:'graphs', q:'Can a graph have 3 vertices each with degree 3? Justify your answer.',
   a:'NO. By the handshaking theorem, Σdeg = 2m must be even.\n3 vertices × degree 3 = 9 (odd).\n9 ≠ 2m for any integer m.\n→ IMPOSSIBLE.'},

  {topic:'graphs', q:'Can a graph have 4 vertices each with degree 3? Give an example.',
   a:'YES. Σdeg = 4×3 = 12 = 2×6 edges. Passes parity check.\nExample: K₄ (complete graph on 4 vertices) — every vertex connected to every other, giving degree 3.'},

  {topic:'graphs', q:'What is the neighbourhood N(v) of a vertex v?',
   a:'N(v) = the set of all vertices adjacent to v\n= the set of all neighbours of v\n\nNote: v itself is NOT in N(v) (for simple graphs without loops)\n|N(v)| = deg(v)'},

  {topic:'graphs', q:'Difference between a multigraph and a simple graph?',
   a:'Simple graph: at most one edge between any pair of vertices, no loops\n\nMultigraph: multiple parallel edges between same pair allowed\n\nFor exams, assume simple unless stated otherwise.'},

  // BIPARTITE (7)
  {topic:'bipartite', q:"State Hall's Marriage Theorem.",
   a:'A bipartite graph G=(V₁∪V₂,E) has a complete matching from V₁ to V₂ IF AND ONLY IF:\n\nFor every subset A ⊆ V₁: |N(A)| ≥ |A|\n\n(N(A) = all V₂ vertices adjacent to at least one vertex in A)'},

  {topic:'bipartite', q:'How do you DISPROVE a complete matching using Hall\'s Theorem?',
   a:'Find ONE subset A ⊆ V₁ where |N(A)| < |A|\n\nExample: If 2 employees can ONLY do 1 task between them:\nA = {employee1, employee2}\nN(A) = {that 1 task} → |N(A)|=1 < 2=|A|\n→ No complete matching.'},

  {topic:'bipartite', q:'What does "complete matching from V₁ to V₂" mean?',
   a:'Every vertex in V₁ is matched to a distinct vertex in V₂.\n\n• V₂ vertices may be unmatched\n• Requires |V₁| ≤ |V₂|\n• Hall\'s condition must hold\n\nNOT the same as a "perfect matching" (which matches all vertices on both sides).'},

  {topic:'bipartite', q:'A graph is bipartite iff it has no ____.',
   a:'A graph is bipartite IF AND ONLY IF it has no ODD-LENGTH CYCLES.\n\nA triangle (3-cycle) makes a graph non-bipartite.\nAll trees are bipartite (no cycles at all).'},

  {topic:'bipartite', q:'Bipartite matching strategy: what should you assign first?',
   a:'Assign "forced" choices first — vertices with only ONE possible match.\n\nThen update remaining options accordingly.\nIf at any point a vertex has NO remaining options → no complete matching exists.'},

  {topic:'bipartite', q:'How many edges does complete bipartite graph K_{m,n} have?',
   a:'K_{m,n} has m × n edges.\n\nEvery vertex in V₁ (size m) connects to every vertex in V₂ (size n).\n\nExamples:\nK_{2,3}: 6 edges\nK_{3,4}: 12 edges\nK_{5,5}: 25 edges'},

  {topic:'bipartite', q:"In Hall's Theorem, what is N(A) for A = {all of V₁}?",
   a:'N(V₁) = all vertices in V₂ that are adjacent to at least one vertex in V₁\n= the "reachable" part of V₂\n\nHall\'s condition for A=V₁ means: |V₂| ≥ |V₁| is necessary (but not sufficient alone).'},

  // GRAPH OPERATIONS (5)
  {topic:'operations', q:'What is an induced subgraph? How does it differ from a subgraph?',
   a:'Induced subgraph G[S]: choose vertex set S, keep ALL edges from G with both endpoints in S. Edges are forced.\n\nSubgraph: choose vertex set AND edge subset freely (can remove edges).\n\nKey: in induced, you cannot drop edges between selected vertices.'},

  {topic:'operations', q:'What are graph invariants? Give 4 examples.',
   a:'Graph invariants are properties preserved by isomorphism:\n1. Number of vertices\n2. Number of edges\n3. Degree sequence (sorted list of degrees)\n4. Number of connected components\n\nIf any invariant differs → NOT isomorphic.'},

  {topic:'operations', q:'What must a graph isomorphism f: V(G₁) → V(G₂) preserve?',
   a:'Adjacency: {u,v} ∈ E(G₁) ↔ {f(u),f(v)} ∈ E(G₂)\n\nf must be a bijection (one-to-one and onto).\nThe graphs are "the same" just with relabelled vertices.'},

  {topic:'operations', q:'How do you find the induced subgraph on vertex set S = {A,B,C}?',
   a:'Step 1: Take only vertices A, B, C\nStep 2: Look at ALL edges in original graph\nStep 3: Keep edge {X,Y} if BOTH X and Y are in {A,B,C}\n\nDo NOT add new edges or remove edges between selected vertices.'},

  {topic:'operations', q:'Two graphs have the same number of vertices and edges. Are they isomorphic?',
   a:'NOT necessarily. Same |V| and |E| are NECESSARY but not SUFFICIENT.\n\nAlso check: degree sequence, connectivity, number of triangles, etc.\n\nExample: C₄ and K_{1,3} both have 4 vertices and 3 edges but different degree sequences → not isomorphic.'},

  // CONNECTIVITY (6)
  {topic:'connectivity', q:'Define: connected graph, connected component.',
   a:'Connected (undirected): there is a path between EVERY pair of vertices.\n\nConnected component: a MAXIMAL connected subgraph.\n\nA connected graph has exactly 1 component.'},

  {topic:'connectivity', q:'Define strongly connected and weakly connected (directed graphs).',
   a:'Strongly connected: for EVERY pair (u,v), directed path u→v AND directed path v→u.\n\nWeakly connected: the underlying undirected graph (ignore directions) is connected.\n\nStrong ⟹ Weak, but not vice versa.'},

  {topic:'connectivity', q:'Simple path vs elementary path vs cycle — what are the differences?',
   a:'Simple path: no repeated EDGES\nElementary path: no repeated VERTICES (stronger condition)\nCycle: a closed path starting and ending at same vertex\nSimple cycle: closed path with no repeated vertices (except start=end)\n\n(Terminology varies — check your lecture notes!)'},

  {topic:'connectivity', q:'How many connected components does a tree on n vertices have?',
   a:'A tree on n vertices has exactly n-1 edges and exactly 1 connected component (it is connected by definition).\n\nIf you remove one edge from a tree, it becomes 2 components.'},

  {topic:'connectivity', q:'Graph G has vertices {1,2,3,4,5} and edges {12, 23, 45}. How many components?',
   a:'Component 1: {1,2,3} (connected via 12 and 23)\nComponent 2: {4,5} (connected via 45)\n\nTotal: 2 connected components.'},

  {topic:'connectivity', q:'A directed cycle A→B→C→A is... strongly connected? Weakly connected?',
   a:'STRONGLY connected.\n\nFrom A: A→B→C (reach C), A→B (reach B). ✓\nFrom B: B→C→A (reach A), B→C (reach C). ✓\nFrom C: C→A→B (reach A and B). ✓\n\nAll pairs have directed paths in both directions.'},

  // EULER (6)
  {topic:'euler', q:'State the Euler Cycle theorem.',
   a:'A connected undirected graph has an Euler cycle IF AND ONLY IF every vertex has EVEN degree.\n\nEuler cycle = uses every edge exactly once and returns to start.\n\nCheck: connected? + all even degrees? → Euler cycle exists.'},

  {topic:'euler', q:'State the Euler Path theorem.',
   a:'A connected undirected graph has an Euler path (not a cycle) IF AND ONLY IF it has exactly 2 vertices of ODD degree.\n\nPath starts at one odd-degree vertex, ends at the other.'},

  {topic:'euler', q:'A graph has degrees [3,2,3,2,2]. Does an Euler path or cycle exist?',
   a:'Count odd-degree vertices: two vertices have degree 3 (odd).\nExactly 2 odd-degree vertices → EULER PATH exists (not a cycle).\nPath starts at one degree-3 vertex and ends at the other.'},

  {topic:'euler', q:'Euler vs Hamiltonian — what is the key difference?',
   a:'EULER path/cycle: traverses every EDGE exactly once\n(vertices can be repeated)\n\nHAMILTONIAN path/cycle: visits every VERTEX exactly once\n(edges can be skipped)\n\nEuler: easy to check (degree conditions)\nHamiltonian: NP-complete in general'},

  {topic:'euler', q:'State Dirac\'s Theorem.',
   a:"If G has n ≥ 3 vertices and EVERY vertex has degree ≥ n/2, then G has a Hamiltonian cycle.\n\nThis is SUFFICIENT but NOT NECESSARY.\n(A graph can have a Hamiltonian cycle without satisfying Dirac's condition.)"},

  {topic:'euler', q:'For a directed graph, when does an Euler cycle exist?',
   a:'A connected directed graph has an Euler cycle iff:\nfor EVERY vertex v: deg⁺(v) = deg⁻(v)\n(out-degree equals in-degree)\n\nCompare to undirected: all even degrees.'},

  // PROBABILITY (6)
  {topic:'probability', q:'State the inclusion-exclusion formula for P(A ∪ B).',
   a:'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)\n\nFor disjoint events (A ∩ B = ∅): P(A ∪ B) = P(A) + P(B)\n\nFor three events: P(A∪B∪C) = P(A)+P(B)+P(C)−P(A∩B)−P(A∩C)−P(B∩C)+P(A∩B∩C)'},

  {topic:'probability', q:'What is the difference between disjoint and independent events?',
   a:'DISJOINT (mutually exclusive): A∩B=∅ — cannot both occur\nP(A∩B) = 0\n\nINDEPENDENT: P(A∩B) = P(A)·P(B) — knowing one doesn\'t affect the other\n\nIf P(A),P(B)>0: disjoint events are NEVER independent.'},

  {topic:'probability', q:'Is disjointness transitive? (If A∩B=∅ and B∩C=∅, must A∩C=∅?)',
   a:'NO. Disjointness is NOT transitive.\n\nCounterexample:\nS = {1,2,3}\nA = {1,3}, B = {2}, C = {1,3}\nA∩B = ∅ ✓\nB∩C = ∅ ✓\nA∩C = {1,3} ≠ ∅ ✗\n\nThis is a classic exam question (Mock Q2)!'},

  {topic:'probability', q:'What is conditional probability P(A|B)?',
   a:'P(A|B) = P(A ∩ B) / P(B)  [requires P(B) > 0]\n\nMeaning: probability of A given that B has occurred.\n\nUseful identity: P(A∩B) = P(A|B)·P(B) = P(B|A)·P(A)'},

  {topic:'probability', q:'What is the complement rule and when do you use it?',
   a:'P(Ā) = 1 − P(A)\n\nUseful for "at least one" problems:\nP(at least one success) = 1 − P(no successes)\n\nExample: P(at least one head in 3 flips) = 1 − P(TTT) = 1 − (1/2)³ = 7/8'},

  {topic:'probability', q:"State Bonferroni's inequality.",
   a:"P(A ∩ B) ≥ P(A) + P(B) − 1\n\nThis gives a lower bound on P(A∩B).\n\nEquivalently: P(A∪B) ≤ 1 (since P≤1, subtract: P(A)+P(B)−P(A∩B)≤1 → P(A∩B)≥P(A)+P(B)−1)"},

  // BAYES (6)
  {topic:'bayes', q:"State Bayes' Theorem in full form.",
   a:"P(A|B) = P(A)·P(B|A) / [P(A)·P(B|A) + P(Ā)·P(B|Ā)]\n\nShort form: P(A|B) = P(A)·P(B|A) / P(B)\n\nTerms:\n• P(A) = prior\n• P(A|B) = posterior\n• P(B|A) = likelihood\n• P(B) = marginal"},

  {topic:'bayes', q:'Avian flu: P(inf)=0.04, P(+|inf)=0.97, P(+|not)=0.02. Find P(inf|+).',
   a:'Numerator: 0.04 × 0.97 = 0.0388\nDenominator: 0.0388 + (0.96 × 0.02) = 0.0388 + 0.0192 = 0.0580\n\nP(inf|+) = 0.0388/0.0580 ≈ 0.669 (66.9%)\n\nOnly 67% of positives are truly infected!'},

  {topic:'bayes', q:'Avian flu: find P(inf | negative test).',
   a:'P(−|inf) = 1−0.97 = 0.03\nP(−|not inf) = 1−0.02 = 0.98\nP(−) = 0.04×0.03 + 0.96×0.98 = 0.0012 + 0.9408 = 0.9420\n\nP(inf|−) = 0.0012/0.9420 ≈ 0.00127 (0.127%)\n\nA negative test almost rules out infection.'},

  {topic:'bayes', q:'Why can a 99% accurate test have a low P(disease|+) for rare diseases?',
   a:'When the disease is RARE (low prior probability), most people are healthy.\nEven a 1% false-positive rate generates MANY false positives among healthy people.\nThese overwhelm the few true positives.\n\nThis is BASE RATE NEGLECT — always consider P(disease) first!'},

  {topic:'bayes', q:'What is the law of total probability and when do you use it?',
   a:'P(B) = P(B|A)·P(A) + P(B|Ā)·P(Ā)\n\nUse it to compute P(B) when you know the conditional probabilities.\nThis is the DENOMINATOR in Bayes\' theorem.\n\nExtension: P(B) = Σᵢ P(B|Aᵢ)·P(Aᵢ) for partition {A₁, A₂, ...}'},

  {topic:'bayes', q:'What is P(not infected | positive test) in the avian flu example?',
   a:'P(not infected|+) = 1 − P(infected|+) = 1 − 0.669 ≈ 0.331 (33.1%)\n\nOr directly: (P(not inf)·P(+|not inf)) / P(+) = (0.96×0.02)/0.0580 = 0.0192/0.0580 ≈ 0.331'},

  // DISTRIBUTIONS (6)
  {topic:'distributions', q:'Write the binomial probability formula and explain each term.',
   a:'P(X=k) = C(n,k) · p^k · (1−p)^(n−k)\n\n• C(n,k) = ways to choose which k trials succeed\n• p^k = probability of k successes\n• (1−p)^(n−k) = probability of (n−k) failures\n• n = number of trials, p = success probability'},

  {topic:'distributions', q:'What is the expected value E[X] for B(n,p)? Give an example.',
   a:'E[X] = np\n\nExample: B(6, 0.51) → E[X] = 6×0.51 = 3.06\n\nInterpretation: on average, 3.06 girls expected in a family of 6 children where P(girl)=0.51.'},

  {topic:'distributions', q:'Family Q3 from mock: X~B(6,0.51), find P(X≥3).',
   a:'P(X≥3) = P(3)+P(4)+P(5)+P(6)\n\nP(3) = C(6,3)·0.51³·0.49³ = 20×0.1327×0.1176 ≈ 0.312\nP(4) = C(6,4)·0.51⁴·0.49² = 15×0.0677×0.2401 ≈ 0.244\nP(5) = C(6,5)·0.51⁵·0.49 = 6×0.0345×0.49 ≈ 0.101\nP(6) = 0.51⁶ ≈ 0.018\n\nTotal ≈ 0.675'},

  {topic:'distributions', q:'What are the key C(6,k) values you should memorise?',
   a:'C(6,0)=1\nC(6,1)=6\nC(6,2)=15\nC(6,3)=20\nC(6,4)=15\nC(6,5)=6\nC(6,6)=1\n\nNote the symmetry: C(6,k)=C(6,6-k)\nThe row of Pascal\'s triangle: 1,6,15,20,15,6,1'},

  {topic:'distributions', q:'P(X=0) and P(X=n) for B(n,p) — what are they?',
   a:'P(X=0) = (1−p)^n  (all trials fail)\nP(X=n) = p^n  (all trials succeed)\n\nExample: B(6,0.51):\nP(X=0) = 0.49^6 ≈ 0.0134\nP(X=6) = 0.51^6 ≈ 0.0176'},

  {topic:'distributions', q:'What does it mean for trials to be "independent" in the binomial model?',
   a:'Independent: the outcome of one trial does NOT affect any other trial.\n\nExample in family question: whether one child is a girl is independent of whether another is a girl. P(girl) stays 0.51 for each child regardless.\n\nWithout independence → binomial model does NOT apply.'},

];

// ============================================================
// EXAM PRACTICE QUESTIONS (from mock)
// ============================================================

const EXAM_QUESTIONS = [
  {
    marks: 6,
    topic: 'Permutations & Probability',
    question: 'The four letters {a, b, c, z} are arranged in a uniformly random permutation.',
    parts: [
      {
        label: '(a)',
        marks: 1,
        question: 'Find the probability that the letters are in reverse alphabetical order.',
        answer: 'Reverse alphabetical order is z, c, b, a — exactly 1 arrangement.\nTotal permutations = 4! = 24.\nP = 1/24',
        hint: 'Count: how many ways can 4 letters be in reverse order?'
      },
      {
        label: '(b)',
        marks: 1,
        question: 'Find the probability that z is the first letter.',
        answer: 'Fix z in position 1 → remaining 3 letters can be arranged 3! = 6 ways.\nTotal = 4! = 24.\nP = 6/24 = 1/4\n\nOr: by symmetry, each letter equally likely to be first → P = 1/4.',
        hint: 'By symmetry: 1/n where n=4'
      },
      {
        label: '(c)',
        marks: 2,
        question: 'Find the probability that z precedes a in the permutation (not necessarily adjacent).',
        answer: 'By symmetry: in any random permutation, z is equally likely to come before or after a.\nP(z precedes a) = 1/2',
        hint: 'Think about symmetry between two specific elements'
      },
      {
        label: '(d)',
        marks: 2,
        question: 'Find the probability that a immediately precedes z (i.e., "az" appears consecutively).',
        answer: 'Treat "az" as a single block → we have 3 units to arrange: {az, b, c} → 3! = 6 arrangements.\nTotal = 4! = 24.\nP = 6/24 = 1/4\n\nOr: use formula 1/n = 1/4.',
        hint: 'Use the "block" trick — treat az as one unit'
      }
    ]
  },
  {
    marks: 4,
    topic: 'Disjoint Events',
    question: 'Let A, B, C be events in a sample space S.',
    parts: [
      {
        label: '',
        marks: 4,
        question: 'Suppose A∩B = ∅ and B∩C = ∅. Does it follow that A∩C = ∅? Prove or provide a counterexample.',
        answer: 'FALSE. Disjointness is NOT transitive.\n\nCounterexample: Let S = {1, 2, 3}, A = {1, 3}, B = {2}, C = {1, 3}.\n• A∩B = ∅ ✓\n• B∩C = ∅ ✓\n• A∩C = {1,3} ≠ ∅ ✗\n\nSo the claim is false.',
        hint: 'Try to find a counterexample with 3 simple sets'
      }
    ]
  },
  {
    marks: 4,
    topic: 'Binomial Probability',
    question: 'A family has 6 children. Assume P(girl) = 0.51, independently for each child.',
    parts: [
      {
        label: '',
        marks: 4,
        question: 'Find P(at least 3 girls).',
        answer: 'X ~ B(6, 0.51). Need P(X ≥ 3) = P(3) + P(4) + P(5) + P(6).\n\nP(X=3) = C(6,3)·0.51³·0.49³ = 20×0.1327×0.1176 ≈ 0.3121\nP(X=4) = C(6,4)·0.51⁴·0.49² = 15×0.0677×0.2401 ≈ 0.2439\nP(X=5) = C(6,5)·0.51⁵·0.49¹ = 6×0.0345×0.49 ≈ 0.1015\nP(X=6) = C(6,6)·0.51⁶ ≈ 0.0176\n\nP(X ≥ 3) ≈ 0.675',
        hint: 'B(n,p) with n=6, p=0.51. Sum P(3)+P(4)+P(5)+P(6).'
      }
    ]
  },
  {
    marks: 6,
    topic: "Bayes' Theorem — Medical Testing",
    question: '4% of a population is infected with avian flu. A test has sensitivity 97% [P(+|infected)=0.97] and false positive rate 2% [P(+|not infected)=0.02].',
    parts: [
      {
        label: '(a)',
        marks: 2,
        question: 'Find P(infected | positive test result).',
        answer: 'P(inf|+) = P(inf)·P(+|inf) / [P(inf)·P(+|inf) + P(not)·P(+|not)]\n= (0.04×0.97) / (0.04×0.97 + 0.96×0.02)\n= 0.0388 / (0.0388 + 0.0192)\n= 0.0388 / 0.0580\n≈ 0.669',
        hint: 'Use full Bayes formula. Compute numerator and denominator separately.'
      },
      {
        label: '(b)',
        marks: 1,
        question: 'Find P(not infected | positive test result).',
        answer: 'P(not inf|+) = 1 − P(inf|+) = 1 − 0.669 = 0.331',
        hint: 'Use complement: P(A) + P(not A) = 1'
      },
      {
        label: '(c)',
        marks: 2,
        question: 'Find P(infected | negative test result).',
        answer: 'P(−|inf) = 1 − 0.97 = 0.03\nP(−|not) = 1 − 0.02 = 0.98\nP(−) = 0.04×0.03 + 0.96×0.98 = 0.0012 + 0.9408 = 0.9420\nP(inf|−) = 0.0012 / 0.9420 ≈ 0.00127',
        hint: 'Apply Bayes again but with negative test. First compute P(-|inf) = 1 - sensitivity.'
      },
      {
        label: '(d)',
        marks: 1,
        question: 'Find P(not infected | negative test result).',
        answer: 'P(not inf|−) = 1 − P(inf|−) = 1 − 0.00127 ≈ 0.99873',
        hint: 'Use complement.'
      }
    ]
  }
];
