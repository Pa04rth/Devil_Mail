"use client";

interface EmailDetails {
  subject: string;
  from: string;
  body: string;
}

interface EmailDetailProps {
  email: EmailDetails | null;
  isLoading: boolean;
}

export default function EmailDetail({ email, isLoading }: EmailDetailProps) {
  if (isLoading) {
    return (
      <div style={{ padding: "20px", flexGrow: 1 }}>
        Loading email content...
      </div>
    );
  }

  if (!email) {
    return (
      <div style={{ padding: "20px", color: "#666", flexGrow: 1 }}>
        Select an email to read.
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", flexGrow: 1, overflowY: "auto" }}>
      <h2>{email.subject}</h2>
      <p>
        <strong>From:</strong> {email.from}
      </p>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: email.body }} />
    </div>
  );
}
