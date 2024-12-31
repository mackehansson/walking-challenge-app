import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footprints } from 'lucide-react';
import Home from './pages/Home';
import CreateChallenge from './pages/CreateChallenge';
import Challenge from './pages/Challenge';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center space-x-2">
                <Footprints className="h-8 w-8 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900">WalkChallenge</span>
              </a>
              <a
                href="/create"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Create Challenge
              </a>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateChallenge />} />
            <Route path="/challenge/:id" element={<Challenge />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;