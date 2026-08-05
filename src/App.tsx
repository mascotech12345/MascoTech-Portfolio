import { useState, useEffect } from 'react'

const projects = [
  {
    title: 'Holubuadey Auto',
    role: 'Frontend developer',
    stack: 'React · TypeScript · Vite · Tailwind',
    desc: 'Premium quality automobile sales and tracking web application with modular product displays and fully responsive search layout.',
    href: 'https://vercel.app',
  },
  {
    title: 'Kriz Graphics & Publicity',
    role: 'Full-stack developer',
    stack: 'React · TypeScript · Firebase · Vite',
    desc: 'Business website with online booking, live order-status tracking, admin dashboard and gallery management for a print & design studio in Ibadan.',
    href: 'https://vercel.app',
  },
  {
    title: 'Mufti Laundry Spot',
    role: 'Frontend developer',
    stack: 'HTML · CSS · JavaScript · Bootstrap',
    desc: 'Responsive service website for a laundry business, with a working contact form and WhatsApp integration.',
    href: 'https://vercel.app',
  },
]

const skills = [
  { name: 'JavaScript / TypeScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'HTML / CSS', level: 93 },
  { name: 'Firebase', level: 78 },
]

function StatusPanel() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  
  const ibadanTime = time.toLocaleTimeString('en-GB', {
    timeZone: 'Africa/Lagos',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className="status-panel">
      <div className="status-header">
        <span className="terminal-dot red"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot green"></span>
        <span className="terminal-title">system_dossier</span>
      </div>
      <div className="status-body">
        <div className="status-row">
          <span className="pulse-dot" />
          <span className="mono status-active">STATUS: AVAILABLE FOR HIRE</span>
        </div>
        <div className="status-row">
          <span className="mono muted">LOCATION: Ibadan, Nigeria</span>
        </div>
        <div className="status-row">
          <span className="mono muted">LOCAL TIME: {ibadanTime}</span>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '')
      setFormData(prev => ({ ...prev, [name]: numericValue }))
      return
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault()
    
    // const baseNumber = '2349028224453'
    const formattedText = `Hello MASCOTECH, you have a new portfolio inquiry!%0A%0A` +
                          `*Name:* ${encodeURIComponent(formData.name)}%0A` +
                          `*Phone:* ${encodeURIComponent(formData.phone)}%0A` +
                          `*Email:* ${encodeURIComponent(formData.email)}%0A%0A` +
                          `*Message:*%0A${encodeURIComponent(formData.message)}`
    
    window.open(`https://wa.me{baseNumber}?text=${formattedText}`, '_blank')
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-container">
          <span className="brand">
            MASCO<span className="brand-accent">TECH</span>
          </span>
          <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact" className="nav-cta">Contact</a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-text-block">
              <span className="eyebrow">DEVELOPMENT ENVIRONMENT</span>
              <h1>
                Mamoud<br />
                <span className="gradient-text">a.k.a. MASCOTECH</span>
              </h1>
              <p className="lead">
                I build blazing fast, highly structured, real-world web applications — from automation booking ecosystems to premium user dashboards.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn-primary">Explore Work</a>
                <a href="#contact" className="btn-secondary">Get In Touch</a>
              </div>
            </div>
            <StatusPanel />
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-header">
            <span className="field-label">01 PROFILE</span>
            <h2>About Me</h2>
          </div>
          <p className="body-text">
            I am a performance-driven frontend and backend developer focused on building scalable websites that optimize workflows for real-world businesses. My technical emphasis circles around engineering responsive layouts, live asynchronous data synchronization, and state management systems using React and TypeScript.
          </p>
        </section>

        <section id="projects" className="section">
          <div className="section-header">
            <span className="field-label">02 PRODUCTION BUILD</span>
            <h2>Recent Operations</h2>
          </div>
          <div className="project-grid">
            {projects.map(p => (
              <a key={p.title} href={p.href} target="_blank" rel="noreferrer" className="project-card">
                <div className="card-top">
                  <span className="mono role-tag">{p.role}</span>
                  <span className="arrow-icon">↗</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="mono stack">{p.stack}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-header">
            <span className="field-label">03 CORE COMPETENCIES</span>
            <h2>Tech Stack</h2>
          </div>
          <div className="skills-grid-layout">
            <div className="skills-list">
              {skills.map(s => (
                <div key={s.name} className="skill-row">
                  <span className="mono skill-name">{s.name}</span>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ width: `${s.level}%` }} />
                  </div>
                  <span className="mono skill-percent">{s.level}%</span>
                </div>
              ))}
            </div>
            
            <div className="philosophy-panel">
              <span className="mono philosophy-title">ENGINEERING PRINCIPLES</span>
              <ul className="philosophy-list">
                <li>
                  <strong>Clean Architecture</strong>
                  <p>Writing structured, highly componentized code designed for scaling.</p>
                </li>
                <li>
                  <strong>Performance First</strong>
                  <p>Ensuring lightning-fast paint states, zero bundle bloat, and optimized response loops.</p>
                </li>
                <li>
                  <strong>User Centric Design</strong>
                  <p>Structuring interfaces that are accessible, lightning fast, and highly intuitive.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section-header">
            <span className="field-label">04 COMMUNICATIONS</span>
            <h2>Drop A Line</h2>
          </div>
          <div className="contact-grid">
            <form onSubmit={handleWhatsAppRedirect} className="contact-form">
              <div className="input-stack">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
                <input 
                  type="text" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="phone" 
                  placeholder="Your Phone Number (Digits only)" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email Address" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <textarea 
                name="message" 
                rows={5} 
                placeholder="Tell me about your project pipeline..." 
                value={formData.message}
                onChange={handleInputChange}
                required 
              />
              <button type="submit" className="btn-submit">Send via WhatsApp</button>
            </form>
            
            <div className="contact-sidebar">
              <div className="meta-box">
                <span className="mono label">DIRECT EMAIL</span>
                <span className="mono value">mascotech12345@gmail.com</span>
              </div>
              <div className="meta-box">
                <span className="mono label">WHATSAPP LINE</span>
                <span className="mono value">+234 902 822 4453</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span className="mono muted">© 2026 Mamoud (MASCOTECH)</span>
      </footer>
    </div>
  )
}
