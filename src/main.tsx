import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X, BrainCircuit, Glasses, Gauge, Scan, PanelsTopLeft } from 'lucide-react'
import homeSource from '../dist/index.html?raw'
import aboutSource from '../dist/about.html?raw'
import modalSource from '../dist/modal3d.html?raw'
import epriumSource from '../dist/eprium.html?raw'
import driveSource from '../dist/drivexr.html?raw'
import insightSource from '../dist/insightxr.html?raw'
import defenceSource from '../dist/defence-security.html?raw'
import caseStudySource from '../dist/case-study-xr-readiness.html?raw'
import './hero.css'
import './drivexr.css'
import './eprium-problem.css'
import { epriumPage } from './eprium-page'
import './eprium-page.css'
import { services, serviceMarkup } from './services'
import { insightPlatformMarkup } from './insightxr-sales'
import { productPages, productMarkup, productFeatureMarkup } from './product-pages'
import { drivePage } from './drivexr-story'

const pageSources: Record<string, string> = {
  'index.html': homeSource,
  'about.html': aboutSource,
  'modal3d.html': modalSource,
  'eprium.html': epriumSource,
  'drivexr.html': driveSource,
  'insightxr.html': insightSource,
  'defence-security.html': defenceSource,
  'case-study-xr-readiness.html': caseStudySource,
}

type Page = {
  body: string
  bodyClass: string
  title?: string
  description?: string
}

function extractPage(source: string, isHome: boolean): Page {
  let body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? source
  const bodyClass =
    source.match(/<body[^>]*\bclass=["']([^"']*)["'][^>]*>/i)?.[1]?.trim() ?? ''
  const title = source.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim()
  const description = source
    .match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1]

  body = body.replace(/<script[^>]*src="assets\/site\.js"[^>]*><\/script>/gi, '')
  body = body.replace(/(<a href="insightxr.html">InsightXR<\/a>)/g, '$1<a href="/insightxr-platform.html">InsightXR — Platform version</a>')
  const serviceLinks = services.map(s => `<a href="/${s.slug}.html">${s.title}</a>`).join('')
  body = body.replace(/<a href="(?:index\.html)?#services">Services<\/a>/g, `<div class="nav-item"><button class="nav-trigger">Services</button><div class="dropdown">${serviceLinks}</div></div>`)
  services.forEach(service => {
    const label = service.title === 'Simulator Development' ? 'Explore Simulator Development →' : 'Explore service →'
    if (service.title === 'Simulator Development') body = body.replace(`<a href="#contact">${label}</a>`, `<a href="/${service.slug}.html">${label}</a>`)
    else {
      const marker = `<h3>${service.title}</h3>`
      const start = body.indexOf(marker)
      if (start >= 0) {
        const end = body.indexOf('</article>', start)
        body = body.slice(0, start) + body.slice(start, end).replace('href="#contact"', `href="/${service.slug}.html"`) + body.slice(end)
      }
    }
  })

  if (isHome) {
    const wave = '<div class="home-wave-media" aria-hidden="true"><video autoplay muted loop playsinline preload="metadata"><source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_034306_165449ef-7d2e-4e81-850f-1939c5cb442d.mp4" type="video/mp4"></video></div>'
    body = body.replace('section intro mxr-effect-section', 'section intro')
      .replace(/<div class="mxr-effect-section__media"[\s\S]*?<div class="mxr-effect-section__grid"><\/div><\/div>/, '')
      .replace(/<div class="card-meta"><span class="line-icon">(DS|HS|ET|CS)<\/span><small>\d+<\/small><\/div>/g, '<span class="line-icon">◇</span>')
      .replace('<section class="section process" id="process">', '<section class="section process home-wave-section" id="process">' + wave)
      .replace('<section class="featured-products" id="products" aria-label="Featured products">', '<section class="featured-products home-wave-section" id="products" aria-label="Featured products">' + wave)
      .replace('<section class="final-cta" id="contact">', '<section class="final-cta home-wave-section home-wave-cta" id="contact">' + wave)
    body = body
      .replace(/<header class="site-header"[\s\S]*?<\/header>/i, '')
      .replace(
        /<section class="hero hero-full">[\s\S]*?<\/section>/i,
        '<div id="mxr-react-hero-root"></div>',
      )
  }

  return { body, bodyClass, title, description }
}

