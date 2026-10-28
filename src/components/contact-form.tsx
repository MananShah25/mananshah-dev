"use client";

import { useActionState, useRef } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle", message: "" };

const inputClass =
  "mt-2 w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm placeholder:text-muted/70 focus:border-accent focus:outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  // Set when the visitor first interacts; the server rejects submissions that come in implausibly fast.
  // (Not set during render, which would differ between server and browser.)
  const startedAt = useRef<number | null>(null);
  const startedAtInput = useRef<HTMLInputElement>(null);
  const fields = state.fields;

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-accent bg-surface p-6">
        <p className="font-medium text-accent">Message sent</p>
        <p className="mt-2 text-sm text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    // key remounts the form after an error so fields refill with what was typed
    <form
      key={state.message}
      action={formAction}
      onFocusCapture={() => {
        startedAt.current ??= Date.now();
      }}
      onSubmit={() => {
        if (startedAtInput.current) startedAtInput.current.value = String(startedAt.current ?? Date.now());
      }}
      className="flex flex-col gap-4"
    >
      <input ref={startedAtInput} type="hidden" name="startedAt" />
      {/* Honeypot: visually hidden and skipped by keyboard and screen readers. Its name and label are
          deliberately meaningless so browser autofill (which fills fields like "company") never touches it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="hp_trap" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" />
        </label>
      </div>

      <label htmlFor="contact-name" className="text-sm font-medium">
        Name
        <input id="contact-name" name="name" required maxLength={100} autoComplete="name" defaultValue={fields?.name} className={inputClass} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="contact-email" className="text-sm font-medium">
          Email
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            defaultValue={fields?.email}
            className={inputClass}
          />
        </label>
        <label htmlFor="contact-phone" className="text-sm font-medium">
          Phone <span className="font-normal text-muted">(optional)</span>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            maxLength={25}
            autoComplete="tel"
            defaultValue={fields?.phone}
            className={inputClass}
          />
        </label>
      </div>

      <label htmlFor="contact-message" className="text-sm font-medium">
        Message
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          defaultValue={fields?.message}
          className={`${inputClass} resize-y`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" className={`text-sm ${state.status === "error" ? "text-red-700 dark:text-red-400" : "text-muted"}`}>
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}
