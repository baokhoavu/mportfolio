import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Baokhoa",
  lastName: "Vu",
  name: "Baokhoa Vu",
  role: "Full Stack Software Engineer",
  avatar: "/images/avatar.jpg",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  location: "America/Los_Angeles",
  languages: [],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: <>My weekly newsletter about technology and development</>,
};

const social: Social = [
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
  headline: <>Baokhoa Vu</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <Text marginRight="4" onBackground="brand-medium">
          Full-stack developer with 7+ years of experience in engineering, freelancing, and
          non-profit digital marketing.
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: <></>,
};

const about: About = {
  path: "/about",
  label: "About",
  title: "About",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Full-stack developer with 7+ years of experience spanning startups, freelancing, and
        non-profit digital marketing. Architected and integrated cloud-based management platforms
        using tailored, scalable solutions. Delivered reusable integrations, interactive dashboards,
        mobile-responsive email systems, and data-driven reports via custom queries. Migrated,
        enhanced, and maintained React/Redux Optimizely B2B commerce storefronts. Built and
        supported robust .NET C# backends utilizing LINQ and SQL. Partnered with technical leads,
        PMs, and POs to mentor teams, automate deployments, conduct code reviews, and establish API
        testing best practices (Swagger, Postman, ADO).
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Poolcorp",
        timeframe: "September 2022 - May 2025",
        role: "Full Stack Software Engineer II",
        achievements: [
          "Led enterprise-scale migration of multiple in-house and e-commerce storefronts to React MERN TypeScript stack with Redux state management, developing reusable component templates and responsive designs for optimal user experience.",
          "Architected and deployed cloud-based management platforms with innovative integrations, including reusable scripts, interactive dashboards, mobile-responsive email systems, and advanced reporting with custom queries.",
          "Engineered high-performance .NET C# backend solutions with robust exception validation, endpoint enrichment, and ERP custom integrations, optimizing customer flows and checkout processes that supported $5B+ in annual transactions.",
          "Provided technical leadership across cross-functional teams (development, product, design, DevOps, QA, mobile) through strategic guidance and collaborative problem-solving.",
          "Mentored junior and contract developers in best practices for code quality, debugging, workflows, environment management, and cross-functional collaboration.",
        ],
        images: [
          {
            src: "/images/projects/project-01/work-1.png",
            alt: "Project image",
            width: 16,
            height: 12,
          },
        ],
      },
      {
        company: "Front",
        timeframe: "February 2022 - July 2022",
        role: "Web Developer",
        achievements: [
          "Built scalable, mobile-first Next.js/React components and templates by modernizing legacy pages and delivering new promotional experiences from Figma designs within Agile/Scrum sprints.",
          "Integrated headless CMS content from CraftCMS using GraphQL to dynamically bind products, design data, copy, and assets.",
          "Supporting Optimizely A/B testing, enabling rapid experimentation through ngrok-based shareable QA URLs.",
          "Implemented custom regional IP verification and caching using MaxMind geolocation with session management to support compliance and localization needs.",
        ],
        images: [
          {
            src: "/images/projects/project-01/work-2.png",
            alt: "Project image",
            width: 14,
            height: 10,
          },
        ],
      },
      {
        company: "Ragnarok, Inc.",
        timeframe: "July 2021 - February 2022",
        role: "Front End Developer",
        achievements: [
          "Built Shopify landing pages and custom themes with Liquid and jQuery to support digital marketing campaigns, collaborating with clients through live demos and QA.",
          "Implemented MarTech and analytics solutions using Segment and Braze for event tracking, attribution, reporting, alerts, and messaging insights.",
          "Deployed scalable backend analytics on GCP with Docker, including custom Segment integrations with the Twitter Ads API.",
          "Delivered cross-channel analytics for web, iOS, Android, and WordPress, enabling consistent session and event tracking.",
          "Mentored junior developers and partnered cross-functionally to translate marketing goals into data-driven solutions.",
        ],
        images: [
          {
            src: "/images/projects/project-01/work-3.png",
            alt: "Project image",
            width: 14,
            height: 10,
          },
        ],
      },
      {
        company: "Causeforce",
        timeframe: "February 2018 - January 2021",
        role: "Lead Developer",
        achievements: [
          "Delivered 100+ responsive websites across WordPress, Rallybound, and HubSpot using HTML5, SCSS, and JavaScript, supporting P2P fundraising campaigns that raised over $1B in donations.",
          "Led and mentored junior developers as Tech Lead, providing guidance on in-house tooling and Blackbaud Luminate best practices across platforms.",
          "Built full-stack Angular applications integrating Blackbaud APIs for event check-in, secure donations, user profiles, waivers, and live fundraising dashboards.",
          "Architected data pipelines using Node, Express, MongoDB, and scheduled jobs to persist and refresh real-time fundraising analytics.",
          "Developed reusable JavaScript plugins for campaign security, SSO user verification, and API access.",
          "Implemented marketing and analytics tracking with Google Analytics, Tag Manager, Facebook Pixel, and heatmap tools, while maintaining hosting, servers, and internal documentation.",
        ],
        images: [
          {
            src: "/images/projects/project-01/work-4.png",
            alt: "Project image",
            width: 10,
            height: 6,
          },
          {
            src: "/images/projects/project-01/work-5.png",
            alt: "Project image",
            width: 8,
            height: 6,
          },
          {
            src: "/images/projects/project-01/work-6.png",
            alt: "Project image",
            width: 10,
            height: 6,
          },
          {
            src: "/images/projects/project-01/work-7.png",
            alt: "Project image",
            width: 10,
            height: 6,
          },
          {
            src: "/images/projects/project-01/work-8.png",
            alt: "Project image",
            width: 6,
            height: 6,
          },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Certifications",
    institutions: [
      {
        name: "Analytics Expert",
        description: <>Twilio Segment Issued Aug 2021 - Expired Aug 2024</>,
      },
      {
        name: "Implementation Expert",
        description: <>Twilio Segment Issued Aug 2021 - Expired Aug 2024</>,
      },
      {
        name: "App Development",
        description: <>Shopify Issued July 2021 - Expired July 2022</>,
      },
      {
        name: "Product Fundamentals",
        description: <>Shopify Issued July 2021 - Expired July 2022</>,
      },
      {
        name: "Theme Development",
        description: <>Shopify Issued July 2021 - Expired July 2022</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "",
        description: (
          <>
            Comprehensive full-stack development expertise with 7+ years of experience in building
            scalable web applications, cloud solutions, and cross-platform integrations.
            <br />
            <br />
            <strong>Languages & Tools:</strong> C#, JavaScript (ES6+), TypeScript, SQL, Python,
            HTML5, CSS3/SCSS, Git, VS Code, Postman
            <br />
            <strong>Frontend Development:</strong> React, Redux, Next.js, Angular, Vue, Tailwind
            CSS, Bootstrap, jQuery
            <br />
            <strong>Backend Development:</strong> .NET, Node.js, Express, RESTful APIs, GraphQL,
            PostgreSQL, MySQL, MongoDB
            <br />
            <strong>Cloud & DevOps:</strong> Azure (ADO), AWS, GCP, Docker, Kubernetes, CI/CD
            Pipelines
            <br />
            <strong>Platforms & Analytics:</strong> WordPress, Shopify, HubSpot, Segment, Braze,
            Google Tag Manager, Azure Application Insights
          </>
        ),
        tags: [],
        images: [],
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
