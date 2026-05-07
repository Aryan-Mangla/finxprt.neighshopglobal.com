import { useMemo, useRef, useState } from 'react'

const SWIPE_THRESHOLD = 55

const ONBOARDING_SLIDES = [
  {
    id: 'welcome',
    title: 'Welcome to FinXpert',
    description:
      'Your all-in-one financial partner. Manage loans, insurance, investments and more in one place.',
  },
  {
    id: 'calculator',
    title: 'Smart Financial Calculators',
    description:
      'Access all financial calculators like EMI, SIP, Loan and Investment planners to make better decisions.',
  },
  {
    id: 'insights',
    title: 'Financial Insights',
    description:
      'Get personalized insights, tips and analytics to grow your money smarter.',
  },
  {
    id: 'growth',
    title: 'Track & Grow Your Finances',
    description:
      'Check your credit score and explore products like loans, insurance and investments easily.',
  },
]

function OnboardIcon({ id }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    width: 54,
    height: 54,
    stroke: 'currentColor',
    strokeWidth: 1.95,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (id === 'welcome') {
    return (
      <svg {...common}>
        <circle cx="8.5" cy="8.5" r="2.5" />
        <circle cx="15.5" cy="8.5" r="2.5" />
        <path d="M4 18v-1.2a3.2 3.2 0 0 1 3.2-3.2h2.6A3.2 3.2 0 0 1 13 16.8V18" />
        <path d="M11 18v-1.2a3.2 3.2 0 0 1 3.2-3.2h2.6a3.2 3.2 0 0 1 3.2 3.2V18" />
      </svg>
    )
  }

  if (id === 'calculator') {
    return (
      <svg {...common}>
        <path d="M4 18h16" />
        <path d="M7.5 15v-5.8" />
        <path d="M12 15V7.8" />
        <path d="M16.5 15v-3.8" />
        <path d="M19 5l-4.2 4.2" />
        <path d="M15 5h4v4" />
      </svg>
    )
  }

  if (id === 'insights') {
    return (
      <svg {...common}>
        <path d="M12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
        <path d="M12 8v4l2.7 1.8" />
        <path d="M7.5 12h1.8" />
        <path d="M14.7 12h1.8" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M6.2 8.4A7.8 7.8 0 0 1 12 5.8a7.8 7.8 0 0 1 7.3 5.1" />
      <path d="M17.8 15.6A7.8 7.8 0 0 1 12 18.2a7.8 7.8 0 0 1-7.3-5.1" />
      <path d="M19.2 8.2v2.8h-2.8" />
      <path d="M4.8 15.8v-2.8h2.8" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  )
}

export default function LoginPage({ onGetStarted }) {
  const [phase, setPhase] = useState('onboarding')
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const touchStartX = useRef(0)

  const [mobile, setMobile] = useState('')
  const [agreed, setAgreed] = useState(false)

  const digits = useMemo(() => mobile.replace(/\D/g, '').slice(0, 10), [mobile])
  const canSubmit = digits.length === 10 && agreed
  const isLast = activeIndex === ONBOARDING_SLIDES.length - 1

  const nextSlide = () => {
    if (isLast) {
      setPhase('form')
      return
    }
    setActiveIndex((v) => Math.min(v + 1, ONBOARDING_SLIDES.length - 1))
  }

  const prevSlide = () => {
    setActiveIndex((v) => Math.max(v - 1, 0))
  }

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0
    setDragging(true)
  }

  const onTouchMove = (e) => {
    const x = e.touches[0]?.clientX ?? 0
    setDragX(x - touchStartX.current)
  }

  const onTouchEnd = () => {
    setDragging(false)
    if (dragX <= -SWIPE_THRESHOLD && activeIndex < ONBOARDING_SLIDES.length - 1) nextSlide()
    else if (dragX >= SWIPE_THRESHOLD && activeIndex > 0) prevSlide()
    setDragX(0)
  }

  if (phase === 'onboarding') {
    return (
      <section className="feOnboarding" aria-label="Onboarding">
        <div
          className="feOnboarding__viewport"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={`feOnboarding__track${dragging ? ' is-dragging' : ''}`}
            style={{ transform: `translate3d(calc(${activeIndex * -100}% + ${dragX}px), 0, 0)` }}
          >
            {ONBOARDING_SLIDES.map((slide) => (
              <article key={slide.id} className="feOnboarding__slide">
                <div className="feOnboarding__brand" aria-label="FinExprt">
                  <span className="feOnboarding__brandFin">Fin</span>
                  <span className="feOnboarding__brandXpert">Exprt</span>
                </div>
                <div className="feOnboarding__iconWrap" aria-hidden="true">
                  <OnboardIcon id={slide.id} />
                </div>
                <h1 className="feOnboarding__title">{slide.title}</h1>
                <p className="feOnboarding__desc">{slide.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="feOnboarding__footer">
          <div className="feOnboarding__dots" aria-label="Onboarding progress">
            {ONBOARDING_SLIDES.map((slide, index) => (
              <span key={slide.id} className={`feOnboarding__dot${index === activeIndex ? ' is-active' : ''}`} />
            ))}
          </div>

          <button type="button" className="feOnboarding__cta" onClick={nextSlide}>
            {isLast ? 'Get Started' : 'Continue'}
          </button>

          <button type="button" className="feOnboarding__skip" onClick={() => setPhase('form')}>
            Skip
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="feLoginPage" aria-label="Login form">
      <div className="feLoginPage__brand" aria-label="FinExprt">
        <span className="feLoginPage__brandFin">Fin</span>
        <span className="feLoginPage__brandXpert">Exprt</span>
      </div>

      <h1 className="feLoginPage__title">Start your financial journey</h1>

      <label className="feLoginField">
        <span className="feLoginField__label">Mobile Number*</span>
        <div className="feLoginField__inputWrap">
          <span className="feLoginField__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.4 2.5a2 2 0 0 1-.6 1.8l-1.1 1.1a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 1.8-.6l2.5.4A2 2 0 0 1 22 16.9z" />
            </svg>
          </span>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            value={digits}
            placeholder="Mobile Number"
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <span className="feLoginField__count">{digits.length}/10</span>
      </label>

      <label className="feLoginCheck">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        <span>
          I agree to the <button type="button">Terms & Conditions</button> and <button type="button">Privacy Policy</button> and to receive regular communication.
        </span>
      </label>

      <button
        type="button"
        className="feLoginPage__cta"
        disabled={!canSubmit}
        onClick={() => onGetStarted?.({ mobile: digits })}
      >
        Get Started
      </button>
    </section>
  )
}
