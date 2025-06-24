import React from 'react'

export default function Problems() {
    const problems = [
        { id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array", "Hash Table"] },
        { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String", "Sliding Window"] },
        { id: 3, title: "Graph Traversal", difficulty: "Hard", tags: ["Graph", "DFS"] },
      ];
  return (
        <section id="problems" className="py-16 bg-gray-800">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Coding Problems</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {problems.map((problem) => (
                <div key={problem.id} className="problem-card bg-gray-700 p-6 rounded-lg shadow-lg glow">
                  <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                  <p className="text-gray-400 mb-2">Difficulty: {problem.difficulty}</p>
                  <p className="text-gray-400 mb-4">Tags: {problem.tags.join(", ")}</p>
                  <a href="#" className="text-orange-500 hover:underline">Solve Now</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
}
