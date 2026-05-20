// Cookie consent banner
const COOKIE_KEY = 'orbit_cookie_consent'

function initCookieConsent() {
  if (localStorage.getItem(COOKIE_KEY)) return

  const banner = document.createElement('div')
  banner.style.cssText = `
    position:fixed;bottom:0;left:0;right:0;
    background:#0d1321;border-top:1px solid #1e2a3a;
    padding:16px 64px;display:flex;align-items:center;
    justify-content:space-between;z-index:999;
    font-family:'Segoe UI',sans-serif;font-size:13px;color:#94a3b8;
  `
  banner.innerHTML = `
    <span>We use cookies to improve your experience and analyse site traffic.
    <a href="#" style="color:#6366f1;text-decoration:none">Privacy Policy</a></span>
    <div style="display:flex;gap:10px;flex-shrink:0;margin-left:32px">
      <button id="cookie-decline" style="background:transparent;border:1px solid #1e2a3a;color:#94a3b8;padding:8px 18px;border-radius:6px;cursor:pointer;font-size:13px">Decline</button>
      <button id="cookie-accept" style="background:#6366f1;border:none;color:#fff;padding:8px 18px;border-radius:6px;cursor:pointer;font-size:13px">Accept</button>
    </div>
  `

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(banner)
    document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'accepted')
      banner.remove()
    })
    document.getElementById('cookie-decline').addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'declined')
      banner.remove()
    })
  })
}

initCookieConsent()
