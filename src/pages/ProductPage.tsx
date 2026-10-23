import { useMemo } from 'react'
import { Layout } from '../components/Layout'
import { productMarkup, productFeatureMarkup } from '../data/product-pages'
import { epriumPage } from '../data/eprium-page'
import { drivePage } from '../data/drivexr-story'

type Props = { slug: string }

export function ProductPage({ slug }: Props) {
  const filename = `${slug}.html`
  const content = useMemo(() => {
    if (filename === 'eprium.html') return epriumPage
    if (filename === 'drivexr.html') return drivePage
    return productMarkup(filename).replace(
      '<section class="pp-audience">',
      productFeatureMarkup(filename) + '<section class="pp-audience">',
    )
  }, [filename])

  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}
