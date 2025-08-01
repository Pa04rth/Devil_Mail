"use client"; // This MUST be a client component to use hooks

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "../../components/Sidebar";

export default function DevilMailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's no user, redirect to login
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  // While loading, or if no user, show a loading screen to prevent flash of content
  if (isLoading || !user) {
    return <div>Loading session...</div>;
  }

  // If user is logged in, show the layout and the page content
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px" }}>{children}</main>
    </div>
  );
}
