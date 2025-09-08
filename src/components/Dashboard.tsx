import React from 'react';
import { Bell, CreditCard, UtensilsCrossed, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const studentData = {
    name: "Abhay Pratap Singh Chauhan",
    roomNumber: "LV216",
    rentDue: "₹14,000",
    dueDate: "15th Jan 2025"
  };

  const todayMenu = {
    breakfast: "ALOO KA PARATHA",
    lunch: "VEG BIRYANI / TEHRI + RAITA + ACHAR + SALAD",
    dinner: "MATAR PANEER / CHOLA + PURI + RICE + SWEET + ACHAR + SALAD"
  };

  const notifications = [
    { id: 1, type: 'payment', message: 'Rent payment due on 15th Jan', time: '2 hours ago' },
    { id: 2, type: 'food', message: 'Today\'s special: Matar Paneer', time: '4 hours ago' },
    { id: 3, type: 'laundry', message: 'Laundry request completed', time: '1 day ago' },
    { id: 4, type: 'maintenance', message: 'AC maintenance scheduled for tomorrow', time: '2 days ago' },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-5 h-5 text-red-500" />;
      case 'food':
        return <UtensilsCrossed className="w-5 h-5 text-green-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {studentData.name}!
        </h1>
        <p className="text-gray-600">Here's what's happening in your hostel today.</p>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Room Details</h3>
          <p className="text-2xl font-bold text-blue-600">{studentData.roomNumber}</p>
          <p className="text-sm text-gray-600">AC Room</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Rent Due</h3>
          <p className="text-2xl font-bold text-red-600">{studentData.rentDue}</p>
          <p className="text-sm text-gray-600">Due: {studentData.dueDate}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Status</h3>
          <p className="text-2xl font-bold text-green-600">Pending</p>
          <p className="text-sm text-gray-600">Pay now to avoid late fees</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Menu */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <UtensilsCrossed className="w-5 h-5 mr-2 text-green-600" />
            Today's Menu
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Breakfast (8:00 - 9:00 AM)</p>
                <p className="text-sm text-gray-600">{todayMenu.breakfast}</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Lunch (12:00 - 2:00 PM)</p>
                <p className="text-sm text-gray-600">{todayMenu.lunch}</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Dinner (8:00 - 9:00 PM)</p>
                <p className="text-sm text-gray-600">{todayMenu.dinner}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-600" />
            Recent Notifications
          </h3>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all notifications →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;