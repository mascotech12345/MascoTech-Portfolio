import { useState, useEffect, useRef } from 'react'

interface Project {
  title: string
  role: string
  stack: string
  desc: string
  href: string
  repo: string
}

interface Skill {
  name: string
  level: number
}

interface NavLink {
  href: string
  label: string
}

interface Stat {
  value: number
  suffix: string
  label: string
  description: string
}

interface Testimonial {
  name: string
  role: string
  quote: string
}

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const projects: Project[] = [
  {
    title: 'Holubuadey Auto',
    role: 'Frontend developer',
    stack: 'React · TypeScript · Vite · Tailwind',
    desc: 'Premium quality automobile sales and tracking web application with modular product displays and fully responsive search layout.',
    href: 'https://holubuadeyautos.vercel.app/',
    repo: 'https://github.com/mascotech12345/holubuadey-auto',
  },
  {
    title: 'Kriz Graphics & Publicity',
    role: 'Full-stack developer',
    stack: 'React · TypeScript · Firebase · Vite',
    desc: 'Business website with online booking, live order-status tracking, admin dashboard and gallery management for a print & design studio in Ibadan.',
    href: 'https://krizgraphicsandpublicity.vercel.app/',
    repo: 'https://github.com/mascotech12345/kriz-graphics-publicity',
  },
  {
    title: 'Mufti Laundry Spot',
    role: 'Frontend developer',
    stack: 'HTML · CSS · JavaScript · Bootstrap',
    desc: 'Responsive service website for a laundry business, with a working contact form and WhatsApp integration.',
    href: 'https://muftilaundryspot.vercel.app/',
    repo: 'https://github.com/mascotech12345/mufti-laundry-spot',
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

const stats: Stat[] = [
  {
    value: 10,
    suffix: '+',
    label: 'Technologies',
    description: 'Modern tools and frameworks'
  },
  {
    value: 15,
    suffix: '+',
    label: 'Projects',
    description: 'Completed successfully'
  },
  {
    value: 100,
    suffix: '%',
    label: 'Responsive',
    description: 'Desktop, tablet & mobile'
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Support',
    description: 'Available for clients'
  }
]

const testimonials: Testimonial[] = [
  {
    name: 'Omogbolahan',
    role: 'Mufti Laundry Spot',
    quote: 'Mamoud built us a clean, responsive site with a contact form that actually works and a direct WhatsApp link — customers reach us faster now.',
  },
  {
    name: 'Olyjey',
    role: 'Kriz Graphics & Publicity',
    quote: 'From online booking to live order tracking and an admin dashboard, he understood exactly what our studio needed and delivered a site that runs itself.',
  },
  {
    name: 'Abdulqudus',
    role: 'Holubuadey Auto',
    quote: 'The site looks premium and the search actually works well on mobile, which is where most of our customers browse from.',
  },
]

const navLinks: NavLink[] = [
  { href: '#about', label: 'About' },
  { href: '#stats', label: 'At a Glance' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#approach', label: 'Approach' },
  { href: '#testimonials', label: 'Testimonials' },
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
          } else {
            entry.target.classList.remove('is-visible')
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
  const [active, setActive] = useState('')

  useEffect(() => {
    const sections = navLinks
      .map(link => document.querySelector(link.href))
      .filter((el): el is Element => el !== null)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )

        if (visibleSections.length > 0) {
          setActive(`#${visibleSections[0].target.id}`)
        }
      },
      {
        rootMargin: '-25% 0px -60% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    )

    sections.forEach(section => observer.observe(section))

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
    <div className="status-panel hero-in-delay">
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

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setCount(stat.value)
      return
    }

    let frame: number

    const runCount = () => {
      const duration = 1400
      const startTime = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * stat.value))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }

      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            cancelAnimationFrame(frame)
            setCount(0)
            runCount()
          } else {
            cancelAnimationFrame(frame)
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [stat.value])

  return (
    <div
      ref={ref}
      className="stat-card reveal"
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      <h3>
        {count}
        <span className="stat-suffix">{stat.suffix}</span>
      </h3>
      <h4>{stat.label}</h4>
      <p>{stat.description}</p>
    </div>
  )
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [menuOpen, setMenuOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useRevealOnScroll()
  const activeSection = useActiveSection()

  useEffect(() => {

    const circles = document.querySelectorAll(".circle-progress")

    const observer = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if(entry.isIntersecting){

            entry.target.classList.remove("animate")

            void (entry.target as HTMLElement).offsetWidth

            entry.target.classList.add("animate")

          } else {

            entry.target.classList.remove("animate")

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const title = 'MASCOTECH — Frontend & Full Stack Developer'
    const description =
      'Portfolio of Mamoud (MASCOTECH), a frontend and full-stack developer building fast, scalable web applications with React, TypeScript and Firebase.'

    document.title = title

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, key)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
  }, [])

  useEffect(() => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#0a0a0c'/><text x='32' y='44' font-family='monospace' font-size='34' font-weight='700' fill='#a855f7' text-anchor='middle'>M</text></svg>`
    const dataUri = `data:image/svg+xml,${encodeURIComponent(svg)}`
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = dataUri
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

  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    if (!formData.name.trim()) {
      errors.name = 'Enter your name'
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Enter your phone number'
    } else if (formData.phone.trim().length < 7) {
      errors.phone = 'That number looks too short'
    }

    if (!formData.email.trim()) {
      errors.email = 'Enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Enter a valid email address'
    }

    if (!formData.message.trim()) {
      errors.message = 'Tell me a bit about your project'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleWhatsAppRedirect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

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
      setFormErrors({})
    }, 1200)
  }

  const closeMenu = () => setMenuOpen(false)

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    closeMenu()
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => {
        setCopiedField(prev => (prev === field ? null : prev))
      }, 2000)
    } catch {
      // Clipboard API unavailable — fail silently, the value is still visible to copy manually.
    }
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-container">
          <a href="#" className="brand" onClick={scrollToTop}>
            MASCO<span className="brand-accent">TECH</span>
          </a>
          <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={activeSection === link.href ? 'active-link' : ''}
                onClick={closeMenu}
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
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(prev => !prev)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-text-block hero-in">
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
                <a href="/Mamoud.pdf" download className="btn-secondary">Download CV</a>
              </div>
            </div>
            <StatusPanel />
          </div>
        </section>

        <section id="about" className="section reveal">
          <div className="section-header">
            <span className="field-label reveal">01 PROFILE</span>
            <h2 className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>About me</h2>
          </div>
          <p className="body-text reveal" style={{ '--reveal-delay': '200ms' } as React.CSSProperties}>
            I am a performance-driven frontend and backend developer focused on building scalable websites that optimize workflows for real-world businesses. My technical emphasis circles around engineering responsive layouts, live asynchronous data synchronization, and state management systems using React and TypeScript.
          </p>
        </section>

        <section id="stats" className="section reveal">

          <div className="section-header">
            <span className="field-label reveal">
              02 AT A GLANCE
            </span>
            <h2 className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>By the numbers</h2>
          </div>

          <div className="stats-grid">

            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={i * 100} />
            ))}

          </div>

        </section>

        <section id="services" className="section reveal">

          <div className="section-header">
            <span className="field-label reveal">
              03 SERVICES
            </span>
            <h2 className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>What I Can Do</h2>
            <p className="body-text reveal" style={{ '--reveal-delay': '200ms' } as React.CSSProperties}>
              I build complete digital experiences, from intuitive interfaces to
              scalable backend systems that help businesses grow.
            </p>
          </div>

          <div className="services-grid">

            {services.map((service, i) => (

              <div
                key={service.title}
                className="service-card reveal"
                style={{ '--reveal-delay': `${(i % 3) * 100}ms` } as React.CSSProperties}
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

        <section id="projects" className="section reveal">
          <div className="section-header">
            <span className="field-label reveal">04 PRODUCTION BUILD</span>
            <h2 className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>Recent operations</h2>
          </div>
          <div className="project-grid">
            {projects.map((p, i) => (
              <div
                key={p.title}
                className="project-card reveal"
                style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}
              >
                <div className="card-top">
                  <span className="mono role-tag">{p.role}</span>
                  <div className="card-links">
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="card-icon-link"
                      aria-label={`View source code for ${p.title}`}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z"
                        />
                      </svg>
                    </a>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="card-icon-link"
                      aria-label={`View live site for ${p.title}`}
                    >
                      <span className="arrow-icon">↗</span>
                    </a>
                  </div>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="mono stack">{p.stack}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="section reveal">
          <div className="section-header">
            <span className="field-label reveal">05 CORE COMPETENCIES</span>
            <h2 className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>Tech stack</h2>
          </div>
          <div className="skills-grid-layout">
            <div className="skills-cards">
              {skills.map((skill, i) => {
                const radius = 48
                const circumference = 2 * Math.PI * radius
                return (
                  <div
                    key={skill.name}
                    className="skill-card reveal"
                    style={{ '--reveal-delay': `${(i % 5) * 80}ms` } as React.CSSProperties}
                  >

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

        <section id="approach" className="section reveal">

          <div className="section-header">
            <span className="field-label reveal">06 DEVELOPMENT APPROACH</span>
            <h2 className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>How I Work</h2>
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

            <div className="approach-card reveal" style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>

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

        <section id="testimonials" className="section reveal">

          <div className="section-header">
            <span className="field-label reveal">07 TESTIMONIALS</span>
            <h2 className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>What clients say</h2>
          </div>

          <div className="testimonials-grid">

            {testimonials.map((t, i) => (
              <div
                key={t.name + i}
                className="testimonial-card reveal"
                style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}
              >
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-role">{t.role}</span>
                </div>
              </div>
            ))}

          </div>

        </section>

        <section id="contact" className="section reveal">
          <div className="section-header">
            <span className="field-label reveal">08 COMMUNICATIONS</span>
            <h2 className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>Drop a line</h2>
          </div>
          <div className="contact-grid">
            <form onSubmit={handleWhatsAppRedirect} className="contact-form reveal" noValidate>
              <div className="input-stack">
                <div className="field-wrap">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    aria-label="Your name"
                    aria-invalid={!!formErrors.name}
                    className={formErrors.name ? 'has-error' : ''}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {formErrors.name && <span className="field-error">{formErrors.name}</span>}
                </div>
                <div className="field-wrap">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="phone"
                    placeholder="Your phone number (digits only)"
                    aria-label="Your phone number"
                    aria-invalid={!!formErrors.phone}
                    className={formErrors.phone ? 'has-error' : ''}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {formErrors.phone && <span className="field-error">{formErrors.phone}</span>}
                </div>
                <div className="field-wrap">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    aria-label="Your email address"
                    aria-invalid={!!formErrors.email}
                    className={formErrors.email ? 'has-error' : ''}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && <span className="field-error">{formErrors.email}</span>}
                </div>
              </div>
              <div className="field-wrap">
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project pipeline..."
                  aria-label="Project details"
                  aria-invalid={!!formErrors.message}
                  className={formErrors.message ? 'has-error' : ''}
                  value={formData.message}
                  onChange={handleInputChange}
                />
                {formErrors.message && <span className="field-error">{formErrors.message}</span>}
              </div>
              <button type="submit" className="btn-submit" disabled={sending} aria-busy={sending}>
                {sending ? 'Opening WhatsApp…' : 'Send via WhatsApp'}
              </button>
            </form>

            <div className="contact-sidebar reveal">

              <div className="contact-intro">
                <span className="mono label">COMMUNICATION CHANNELS</span>
                <p>
                  Choose the channel that works best for you.
                </p>
              </div>

              {/* EMAIL */}
              <div className="contact-channel-wrapper">
                <a
                  className="contact-channel"
                  href="mailto:mascotech12345@gmail.com"
                >
                  <div className="channel-icon email-icon">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 5h18v14H3V5zm0 0 9 7 9-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="channel-content">
                    <span className="channel-name">EMAIL</span>
                    <span className="channel-description">
                      Let's discuss your project
                    </span>
                    <span className="channel-value">
                      mascotech12345@gmail.com
                    </span>
                  </div>

                  <span className="channel-arrow">↗</span>
                </a>
                <button
                  type="button"
                  className={`copy-btn ${copiedField === 'email' ? 'copied' : ''}`}
                  onClick={() => copyToClipboard('mascotech12345@gmail.com', 'email')}
                  aria-label="Copy email address"
                >
                  {copiedField === 'email' ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12l5 5L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  )}
                </button>
              </div>

              {/* WHATSAPP */}
              <div className="contact-channel-wrapper">
                <a
                  className="contact-channel"
                  href="https://wa.me/2349028224453"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="channel-icon whatsapp-icon">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.6 5.96L.1 24l6.28-1.65a11.88 11.88 0 0 0 5.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9a11.82 11.82 0 0 0-3.47-8.42ZM12.09 21.78h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.84 9.84 0 0 1-1.51-5.26C2.22 6.47 6.65 2.04 12.09 2.04c2.64 0 5.12 1.03 6.98 2.89a9.8 9.8 0 0 1 2.89 6.98c0 5.44-4.43 9.87-9.87 9.87Zm5.42-7.4c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
                      />
                    </svg>
                  </div>

                  <div className="channel-content">
                    <span className="channel-name">WHATSAPP</span>
                    <span className="channel-description">
                      Fastest way to reach me
                    </span>
                    <span className="channel-value">
                      +234 902 822 4453
                    </span>
                  </div>

                  <span className="channel-arrow">↗</span>
                </a>
                <button
                  type="button"
                  className={`copy-btn ${copiedField === 'phone' ? 'copied' : ''}`}
                  onClick={() => copyToClipboard('+2349028224453', 'phone')}
                  aria-label="Copy phone number"
                >
                  {copiedField === 'phone' ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12l5 5L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  )}
                </button>
              </div>

              {/* GITHUB */}
              <a
                className="contact-channel"
                href="https://github.com/mascotech12345"
                target="_blank"
                rel="noreferrer"
              >
                <div className="channel-icon github-icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z"
                    />
                  </svg>
                </div>

                <div className="channel-content">
                  <span className="channel-name">GITHUB</span>
                  <span className="channel-description">
                    Explore my development work
                  </span>
                  <span className="channel-value">
                    github.com/mascotech12345
                  </span>
                </div>

                <span className="channel-arrow">↗</span>
              </a>

            </div>
          </div>
        </section>
      </main>

      <footer className="footer">

        <div className="footer-grid">

          <div className="footer-brand reveal">

            <h2>
              MASCO<span className="brand-accent">TECH</span>
            </h2>

            <p>
              Frontend & Full Stack Developer building fast,
              scalable and modern web applications.
            </p>

          </div>

          <div className="footer-links reveal" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>

            <h4>Navigation</h4>

            <a href="#about">About</a>

            <a href="#services">Services</a>

            <a href="#projects">Projects</a>

            <a href="#skills">Skills</a>

            <a href="#approach">Approach</a>

            <a href="#testimonials">Testimonials</a>

            <a href="#contact">Contact</a>

          </div>

          <div className="footer-contact reveal" style={{ '--reveal-delay': '160ms' } as React.CSSProperties}>

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
              href="https://github.com/mascotech12345"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
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

      {sending && (
        <div className="toast" role="status">
          <span className="toast-dot" />
          Redirecting to WhatsApp…
        </div>
      )}

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