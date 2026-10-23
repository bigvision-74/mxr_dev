import { useMemo } from 'react'
import { Layout } from '../components/Layout'
import { insightPlatformMarkup } from '../data/insightxr-sales'

export function InsightXRPlatform() {
  const content = useMemo(() => insightPlatformMarkup, [])

  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}
