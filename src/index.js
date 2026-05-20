// Google Analytics
import './analytics.js'

// Cookie consent
import './cookie-consent.js'

// Site initialisation
document.addEventListener('DOMContentLoaded', () => {

  // Highlight active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html'
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.setAttribute('aria-current', 'page')
    } else {
      link.removeAttribute('aria-current')
    }
  })

  // Animate service cards on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }, i * 80)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('article.service, article.team-member, .value-item').forEach(el => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = 'opacity .45s ease, transform .45s ease'
    observer.observe(el)
  })

  // Contact form — validation
  const submitBtn = document.querySelector('.submit-btn')
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const email = document.getElementById('email')?.value.trim()
      const fname = document.getElementById('fname')?.value.trim()
      const message = document.getElementById('message')?.value.trim()
      const service = document.getElementById('service')?.value

      if (!fname) return showError('Please enter your first name.')
      if (!email || !email.includes('@')) return showError('Please enter a valid work email.')
      if (!service) return showError('Please select a service.')
      if (!message || message.length < 20) return showError('Please provide a brief project description (min. 20 characters).')

      submitBtn.textContent = 'Sending…'
      submitBtn.disabled = true
      setTimeout(() => {
        submitBtn.textContent = '✓ Brief Received'
        submitBtn.style.background = '#059669'
      }, 1400)
    })
  }

  // Stats counter animation
  document.querySelectorAll('.stat-item .num').forEach(el => {
    el.dataset.target = el.textContent
  })

})

function showError(msg) {
  const existing = document.querySelector('.form-error')
  if (existing) existing.remove()
  const err = document.createElement('p')
  err.className = 'form-error'
  err.style.cssText = 'color:#f87171;font-size:13px;margin-top:10px;text-align:center'
  err.textContent = msg
  document.querySelector('form')?.appendChild(err)
  setTimeout(() => err.remove(), 4000)
}
