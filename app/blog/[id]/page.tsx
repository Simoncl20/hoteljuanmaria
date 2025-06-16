import BlogDetail from '../../components/blog/blogDetail';

interface PageProps {
  params: {
    id: string;
  };
}

export default function BlogPage({ params }: PageProps) {
  return <BlogDetail slug={params.id} />;
}
