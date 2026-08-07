import { useState, useEffect } from 'react'

interface Project {
  title: string
  role: string
  stack: string
  desc: string
  href: string
}

interface Skill {
  name: string
  level: number
}

interface NavLink {
  href: string
  label: string
}

const projects: Project[] = [
  {
    title: 'Holubuadey Auto',
    role: 'Frontend developer',
    stack: 'React · TypeScript · Vite · Tailwind',
    desc: 'Premium quality automobile sales and tracking web application with modular product displays and fully responsive search layout.',
    href: 'https://holubuadeyautos.vercel.app/',
  },
  {
    title: 'Kriz Graphics & Publicity',
    role: 'Full-stack developer',
    stack: 'React · TypeScript · Firebase · Vite',
    desc: 'Business website with online booking, live order-status tracking, admin dashboard and gallery management for a print & design studio in Ibadan.',
    href: 'https://krizgraphicsandpublicity.vercel.app/',
  },
  {
    title: 'Mufti Laundry Spot',
    role: 'Frontend developer',
    stack: 'HTML · CSS · JavaScript · Bootstrap',
    desc: 'Responsive service website for a laundry business, with a working contact form and WhatsApp integration.',
    href: 'https://muftilaundryspot.vercel.app/',
  },
]

const skills: Skill[] = [
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 88 },
  { name: 'React', level: 85 },
  { name: 'Next.js', level: 80 },
  { name: 'Firebase', level: 78 },
  { name: 'Node.js', level: 82 },
  { name: 'REST APIs', level: 87 },
  { name: 'Git & GitHub', level: 91 },
  { name: 'MongoDB', level: 75 },
  { name: 'Docker', level: 70 },
]

const services = [
  {
    title: "Frontend Development",
    icon: "💻",
    description:
      "Building modern, responsive and high-performance user interfaces using React, TypeScript and Next.js."
  },
  {
    title: "Backend Development",
    icon: "⚙️",
    description:
      "Developing secure backend solutions with Firebase, REST APIs and scalable cloud services."
  },
  {
    title: "UI / UX Design",
    icon: "🎨",
    description:
      "Designing clean, responsive interfaces focused on usability, accessibility and performance."
  },
  {
    title: "Website Maintenance",
    icon: "🛠️",
    description:
      "Improving existing websites, fixing bugs, optimizing speed and deploying new features."
  },
  {
    title: "Database Design",
    icon: "🗄️",
    description:
      "Designing secure and scalable Firestore databases with efficient data structures and real-time synchronization."
  },
  {
    title: "Deployment & Hosting",
    icon: "🚀",
    description:
      "Deploying fast, production-ready applications using Vercel, Firebase Hosting and modern deployment workflows."
  }
]

const stats = [
  {
    number: "10+",
    label: "Technologies",
    description: "Modern tools and frameworks"
  },
  {
    number: "15+",
    label: "Projects",
    description: "Completed successfully"
  },
  {
    number: "100%",
    label: "Responsive",
    description: "Desktop, tablet & mobile"
  },
  {
    number: "24/7",
    label: "Support",
    description: "Available for clients"
  }
]

const navLinks: NavLink[] = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

function useRevealOnScroll(): void {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = document.querySelectorAll<HTMLElement>('.reveal')
    if (prefersReduced) {
      targets.forEach(t => t.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    targets.forEach(t => observer.observe(t))
    return () => observer.disconnect()
  }, [])
}

