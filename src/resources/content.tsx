import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Baokhoa",
  lastName: "Vu",
  name: "Baokhoa Vu",
  role: "Full Stack Developer",
  avatar: "/images/avatar.jpg",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  location: "America/New_York", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: <>My weekly newsletter about technology and development</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: process.env.NEXT_PUBLIC_GITHUB_URL || "",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: process.env.NEXT_PUBLIC_THREADS_URL || "",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: process.env.NEXT_PUBLIC_EMAIL ? `mailto:${process.env.NEXT_PUBLIC_EMAIL}` : "",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/avatar.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Developing innovative cloud solutions and integrations</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I am Baokhoa, a full stack developer with over 7 years of experience in freelancing and
      working for a non-profit digital marketing agency. I specialize in developing and
      integrating cloud-based management software solutions.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Baokhoa is a full stack developer with over 7 years of experience ranging from freelancing
        to working for a non-profit digital marketing agency. He has developed and integrated many
        different cloud-based management software using unique out-of-the-box solutions tailored to
        each client. These developments include building reusable integration scripts, interactive
        dashboards, mobile responsive email development, and detailed reports utilizing custom
        queries.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Non-Profit Digital Marketing Agency",
        timeframe: "2017 - Present",
        role: "Full Stack Developer",
        achievements: [
          "Developed and integrated cloud-based management software solutions, utilizing unique out-of-the-box approaches tailored to client needs.",
          "Built reusable integration scripts, interactive dashboards, and mobile responsive email systems.",
          "Created detailed reports with custom queries to enhance data analysis and decision-making.",
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Freelance",
        timeframe: "2017 - Present",
        role: "Full Stack Developer",
        achievements: [
          "Delivered custom cloud-based solutions for various clients, focusing on scalable and efficient software integrations.",
          "Developed interactive web applications and automated systems to streamline business processes.",
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Self-Taught Developer",
        description: <>Continuous learning in full stack development and cloud technologies.</>,
      },
      {
        name: "Online Courses",
        description: (
          <>Completed various certifications in software development and digital marketing.</>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "JavaScript & TypeScript",
        description: (
          <>
            Specialist in building modern, component-driven web applications using React and
            Next.js, with strong TypeScript practices for maintainability and developer DX.
          </>
        ),
        tags: [
          { name: "JavaScript", icon: "javascript" },
          { name: "TypeScript", icon: "typescript" },
          { name: "React", icon: "react" },
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Cloud & Integrations",
        description: (
          <>
            Practical experience integrating third-party services, building APIs and deploying
            scalable apps to cloud platforms with observability and automation.
          </>
        ),
        tags: [
          { name: "AWS", icon: "aws" },
          { name: "Node.js", icon: "nodejs" },
          { name: "Vercel", icon: "vercel" },
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
