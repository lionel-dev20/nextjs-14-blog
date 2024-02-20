import { FullBlogArticle } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import { revalidateTag } from "next/cache";
import Image from "next/image";

export const revalidate = 30;

async function getData(slug: string) {
  const query = `* [_type =="blog" && slug.current == '${slug}']
    {
      "currentSlug": slug.current,
        title,
        content,
        titleImage
    }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: FullBlogArticle = await getData(params.slug);
  return (
    <div className="mt-8">
      <h1>
        <span className="text-primary block text-base text-center font-semibold tracking-wide uppercase">
          Liolio-Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt=""
        width={1200}
        height={450}
        layout="responsive"
        priority
        className="mt-8 rounded-lg border"
      />

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert">
        <PortableText value={data.content} />

      </div>
    </div>
  );
}
