import { getPostsData, getSinglePostData } from "@/lib/posts";
import React from "react";
import { notFound } from "next/navigation";
import getFormattedDate from "@/lib/getFormattedDate";

export function generateStaticParams() {
  const posts = getPostsData();

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export function generateMetaData({ params }: { params: { postId: string } }) {
  const posts = getPostsData();

  const { postId } = params;

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      title: "Blog post not found",
    };
  }

  return {
    title: post.title,
  };
}

const Page = async ({ params }: { params: { postId: string } }) => {
  const { postId } = params;
  const posts = getPostsData();

  if (!posts.find((post) => post.id === postId)) {
    return notFound();
  }

  const { date, title, content } = await getSinglePostData(postId);

  return (
    <div style={{ padding: "38px" }}>
      <h2 style={{ fontSize: "34px" }}>{title}</h2>
      <p>{getFormattedDate(date)}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
};

export default Page;
