// Complaint.tsx
import React, { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

const API_BASE = "https://bedd.in/backend";

const Complaint: React.FC = () => {
  const [complaintForm, setComplaintForm] = useState({
    date: "",
    complaint: "",
    name: "",
    phone: "",
    roomNumber: ""
  });

  const [complaints, setComplaints] = useState<any[]>([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [showComplaints, setShowComplaints] = useState(false);
  const [loadingComplaints, setLoadingComplaints] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Prefill form with logged in user
  useEffect(() => {
    const raw = localStorage.getItem("lv_current_user");
    if (raw) {
      try {
        const u = JSON.parse(raw);
        setComplaintForm(prev => ({
          ...prev,
          name: u.name || "",
          phone: u.phone || "",
          roomNumber: (u.rno || u.roomNumber || "") as string
        }));

        if (u.phone) {
          setSearchPhone(u.phone);
          void handleViewComplaints(u.phone);
        }
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setComplaintForm(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setComplaintForm({
      date: "",
      complaint: "",
      name: "",
      phone: "",
      roomNumber: ""
    });
  };

  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!complaintForm.complaint.trim() || !complaintForm.phone.trim() || !complaintForm.name.trim() || !complaintForm.roomNumber.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("date", complaintForm.date || new Date().toISOString().slice(0, 10));
      formData.append("complaint", complaintForm.complaint);
      formData.append("name", complaintForm.name);
      formData.append("phone", complaintForm.phone);
      formData.append("room_no", complaintForm.roomNumber);

      const res = await fetch(`${API_BASE}/submit_complaint.php`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        alert("Complaint submitted successfully!");
        clearForm();
        // refresh complaints for phone used
        void handleViewComplaints(complaintForm.phone);
      } else {
        alert(data.error || "Failed to submit complaint");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while submitting complaint");
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewComplaints = async (phoneParam?: string) => {
    const phone = (phoneParam || searchPhone || "").trim();
    if (!phone) {
      alert("Please enter your phone number");
      return;
    }

    setLoadingComplaints(true);
    try {
      const res = await fetch(`${API_BASE}/get_complaints.php?phone=${encodeURIComponent(phone)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data && data.success) {
        setComplaints(data.complaints ?? []);
        setShowComplaints(true);
      } else {
        setComplaints([]);
        setShowComplaints(true);
      }
    } catch (err) {
      console.error("Error fetching complaints", err);
      setComplaints([]);
      setShowComplaints(true);
    } finally {
      setLoadingComplaints(false);
    }
  };

  return (
    <div className="space-y-6 px-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Complaint</h2>
        </div>

        {/* blue header */}
        <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg -mx-6 mb-4">
          <h3 className="font-semibold">FILL ALL INFO</h3>
        </div>

        {/* white card form */}
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm mb-6">
          <h4 className="text-green-600 font-semibold mb-4">Complaint Info</h4>

          <form onSubmit={handleSubmitComplaint} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={complaintForm.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="dd-mm-yyyy"
                required
              />
              <input
                type="tel"
                value={complaintForm.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <textarea
              value={complaintForm.complaint}
              onChange={(e) => handleInputChange("complaint", e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md"
              rows={5}
              placeholder="Describe your complaint in detail..."
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={complaintForm.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your full name"
                required
              />
              <input
                type="text"
                value={complaintForm.roomNumber}
                onChange={(e) => handleInputChange("roomNumber", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your room number"
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={clearForm}
                className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>

        {/* My Complaints heading */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900">My Complaints</h3>
        </div>

        {/* View complaints controls */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="bg-gray-200 px-4 py-2 rounded-t-lg -mx-4 -mt-4 mb-4">
            <h4 className="font-medium text-gray-700">VIEW COMPLAINTS BY PHONE NUMBER</h4>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="tel"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter Phone Number"
            />
            <button
              onClick={() => void handleViewComplaints()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={loadingComplaints}
            >
              {loadingComplaints ? "Loading..." : "View My Complaints"}
            </button>
          </div>
        </div>

        {/* Complaints list */}
        <div>
          {showComplaints ? (
            complaints.length > 0 ? (
              <div className="space-y-4">
                {complaints.map((c: any) => (
                  <div key={c.complaint_id ?? c.id ?? JSON.stringify(c)} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-semibold text-gray-900">Complaint #{c.complaint_id ?? c.id}</h5>
                        <p className="text-sm text-gray-500 mt-1">Date: {c.Date ?? c.date}</p>
                        <p className="text-sm text-gray-500">Room: {c.room_no}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                            (c.status ?? "").toLowerCase() === "resolved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {c.status ?? "In Progress"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm text-gray-700">{c.mill ?? c.complaint}</p>
                    </div>

                    {c.signature && (
                      <div className="mt-3 text-sm text-gray-500">Signature: {c.signature}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-cyan-100 border-l-4 border-cyan-500 p-4 rounded">
                <p className="text-cyan-700">No complaints found for this phone number.</p>
              </div>
            )
          ) : (
            <div className="text-gray-500">Enter your phone number above and click "View My Complaints" to see existing tickets.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Complaint;
