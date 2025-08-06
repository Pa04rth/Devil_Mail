"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../lib/api";
import axios from "axios";

import EmailList from "../../../components/EmailList";
import EmailDetail from "../../../components/EmailDetail";
import ComposeModal from "../../../components/ComposeModal";

interface EmailListItem {
  id: string;
  from: string;
  subject: string;
  snippet: string;
}
interface EmailDetails {
  id: string;
  from: string;
  subject: string;
  body: string;
}

export default function InboxPage() {
  const { user, logout } = useAuth();

  const [emails, setEmails] = useState<EmailListItem[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);

  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [selectedEmailDetails, setSelectedEmailDetails] =
    useState<EmailDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsLoadingList(false);
      return;
    }

    const fetchEmailList = async () => {
      try {
        const { data } = await api.get("/emails/inbox");
        setEmails(data);
      } catch (error) {
        console.error("Could not fetch email list", error);
        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 401 || error.response?.status === 403)
        ) {
          logout();
        }
      } finally {
        setIsLoadingList(false);
      }
    };

    fetchEmailList();
  }, [user, logout]);

  useEffect(() => {
    if (!selectedEmailId) {
      setSelectedEmailDetails(null);
      return;
    }

    const fetchEmailDetails = async () => {
      setIsLoadingDetails(true);
      try {
        const { data } = await api.get(`/emails/${selectedEmailId}`);
        setSelectedEmailDetails(data);
      } catch (error) {
        console.error("Could not fetch email details", error);
        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 401 || error.response?.status === 403)
        ) {
          logout();
        }
      } finally {
        setIsLoadingDetails(false);
      }
    };

    fetchEmailDetails();
  }, [selectedEmailId, logout]);

  if (isLoadingList) {
    return <div>Loading your inbox...</div>;
  }

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <div
        style={{
          width: "350px",
          borderRight: "1px solid #ccc",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
          <button
            onClick={() => setIsComposing(true)}
            style={{
              width: "100%",
              padding: "15px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Compose Mail
          </button>
        </div>
        <EmailList
          emails={emails}
          selectedEmailId={selectedEmailId}
          onSelectEmail={setSelectedEmailId}
        />
      </div>
      <EmailDetail email={selectedEmailDetails} isLoading={isLoadingDetails} />
      {isComposing && <ComposeModal onClose={() => setIsComposing(false)} />}
    </div>
  );
}
