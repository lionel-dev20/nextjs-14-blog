import { Card, CardContent } from "@/components/ui/card";
import { SimplBlogeCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(){
 const query = `*[_type=='blog'] | order(_createdAt desc) {
  title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
}`;

const data = await client.fetch(query);
return data;

}

export default async function Home() {
  const data: SimplBlogeCard[] = await getData();  
 return(
  <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
    {data.map( (post, idx) =>(
      <Card key={idx}>
        <Image src={urlFor(post.titleImage).url()} alt=""  width={1200} height={450} layout="responsive" className="rounded-t-lg"/>
        <CardContent className="mt-5">
          <h2 className="text-lg font-bold line-clamp-2"> {post.title} </h2>
          <p className="text-sm line-clamp-3 mt-3 text-gray-600 dark:text-gray-300">{post.smallDescription}</p>
          <Button asChild className="w-full mt-7">
            <Link href={`/blog/${post.currentSlug}`}>Read More</Link>    
          </Button>
        </CardContent>
      </Card> 
    ))}
  </div> 
 )
}
