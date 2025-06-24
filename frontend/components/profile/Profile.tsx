import React from 'react'

export default function profile() {
    return (
        <section id="profile" className="py-16 bg-gray-800">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">User Profile</h2>
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg glow max-w-md mx-auto">
              <h3 className="text-2xl font-semibold mb-4">Your Coding Journey</h3>
              <p className="text-gray-300 mb-4">Track your progress, view solved problems, and showcase your achievements.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg glow">
                View Profile
              </button>
            </div>
          </div>
        </section>
      );
}
