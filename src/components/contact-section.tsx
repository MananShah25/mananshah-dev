import { site } from "@/lib/content";
import { ContactForm } from "./contact-form";
import { ExternalLink } from "./external-link";

// Unlike other sections, the title sits in the left column beside the form (not above it),
// so the whole form fits on one screen when someone jumps to #contact.
export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="grid gap-10 border-t border-border pb-20 pt-12 md:grid-cols-[1fr_1.6fr] md:gap-12"
    >
      <div data-reveal="left">
        <p className="font-mono text-xs uppercase tracking-widest font-bold text-accent-bright">Say hello</p>
        <h2 id="contact-title" className="mt-2 text-3xl font-bold tracking-tight">
          Contact
        </h2>
        <p className="mt-6 text-xl font-semibold tracking-tight">Let&apos;s build something together.</p>
        <p className="mt-3 leading-relaxed text-muted">
          I&apos;m open to roles in ML and applied AI, software engineering, test and automation, and forward
          deployed engineering. Whether you&apos;re hiring, have a project in mind, or just want to talk about
          ML systems, I&apos;d love to hear from you.
        </p>
        <p className="mt-3 text-sm text-muted">Prefer LinkedIn? Message me there instead.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ExternalLink href={site.social.linkedin} label="LinkedIn" />
          <ExternalLink href={site.social.github} label="GitHub" />
        </div>
      </div>
      <div data-reveal="right" className="relative">
        <ContactForm />
      </div>
    </section>
  );
}
