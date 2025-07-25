import React from "react";
import Link from "next/link";
import { service } from "@/app/resources/content";
import { SmartImage } from "@/once-ui/components";

interface ServiceCardProps {
  slug: string;
  title: string;
  summary: string;
  image?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  slug,
  title,
  summary,
  image,
}) => {
  const href = `${service.path}/${slug}`;
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        className="service-card"
        style={{
          border: "1px solid var(--neutral-alpha-medium)",
          borderRadius: "0.5rem",
          overflow: "hidden",
          margin: "1rem 0",
        }}
      >
        {image && <SmartImage src={image} alt={title} aspectRatio="16/9" />}
        <div style={{ padding: "1rem" }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <p style={{ color: "var(--neutral-weak)", margin: "0.5rem 0" }}>
            {summary}
          </p>
          <span style={{ color: "var(--brand)", fontWeight: 600 }}>
            En savoir plus
          </span>
        </div>
      </div>
    </Link>
  );
};
