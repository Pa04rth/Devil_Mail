"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect until we are sure about the auth status
    if (!isLoading) {
      if (user) {
        router.replace("/devil-mail/inbox");
      } else {
        router.replace("/login");
      }
    }
  }, [user, isLoading, router]);

  // Show a loading indicator while we check for the token
  return <div>Loading...</div>;
}
