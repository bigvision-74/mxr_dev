import { useState, useEffect } from 'react'
import { Home } from '../pages/Home'
import { About } from '../pages/About'
import { DefenceSecurity } from '../pages/DefenceSecurity'
import { CaseStudy } from '../pages/CaseStudy'
import { ProductPage } from '../pages/ProductPage'
import { ServicePage } from '../pages/ServicePage'
import { InsightXRPlatform } from '../pages/InsightXRPlatform'
import { services } from '../data/services'
import { productPages } from '../data/product-pages'
import '../styles/hero.css'
import '../styles/drivexr.css'
import '../styles/eprium-problem.css'
import '../styles/eprium-page.css'

const productSlugs = Object.keys(productPages).map(k => k.replace('.html', ''))
const serviceSlugs = services.map(s => s.slug)

export function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.includes('#') || e.metaKey || e.ctrlKey || e.shiftKey) return
      e.preventDefault()
      const clean = href.replace(/\.html$/, '')
      if (clean === window.location.pathname) return
      history.pushState(null, '', clean)
      setPath(clean)
      window.scrollTo(0, 0)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    const legacy = document.createElement('script')
    legacy.src = '/site.js'
    legacy.dataset.mxrInteractions = 'true'
    document.body.appendChild(legacy)
    return () => legacy.remove()
  }, [path])

  const route = decodeURIComponent(
    path.split('/').filter(Boolean).pop() || 'index',
  ).replace(/\.html$/, '')

  if (route === 'index' || route === '') return <Home />
  if (route === 'about') return <About />
  if (route === 'defence-security') return <DefenceSecurity />
  if (route === 'case-study-xr-readiness') return <CaseStudy />
  if (route === 'insightxr-platform') return <InsightXRPlatform />
  if (productSlugs.includes(route)) return <ProductPage slug={route} />
  if (serviceSlugs.includes(route)) return <ServicePage slug={route} />

  return <Home />
}
