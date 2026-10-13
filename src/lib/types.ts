export type ProjectLinks = {
  github?: string;
  paper?: string;
  demo?: string;
};

export type CaseStudy = {
  credits?: string;
  problem: string;
  approach: string[];
  myRole?: string;
  results?: {
    rows?: { metric: string; value: string }[];
    note?: string;
  };
  limitations?: string[];
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  tagline: string;
  highlights: string[];
  tags: string[];
  links: ProjectLinks;
  // Present only on featured projects, which get their own page
  caseStudy?: CaseStudy;
};

export type OpenSourceContribution = {
  project: string;
  repo: string;
  title: string;
  url: string;
  number: number;
  status: string;
  summary: string;
  details: string[];
  tags: string[];
};

export type Education = {
  degree: string;
  school: string;
  location: string;
  dates: string;
  gpa?: string;
  coursework: string[];
  highlights?: string[];
  image: string;
};

export type Experience = {
  company: string;
  role: string;
  dates: string;
  description: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type SiteContent = {
  person: {
    name: string;
    roles: string[];
    tagline: string;
    about: string;
    photo: string;
    resumePath: string;
  };
  social: {
    github: string;
    linkedin: string;
  };
  education: Education[];
  experience: Experience[];
  skills: SkillGroup[];
  practices: string[];
};
