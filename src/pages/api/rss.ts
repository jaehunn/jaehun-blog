import { NextApiRequest, NextApiResponse } from 'next';
import RSS from 'rss';
import { marked } from 'marked';

import getAllContent from '@/utils/getAllContent';
import { Post as PostType } from '@/types/post';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const allContent = await getAllContent();

  const posts = (allContent ?? [])?.map(({ data, content }) => {
    return {
      ...data,
      body: content,
    };
  }) as PostType[];

  /** Ascending */
  const sortedPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  /** 마크다운을 HTML 로 렌더링 */
  const renderer = new marked.Renderer();
  renderer.link = (href, _, text) => {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  };
  marked.setOptions({
    gfm: true,
    breaks: true,
    renderer,
  });

  const feed = new RSS({
    title: 'Jaehun',
    site_url: 'https://jaehun.dev',
    feed_url: 'https://jaehun.dev/api/rss',
    image_url: `https://jaehun.dev/api/og?title=${encodeURIComponent('JAEHUN DEV')}`,
    language: 'ko',
    description: "Jaehun's personal blog.",
  });

  sortedPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: marked.parse(post?.body),
      date: new Date(post?.createdAt),
      author: 'Bang, Jaehun',
      url: `https://jaehun.dev/blog/${post.slug}`,
      guid: `https://jaehun.dev/blog/${post.slug}`,
    });
  });

  res.setHeader('Content-Type', 'application/rss+xml');
  res.write(
    feed.xml({
      indent: true,
    }),
  );

  res.end();
};

export default handler;
