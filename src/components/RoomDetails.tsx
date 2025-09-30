import React, { useState } from 'react';
import { Building, CreditCard, Upload, QrCode } from 'lucide-react';

const RoomDetails: React.FC = () => {
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [comments, setComments] = useState('');

  const roomData = {
    roomNumber: "LV216",
    acStatus: "AC",
    bookingSeat: "1",
    monthlyFee: "14000"
  };

  const paymentReceipts = [
    { id: 1, date: "2024-12-15", amount: "₹14,000", status: "Verified" },
    { id: 2, date: "2024-11-15", amount: "₹14,000", status: "Verified" },
    { id: 3, date: "2024-10-15", amount: "₹14,000", status: "Verified" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleSubmitReceipt = () => {
    if (receiptFile) {
      alert('Transaction proof submitted successfully!');
      setReceiptFile(null);
      setComments('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Building className="w-6 h-6 mr-2 text-blue-600" />
          Room Details
        </h2>

        {/* Room Booking Information */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Booking Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">Room No.</label>
              <p className="text-lg font-bold text-blue-600">{roomData.roomNumber}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">AC Status</label>
              <p className="text-lg font-bold text-green-600">{roomData.acStatus}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">Booking Seat</label>
              <p className="text-lg font-bold text-gray-900">{roomData.bookingSeat}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Fee Per Person</label>
              <p className="text-lg font-bold text-red-600">₹{roomData.monthlyFee}</p>
            </div>
          </div>
        </div>

        {/* Transaction Receipts */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Receipts</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Comments</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentReceipts.length > 0 ? (
                  paymentReceipts.map((receipt) => (
                    <tr key={receipt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Receipt #{receipt.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {receipt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Payment verified</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No receipt uploads found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Barcode */}
        <div className="text-center mb-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Barcode</h3>
          <p className="text-sm text-gray-600 mb-4">Scan this barcode to make payment for your room/Rent</p>
          
          <div className="inline-block bg-white p-4 rounded-lg shadow-sm">
            <div className="text-blue-600 font-bold text-sm mb-2">bedd</div>
            <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-4">
              {/* QR Code Placeholder - In real app, this would be generated */}
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500">UPI ID: payment-bedd-17@paytm-qrck</p>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">Scan to pay with any UPI app</p>
        </div>

        {/* Upload Transaction Proof */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-blue-600" />
            Upload Transaction Proof
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Please upload a screenshot or image of your payment receipt as proof of transaction
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Receipt Image</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">JPG, PNG or PDF (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              {receiptFile && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {receiptFile.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments (Optional)</label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional information about your payment..."
              />
            </div>

            <button
              onClick={handleSubmitReceipt}
              disabled={!receiptFile}
              className={`w-full md:w-auto px-6 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                receiptFile
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Transaction Proof
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;