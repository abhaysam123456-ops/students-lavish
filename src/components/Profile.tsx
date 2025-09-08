import React, { useState } from 'react';
import { Upload, User, Phone, Mail, Calendar } from 'lucide-react';

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState({
    // Personal Information
    name: "Abhay Pratap Singh Chauhan",
    email: "abhaysam123@gmail.com",
    phone: "+91 96517 14843",
    dateOfBirth: "14/10/2004",
    height: "173",
    weight: "68",
    bloodGroup: "B+",
    maritalStatus: "Unmarried",
    
    // Family Information
    fatherName: "Kamal Singh Chauhan",
    motherName: "Vineeta Singh Chauhan",
    fatherOccupation: "Business",
    fatherMobile: "+91 88870094680",
    guardianName: "Ram Singh",
    guardianMobile: "9001714683",
    
    // Address Information
    currentAddress: "Ramadevi Kanpur",
    permanentAddress: "Ramadevi Kanpur",
    
    // Institute Information
    profession: "Other",
    instituteName: "Apex Institute",
    instituteAddress: "Rooma Kanpur",
    
    // Stay Information
    startDate: "30/07/25",
    endDate: "30/08/25",
    preferredFloor: "3",
    
    // Medical Information
    medicalHistory: "No",
    
    // Room Information
    roomNumber: "LV216",
    bookingSeat: "1",
    monthlyFee: "14000"
  });

  const [uploads, setUploads] = useState({
    profilePicture: null,
    instituteIdCard: "uploaded", // Mock uploaded state
    validIdProof: "uploaded"
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (type: string, file: File | null) => {
    setUploads(prev => ({
      ...prev,
      [type]: file ? "uploaded" : null
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <User className="w-6 h-6 mr-2 text-blue-600" />
          My Profile
        </h2>

        <div className="space-y-8">
          {/* Personal Information */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="text"
                  value={profileData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={profileData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={profileData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select
                  value={profileData.bloodGroup}
                  onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                <select
                  value={profileData.maritalStatus}
                  onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Unmarried">Unmarried</option>
                  <option value="Married">Married</option>
                </select>
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Family Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                <input
                  type="text"
                  value={profileData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                <input
                  type="text"
                  value={profileData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Occupation</label>
                <input
                  type="text"
                  value={profileData.fatherOccupation}
                  onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Mobile</label>
                <input
                  type="tel"
                  value={profileData.fatherMobile}
                  onChange={(e) => handleInputChange('fatherMobile', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name</label>
                <input
                  type="text"
                  value={profileData.guardianName}
                  onChange={(e) => handleInputChange('guardianName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Mobile</label>
                <input
                  type="tel"
                  value={profileData.guardianMobile}
                  onChange={(e) => handleInputChange('guardianMobile', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Address</label>
                <textarea
                  value={profileData.currentAddress}
                  onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
                <textarea
                  value={profileData.permanentAddress}
                  onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Institute Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Institute Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                <input
                  type="text"
                  value={profileData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name</label>
                <input
                  type="text"
                  value={profileData.instituteName}
                  onChange={(e) => handleInputChange('instituteName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institute Address</label>
                <input
                  type="text"
                  value={profileData.instituteAddress}
                  onChange={(e) => handleInputChange('instituteAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Stay Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="text"
                  value={profileData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="text"
                  value={profileData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Floor</label>
                <input
                  type="number"
                  value={profileData.preferredFloor}
                  onChange={(e) => handleInputChange('preferredFloor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Past Medical History</label>
              <textarea
                value={profileData.medicalHistory}
                onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any past medical history or conditions..."
              />
            </div>
          </div>

          {/* Document Uploads */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Uploads</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Picture */}
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-2">Profile Picture</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">No profile picture uploaded</p>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload('profilePicture', e.target.files?.[0] || null)}
                    />
                    <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </span>
                  </label>
                </div>
              </div>

              {/* Institute ID Card */}
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-2">Institute ID Card</h4>
                <div className="border-2 border-gray-300 rounded-lg p-6">
                  <div className="w-16 h-10 mx-auto mb-3 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">ID</span>
                  </div>
                  {uploads.instituteIdCard ? (
                    <>
                      <p className="text-sm text-green-600 mb-2">✓ Identity card front already uploaded</p>
                      <p className="text-xs text-red-500">ID card cannot be changed once uploaded.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500 mb-2">No ID card uploaded</p>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload('instituteIdCard', e.target.files?.[0] || null)}
                        />
                        <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </span>
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Valid ID Proof */}
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-2">Valid ID Proof</h4>
                <div className="border-2 border-gray-300 rounded-lg p-6">
                  <div className="w-16 h-10 mx-auto mb-3 bg-green-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-green-600">ID</span>
                  </div>
                  {uploads.validIdProof ? (
                    <>
                      <p className="text-sm text-green-600 mb-2">✓ Identity card back already uploaded</p>
                      <p className="text-xs text-red-500">ID card cannot be changed once uploaded.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500 mb-2">No ID proof uploaded</p>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => handleFileUpload('validIdProof', e.target.files?.[0] || null)}
                        />
                        <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </span>
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;