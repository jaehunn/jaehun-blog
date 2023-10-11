import getAllContent from '@/utils/getAllContent';

const getContentBySlug = async (slug: string) => {
  const allContent = await getAllContent();

  const content = allContent?.find((content) => content?.['slug'] === slug);

  return content;
};

export default getContentBySlug;
