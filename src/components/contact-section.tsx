import { site } from "@/lib/content";
import { ContactForm } from "./contact-form";
import { ExternalLink } from "./external-link";

export function ContactSection() {
  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
      <div>
        <p className="leading-relaxed text-muted">
          I&apos;m looking for roles in ML and applied AI, software, test and automation, and forward deployed
          engineering. Send a message and it comes straight to my inbox.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ExternalLink href={site.social.linkedin} label="LinkedIn" />
          <ExternalLink href={site.social.github} label="GitHub" />
        </div>
      </div>
      <div className="relative">
        <ContactForm />
      </div>
    </div>
  );
}
