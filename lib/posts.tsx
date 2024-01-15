import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "blogpost");

export const getPostsData = () => {
  const postNames = fs.readdirSync(postsDirectory);

  const postsData = postNames.map((name) => {
    const postId = name.replace(/\.md$/, "");

    const postPath = path.join(postsDirectory, name);

    const postData = fs.readFileSync(postPath, "utf-8");

    const matterResult = matter(postData);

    const blogPost: BlogPost = {
      id: postId,
      title: matterResult.data.title,
      date: matterResult.data.date,
    };

    return blogPost;
  });

  return postsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getSinglePostData = async (postId: string) => {
  const postPath = path.join(postsDirectory, `${postId}.md`);

  const postContent = fs.readFileSync(postPath, "utf-8");

  const matterResult = matter(postContent);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const htmlContent = processedContent.toString();

  const blogHtml: BlogPost & { content: string } = {
    id: postId,
    title: matterResult.data.title,
    date: matterResult.data.date,
    content: htmlContent,
  };

  return blogHtml;
};
