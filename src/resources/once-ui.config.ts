import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailchimpConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";
import { home } from "./index";

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL: string = "http://localhost:3000";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": true,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes: ProtectedRoutesConfig = {
  "/work/automate-design-handovers-with-a-figma-to-code-pipeline": true,
};

// Import and set font for each variant
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// Gaming-themed dark portfolio configuration
// Theme Option 1: Violet Neon Gaming (Current Active)
const style: StyleConfig = {
  theme: "dark", // Force dark mode for gaming aesthetic
  neutral: "slate", // Darker neutral base
  brand: "violet", // Neon violet primary
  accent: "magenta", // Bright magenta accents
  solid: "color", // Rich color fills
  solidStyle: "plastic", // Glossy gaming UI feel
  border: "playful", // Rounded gaming style borders
  surface: "translucent", // Glass-like surfaces
  transition: "all", // Smooth gaming animations
  scaling: "105", // Slightly larger for visibility
};

// Alternative Gaming Themes (uncomment to switch):
// Theme Option 2: Midnight Forest
// const style: StyleConfig = {
//   theme: "dark",
//   neutral: "gray",
//   brand: "emerald",
//   accent: "moss",
//   solid: "contrast",
//   solidStyle: "flat",
//   border: "rounded",
//   surface: "filled",
//   transition: "macro",
//   scaling: "100",
// };

// Theme Option 3: Campfire Glow
// const style: StyleConfig = {
//   theme: "dark",
//   neutral: "sand", 
//   brand: "orange",
//   accent: "red",
//   solid: "color",
//   solidStyle: "plastic",
//   border: "playful",
//   surface: "translucent",
//   transition: "all",
//   scaling: "100",
// };

const dataStyle: DataStyleConfig = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

// Gaming atmospheric effects configuration
const effects: EffectsConfig = {
  mask: {
    cursor: true, // Interactive cursor glow
    x: 50,
    y: 0,
    radius: 120, // Larger glow radius
  },
  gradient: {
    display: true, // Enable atmospheric gradient
    opacity: 80, // Subtle but visible
    x: 30,
    y: 20,
    width: 120,
    height: 80,
    tilt: 15, // Slight angle for dynamism
    colorStart: "brand-background-strong",
    colorEnd: "accent-background-weak",
  },
  dots: {
    display: true, // Gaming particle effect
    opacity: 60, // More visible particles
    size: "3", // Slightly larger particles
    color: "brand-background-medium",
  },
  grid: {
    display: false, // Keep clean for now
    opacity: 30,
    color: "brand-alpha-weak",
    width: "0.5rem",
    height: "0.5rem",
  },
  lines: {
    display: true, // Subtle tech lines
    opacity: 20,
    color: "accent-alpha-weak",
    size: "32",
    thickness: 1,
    angle: 30, // Gaming-style diagonal
  },
};

const mailchimp: MailchimpConfig = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

// default schema data
const schema: SchemaConfig = {
  logo: "",
  type: "Organization",
  name: "Once UI",
  description: home.description,
  email: "lorant@once-ui.com",
};

// social links
const sameAs: SameAsConfig = {
  threads: "https://www.threads.com/@once_ui",
  linkedin: "https://www.linkedin.com/company/once-ui/",
  discord: "https://discord.com/invite/5EyAQ4eNdS",
};

// social sharing configuration for blog posts
const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
};
