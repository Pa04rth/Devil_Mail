"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace("/devil-mail/inbox");
      } else {
        router.replace("/login");
      }
    }
  }, [user, isLoading, router]);

  return <div>Loading...</div>;
}
