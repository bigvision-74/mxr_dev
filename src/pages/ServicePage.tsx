import { useMemo } from 'react'
import { Layout } from '../components/Layout'
import { serviceMarkup } from '../data/services'

type Props = { slug: string }

export function ServicePage({ slug }: Props) {
  const content = useMemo(() => serviceMarkup(slug), [slug])

  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}
