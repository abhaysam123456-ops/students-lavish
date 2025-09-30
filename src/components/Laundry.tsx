import React, { useState } from 'react';
import { Shirt, Upload, Search } from 'lucide-react';

const Laundry: React.FC = () => {
  const [laundryForm, setLaundryForm] = useState({
    name: '',
    phone: '',
    clothDetails: '',
    roomNumber: '',
    date: ''
  });

  const [clothImage, setClothImage] = useState<File | null>(null);
  const [searchPhone, setSearchPhone] = useState('');
  const [showRequests, setShowRequests] = useState(false);

  // Mock laundry requests data
  const laundryRequests = [
    {
      id: 1,
      date: '2024-01-12',
      name: 'Abhay Pratap Singh',
      phone: '+91 96517 14843',
      roomNumber: 'LV216',
      clothDetails: '2 shirts, 1 jeans, 3 t-shirts',
      status: 'In Progress',
      submittedDate: '2024-01-12',
      expectedReturn: '2024-01-14'
    },
    {
      id: 2,
      date: '2024-01-08',
      name: 'Abhay Pratap Singh',
      phone: '+91 96517 14843',
      roomNumber: 'LV216',
      clothDetails: '5 t-shirts, 2 jeans, 1 jacket',
      status: 'Completed',
      submittedDate: '2024-01-08',
      returnedDate: '2024-01-10'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setLaundryForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setClothImage(e.target.files[0]);
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Laundry request submitted successfully!');
    setLaundryForm({
      name: '',
      phone: '',
      clothDetails: '',
      roomNumber: '',
      date: ''
    });
    setClothImage(null);
  };

  const handleViewRequests = () => {
    if (searchPhone.trim()) {
      setShowRequests(true);
    } else {
      alert('Please enter your phone number');
    }
  };

  const filteredRequests = laundryRequests.filter(
    request => request.phone.includes(searchPhone)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Shirt className="w-6 h-6 mr-2 text-purple-600" />
          Laundry Management
        </h2>

        {/* Submit Laundry Request */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="bg-gray-200 px-4 py-2 rounded-t-lg -mx-4 -mt-4 mb-4">
            <h3 className="font-semibold text-gray-700">SUBMIT LAUNDRY REQUEST</h3>
          </div>

          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={laundryForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={laundryForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cloth Details</label>
                <textarea
                  value={laundryForm.clothDetails}
                  onChange={(e) => handleInputChange('clothDetails', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="List all clothing items (e.g., 2 shirts, 1 jeans, 3 t-shirts)"
                  required
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                  <input
                    type="text"
                    value={laundryForm.roomNumber}
                    onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your room number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image of Clothes</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-2 pb-3">
                        <Upload className="w-6 h-6 mb-1 text-gray-400" />
                        <p className="text-xs text-gray-500">Choose File</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                  {clothImage && (
                    <p className="mt-1 text-sm text-green-600">
                      Selected: {clothImage.name}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Supported formats: JPG, JPEG, PNG (Max size: 10MB)
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={laundryForm.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Laundry Request
            </button>
          </form>
        </div>

        {/* View My Laundry Requests */}
        <div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="bg-gray-200 px-4 py-2 rounded-t-lg -mx-4 -mt-4 mb-4">
              <h3 className="font-semibold text-gray-700">VIEW MY LAUNDRY REQUESTS</h3>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
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
                  onClick={handleViewRequests}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                >
                  View My Requests
                </button>
              </div>

              {!showRequests && (
                <div className="bg-cyan-100 border-l-4 border-cyan-500 p-4">
                  <p className="text-cyan-700">Enter your phone number above to view your laundry requests.</p>
                </div>
              )}

              {showRequests && (
                <div className="mt-6">
                  {filteredRequests.length > 0 ? (
                    <div className="space-y-4">
                      {filteredRequests.map((request) => (
                        <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                            <h5 className="font-semibold text-gray-900">Request #{request.id}</h5>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              request.status === 'Completed' 
                                ? 'bg-green-100 text-green-800' 
                                : request.status === 'In Progress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {request.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-3">
                            <div>
                              <span className="font-medium text-gray-700">Submitted:</span> {request.submittedDate}
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Room:</span> {request.roomNumber}
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Name:</span> {request.name}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm"><span className="font-medium text-gray-700">Cloth Details:</span></p>
                            <p className="text-gray-600 mt-1">{request.clothDetails}</p>
                          </div>
                          
                          {request.status === 'In Progress' && request.expectedReturn && (
                            <div className="bg-yellow-50 p-3 rounded">
                              <p className="text-sm text-yellow-700">
                                <span className="font-medium">Expected Return:</span> {request.expectedReturn}
                              </p>
                            </div>
                          )}
                          
                          {request.status === 'Completed' && request.returnedDate && (
                            <div className="bg-green-50 p-3 rounded">
                              <p className="text-sm text-green-700">
                                <span className="font-medium">Returned On:</span> {request.returnedDate}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No laundry requests found for this phone number.</p>
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

export default Laundry;