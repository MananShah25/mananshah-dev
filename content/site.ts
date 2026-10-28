import type { SiteContent } from "@/lib/types";

// All site copy lives here; edit this file to update the website without touching layouts.
// Note: this is bundled into the browser, so never put private data (emails, keys) in it.
export const site: SiteContent = {
  person: {
    name: "Manan Shah",
    roles: [
      "ML / Applied AI Engineer",
      "Software, Test & Automation Engineer",
      "Forward Deployed Engineer",
    ],
    tagline: "M.S. Computer Science, Indiana University · May 2026",
    about:
      "Machine Learning Engineer and Researcher with hands-on experience in building NLP, LLM, and vision systems for academic and industry applications. Adept at designing deep learning pipelines, applying statistical rigor, and optimizing models for real-world deployments. Published in peer-reviewed journals and skilled in transforming ideas into scalable, ethical AI systems.",
    photo: "/img/portfolio_pic_enh1_subj.png",
    resumePath: "/pdf/Manan_Shah_Resume.pdf",
  },

  social: {
    github: "https://github.com/MananShah25",
    linkedin: "https://www.linkedin.com/in/mananshah25122002",
  },

  education: [
    {
      degree: "Master of Science in Computer Science",
      school: "Indiana University Bloomington",
      location: "Bloomington, IN",
      dates: "Fall 2024 – May 2026",
      gpa: "3.76 / 4.0",
      coursework: [
        "Applied Machine Learning",
        "Computer Vision",
        "Elements of Artificial Intelligence",
        "Topics in AI: Applying ML Techniques in CL",
        "Applied Algorithms",
        "Software Engineering I",
        "Computer Networks",
        "Big Data Applications",
        "Data Visualization",
        "Quantum Programming",
      ],
      image: "/img/sample-gates-winter2.png",
    },
    {
      degree: "Bachelor of Technology in Artificial Intelligence",
      school: "NMIMS University",
      location: "Mumbai, India",
      dates: "Jul 2020 – May 2024",
      // To show the undergrad GPA on the site, uncomment the next line:
      // gpa: "3.41 / 4.0",
      coursework: [
        "Machine Learning",
        "Deep Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Data Structures & Algorithms",
        "Operating Systems",
        "Database Management Systems",
        "Big Data Analytics",
        "Recommendation Systems",
        "Robotics",
        "Quantum Computing",
      ],
      highlights: ["Capstone Project: A+"],
      image: "/img/nmims-interior-logo.jpg",
    },
  ],

  experience: [
    {
      company: "METY Foundation",
      role: "Software Developer",
      dates: "Jun 2026 – Present",
      description:
        "Built the mobile app for an AI-powered adaptive tutoring platform in React and Capacitor (Android): authentication, learning-goal creation with async job progress, a self-assessment wizard, streaming tutor chat with understanding checks and diagnostic probes, and a learning dashboard with mastery charts, concept maps and material upload.",
    },
    {
      company: "NMIMS University",
      role: "Research Assistant",
      dates: "Dec 2023 – May 2024",
      description:
        "Engineered a multi-stage NeRF editor in PyTorch and CLIP for 3D content manipulation. Optimized multi-view consistency using OpenCV and established reproducible research workflows, culminating in a co-authored peer-reviewed publication.",
    },
    {
      company: "STAT Institute",
      role: "Machine Learning Intern",
      dates: "May 2023 – Oct 2023",
      description:
        "Built CNN-LSTM hybrid models for financial forecasting and deployed ONNX models to embedded systems with optimized runtime paths. Executed backtesting simulations and managed live threshold recalibration on AWS EC2 using CI/CD pipelines.",
    },
    // Hidden from the site; uncomment this block to show it again.
    // {
    //   company: "GNVS Institute",
    //   role: "Software Developer Intern",
    //   dates: "Dec 2022 – May 2023",
    //   description:
    //     "Developed a career-networking Android application in Kotlin with sprint-based feature delivery and Firebase integration. Cross-ported the platform to Flutter with modular architecture while managing CI/CD pipelines and staged releases.",
    // },
  ],

  skills: [
    { label: "Languages", items: ["Python", "C++17", "JavaScript", "SQL"] },
    {
      label: "ML / AI",
      items: [
        "PyTorch",
        "ONNX",
        "CUDA",
        "NeRF",
        "NeRFStudio",
        "Temporal Fusion Transformer",
        "LangGraph",
        "GPT-4o-mini",
        "OpenAI Realtime API",
      ],
    },
    {
      label: "Backend & Data",
      items: [
        "Django",
        "Django REST Framework",
        "SimpleJWT",
        "FastAPI",
        "Node.js",
        "REST APIs",
        "GraphQL APIs",
        "WebRTC",
        "MySQL",
        "Redis",
      ],
    },
    { label: "Frontend & Mobile", items: ["React.js", "Vite", "Capacitor"] },
    {
      label: "Cloud & DevOps",
      items: ["AWS (EC2, CloudWatch)", "Docker", "Kubernetes", "Git", "CMake"],
    },
    { label: "Testing", items: ["pytest", "GoogleTest", "pybind11"] },
    { label: "Hardware Verification", items: ["Verilator", "RISC-V (RV32I)"] },
    {
      label: "Industrial Automation",
      items: ["OpenPLC", "IEC 61131-3 Ladder Logic", "Modbus TCP"],
    },
    { label: "AI-Assisted Development", items: ["Claude Code", "MCP"] },
  ],

  practices: [
    "CI/CD",
    "Microservices",
    "Token-based authentication",
    "TDD",
    "Unit & integration testing",
    "Agile / Scrum",
    "System design",
    "OO design patterns",
    "Event-driven architecture",
    "Config-as-code",
    "API monitoring",
    "Workflow automation",
    "iOS & Android cross-platform development",
    "Agentic AI workflows",
  ],
};
