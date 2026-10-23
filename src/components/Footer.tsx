import mxrLogo from '../assets/images/mxr-logo.png'

export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <a href="/" className="brand brand-logo" aria-label="MXR home">
            <img src={mxrLogo} alt="MXR" />
          </a>
          <p>Immersive technology for defence, healthcare and professional training.</p>
          <div className="socials">
            <a href="https://www.linkedin.com/company/mxr-ai" aria-label="MXR on LinkedIn">in</a>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h3>Services</h3>
            <a href="/simulator-development">Simulator Development</a>
            <a href="/xr-development">XR Development</a>
            <a href="/immersive-rooms">Immersive Rooms</a>
            <a href="/ai-solutions">AI Solutions</a>
            <a href="/platform-development">Platform Development</a>
          </div>
          <div>
            <h3>Products</h3>
            <a href="/modal3d">Modal3D</a>
            <a href="/insightxr">XR Training</a>
            <a href="/drivexr">DriveXR</a>
            <a href="/eprium">Eprium</a>
          </div>
          <div>
            <h3>Company</h3>
            <a href="/about">About</a>
            <a href="/case-study-xr-readiness">Resources</a>
            <a href="mailto:hello@mxr.ai">Contact</a>
          </div>
          <div>
            <h3>Connect</h3>
            <a href="mailto:hello@mxr.ai">hello@mxr.ai</a>
            <a href="https://www.linkedin.com/company/mxr-ai">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 MXR. All rights reserved.</p>
        <div>
          <a href="/about">About</a>
          <a href="mailto:hello@mxr.ai">Contact</a>
        </div>
      </div>
    </footer>
  )
}
