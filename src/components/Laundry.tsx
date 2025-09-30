import React, { useState } from "react";
import { Shirt, Upload, Search } from "lucide-react";

const API_BASE = "https://bedd.in/backend";

interface LaundryRow {
  id: number;
  name: string;
  room_no: string;
  given_cloth: string;
  taken_cloth: string;
  phone: string;
  signature: string | null;
  status: string;
  cloth_image: string | null;
  date: string;
}

const Laundry: React.FC = () => {
  const [laundryForm, setLaundryForm] = useState({
    name: "",
    phone: "",
    given_cloth: "",
    room_no: "",
    date: "",
  });

  const [clothImage, setClothImage] = useState<File | null>(null);
  const [searchPhone, setSearchPhone] = useState("");
  const [requests, setRequests] = useState<LaundryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setLaundryForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setClothImage(e.target.files[0]);
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(laundryForm).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (clothImage) {
        formData.append("cloth_image", clothImage);
      }

      const res = await fetch(`${API_BASE}/submit_laundry.php`, {
        method: "POST",
        body: formData,
      });

      const j = await res.json();
      if (j.success) {
        alert("Laundry request submitted successfully!");
        setLaundryForm({
          name: "",
          phone: "",
          given_cloth: "",
          room_no: "",
          date: "",
        });
        setClothImage(null);
      } else {
        alert(j.error || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting request");
    }
  };

  const fetchRequests = async () => {
    if (!searchPhone.trim()) {
      alert("Please enter your phone number");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_BASE}/get_laundry.php?phone=${encodeURIComponent(searchPhone)}`
      );
      const j = await res.json();
      if (j.success) {
        const rows: LaundryRow[] = (j.requests || []).map((r: any) => ({
          id: Number(r.id),
          name: r.name,
          room_no: r.room_no,
          given_cloth: r.given_cloth,
          taken_cloth: r.taken_cloth,
          phone: r.phone,
          signature: r.signature,
          status: r.status,
          cloth_image: r.cloth_image,
          date: r.date,
        }));
        setRequests(rows);
      } else {
        setRequests([]);
        setError(j.error || "No requests found");
      }
    } catch (err: any) {
      setError(err.message || "Network error");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

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
            <h3 className="font-semibold text-gray-700">
              SUBMIT LAUNDRY REQUEST
            </h3>
          </div>

          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={laundryForm.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={laundryForm.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clothes Given
                </label>
                <input
                  type="number"
                  value={laundryForm.given_cloth}
                  onChange={(e) =>
                    handleInputChange("given_cloth", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Number of clothes given"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Number
                </label>
                <input
                  type="text"
                  value={laundryForm.room_no}
                  onChange={(e) =>
                    handleInputChange("room_no", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your room number"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image of Clothes
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500"
                />
                {clothImage && (
                  <p className="mt-1 text-sm text-green-600">
                    Selected: {clothImage.name}
                  </p>
                )}
              </div>

              <div className="md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={laundryForm.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Submit Laundry Request
            </button>
          </form>
        </div>

        {/* View My Laundry Requests */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="bg-gray-200 px-4 py-2 rounded-t-lg -mx-4 -mt-4 mb-4">
            <h3 className="font-semibold text-gray-700">
              VIEW MY LAUNDRY REQUESTS
            </h3>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1">
                <input
                  type="tel"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter Phone Number"
                />
              </div>
              <button
                onClick={fetchRequests}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                View My Requests
              </button>
            </div>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">
                        Request #{req.id}
                      </h5>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          req.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Date:</span> {req.date}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Name:</span> {req.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Room:</span> {req.room_no}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span> {req.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Given Clothes:</span>{" "}
                      {req.given_cloth}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Taken Clothes:</span>{" "}
                      {req.taken_cloth}
                    </p>
                    {req.cloth_image && (
                      <img
                        src={`${API_BASE}/${req.cloth_image}`}
                        alt="Laundry"
                        className="mt-2 w-32 rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              !loading &&
              !error && (
                <p className="text-gray-500">
                  Enter your phone number and click View My Requests.
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laundry;
