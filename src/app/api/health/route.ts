import fs from "fs";
import path from "path";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  // Get build info from package.json
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  // Generate a unique build signature
  const buildSignature = `${packageJson.name}-${packageJson.version}-${Date.now()}`;

  // Check if this is a Next.js app by looking for Next.js specific globals
  const isNextJs = typeof globalThis !== "undefined" && "next" in globalThis;

  // Check for Gatsby-specific elements that shouldn't exist
  const hasGatsbyElements =
    typeof window !== "undefined" &&
    (document.querySelector("[data-react-helmet]") ||
      document.querySelector(".tl-edges") ||
      (window as any).___gatsby ||
      (window as any).GATSBY);

  return NextResponse.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
      build: {
        name: packageJson.name,
        version: packageJson.version,
        signature: buildSignature,
      },
      framework: {
        isNextJs,
        hasGatsbyElements: !!hasGatsbyElements,
      },
      cache: {
        headers: {
          "cache-control": "no-cache, no-store, must-revalidate",
          pragma: "no-cache",
          expires: "0",
        },
      },
      message: hasGatsbyElements
        ? "WARNING: Gatsby elements detected - cache may be serving old content"
        : "✅ Serving current Next.js content",
    },
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    },
  );
}
