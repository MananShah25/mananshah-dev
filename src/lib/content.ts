import { site } from "../../content/site";
import { openSource, projects } from "../../content/projects";
import type { Project } from "./types";

export { site, openSource };

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.caseStudy);
}

export function getOtherProjects(): Project[] {
  return projects.filter((p) => !p.caseStudy);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
