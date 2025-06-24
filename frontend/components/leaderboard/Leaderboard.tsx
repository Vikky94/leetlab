import React from 'react'

export default function leaderboard() {
  const leaderboard = [
        { rank: 1, username: "coder123", points: 1500 },
        { rank: 2, username: "algoMaster", points: 1400 },
        { rank: 3, username: "codeNinja", points: 1300 },
      ];

      return (
        <section id="leaderboard" className="py-16 bg-gray-900">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Leaderboard</h2>
            <div className="bg-gray-700 rounded-lg shadow-lg glow overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="p-4">Rank</th>
                    <th className="p-4">Username</th>
                    <th className="p-4">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user) => (
                    <tr key={user.rank} className="border-t border-gray-600">
                      <td className="p-4">{user.rank}</td>
                      <td className="p-4">{user.username}</td>
                      <td className="p-4">{user.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );
}
