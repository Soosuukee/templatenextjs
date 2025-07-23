import { Column } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { about, person, service } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";
import { Services } from "@/components/service/Services";

export async function generateMetadata() {
  return Meta.generate({
    title: service.title,
    description: service.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(service.title)}`,
    path: service.path,
  });
}

export default function Service() {
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={service.path}
        title={service.title}
        description={service.description}
        image={`${baseURL}/og?title=${encodeURIComponent(service.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Services />
    </Column>
  );
}
