import React, { useEffect, useState } from "react";
import { Bell, CreditCard, UtensilsCrossed, AlertCircle } from "lucide-react";

const API_BASE = "https://bedd.in/backend"; // <-- change if needed

type RawUser = { [k: string]: any };

const mapUserToStudentData = (u: any) => ({
  name: u?.name || "",
  roomNumber: u?.rno || u?.room_no || u?.roomNumber || "",
  rentDue: u?.fees ? `₹${u.fees}` : u?.monthlyFee ? `₹${u.monthlyFee}` : "₹14,000",
  dueDate: u?.doe || u?.dueDate || "15th Jan 2025",
  // keep raw for other parts if needed
  raw: u || {}
});

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "payment":
      return <CreditCard className="w-5 h-5 text-red-500" />;
    case "food":
      return <UtensilsCrossed className="w-5 h-5 text-green-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-blue-500" />;
  }
};

const Dashboard: React.FC = () => {
  const [studentData, setStudentData] = useState<any>(mapUserToStudentData({}));
  const [todayMenu, setTodayMenu] = useState<any | null>(null);
  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, type: "payment", message: "Rent payment due on 15th Jan", time: "2 hours ago" },
    { id: 2, type: "food", message: "Today's special: Matar Paneer", time: "4 hours ago" },
    { id: 3, type: "laundry", message: "Laundry request completed", time: "1 day ago" },
    { id: 4, type: "maintenance", message: "AC maintenance scheduled for tomorrow", time: "2 days ago" }
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  // helper: get today name e.g., "Sunday"
  const todayName = () => {
    return new Date().toLocaleDateString("en-US", { weekday: "long" });
  };

  // fetch fresh user data from get_user.php
  const fetchFreshUser = async (id: number | string) => {
    try {
      const res = await fetch(`${API_BASE}/get_user.php?id=${encodeURIComponent(String(id))}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      if (j && j.success && j.user) {
        // store the fresh user
        localStorage.setItem("lv_current_user", JSON.stringify(j.user));
        return j.user;
      }
    } catch (err) {
      console.warn("get_user fetch failed:", err);
    }
    return null;
  };

  // fetch room for a user
  const fetchRoomForUser = async (id: number | string) => {
    try {
      const res = await fetch(`${API_BASE}/get_user_room.php?id=${encodeURIComponent(String(id))}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      if (j && j.success) {
        return j.room || null;
      }
    } catch (err) {
      console.warn("get_user_room fetch failed:", err);
    }
    return null;
  };

  // fetch full food menu and pick today's menu
  const fetchFoodMenu = async () => {
    try {
      const res = await fetch(`${API_BASE}/get_foodmenu.php`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      if (j && j.success && Array.isArray(j.menu || j.data || j.rows || [])) {
        const arr = j.menu || j.data || j.rows || [];
        const today = todayName().toLowerCase();
        const found = arr.find((r: any) => (String(r.day || "").toLowerCase() === today));
        return found || null;
      }
    } catch (err) {
      console.warn("get_foodmenu fetch failed:", err);
    }
    return null;
  };

  // main load logic: use stored quickly, then try to refresh
  const load = async (maybeUser?: RawUser) => {
    setLoading(true);

    // get stored or provided
    let stored: RawUser | null = null;
    if (maybeUser) stored = maybeUser;
    else {
      try {
        stored = JSON.parse(localStorage.getItem("lv_current_user") || "null");
      } catch {
        stored = null;
      }
    }

    if (!stored || !stored.id) {
      // no user - show default and stop
      setStudentData(mapUserToStudentData({}));
      setTodayMenu(null);
      setLoading(false);
      return;
    }

    // immediate UI from stored data
    setStudentData((prev: any) => ({ ...prev, ...mapUserToStudentData(stored) }));

    // concurrently fetch fresh user, room, food
    try {
      const [freshUser, room, menu] = await Promise.allSettled([
        fetchFreshUser(stored.id),
        fetchRoomForUser(stored.id),
        fetchFoodMenu()
      ]);

      // If we got a fresh user, use it
      let usedUser = stored;
      if (freshUser.status === "fulfilled" && freshUser.value) {
        usedUser = freshUser.value;
      }

      // If we got room data, merge it
      let roomData: any = null;
      if (room.status === "fulfilled" && room.value) {
        roomData = room.value;
      }

      // if menu found
      if (menu.status === "fulfilled" && menu.value) {
        setTodayMenu(menu.value);
        // add a small notification about food
        setNotifications((prev) => {
          const foodNote = { id: 9999, type: "food", message: `Today's special: ${menu.value.it3 || menu.value.dinner || menu.value.it2 || ''}`, time: "Now" };
          // avoid duplicates by id
          if (!prev.find(n => n.id === foodNote.id)) return [foodNote, ...prev];
          return prev;
        });
      }

      // final studentData merge: prioritized fields from room then user
      const merged = {
        ...(usedUser || {}),
        ...(roomData ? { rno: roomData.room_no || roomData.roomNo || roomData.roomNumber, fees: roomData.fees || roomData.monthlyFee } : {})
      };

      setStudentData(mapUserToStudentData(merged));
    } catch (err) {
      console.warn("Dashboard load encountered error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    // initial load
    void load();

    // listen for login changes
    const handler = (ev: any) => {
      const newUser = ev?.detail?.user;
      void load(newUser);
    };
    window.addEventListener("lv_user_changed", handler);

    return () => {
      mounted = false;
      window.removeEventListener("lv_user_changed", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {studentData.name || "Student"}!</h1>
        <p className="text-gray-600">Here's what's happening in your hostel today.</p>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Room Details</h3>
          <p className="text-2xl font-bold text-blue-600">{studentData.roomNumber || "No room assigned"}</p>
          <p className="text-sm text-gray-600">{studentData.roomNumber ? "Assigned room" : "Please contact admin"}</p>
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

          {todayMenu ? (
            <div className="space-y-4">
              {/* The DB columns vary — try a few common names */}
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Breakfast (8:00 - 9:00 AM)</p>
                  <p className="text-sm text-gray-600">{todayMenu.it1 || todayMenu.breakfast || todayMenu.it_1 || ""}</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Lunch (12:00 - 2:00 PM)</p>
                  <p className="text-sm text-gray-600">{todayMenu.it2 || todayMenu.lunch || todayMenu.it_2 || ""}</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Dinner (8:00 - 9:00 PM)</p>
                  <p className="text-sm text-gray-600">{todayMenu.it3 || todayMenu.dinner || todayMenu.it_3 || todayMenu.it5 || ""}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No menu available for today.</p>
          )}
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
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all notifications →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
