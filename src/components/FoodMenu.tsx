import React, { useState } from 'react';
import { UtensilsCrossed, Search } from 'lucide-react';

const FoodMenu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const weeklyMenu = [
    {
      id: 1,
      day: 'Sunday',
      breakfast: 'ALOO KA PARATHA',
      lunch: 'VEG BIRYANI / TEHRI + RAITA + ACHAR + SALAD',
      dinner: 'MATAR PANEER / CHOLA + PURI + RICE + SWEET + ACHAR + SALAD'
    },
    {
      id: 2,
      day: 'Monday',
      breakfast: 'FRIED+RICE+CHAI',
      lunch: 'DAL+RICE+ROTI+DRY SEASONAL SABJI',
      dinner: 'RICE+ROTI+ALOO MATAR SABJI'
    },
    {
      id: 3,
      day: 'Tuesday',
      breakfast: 'HALWA+CHANA+CHAI',
      lunch: 'DAL+RICE+ROTI+SEASONAL DRY SABJI',
      dinner: 'RICE+ROTI+RAAJMA'
    },
    {
      id: 4,
      day: 'Wednesday',
      breakfast: 'POORI+SABJI+CHAI',
      lunch: 'DAL+RICE+ROTI+SEASONAL DRY SABJI',
      dinner: 'RICE+ROTI+SOYABEAN SABJI'
    },
    {
      id: 5,
      day: 'Thursday',
      breakfast: 'SANDWITCH-2+CHAI',
      lunch: 'KADHI+RICE+ROTI',
      dinner: 'RICE+ROTI+DAL+MIXEDVEG SABJI'
    },
    {
      id: 6,
      day: 'Friday',
      breakfast: 'POHA NAMKEEN+CHAI',
      lunch: 'DAL+RICE+ROTI+SEASONAL DRY SABJI',
      dinner: 'RICE+ROTI+SAFED MATAR SABJI'
    },
    {
      id: 7,
      day: 'Saturday',
      breakfast: 'CHAWMEIN+CHAI',
      lunch: 'DAL+RICE+ROTI+SEASONAL DRY SABJI',
      dinner: 'ROTI+RICE+GRAVY KOFTA'
    }
  ];

  const filteredMenu = weeklyMenu.filter(item =>
    item.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.breakfast.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lunch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dinner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedMenu = filteredMenu.slice(0, entriesPerPage);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <UtensilsCrossed className="w-6 h-6 mr-2 text-green-600" />
          Food Menu
        </h2>

        {/* All Foods Details Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">ALL FOODS DETAILS</h3>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center">
              <label htmlFor="entries" className="text-sm text-gray-700 mr-2">Show</label>
              <select
                id="entries"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-700 ml-2">entries</span>
            </div>
            
            <div className="flex items-center">
              <label htmlFor="search" className="text-sm text-gray-700 mr-2">Search:</label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search menu..."
                  className="border border-gray-300 rounded-md pl-8 pr-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1.5" />
              </div>
            </div>
          </div>

          {/* Menu Table */}
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    (Breakfast 08 To 09 AM)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    (Lunch 12 TO 02 PM)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    (Dinner 08 TO 09 PM)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedMenu.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.day}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 max-w-xs">
                      {item.breakfast}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 max-w-xs">
                      {item.lunch}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 max-w-xs">
                      {item.dinner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-700">
            <p>
              Showing {displayedMenu.length === 0 ? 0 : 1} to {displayedMenu.length} of {filteredMenu.length} entries
              {searchTerm && ` (filtered from ${weeklyMenu.length} total entries)`}
            </p>
            
            <div className="flex space-x-1">
              <button
                className="px-3 py-1 border border-gray-300 rounded text-gray-500 bg-gray-100 cursor-not-allowed"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 border border-blue-500 bg-blue-500 text-white rounded">
                1
              </button>
              <button
                className="px-3 py-1 border border-gray-300 rounded text-gray-500 bg-gray-100 cursor-not-allowed"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Weekly Schedule Cards (Mobile Friendly) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:hidden">
          {displayedMenu.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.day}</h3>
              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="font-medium text-yellow-800 text-sm mb-1">Breakfast (8:00 - 9:00 AM)</h4>
                  <p className="text-yellow-700 text-sm">{item.breakfast}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-800 text-sm mb-1">Lunch (12:00 - 2:00 PM)</h4>
                  <p className="text-green-700 text-sm">{item.lunch}</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-medium text-orange-800 text-sm mb-1">Dinner (8:00 - 9:00 PM)</h4>
                  <p className="text-orange-700 text-sm">{item.dinner}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No menu items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodMenu;