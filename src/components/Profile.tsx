// Profile.tsx
import React, { useEffect, useState } from "react";
import { Upload, User } from "lucide-react";

const API_BASE = "https://bedd.in/backend"; // change if needed

type RawUser = { [k: string]: any };

const defaultProfile = {
  name: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  height: "",
  weight: "",
  bloodGroup: "",
  maritalStatus: "",
  fatherName: "",
  motherName: "",
  fatherOccupation: "",
  fatherMobile: "",
  guardianName: "",
  guardianMobile: "",
  currentAddress: "",
  permanentAddress: "",
  profession: "",
  instituteName: "",
  instituteAddress: "",
  startDate: "",
  endDate: "",
  preferredFloor: "",
  roomNumber: "",
  bookingSeat: "",
  monthlyFee: "",
  medicalHistory: "",
  profilePic: "",
  idCardFront: "",
  idCardBack: ""
};

const mapDbToProfile = (db: RawUser) => ({
  name: (db.name || "").toString(),
  email: db.email || "",
  phone: db.phone || db.Fmob || db.lgmob || "",
  dateOfBirth: db.dob || "",
  height: db.ht ? String(db.ht).trim() : "",
  weight: db.wt ? String(db.wt).trim() : "",
  bloodGroup: db.bloodgrp || "",
  maritalStatus: db.marital || "",
  fatherName: db.fname || "",
  motherName: db.mname || "",
  fatherOccupation: db.foccupation || "",
  fatherMobile: db.Fmob || "",
  guardianName: db.lgname || "",
  guardianMobile: db.lgmob || "",
  currentAddress: db.Caddress || db.caddress || "",
  permanentAddress: db.paddress || "",
  profession: db.profession || "",
  instituteName: db.insName || db.insname || "",
  instituteAddress: db.insAdd || db.insadd || "",
  startDate: db.dos || "",
  endDate: db.doe || "",
  preferredFloor: db.pf || "",
  roomNumber: db.rno || db.roomNumber || "",
  bookingSeat: db.bookingSeat || "",
  monthlyFee: db.monthlyFee || "",
  medicalHistory: db.medical || "",
  profilePic: db.profile_pic || db.profilePic || "",
  idCardFront: db.id_card_front || "",
  idCardBack: db.id_card_back || ""
});

