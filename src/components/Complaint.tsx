import React, { useState } from 'react';
import { MessageSquare, Search, Calendar } from 'lucide-react';

const Complaint: React.FC = () => {
  const [complaintForm, setComplaintForm] = useState({
    date: '',
    complaint: '',
    name: '',
    phone: '',
    roomNumber: ''
  });

  const [searchPhone, setSearchPhone] = useState('');
  const [showComplaints, setShowComplaints] = useState(false);

  // Mock complaints data
  const complaints = [
    {
      id: 1,
      date: '2024-01-10',
      complaint: 'AC not working in room',
      name: 'Abhay Pratap Singh',
      phone: '+91 96517 14843',
      roomNumber: 'LV216',
      status: 'In Progress',
      response: 'Maintenance team assigned'
    },
    {
      id: 2,
      date: '2024-01-08',
      complaint: 'WiFi connection issues',
      name: 'Abhay Pratap Singh',
      phone: '+91 96517 14843',
      roomNumber: 'LV216',
      status: 'Resolved',
      response: 'Router replaced, issue fixed'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setComplaintForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Complaint submitted successfully!');
    setComplaintForm({
      date: '',
      complaint: '',
      name: '',
      phone: '',
      roomNumber: ''
    });
  };

  const handleViewComplaints = () => {
    if (searchPhone.trim()) {
      setShowComplaints(true);
    } else {
      alert('Please enter your phone number');
    }
  };

  const filteredComplaints = complaints.filter(
    complaint => complaint.phone.includes(searchPhone)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
          Complaint
        </h2>

        {/* Fill All Info Section */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg -mx-4 -mt-4 mb-4">
            <h3 className="font-semibold">FILL ALL INFO</h3>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="text-green-600 font-semibold mb-4">Complaint Info</h4>
            
            <form onSubmit={handleSubmitComplaint} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={complaintForm.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={complaintForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complaint</label>
                <textarea
                  value={complaintForm.complaint}
                  onChange={(e) => handleInputChange('complaint', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your complaint in detail..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={complaintForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                  <input
                    type="text"
                    value={complaintForm.roomNumber}
                    onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your room number"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={() => setComplaintForm({
                    date: '',
                    complaint: '',
                    name: '',
                    phone: '',
                    roomNumber: ''
                  })}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* My Complaints Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Complaints</h3>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="bg-gray-200 px-4 py-2 rounded-t-lg -mx-4 -mt-4 mb-4">
              <h4 className="font-medium text-gray-700">VIEW COMPLAINTS BY PHONE NUMBER</h4>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="tel"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <button
                  onClick={handleViewComplaints}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                >
                  View My Complaints
                </button>
              </div>

              {showComplaints && (
                <div className="mt-6">
                  {filteredComplaints.length > 0 ? (
                    <div className="space-y-4">
                      {filteredComplaints.map((complaint) => (
                        <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                            <h5 className="font-semibold text-gray-900">Complaint #{complaint.id}</h5>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              complaint.status === 'Resolved' 
                                ? 'bg-green-100 text-green-800' 
                                : complaint.status === 'In Progress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {complaint.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Date:</span> {complaint.date}
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Room:</span> {complaint.roomNumber}
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-sm"><span className="font-medium text-gray-700">Complaint:</span></p>
                            <p className="text-gray-600 mt-1">{complaint.complaint}</p>
                          </div>
                          
                          {complaint.response && (
                            <div className="mt-3 bg-blue-50 p-3 rounded">
                              <p className="text-sm"><span className="font-medium text-blue-700">Admin Response:</span></p>
                              <p className="text-blue-600 mt-1">{complaint.response}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-cyan-100 border-l-4 border-cyan-500 p-4">
                      <p className="text-cyan-700">Enter your phone number above to view your laundry requests.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaint;