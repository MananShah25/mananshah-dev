import { site } from "@/lib/content";
import { ContactForm } from "./contact-form";
import { ExternalLink } from "./external-link";

export function ContactSection() {
  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
      <div data-reveal="left">
        <p className="text-xl font-semibold tracking-tight">Let&apos;s build something together.</p>
        <p className="mt-4 leading-relaxed text-muted">
          I&apos;m open to roles in ML and applied AI, software engineering, test and automation, and forward
          deployed engineering. Whether you&apos;re hiring, have a project in mind, or just want to talk about
          ML systems, I&apos;d love to hear from you.
        </p>
        <p className="mt-4 text-sm text-muted">Prefer LinkedIn? Message me there instead.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ExternalLink href={site.social.linkedin} label="LinkedIn" />
          <ExternalLink href={site.social.github} label="GitHub" />
        </div>
      </div>
      <div data-reveal="right" className="relative">
        <ContactForm />
      </div>
    </div>
  );
}
