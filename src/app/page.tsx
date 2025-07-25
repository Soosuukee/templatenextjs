import React from "react";

import {
  Heading,
  Flex,
  Avatar,
  RevealFx,
  Column,
  SmartLink,
} from "@/once-ui/components";
import { Posts } from "@/components/blog/Posts";
import { getPosts } from "@/app/utils/utils";
import { ServiceCard } from "@/components/ServiceCard";
import { service } from "@/app/resources/content";

import { baseURL, routes } from "@/app/resources";
import { home, about, person } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
  });
}

export default function Home() {
  // Récupère les 2 derniers services
  const servicesList = getPosts(["src", "app", "service", "items"])
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 2);
  // Récupère les 2 derniers articles de blog
  const blogList = getPosts(["src", "app", "blog", "posts"])
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 2);
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}/og?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="start"
            paddingBottom="16"
          >
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="start"
            paddingBottom="32"
          >
            <p
              style={{
                margin: 0,
                color: "var(--neutral-weak)",
                fontSize: "1.25rem",
                textAlign: "center",
              }}
            >
              {home.subline}
            </p>
          </RevealFx>
          <RevealFx
            paddingTop="12"
            delay={0.4}
            horizontal="start"
            paddingLeft="12"
          >
            <a
              id="about"
              href={about.path}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                background: "var(--surface)",
                border: "1px solid var(--neutral-alpha-medium)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Flex gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </a>
          </RevealFx>
        </Column>
      </Column>
      {/* Section services */}
      <Column fillWidth gap="l">
        <Heading
          as="h2"
          marginTop="32"
          marginBottom="16"
          variant="display-strong-s"
        >
          Les services proposée par Jensen
        </Heading>
        {servicesList.map((svc) => (
          <ServiceCard
            key={svc.slug}
            slug={svc.slug}
            title={svc.metadata.title}
            summary={svc.metadata.summary}
            image={svc.metadata.image}
          />
        ))}
        <SmartLink
          href={service.path}
          style={{ display: "block", marginTop: "1rem", color: "var(--brand)" }}
        >
          Voir toutes les prestations de Jensen
        </SmartLink>
      </Column>
      {/* Section blogs */}
      <RevealFx translateY={4} fillWidth delay={0.6}>
        <Heading
          as="h2"
          marginTop="32"
          marginBottom="16"
          variant="display-strong-s"
        >
          Derniers articles
        </Heading>
      </RevealFx>
      <Posts range={[1, 2]} columns="2" thumbnail />
    </Column>
  );
}
