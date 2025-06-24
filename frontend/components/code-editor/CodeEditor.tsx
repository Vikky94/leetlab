import React from 'react'

function CodeEditor() {
   return (
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Code Editor</h2>
            <div className="code-editor p-6 rounded-lg shadow-lg glow">
              <div className="bg-gray-800 p-4 rounded-t-lg">
                <div className="flex space-x-2 mb-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <pre className="text-gray-200">
                  <code>
                    def two_sum(nums, target):
                        seen = {}
                        for i, num in enumerate(nums):
                            complement = target - num
                            if complement in seen:
                                return [seen[complement], i]
                            seen[num] = i
                        return []
                  </code>
                </pre>
              </div>
              <div className="flex justify-end space-x-4 p-4 bg-gray-700 rounded-b-lg">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Run Code</button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Submit</button>
              </div>
            </div>
          </div>
        </section>
      );
}

export default CodeEditor