"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../lib/api";

interface Email {
  id: string;
  subject: string;
  from: string;
  snippet: string;
}

export default function InboxPage() {
  const { user, logout } = useAuth();
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      // The api client automatically adds the auth token!
      try {
        const { data } = await api.get("/emails/inbox");
        setEmails(data);
      } catch (error) {
        console.error("Could not fetch emails", error);
        // If token is expired, the API will return an error, so we log out.
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchEmails();
    }
  }, [user, logout]);

  if (isLoading) {
    return <div>Loading your emails...</div>;
  }

  return (
    <div>
      <h1>Inbox for {user?.email}</h1>
      {emails.length > 0 ? (
        <ul>
          {emails.map((email) => (
            <li key={email.id}>
              <strong>{email.from}</strong> - {email.subject}
              <p>{email.snippet}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your inbox is empty.</p>
      )}
    </div>
  );
}
