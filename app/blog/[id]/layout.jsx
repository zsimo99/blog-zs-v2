export async function generateMetadata({ params }) {
  const { id } = params
  await startDB()
  const post = await PostModel.findById(id)
  if (!post) return notFound()

  const description = post.detail.replace(/<[^>]+>/g, '').slice(0, 160) // remove all HTML tags

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `${process.env.PUBLIC_NEXT_URL}/blog/${id}`,
      images: post.image ? [post.image] : [], // optional
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.image ? [post.image] : [],
    },
  }
}