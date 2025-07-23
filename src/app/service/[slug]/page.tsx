// src/app/service/[slug]/page.tsx
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import {
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  SmartImage,
  Text,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { about, person, service } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "service", "items"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "service", "items"]);
  const post = posts.find((p) => p.slug === slugPath);
  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image
      ? `${baseURL}${post.metadata.image}`
      : `${baseURL}/og?title=${encodeURIComponent(post.metadata.title)}`,
    path: `${service.path}/${post.slug}`,
  });
}

export default async function Service({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getPosts(["src", "app", "service", "items"]).find(
    (p) => p.slug === slugPath
  );
  if (!post) notFound();

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={`${service.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={`${baseURL}/og?title=${encodeURIComponent(post.metadata.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column maxWidth="xs" gap="16">
        <Button
          data-border="rounded"
          href={service.path}
          variant="tertiary"
          weight="default"
          size="s"
          prefixIcon="chevronLeft"
        >
          Services
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      </Column>

      {post.metadata.images?.length > 0 && (
        <SmartImage
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt="image"
          src={post.metadata.images[0]}
        />
      )}

      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <Flex gap="12" marginBottom="24" vertical="center">
          {post.metadata.team && post.metadata.team.length > 0 && (
            <AvatarGroup
              reverse
              size="m"
              avatars={post.metadata.team.map((member) => ({
                src: member.avatar,
              }))}
            />
          )}
          {post.metadata.publishedAt && (
            <Text variant="body-default-s" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt)}
            </Text>
          )}
        </Flex>
        <CustomMDX source={post.content} />
      </Column>
    </Column>
  );
}
