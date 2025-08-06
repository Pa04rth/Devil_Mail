"use client";

interface Email {
  id: string;
  from: string;
  subject: string;
}

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onSelectEmail: (id: string) => void;
}

export default function EmailList({
  emails,
  selectedEmailId,
  onSelectEmail,
}: EmailListProps) {
  if (emails.length === 0) {
    return (
      <div style={{ padding: "20px", color: "#666" }}>No emails found.</div>
    );
  }
  return (
    <div style={{ flexGrow: 1, overflowY: "auto" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {emails.map((email) => (
          <li
            key={email.id}
            onClick={() => onSelectEmail(email.id)}
            style={{
              padding: "15px 20px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              backgroundColor:
                email.id === selectedEmailId ? "#eaf2ff" : "transparent",
            }}
          >
            <strong>{email.from}</strong>
            <p
              style={{
                margin: "5px 0 0 0",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {email.subject}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
