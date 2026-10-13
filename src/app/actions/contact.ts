"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fields?: { name: string; email: string; message: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Humans take a few seconds to fill the form; bots usually submit instantly
const MIN_FILL_MS = 3000;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const fields = { name, email, message };

  // Honeypot: hidden from people, so only bots fill it. Pretend success so they don't retry.
  if (String(formData.get("company") ?? "") !== "") {
    return { status: "success", message: "Thanks! Your message has been sent." };
  }
  const startedAt = Number(formData.get("startedAt"));
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", message: "That was quick! Please wait a moment and try again.", fields };
  }

  if (!name || name.length > 100) {
    return { status: "error", message: "Please enter your name.", fields };
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return { status: "error", message: "Please enter a valid email address.", fields };
  }
  if (message.length < 10 || message.length > 5000) {
    return { status: "error", message: "Please write a message between 10 and 5,000 characters.", fields };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return {
      status: "error",
      message: "The contact form isn't available right now. Please reach out on LinkedIn instead.",
      fields,
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      // Fixed prefix makes a Gmail filter easy: subject contains "[Portfolio]"
      subject: `[Portfolio] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: Resend returned", res.status, await res.text());
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again, or reach out on LinkedIn.",
      fields,
    };
  }

  return { status: "success", message: "Thanks! Your message has been sent. I'll get back to you soon." };
}
