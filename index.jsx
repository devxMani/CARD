import React, { useState } from 'react';
import { User, Github, Twitter, Linkedin, Globe } from 'lucide-react';

const LeetCodeStatsCard = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    // Mock data for demonstration
    setUserData({
      name: 'John Doe',
      username: username,
      school: 'Example University',
      languages: ['Python', 'JavaScript', 'Java'],
      problemsSolved: { hard: 50, medium: 150, easy: 200 },
      ranking: 10000,
      reputation: 1500,
      acceptanceRate: '65.5%',
      skillStats: { advanced: 20, intermediate: 50, fundamental: 30 },
      badges: ['anniversary', 'contest', 'company'],
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-yellow-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Leet-<span className="text-orange-500">ए</span>-lytics</h1>
        <div className="bg-yellow-200 px-4 py-2 rounded-full text-gray-800">Tanmay Pant</div>
      </header>
      
      <div className="mb-8">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username please"
          className="border-2 border-gray-300 p-2 mr-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button onClick={fetchUserData} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">
          Submit
        </button>
      </div>

      {userData && (
        <div className="bg-white border rounded-lg p-6 shadow-lg">
          <div className="flex justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{userData.name} - {userData.username}</h2>
              <p className="text-gray-600">{userData.school}</p>
            </div>
            <div className="text-xl font-semibold text-orange-500">Leet-ए-lytics</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Language Stats</h3>
              <ul className="space-y-1">
                {userData.languages.map((lang, index) => (
                  <li key={index} className="bg-gray-100 px-3 py-1 rounded-full inline-block mr-2 mb-2">{lang}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Problems Solved</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-red-100 p-2 rounded">
                  <p className="font-semibold">Hard</p>
                  <p>{userData.problemsSolved.hard}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded">
                  <p className="font-semibold">Medium</p>
                  <p>{userData.problemsSolved.medium}</p>
                </div>
                <div className="bg-green-100 p-2 rounded">
                  <p className="font-semibold">Easy</p>
                  <p>{userData.problemsSolved.easy}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-3 rounded">
              <h3 className="font-bold">Ranking</h3>
              <p>{userData.ranking}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <h3 className="font-bold">Reputation</h3>
              <p>{userData.reputation}</p>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <h3 className="font-bold">Acceptance Rate</h3>
              <p>{userData.acceptanceRate}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <h3 className="font-bold">Skill Stats</h3>
              <p>Advanced: {userData.skillStats.advanced}</p>
              <p>Intermediate: {userData.skillStats.intermediate}</p>
              <p>Fundamental: {userData.skillStats.fundamental}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2">Social Links</h3>
            <div className="flex space-x-4">
              <Github className="text-gray-700 hover:text-black cursor-pointer" />
              <Twitter className="text-gray-700 hover:text-blue-400 cursor-pointer" />
              <Linkedin className="text-gray-700 hover:text-blue-700 cursor-pointer" />
              <Globe className="text-gray-700 hover:text-green-500 cursor-pointer" />
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2">Badges</h3>
            <div className="flex space-x-2">
              {userData.badges.map((badge, index) => (
                <div key={index} className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs font-semibold">
                  {badge.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center text-gray-600">
        Users: 1090
      </div>
    </div>
  );
};

export default LeetCodeStatsCard;