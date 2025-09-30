import React, { useEffect, useState } from "react";
import { Bed, IndianRupee, Info } from "lucide-react";

const API_BASE = "https://bedd.in/backend";

interface RoomRow { id?: number; seater?: number; room_no?: string; fees?: string | number; posting_date?: string; AC?: string; }
interface BookingRow { id?: number; user_email?: string; room_no?: string; receipt?: string | null; receipt_status?: string | null; upload_date?: string | null; seats_booked?: number; phone?: string; }

const RoomDetails: React.FC = () => {
  const [room, setRoom] = useState<RoomRow | null>(null);
  const [booking, setBooking] = useState<BookingRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignedRoom = async () => {
      setLoading(true);
      setError(null);

      try {
        const raw = localStorage.getItem("lv_current_user");
        if (!raw) {
          setError("No user logged in");
          setLoading(false);
          return;
        }

        const stored = JSON.parse(raw);
        if (!stored?.id && !stored?.email) {
          setError("Stored user missing id/email");
          setLoading(false);
          return;
        }

        // prefer id, fallback to email
        const param = stored.id ? `id=${encodeURIComponent(stored.id)}` : `email=${encodeURIComponent(stored.email)}`;
        const res = await fetch(`${API_BASE}/get_user_room.php?${param}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store"
        });

        const data = await res.json();

        if (!data || !data.success) {
          // server said false or network failed
          const msg = data?.error || "Could not fetch assigned room";
          setError(msg);
          // still attempt to use stored info
          setRoom(null);
          setBooking(null);
          setLoading(false);
          return;
        }

        // update UI
        setBooking(data.booking ?? null);
        setRoom(data.room ?? null);

        // update local copy of user if server gave a fresh record
        if (data.user) {
          localStorage.setItem("lv_current_user", JSON.stringify(data.user));
        }
      } catch (err: any) {
        console.error("Room fetch error:", err);
        setError(err?.message || "Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedRoom();
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading room details...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  if (!room) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">My Room Details</h2>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-700">No room assigned.</p>
          {booking && <p className="text-sm text-gray-500 mt-2">Booking found: {booking.room_no} (status: {booking.receipt_status || 'N/A'})</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <Bed className="w-6 h-6 mr-2 text-blue-600" />
        My Room Details
      </h2>

      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
          <Bed className="w-5 h-5 mr-2 text-blue-600" />
          Room {room.room_no}
        </h3>

        <p className="text-sm text-gray-700 flex items-center mb-1">
          <IndianRupee className="w-4 h-4 mr-1 text-green-600" />
          Fees: ₹{room.fees}
        </p>

        <p className="text-sm text-gray-700 flex items-center mb-1">
          <Info className="w-4 h-4 mr-1 text-gray-500" />
          Seater: {room.seater}
        </p>

        <p className="text-sm text-gray-700">Facilities: {room.AC}</p>

        {booking && (
          <div className="mt-3 text-sm text-gray-500">
            <p>Booking: {booking.room_no} (status: {booking.receipt_status || 'N/A'})</p>
            {booking.receipt && <a className="text-blue-600 underline" href={`${API_BASE}/${booking.receipt}`} target="_blank" rel="noreferrer">View receipt</a>}
          </div>
        )}

        <p className="text-sm text-gray-500 mt-2">Posted on: {room.posting_date}</p>
      </div>
    </div>
  );
};

export default RoomDetails;
