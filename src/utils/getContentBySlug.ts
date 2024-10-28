import getAllContent from '~/utils/getAllContent'

const getContentBySlug = async (slug: string) => {
  const allContent = await getAllContent()

  return allContent?.find(({ data }) => data.slug === slug)
}

export default getContentBySlug
