import { Metadata } from "next";
import { notFound } from "next/navigation";

import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";

type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());

  return {
    title: prismic.asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());

  return (
    <section>
      Movie
    </section>
  )
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page", {
    predicates: [prismic.filter.not("my.page.uid", "home")],
  });

  return pages.map((page) => {
    return { uid: page.uid };
  });
}