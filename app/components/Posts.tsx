import React from "react";
import { getPostsData } from "@/lib/posts";
import Link from "next/link";
import getFormattedDate from "@/lib/getFormattedDate";

const Posts = () => {
  const posts = getPostsData();

  return (
    <section>
      <h2>Blog Posts</h2>
      <ul className="mt-8">
        {posts.map((post) => (
          <li className="border-zinc-500 border mt-4 p-3 rounded-md">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            <br></br>
            <span>{getFormattedDate(post.date)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Posts;
