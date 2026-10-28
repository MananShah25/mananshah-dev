import { ContactSection } from "@/components/contact-section";
import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import { Hero } from "@/components/hero";
import { OpenSourceSection } from "@/components/open-source-section";
import { ProjectsSection } from "@/components/projects-section";
import { Section } from "@/components/section";
import { Skills } from "@/components/skills";
import { site } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";

// Structured data so search engines understand who this page is about
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.person.name,
  url: SITE_URL,
  image: `${SITE_URL}${site.person.photo}`,
  jobTitle: site.person.roles,
  description: site.person.about,
  alumniOf: site.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
  sameAs: [site.social.github, site.social.linkedin],
};

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />

      <Section id="projects" eyebrow="Work" title="Projects">
        <ProjectsSection />
      </Section>

      <Section id="experience" eyebrow="Career" title="Experience">
        <ExperienceSection />
      </Section>

      <Section id="education" eyebrow="Background" title="Education">
        <EducationSection />
      </Section>

      <Section id="open-source" eyebrow="Community" title="Open Source Contributions">
        <OpenSourceSection />
      </Section>

      <Section id="skills" eyebrow="Toolbox" title="Skills">
        <Skills />
      </Section>

      <ContactSection />
    </div>
  );
}