const resolveFileUrl = (path?: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE}/${path.replace(/^\/+/, "")}`;
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>({ ...defaultProfile });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // function to read storage or fetch fresh
  const loadForUser = async (maybeUser?: RawUser) => {
    setLoading(true);
    const stored = maybeUser ?? (() => {
      try { return JSON.parse(localStorage.getItem("lv_current_user") || "null"); } catch { return null; }
    })();

    if (!stored) {
      setErrorMsg("No user logged in.");
      setLoading(false);
      return;
    }

    // apply stored data immediately
    setProfile((prev: any) => ({ ...prev, ...mapDbToProfile(stored) }));

    try {
      const res = await fetch(`${API_BASE}/get_user.php?id=${encodeURIComponent(stored.id)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      if (j && j.success && j.user) {
        setProfile((prev: any) => ({ ...prev, ...mapDbToProfile(j.user) }));
        // update stored user (overwrite)
        localStorage.setItem("lv_current_user", JSON.stringify(j.user));
      } else {
        // server responded but no user — keep stored
      }
    } catch (err) {
      console.warn("get_user fetch failed, using stored user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    // initial load
    void loadForUser();

    const handler = (ev: any) => {
      if (!mounted) return;
      const newUser = ev?.detail?.user;
      void loadForUser(newUser);
    };

    window.addEventListener("lv_user_changed", handler);

    return () => { mounted = false; window.removeEventListener("lv_user_changed", handler); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field: string, value: string) => {
    setProfile((p: any) => ({ ...p, [field]: value }));
  };

  if (loading) {
    return <div className="p-6"><p className="text-gray-500">Loading profile...</p></div>;
  }

  return (
    <div className="space-y-6 px-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <User className="w-6 h-6 mr-2 text-blue-600" />
          My Profile
        </h2>

        {errorMsg && <div className="text-sm text-red-600 mb-4">{errorMsg}</div>}

        {/* Personal Info */}
        <section className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Name</label>
              <input value={profile.name} onChange={(e) => handleChange("name", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input value={profile.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
              <input value={profile.phone} onChange={(e) => handleChange("phone", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Date of Birth</label>
              <input value={profile.dateOfBirth} onChange={(e) => handleChange("dateOfBirth", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Height (cm)</label>
              <input value={profile.height} onChange={(e) => handleChange("height", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Weight (kg)</label>
              <input value={profile.weight} onChange={(e) => handleChange("weight", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Blood Group</label>
              <input value={profile.bloodGroup} onChange={(e) => handleChange("bloodGroup", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Marital Status</label>
              <input value={profile.maritalStatus} onChange={(e) => handleChange("maritalStatus", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
          </div>
        </section>

        {/* Family */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Family Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Father's Name</label>
              <input value={profile.fatherName} onChange={(e) => handleChange("fatherName", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Mother's Name</label>
              <input value={profile.motherName} onChange={(e) => handleChange("motherName", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Father's Occupation</label>
              <input value={profile.fatherOccupation} onChange={(e) => handleChange("fatherOccupation", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Father's Mobile</label>
              <input value={profile.fatherMobile} onChange={(e) => handleChange("fatherMobile", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Guardian Name</label>
              <input value={profile.guardianName} onChange={(e) => handleChange("guardianName", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Guardian Mobile</label>
              <input value={profile.guardianMobile} onChange={(e) => handleChange("guardianMobile", e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
          </div>
        </section>

        {/* Address */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Current Address</label>
              <textarea value={profile.currentAddress} onChange={(e) => handleChange("currentAddress", e.target.value)} rows={3} className="w-full px-3 py-2 border rounded" placeholder="Current address (street, city, state, etc.)" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Permanent Address</label>
              <textarea value={profile.permanentAddress} onChange={(e) => handleChange("permanentAddress", e.target.value)} rows={3} className="w-full px-3 py-2 border rounded" placeholder="Permanent address" />
            </div>
          </div>
        </section>

        {/* Institute & Stay */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Institute & Stay</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Profession</label>
              <input value={profile.profession} onChange={(e) => handleChange("profession", e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Profession" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Institute Name</label>
              <input value={profile.instituteName} onChange={(e) => handleChange("instituteName", e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Institute Name" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Institute Address</label>
              <input value={profile.instituteAddress} onChange={(e) => handleChange("instituteAddress", e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Institute Address" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Start Date</label>
              <input value={profile.startDate} onChange={(e) => handleChange("startDate", e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Start Date" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">End Date</label>
              <input value={profile.endDate} onChange={(e) => handleChange("endDate", e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="End Date" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Preferred Floor</label>
              <input value={profile.preferredFloor} onChange={(e) => handleChange("preferredFloor", e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Preferred Floor" />
            </div>
          </div>
        </section>

        {/* Stay / Medical */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Stay & Medical</h3>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Medical Information (past history)</label>
            <textarea value={profile.medicalHistory} onChange={(e) => handleChange("medicalHistory", e.target.value)} rows={3} className="w-full px-3 py-2 border rounded" placeholder="Enter any medical history" />
          </div>
        </section>

        {/* Documents */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Document Uploads</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-medium mb-2">Profile Picture</h4>
              {profile.profilePic ? (
                <img src={resolveFileUrl(profile.profilePic)} alt="profile" className="w-24 h-24 rounded-full mx-auto object-cover" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto"><User className="w-8 h-8 text-gray-400" /></div>
              )}
            </div>

            <div className="text-center">
              <h4 className="font-medium mb-2">Institute ID Card (Front)</h4>
              {profile.idCardFront ? <a className="text-blue-600 underline" href={resolveFileUrl(profile.idCardFront)} target="_blank" rel="noreferrer">View</a> : <p className="text-sm text-gray-500">No file</p>}
            </div>

            <div className="text-center">
              <h4 className="font-medium mb-2">Valid ID Proof (Back)</h4>
              {profile.idCardBack ? <a className="text-blue-600 underline" href={resolveFileUrl(profile.idCardBack)} target="_blank" rel="noreferrer">View</a> : <p className="text-sm text-gray-500">No file</p>}
            </div>
          </div>
        </section>

        <div className="flex justify-end mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
