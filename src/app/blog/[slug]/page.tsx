import getContentBySlug from '@/utils/getContentBySlug';

type Props = {
  params: {
    slug: string;
  };
};

export default function PostPage({ params }: Props) {
  const content = getContentBySlug(params.slug);

  return <div>...</div>;
}
