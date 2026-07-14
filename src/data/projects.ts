/**
 * All portfolio content lives here. Pulled from soumydhiran.site and CV
 * (July 2026). Stacks for Ambient News and BillKaro are best guesses;
 * correct them if they're off.
 * `image` is a screenshot of the live project, under /public/images.
 */

export interface Project {
  title: string;
  year: string;
  category: string;
  description: string;
  stack: string[];
  link: string;
  image: string;
}

export const profile = {
  name: "Soumy Dhiran",
  firstName: "SOUMY",
  lastName: "DHIRAN",
  roles: ["SOFTWARE DEVELOPER", "FULL-STACK DEVELOPER", "AGENTIC AI BUILDER"],
  aboutStatement:
    "I build for the web, turning ideas into fast, thoughtful products with clean, reliable code. Software developer working across frontend, backend, agentic AI, and machine learning.",
  email: "soumy2706@gmail.com",
  location: "Indore, India",
  github: "https://github.com/Soumy27",
  linkedin: "https://www.linkedin.com/in/soumydhiran/",
  twitter: "",
  instagram: "https://www.instagram.com/soumy_dhiran_27/",
  resumeUrl:
    "https://drive.google.com/file/d/1ZtN5yhblef9u3QwbGI8cmJJI9TJ4jRH1/view?usp=drive_link",
};

export const whatIDo = [
  {
    title: "AGENTIC AI",
    tagline: "Intelligent agents & machine learning",
    body: "Building AI copilots, browser agents, and NLP-powered automations with OpenAI and Gemini APIs. From intelligent form filling to inbox-reading assistants that act on your behalf.",
    skills: ["Python", "OpenAI API", "Gemini API", "AI / NLP", "Machine Learning", "FastAPI", "Chrome Extensions", "Gmail API"],
  },
  {
    title: "FULL-STACK",
    tagline: "Modern web development & scalable applications",
    body: "Building responsive, performant applications end to end with React, Next.js, and Node.js. Payments, auth, queues, and databases wired together into products people enjoy using.",
    skills: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma", "TailwindCSS", "Docker"],
  },
];

export const timeline = [
  {
    title: "Building Agentic AI Products",
    org: "Personal Projects",
    period: "NOW",
    body: "Shipping AI copilots, habit platforms with real-world consequences, and interactive data experiences, while pursuing my B.Tech at SGSITS, Indore.",
  },
  {
    title: "IBM TechXchange watsonx Hackathon",
    org: "Top 50 Team, Worldwide",
    period: "2025",
    body: "Selected among the Top 50 teams globally at IBM's flagship AI hackathon. Designed and deployed a Next.js frontend with integrated AI assistant features in a team of five.",
  },
  {
    title: "Frontend Developer Intern",
    org: "BizUpreach, Jabalpur",
    period: "2025",
    body: "Developed and maintained responsive interfaces with React.js and Next.js, optimized CSS and JavaScript for cross-browser support, and worked Agile with Git and GitHub.",
  },
  {
    title: "Started B.Tech",
    org: "SGSITS, Indore",
    period: "2023",
    body: "Began Electronics and Instrumentation engineering at Shri Govindram Seksaria Institute of Technology and Science. Fell for programming somewhere between DSA and web dev.",
  },
];

export const projects: Project[] = [
  {
    title: "Habit Streak Consequence",
    year: "2026",
    category: "Full-Stack / Fintech",
    description:
      "Set a habit, break the streak, and it charges your card or blocks your favourite site. Discipline forged through documented consequence.",
    stack: ["Next.js 14", "Prisma", "PostgreSQL", "BullMQ", "Redis", "Razorpay", "Stripe"],
    link: "https://habit-streak-consequence-fh5baux4g-soumy-s-projects2.vercel.app/",
    image: "/images/habit-streak.png",
  },
  {
    title: "CareerAI",
    year: "2026",
    category: "Agentic AI",
    description:
      "An AI-powered job-application copilot: track your pipeline, tailor resumes with AI, and auto-detect application updates from your inbox.",
    stack: ["React", "Node.js", "Express", "MongoDB", "OpenAI / Gemini", "Gmail API"],
    link: "https://ai-job-assistant-omega.vercel.app/login",
    image: "/images/careerai.png",
  },
  {
    title: "Ambient News",
    year: "2025",
    category: "Data / 3D Globe",
    description:
      "The world as a living map: global headlines plotted on an interactive 3D globe, filterable by conflict, economy, and nature.",
    stack: ["React", "Three.js", "News APIs"], // verify stack
    link: "https://ambient-news.vercel.app/",
    image: "/images/ambient-news.png",
  },
  {
    title: "BillKaro",
    year: "2025",
    category: "Full-Stack / SaaS",
    description:
      "GST invoicing for Indian micro-businesses: create GST-compliant invoices, share them on WhatsApp, accept payments, and automate reminders.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Razorpay"], // verify stack
    link: "https://billkaro-sigma.vercel.app/",
    image: "/images/billkaro.png",
  },
];

/**
 * Tech tree. Slugs must exist on simpleicons.org.
 * `color` is the brand color shown on hover (picked to stay readable
 * on the dark theme, so a few dark brand marks are lightened).
 */
export interface TechItem {
  name: string;
  slug: string;
  color: string;
}

export interface TechBranch {
  name: string;
  items: TechItem[];
}

export const techBranches: TechBranch[] = [
  {
    name: "Languages",
    items: [
      { name: "Python", slug: "python", color: "#4B8BBE" },
      { name: "C++", slug: "cplusplus", color: "#659AD2" },
      { name: "C", slug: "c", color: "#A8B9CC" },
      { name: "JavaScript", slug: "javascript", color: "#F7DF1E" },
      { name: "TypeScript", slug: "typescript", color: "#3178C6" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", slug: "react", color: "#61DAFB" },
      { name: "Next.js", slug: "nextdotjs", color: "#FFFFFF" },
      { name: "Tailwind", slug: "tailwindcss", color: "#38BDF8" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", slug: "nodedotjs", color: "#5FA04E" },
      { name: "Express", slug: "express", color: "#FFFFFF" },
      { name: "FastAPI", slug: "fastapi", color: "#009688" },
    ],
  },
  {
    name: "AI & Agents",
    items: [
      { name: "OpenAI", slug: "openai", color: "#74AA9C" },
      { name: "Gemini", slug: "googlegemini", color: "#9B8CFF" },
      { name: "Hugging Face", slug: "huggingface", color: "#FFD21E" },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "MongoDB", slug: "mongodb", color: "#47A248" },
      { name: "PostgreSQL", slug: "postgresql", color: "#699ECA" },
      { name: "MySQL", slug: "mysql", color: "#4479A1" },
      { name: "Redis", slug: "redis", color: "#FF4438" },
      { name: "Prisma", slug: "prisma", color: "#7F9CF5" },
    ],
  },
  {
    name: "Tools & Infra",
    items: [
      { name: "Docker", slug: "docker", color: "#2496ED" },
      { name: "Git", slug: "git", color: "#F05032" },
      { name: "GitHub", slug: "github", color: "#FFFFFF" },
      { name: "Netlify", slug: "netlify", color: "#00C7B7" },
      { name: "Vercel", slug: "vercel", color: "#FFFFFF" },
      { name: "Linux", slug: "linux", color: "#FCC624" },
    ],
  },
];
