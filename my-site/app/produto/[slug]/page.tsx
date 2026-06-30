// app/produto/[slug]/page.tsx

import { products } from '@/data/products'
import { notFound } from 'next/navigation'
import ProductPage from '@/components/ProductPage/ProductPage'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)
  if (!product) return {}
  return {
    title: `Acordz | ${product.name}`,
    description: product.description,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)
  if (!product) notFound()
  return <ProductPage product={product} />
}