"use client";
import React, { type JSX } from "react";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiVercel, SiGithubactions, SiContentful } from "react-icons/si";
import { FaCode } from "react-icons/fa";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  githubPage?: string;
  technologies?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  githubPage,
  technologies = [],
}) => {
  return (
    <Column fillWidth gap="m">
      <Flex style={{ height: '100%' }}>
        <div className="carousel-viewport-fix w-full h-full max-h-none overflow-hidden" style={{ flex: 1 }}>
          <Carousel
            sizes="(max-width: 960px) 100vw, 960px"
            items={Array.isArray(images) ? images.map((img) => ({ slide: img, alt: title })) : []}
          />
        </div>
      </Flex>
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5} direction="column" align="start" gap="4">
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
            {technologies.length > 0 && (
              <Flex gap="8" align="center" style={{ marginTop: 4, flexWrap: 'wrap' }}>
                {(technologies.slice(0, 6)).map((tech) => (
                  <span key={tech} title={tech} style={{ fontSize: 16, fontWeight: 500, padding: '0 8px', whiteSpace: 'nowrap' }}>
                    {tech}
                  </span>
                ))}
              </Flex>
            )}
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">Read case study</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">View project</Text>
                </SmartLink>
              )}
              <SmartLink
                style={{ margin: "0", width: "fit-content" }}
                href={
                  githubPage
                    ? `${process.env.NEXT_PUBLIC_GITHUB_URL?.replace(/\/?$/, "/")}${githubPage}`
                    : process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text variant="body-default-s">Github</Text>
              </SmartLink>
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