function useActiveSection(): string {
  const [active, setActive] = useState<string>('')
  useEffect(() => {
    const sections = navLinks
      .map(l => document.querySelector(l.href))
      .filter((el): el is Element => el !== null)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive('#' + entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])
  return active
}

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

  const ibadanDate = time.toLocaleDateString('en-GB', {
    timeZone: 'Africa/Lagos',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  })

  return (
    <div className="status-panel reveal">
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
        <div className="status-row">
          <span className="mono muted">DATE: {ibadanDate}</span>
        </div>
      </div>
    </div>
  )
}

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' })
  const [menuOpen, setMenuOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useRevealOnScroll()
  const activeSection = useActiveSection()

  useEffect(() => {

    const circles = document.querySelectorAll(".circle-progress")

    const observer = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if(entry.isIntersecting){

            entry.target.classList.add("animate")

            observer.unobserve(entry.target)

          }

        })

      },

      { threshold:0.4 }

    )

    circles.forEach(circle => observer.observe(circle))

    return () => observer.disconnect()

  }, []) 

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '')
      setFormData(prev => ({ ...prev, [name]: numericValue }))
      return
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppRedirect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)

    const baseNumber = '2349028224453'
    const formattedText =
      `Hello MASCOTECH, i need a website!%0A%0A` +
      `*Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `*Email:* ${encodeURIComponent(formData.email)}%0A%0A` +
      `*Message:*%0A${encodeURIComponent(formData.message)}`

    window.open(`https://wa.me/${baseNumber}?text=${formattedText}`, '_blank')

    setTimeout(() => {
      setSending(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 900)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-container">
          <div className="brand">
            MASCO<span className="brand-accent">TECH</span>
          </div>
          <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={activeSection === link.href ? "active-link" : ""}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              className="nav-cta"
              onClick={closeMenu}
            >
              Contact
            </a>
          </nav>
          <button
              type="button"
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(!menuOpen)}
          >
              {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-text-block reveal">
              <span className="eyebrow">DEVELOPMENT ENVIRONMENT</span>
              <h1>
                Mamoud<br />
                <span className="gradient-text">a.k.a. MASCOTECH</span>
              </h1>
              <p className="lead">
                I build blazing fast, highly structured, real-world web applications — from automation booking ecosystems to premium user dashboards.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn-primary">Explore work</a>
                <a href="#contact" className="btn-secondary">Get in touch</a>
              </div>
            </div>
            <StatusPanel />
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-header reveal">
            <span className="field-label">01 PROFILE</span>
            <h2>About me</h2>
          </div>
          <p className="body-text reveal">
            I am a performance-driven frontend and backend developer focused on building scalable websites that optimize workflows for real-world businesses. My technical emphasis circles around engineering responsive layouts, live asynchronous data synchronization, and state management systems using React and TypeScript.
          </p>
        </section>

        <section id="stats" className="section">

          <div className="section-header reveal">

            <span className="field-label">
              02 AT A GLANCE
            </span>

            <h2>By the numbers</h2>

          </div>

          <div className="stats-grid">

            {stats.map((stat) => (

              <div
                key={stat.label}
                className="stat-card reveal"
              >

                <h3>{stat.number}</h3>

                <h4>{stat.label}</h4>

                <p>{stat.description}</p>

              </div>

            ))}

          </div>

        </section>

        <section id="services" className="section">

          <div className="section-header reveal">

            <span className="field-label">
              03 SERVICES
            </span>

            <h2>What I Can Do</h2>

            <p className="body-text">
              I build complete digital experiences, from intuitive interfaces to
              scalable backend systems that help businesses grow.
            </p>

          </div>

          <div className="services-grid">

            {services.map(service => (

              <div
                key={service.title}
                className="service-card reveal"
              >

                <div className="service-icon">

                  {service.icon}

                </div>

                <h3>

                  {service.title}

                </h3>

                <p>

                  {service.description}

                </p>

              </div>

            ))}

          </div>

        </section>

        <section id="projects" className="section">
          <div className="section-header reveal">
            <span className="field-label">02 PRODUCTION BUILD</span>
            <h2>Recent operations</h2>
          </div>
          <div className="project-grid">
            {projects.map(p => (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="project-card reveal"
              >
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
          <div className="section-header reveal">
            <span className="field-label">03 CORE COMPETENCIES</span>
            <h2>Tech stack</h2>
          </div>
          <div className="skills-grid-layout">
            <div className="skills-cards">
              {skills.map((skill) => {
                const radius = 48
                const circumference = 2 * Math.PI * radius
                return (
                  <div key={skill.name} className="skill-card reveal">

                    <h3 className="skill-title">{skill.name}</h3>

                    <div className="circle-wrapper">

                      <svg
                        className="progress-ring"
                        width="140"
                        height="140"
                      >
                        <defs>

                          <linearGradient
                            id="skillGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >

                            <stop
                              offset="0%"
                              stopColor="#8b5cf6"
                            />

                            <stop
                              offset="100%"
                              stopColor="#3b82f6"
                            />

                          </linearGradient>

                        </defs>
                        <circle
                          className="circle-bg"
                          strokeWidth="12"
                          r={radius}
                          cx="70"
                          cy="70"
                        />

                       <circle
                        className="circle-progress"
                        strokeWidth="12"
                        r={radius}
                        cx="70"
                        cy="70"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        style={
                          {
                            "--progress": circumference - (skill.level / 100) * circumference,
                          } as React.CSSProperties
                        }
                      />
                      </svg>

                      <div className="circle-text">
                        {skill.level}%
                      </div>

                    </div>

                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="approach" className="section">

          <div className="section-header reveal">
            <span className="field-label">04 DEVELOPMENT APPROACH</span>
            <h2>How I Work</h2>
          </div>

          <div className="approach-grid">

            <div className="approach-card reveal">

              <span className="mono approach-title">
                ENGINEERING PRINCIPLES
              </span>

              <p className="approach-description">
                Every project I build is guided by software engineering best practices,
                ensuring clean, scalable and maintainable solutions that remain reliable
                as products grow.
              </p>

              <ul>

                <li>
                  <strong>Clean Architecture</strong><br />
                  Organizing code into reusable, modular components.
                </li>

                <li>
                  <strong>Performance First</strong><br />
                  Optimizing speed, responsiveness and bundle size.
                </li>

                <li>
                  <strong>Scalable Components</strong><br />
                  Building systems that can easily grow with new features.
                </li>

                <li>
                  <strong>Maintainable Codebase</strong><br />
                  Writing readable code that's easy to debug and extend.
                </li>

                <li>
                  <strong>Accessibility Focus</strong><br />
                  Designing experiences that everyone can use comfortably.
                </li>

              </ul>

            </div>

            <div className="approach-card reveal">

              <span className="mono approach-title">
                DEVELOPMENT WORKFLOW
              </span>

              <p className="approach-description">
                From the first idea to deployment, I follow a structured workflow that
                keeps projects organized, efficient and easy to maintain throughout the
                development lifecycle.
              </p>

              <ul>

                <li>
                  <strong>Project Planning</strong><br />
                  Understanding requirements and creating a development roadmap.
                </li>

                <li>
                  <strong>Responsive UI Development</strong><br />
                  Building interfaces that work seamlessly across all devices.
                </li>

                <li>
                  <strong>REST API Integration</strong><br />
                  Connecting applications to secure backend services.
                </li>

                <li>
                  <strong>Firebase Backend</strong><br />
                  Implementing authentication, databases and cloud services.
                </li>

                <li>
                  <strong>Testing & Deployment</strong><br />
                  Verifying quality before publishing applications to production.
                </li>

              </ul>

            </div>

          </div>

        </section>

        <section id="contact" className="section">
          <div className="section-header reveal">
            <span className="field-label">05 COMMUNICATIONS</span>
            <h2>Drop a line</h2>
          </div>
          <div className="contact-grid">
            <form onSubmit={handleWhatsAppRedirect} className="contact-form reveal">
              <div className="input-stack">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="phone"
                  placeholder="Your phone number (digits only)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
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
              <button type="submit" className="btn-submit" disabled={sending}>
                {sending ? 'Opening WhatsApp…' : 'Send via WhatsApp'}
              </button>
            </form>

            <div className="contact-sidebar reveal">
                <span className="mono label">DIRECT EMAIL</span>
              <a className="meta-box link-box" href="mailto:mascotech12345@gmail.com">
                <span className="mono value">mascotech12345@gmail.com</span>
              </a>
              <span className="mono label">WHATSAPP LINE</span>
              <a
                className="meta-box link-box"
                href="https://wa.me/2349028224453"
                target="_blank"
                rel="noreferrer"
              >
                <span className="mono value">+234 902 822 4453</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">

        <div className="footer-grid">

          <div className="footer-brand">

            <h2>
              MASCO<span className="brand-accent">TECH</span>
            </h2>

            <p>
              Frontend & Full Stack Developer building fast,
              scalable and modern web applications.
            </p>

          </div>

          <div className="footer-links">

            <h4>Navigation</h4>

            <a href="#about">About</a>

            <a href="#services">Services</a>

            <a href="#projects">Projects</a>

            <a href="#skills">Skills</a>

            <a href="#approach">Approach</a>

            <a href="#contact">Contact</a>

          </div>

          <div className="footer-contact">

            <h4>Contact</h4>

            <a href="mailto:mascotech12345@gmail.com">
              mascotech12345@gmail.com
            </a>

            <a
              href="https://wa.me/2349028224453"
              target="_blank"
              rel="noreferrer"
            >
              +234 902 822 4453
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

          </div>

        </div>

        <div className="footer-bottom">

          <span>

            © {new Date().getFullYear()} MASCOTECH.
            All Rights Reserved.

          </span>

        </div>

      </footer>

      <button
        type="button"
        className={`back-to-top ${showTop ? 'show' : ''}`}
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        ↑
      </button>
    </div>
  )
}