---
title: 'Two Forms of Pre-rendering'
date: '2023-03-14'
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

```javascript
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
```