type ShinyTextProps = {
  children: string
  duration?: number
  spread?: number
}

function ShinyText({ children, duration = 3, spread = 100 }: ShinyTextProps) {
  return (
    <motion.span
      className="block bg-clip-text text-transparent"
      style={{
        backgroundImage: `linear-gradient(${spread}deg, #64CEFB 0%, #64CEFB 35%, #ffffff 50%, #64CEFB 65%, #64CEFB 100%)`,
        backgroundSize: '250% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      initial={{ backgroundPosition: '-100% 0%' }}
      animate={{ backgroundPosition: '200% 0%' }}
      transition={{ duration, ease: 'linear', repeat: Infinity }}
    >
      {children}
    </motion.span>
  )
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Resources', href: '/case-study-xr-readiness' },
]

function ImmersiveHero() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="mxr-immersive-hero relative h-screen min-h-[700px] overflow-hidden bg-black text-white">
      <video
        className="mxr-immersive-hero__video absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="MXR immersive technology showcase"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.76)_0%,rgba(0,0,0,.22)_32%,rgba(0,0,0,.28)_60%,rgba(0,0,0,.92)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.44),transparent_55%,rgba(0,0,0,.18))]" />
      <div className="mxr-immersive-hero__grid absolute inset-0 opacity-40" />
      <div className="absolute -left-36 top-1/3 h-96 w-96 rounded-full bg-[#0B66C3]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10 xl:px-0">
        <nav className="flex h-24 items-center justify-between gap-6" aria-label="Main navigation">
          <a href="/" className="flex shrink-0 items-center" aria-label="MXR home">
            <img
              src="/assets/mxr-logo.png"
              alt="MXR — Where vision becomes reality"
              className="h-11 w-auto object-contain sm:h-12"
            />
          </a>

          <div className="hidden items-center rounded-full border border-gray-700/80 bg-black/20 p-1.5 backdrop-blur-md lg:flex">
            {navLinks.map((link) => (
              link.label === 'Products' ? <div className="mxr-service-nav" key={link.label}><button type="button" className="rounded-full px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">Products</button><div className="mxr-service-dropdown">{[['MODAL3D','modal3d'],['EPRium','eprium'],['DriveXR','drivexr'],['InsightXR — Existing','insightxr'],['InsightXR — Platform version','insightxr-platform']].map(([label, slug]) => <a href={`/${slug}.html`} key={slug}>{label}</a>)}</div></div> :
              link.label === 'Services' ? <div className="mxr-service-nav" key={link.label}><button type="button" className="rounded-full px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">Services</button><div className="mxr-service-dropdown">{services.map(s => <a href={`/${s.slug}.html`} key={s.slug}>{s.title}</a>)}</div></div> :
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="group ml-1 flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#10263D] transition-all duration-300 hover:bg-[#EEF5FB]"
            >
              Contact us
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/10 lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="absolute left-5 right-5 top-24 z-30 rounded-3xl border border-white/15 bg-black/90 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              {navLinks.map((link) => (
                link.label === 'Products' ? <details className="mxr-mobile-services" key={link.label}><summary>Products</summary>{[['MODAL3D','modal3d'],['EPRium','eprium'],['DriveXR','drivexr'],['InsightXR — Existing','insightxr'],['InsightXR — Platform version','insightxr-platform']].map(([label, slug]) => <a href={`/${slug}.html`} key={slug}>{label}</a>)}</details> :
                link.label === 'Services' ? <details className="mxr-mobile-services" key={link.label}><summary>Services</summary>{services.map(s => <a href={`/${s.slug}.html`} key={s.slug}>{s.title}</a>)}</details> :
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#10263D]"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-1 flex-col justify-start border-t border-white/15 pb-10 pt-[2.5vh] sm:pt-[3.5vh] lg:pt-[4.5vh]">
          <motion.h1
            className="max-w-6xl text-5xl font-medium leading-[.85] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            aria-label="Technology for a Safer, Smarter Tomorrow."
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-white" aria-hidden="true">Technology for a&nbsp;</span>
            <span aria-hidden="true"><ShinyText>Safer, Smarter Tomorrow.</ShinyText></span>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-2xl text-sm leading-6 text-white/80 md:text-base md:leading-7"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65 }}
          >
            We create immersive simulation, XR and AI solutions that help people and
            organisations train, prepare and perform in the real world.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4 md:mt-9"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.65 }}
          >
            <a
              href="#solutions"
              className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition-all duration-300 hover:bg-gray-900 md:px-8 md:py-4 md:text-base"
            >
              Explore Our Solutions
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <span className="text-xs font-semibold uppercase tracking-[.16em] text-white/60">
              People · Skills · Safety · Opportunity
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TechnologyBloom() {
  useEffect(() => { void import('@google/model-viewer') }, [])
  return <div className="technology-bloom about-video-stage" aria-label="Rotating Meta Quest 3 VR headset">
    <div className="quest-model-stage is-active" dangerouslySetInnerHTML={{ __html: '<model-viewer src="/assets/quest-3.glb" poster="/assets/quest-3-poster.png" alt="Meta Quest 3 headset and controllers" auto-rotate rotation-per-second="20deg" auto-rotate-delay="0" camera-orbit="25deg 75deg auto" field-of-view="30deg" shadow-intensity="0.6" exposure="1" environment-image="neutral" interaction-prompt="none" loading="eager"></model-viewer>' }} />
    <div className="about-video-blend" />
    <div className="about-video-label"><Glasses aria-hidden="true" /><div><small>EXPLORE OUR CAPABILITIES</small><strong>XR Development</strong></div></div>
  </div>
}

function App() {
  const routeName = decodeURIComponent(
    window.location.pathname.split('/').filter(Boolean).pop() || 'index',
  )
  const filename = routeName.endsWith('.html') ? routeName : `${routeName}.html`
  const isHome = filename === 'index.html'
  const service = services.find(s => `${s.slug}.html` === filename)
  const page = useMemo(
    () => {
      if (productPages[filename]) {
        const base = extractPage(aboutSource, false)
        const product = productPages[filename]
        let content = productMarkup(filename).replace('<section class="pp-audience">', productFeatureMarkup(filename) + '<section class="pp-audience">')
        if (filename === 'eprium.html') content = epriumPage
        if (filename === 'drivexr.html') content = drivePage
        return { ...base, body: base.body.replace(/<main[\s\S]*?<\/main>/i, content).replace('class="current"', ''), title: `${product.name} | MXR.ai`, description: product.intro }
      }
      if (filename === 'insightxr-platform.html') {
        const base = extractPage(aboutSource, false)
        return { ...base, body: base.body.replace(/<main[\s\S]*?<\/main>/i, insightPlatformMarkup).replace('class="current"', ''), title: 'InsightXR Platform | MXR.ai', description: 'AR and VR device management, content delivery and immersive training insight with InsightXR.' }
      }
      if (service) {
        const base = extractPage(aboutSource, false)
        return { ...base, body: base.body.replace(/<main[\s\S]*?<\/main>/i, serviceMarkup(service.slug)).replace('class="current"', ''), title: `${service.title} | MXR.ai`, description: service.description }
      }
      return extractPage(pageSources[filename] ?? pageSources['index.html'], isHome)
    },
    [filename, isHome],
  )
  const [heroTarget, setHeroTarget] = useState<HTMLElement | null>(null)
  const [aboutTarget, setAboutTarget] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    setHeroTarget(isHome ? document.querySelector('#mxr-react-hero-root') : null)
    setAboutTarget(filename === 'about.html' ? document.querySelector('.about-hero') : null)
  }, [isHome, page.body])

  useEffect(() => {
    if (page.title) document.title = isHome
      ? 'MXR.ai — Immersive Technology for Real-World Impact'
      : page.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta && page.description) meta.setAttribute('content', page.description)

    const legacy = document.createElement('script')
    legacy.src = '/assets/site.js'
    legacy.dataset.mxrInteractions = 'true'
    document.body.appendChild(legacy)
    return () => legacy.remove()
  }, [page, isHome])

  return (
    <>
      <div
        className={['mxr-react-page', page.bodyClass].filter(Boolean).join(' ')}
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
      {heroTarget && createPortal(<ImmersiveHero />, heroTarget)}
      {aboutTarget && createPortal(<TechnologyBloom />, aboutTarget)}
    </>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
