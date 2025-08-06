"use client";

import { useState } from "react";
import api from "../lib/api";
import styles from "./ComposeModal.module.css";

interface ComposeModalProps {
  onClose: () => void;
}

export default function ComposeModal({ onClose }: ComposeModalProps) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await api.post("/emails/send", { to, subject, body });
      alert("Email sent successfully!");
      onClose();
    } catch (error) {
      alert("Failed to send email.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalHeader}>
        <span>New Message</span>
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close compose window"
        >
          &times;
        </button>
      </div>
      <form onSubmit={handleSend} className={styles.modalForm}>
        <div className={styles.formGroup}>
          <label htmlFor="compose-to" className={styles.srOnly}>
            To
          </label>
          <input
            id="compose-to"
            type="email"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="compose-subject" className={styles.srOnly}>
            Subject
          </label>
          <input
            id="compose-subject"
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div>
          <label htmlFor="compose-body" className={styles.srOnly}>
            Email Body
          </label>
          <textarea
            id="compose-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className={styles.bodyTextarea}
          />
        </div>
        <button
          type="submit"
          disabled={isSending}
          className={styles.submitButton}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
