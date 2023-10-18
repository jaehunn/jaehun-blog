import { MetadataRoute } from 'next';

import getAllContent from '@/utils/getAllContent';

/** @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allContent = await getAllContent();

  const routes = ['', 'blog'].map((route) => ({
    url: `https://jaehun.dev/${route}`,
    lastModified: new Date().toISOString(),
  }));

  const posts =
    allContent?.map((post) => {
      return {
        url: `https://jaehun.dev/blog/${post.data?.slug}`,
        lastModified: new Date(post.data?.updatedAt).toISOString(),
      };
    }) ?? [];

  return [...routes, ...posts];
}
