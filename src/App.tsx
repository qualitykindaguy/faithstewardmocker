import React from 'react';
import { Search, Store, ChevronRight } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-amber-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-amber-900">
            <Store className="inline-block mr-2 text-amber-700" />
            FaithStewards
          </h1>
          <button className="px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors duration-200 flex items-center gap-1">
            Add a Listing
            <ChevronRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Connect with Christian-Owned Businesses
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Supporting fellow believers in their entrepreneurial journey. Find and connect with Christian businesses in your community, all in one place.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for Christian businesses..."
              className="w-full px-12 py-4 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Featured Categories */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
            {['Local Services', 'Professional Services', 'Retail & Shopping'].map((category) => (
              <div key={category} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
                <p className="text-gray-600 mt-2">Discover trusted businesses</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 bg-amber-50 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>"And whatever you do, work heartily, as for the Lord and not for men" - Colossians 3:23</p>
        </div>
      </footer>
    </div>
  );
}

export default App;