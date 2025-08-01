"use client";

import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div
      style={{ width: "250px", borderRight: "1px solid #ccc", padding: "20px" }}
    >
      <h2>Devil Mail</h2>
      {user && (
        <div>
          <p>Welcome,</p>
          <p>
            <strong>{user.email}</strong>
          </p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
