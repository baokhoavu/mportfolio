import { About, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Bob",
  lastName: "Smith",
  name: `Bob Smith`,
  role: "Full Stack Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "bob.smith@example.com",
  location: "America/Los_Angeles", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/bobsmith",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/bobsmith",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/bobsmith_dev",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@bobsmith_dev",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Crafting digital worlds through code and pixels</>, 
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
    I'm Bob, a full stack software engineer and indie game developer at <Text as="span" size="xl" weight="strong">GameTech Studios</Text>. <br /> I build immersive web experiences and craft indie games that tell stories.
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
        Bob is a San Francisco-based full stack software engineer and indie game developer with a passion for creating 
        immersive digital experiences. By day, he architects scalable web applications; by night, he crafts pixel-perfect 
        indie games and contributes to open-source gaming libraries. His work bridges the gap between traditional web development 
        and interactive entertainment.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "GameTech Studios",
        timeframe: "2022 - Present",
        role: "Senior Full Stack Engineer & Game Developer",
        achievements: [
          <>
            Built real-time multiplayer game infrastructure handling 50K+ concurrent players
            using Node.js, WebSockets, and Redis for seamless gaming experiences.
          </>,
          <>
            Developed indie puzzle game 'Neon Maze' with Unity and C#, achieving 100K+ downloads
            and 4.8-star rating on Steam.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "PixelForge Interactive",
        timeframe: "2018 - 2022",
        role: "Full Stack Developer & Technical Artist",
        achievements: [
          <>
            Created modding tools and APIs for indie game community, enabling 500+ user-generated
            content creators and extending game lifespan by 200%.
          </>,
          <>
            Built cross-platform leaderboard system with React Native and Firebase, supporting
            real-time rankings across web, mobile, and desktop games.
          </>,
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
        name: "University of California, Berkeley",
        description: <>Bachelor's in Computer Science with focus on Software Engineering.</>,
      },
      {
        name: "Stanford Continuing Studies",
        description: <>Advanced coursework in Machine Learning and Distributed Systems.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Frontend Development",
        description: (
          <>Building responsive, performant web applications using React, TypeScript, and modern CSS.</>
        ),
        tags: [
          {
            name: "React",
            icon: "react",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Backend Development",
        description: (
          <>Architecting scalable backend systems with Node.js, Python, and cloud infrastructure.</>
        ),
        tags: [
          {
            name: "Node.js",
            icon: "nodejs",
          },
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "PostgreSQL",
            icon: "postgresql",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Game Development",
        description: (
          <>Creating immersive gaming experiences with Unity, WebGL, and real-time multiplayer systems.</>
        ),
        tags: [
          {
            name: "Unity",
            icon: "unity",
          },
          {
            name: "C#",
            icon: "csharp",
          },
          {
            name: "WebGL",
            icon: "webgl",
          },
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Game Project",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};


export { person, social, newsletter, home, about, work };
