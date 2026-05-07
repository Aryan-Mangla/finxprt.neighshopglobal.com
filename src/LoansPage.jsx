import { useEffect, useMemo, useState } from 'react'

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function navigateHash(route) {
  if (typeof window === 'undefined') return
  window.location.hash = `#/${route}`
}

function LoanStoreIcon({ name }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    width: 22,
    height: 22,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'personal':
      return (
        <svg {...common}>
          <path d="M4 20h16" />
          <path d="M6 20V10l6-5 6 5v10" />
          <path d="M10 20v-6h4v6" />
        </svg>
      )
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 10.5V21h14V10.5" />
        </svg>
      )
    case 'car':
      return (
        <svg {...common}>
          <path d="M5 16l1-6h12l1 6" />
          <path d="M6.5 10l1.2-3h8.6l1.2 3" />
          <path d="M7 16v2" />
          <path d="M17 16v2" />
          <path d="M7.5 14h.01" />
          <path d="M16.5 14h.01" />
        </svg>
      )
    case 'business':
      return (
        <svg {...common}>
          <path d="M4 20V8l8-4 8 4v12" />
          <path d="M8 20V10" />
          <path d="M12 20V10" />
          <path d="M16 20V10" />
        </svg>
      )
    case 'gold':
      return (
        <svg {...common}>
          <path d="M7 9h10l-1.2 10H8.2L7 9z" />
          <path d="M9 9V7a3 3 0 0 1 6 0v2" />
        </svg>
      )
    case 'edu':
      return (
        <svg {...common}>
          <path d="M22 10L12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c0 1 3 2 6 2s6-1 6-2v-5" />
        </svg>
      )
    case 'lap':
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M7 17V9a5 5 0 0 1 10 0v8" />
          <path d="M9 11h6" />
          <path d="M10 6.5h4" />
        </svg>
      )
    case 'mf':
      return (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M12 19V9" />
          <path d="M20 19V12" />
          <path d="M4 15h16" />
        </svg>
      )
    case 'against':
      return (
        <svg {...common}>
          <path d="M12 2l7 4v6c0 6-7 10-7 10S5 18 5 12V6l7-4z" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M12 6v12" />
          <path d="M6 12h12" />
        </svg>
      )
  }
}

function LoanStoreCategoryIcon({ name }) {
  const iconImageMap = {
    personal: 'https://img.icons8.com/color/96/loan.png',
    business: 'https://img.icons8.com/color/96/organization.png',
    car: 'https://img.icons8.com/color/96/car-rental.png',
    home: 'https://img.icons8.com/color/96/home.png',
    lap: '/lap-icon.png',
  }

  const imageSrc = iconImageMap[name]
  if (imageSrc) {
    return <img className="feLoanStoreCatCard__imgIcon" src={imageSrc} alt="" loading="lazy" decoding="async" />
  }

  // Filled-ish illustrative SVGs (loans related).
  // Kept inline so no external image loading is required.
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 64 64',
    width: 52,
    height: 52,
    fill: 'none',
    'aria-hidden': true,
  }

  switch (name) {
    case 'personal':
      return (
        <svg {...common}>
          <rect x="10" y="14" width="44" height="36" rx="14" fill="#eef6ff" />
          <rect x="16" y="21" width="32" height="24" rx="10" fill="#22c55e" opacity="0.15" />

          {/* Money notes */}
          <rect x="17" y="21" width="30" height="26" rx="10" fill="#16a34a" opacity="0.95" />
          <rect x="20" y="24" width="24" height="20" rx="8" fill="#ffffff" opacity="0.2" />

          {/* $ symbol */}
          <path
            d="M31 26v16"
            stroke="#0f172a"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M26.5 31c1.2-2.5 4.1-3.7 6.8-2.9 2.1.6 3.2 2 2.7 3.6-.7 2.2-4.7 2-6.8 2.5-2.2.5-3.2 1.9-2.6 3.6.7 1.9 3 2.8 5.7 2.4 1.9-.3 3.3-1.2 4-2.4"
            stroke="#0f172a"
            strokeWidth="3.6"
            fill="none"
            strokeLinecap="round"
            opacity="0.45"
          />

          {/* small token */}
          <circle cx="22" cy="43" r="6.5" fill="#f59e0b" opacity="0.95" />
          <path d="M19 43h6" stroke="#0b2e5b" strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
        </svg>
      )
    case 'business':
      return (
        <svg {...common}>
          <rect x="12" y="16" width="40" height="36" rx="14" fill="#e8f2ff" />
          <rect x="18" y="22" width="28" height="24" rx="10" fill="#ffffff" opacity="0.35" />

          {/* Briefcase */}
          <path d="M22 30h20v18H22V30z" fill="#1d4ed8" opacity="0.12" />
          <rect x="22" y="30" width="20" height="18" rx="6" fill="#1d4ed8" opacity="0.14" stroke="#2563eb" strokeWidth="3" />
          <path d="M26 30v-6h12v6" fill="#93c5fd" opacity="0.6" stroke="#2563eb" strokeWidth="3" strokeLinejoin="round" />

          {/* growth bars */}
          <rect x="26" y="41" width="4" height="7" rx="2" fill="#2563eb" opacity="0.9" />
          <rect x="32.5" y="39" width="4" height="9" rx="2" fill="#1d4ed8" opacity="0.8" />
          <rect x="39" y="37" width="4" height="11" rx="2" fill="#60a5fa" opacity="0.9" />

          <path d="M21 48h22" stroke="#1d4ed8" strokeWidth="3.2" strokeLinecap="round" opacity="0.35" />
        </svg>
      )
    case 'car':
      return (
        <svg {...common}>
          <rect x="10" y="18" width="44" height="32" rx="14" fill="#e8f7ff" />
          {/* wheels */}
          <circle cx="24" cy="46" r="6.5" fill="#0f172a" opacity="0.15" />
          <circle cx="24" cy="46" r="5.5" fill="#0f172a" opacity="0.75" />
          <circle cx="40" cy="46" r="6.5" fill="#0f172a" opacity="0.15" />
          <circle cx="40" cy="46" r="5.5" fill="#0f172a" opacity="0.75" />

          {/* body */}
          <path d="M18 42l4-12h20l4 12H18z" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" strokeLinejoin="round" />
          <path d="M22 36h18" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
          <path d="M30 30l2-5h6l2 5" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
          <path d="M16 42h28" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        </svg>
      )
    case 'home':
      return (
        <svg {...common}>
          <rect x="10" y="18" width="44" height="36" rx="14" fill="#f1f8ff" />
          {/* roof */}
          <path d="M20 34l12-10 12 10" fill="#fdba74" opacity="0.75" stroke="#f97316" strokeWidth="3.2" strokeLinejoin="round" />
          {/* body */}
          <rect x="20" y="36" width="24" height="22" rx="8" fill="#bbf7d0" opacity="0.45" stroke="#22c55e" strokeWidth="3" />
          {/* door */}
          <rect x="30" y="44" width="4" height="14" rx="2" fill="#16a34a" opacity="0.75" />
          {/* windows */}
          <rect x="22" y="41" width="6" height="5" rx="2" fill="#60a5fa" opacity="0.35" />
          <rect x="36" y="41" width="6" height="5" rx="2" fill="#60a5fa" opacity="0.35" />
        </svg>
      )
    case 'lap':
      return (
        <svg {...common}>
          <rect x="12" y="16" width="40" height="36" rx="14" fill="#fff7ed" />
          {/* bricks */}
          <rect x="18" y="24" width="28" height="12" rx="4" fill="#fb923c" opacity="0.18" />
          <g opacity="0.95">
            <rect x="18" y="24" width="10" height="10" rx="2.2" fill="#f97316" opacity="0.7" />
            <rect x="29" y="24" width="9" height="10" rx="2.2" fill="#fb923c" opacity="0.7" />
            <rect x="39.5" y="24" width="6.5" height="10" rx="2.2" fill="#f97316" opacity="0.55" />
            <rect x="18" y="34" width="10" height="10" rx="2.2" fill="#fb923c" opacity="0.7" />
            <rect x="29" y="34" width="9" height="10" rx="2.2" fill="#f97316" opacity="0.65" />
            <rect x="39.5" y="34" width="6.5" height="10" rx="2.2" fill="#fb923c" opacity="0.55" />
          </g>
          {/* coin */}
          <circle cx="24" cy="46" r="6.2" fill="#22c55e" opacity="0.14" />
          <circle cx="24" cy="46" r="5.2" fill="#22c55e" opacity="0.7" />
          <path d="M22 46h4" stroke="#0b2e5b" strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />
        </svg>
      )
    case 'gold':
      return (
        <svg {...common}>
          <rect x="12" y="16" width="40" height="36" rx="14" fill="#fff7ed" />
          <circle cx="32" cy="34" r="16" fill="#fffbeb" stroke="#f59e0b" strokeWidth="3.6" opacity="0.95" />
          <path d="M26 42l6-16 6 16H26z" fill="#f59e0b" opacity="0.2" />
          {/* rupee mark */}
          <path
            d="M29 29h8"
            stroke="#b45309"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M32 29l-3 6c2 0 5 1 7 3" stroke="#b45309" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.9" />
          <path d="M29 38h12" stroke="#b45309" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        </svg>
      )
    case 'edu':
      return (
        <svg {...common}>
          <rect x="12" y="16" width="40" height="36" rx="14" fill="#eef2ff" />
          {/* cap */}
          <path d="M18 26l14-8 14 8-14 8-14-8z" fill="#312e81" opacity="0.9" />
          <path d="M22 30l10 6 10-6" stroke="#4f46e5" strokeWidth="3.2" strokeLinejoin="round" fill="none" opacity="0.35" />
          <path d="M32 28v12" stroke="#4f46e5" strokeWidth="3.2" strokeLinecap="round" opacity="0.55" />
          {/* tassel */}
          <path d="M40 34c0 6-12 8-12-2" stroke="#6366f1" strokeWidth="3.2" strokeLinecap="round" fill="none" opacity="0.55" />
          {/* small building base */}
          <rect x="24" y="44" width="16" height="6" rx="3" fill="#4f46e5" opacity="0.22" />
        </svg>
      )
    case 'mf':
      return (
        <svg {...common}>
          <rect x="12" y="16" width="40" height="36" rx="14" fill="#eef2ff" />
          {/* multicolor bars */}
          <rect x="20" y="30" width="8" height="14" rx="3" fill="#6366f1" opacity="0.9" />
          <rect x="28" y="26" width="8" height="18" rx="3" fill="#22c55e" opacity="0.9" />
          <rect x="36" y="34" width="8" height="10" rx="3" fill="#f59e0b" opacity="0.95" />

          {/* chart bubble */}
          <path d="M18 46h28" stroke="#818cf8" strokeWidth="3.2" strokeLinecap="round" opacity="0.35" />

          {/* coin rings */}
          <circle cx="26" cy="24" r="3.6" fill="#22c55e" opacity="0.18" />
          <circle cx="40" cy="27" r="3.6" fill="#f59e0b" opacity="0.18" />
        </svg>
      )
    default:
      return <LoanStoreIcon name="personal" />
  }
}

function calcEmi({ principal, annualRatePct, tenureYears }) {
  const P = Math.max(0, principal)
  const annual = Math.max(0, annualRatePct) / 100
  const n = Math.max(1, Math.round(tenureYears * 12))
  const r = annual / 12
  const monthly = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const totalPayment = monthly * n
  const totalInterest = Math.max(0, totalPayment - P)
  return { monthly, totalInterest }
}

function formatLakhCompact(value) {
  const lakh = value / 100000
  return `₹ ${lakh.toFixed(1)} L`
}

function MiniEmiCard({ reduceMotion = false }) {
  const MIN = 50000
  const MAX = 5000000

  const [amount, setAmount] = useState(2500000)
  const [annualRatePct] = useState(10.5)
  const [tenureYears] = useState(5)

  const emi = useMemo(() => calcEmi({ principal: amount, annualRatePct, tenureYears }), [amount, annualRatePct, tenureYears])

  // For a closer “static screenshot feel”, we just animate on mount.
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    if (reduceMotion) {
      setAnimate(true)
      return
    }
    const t = setTimeout(() => setAnimate(true), 120)
    return () => clearTimeout(t)
  }, [reduceMotion])

  const fill = ((amount - MIN) / (MAX - MIN)) * 100
  const safeFill = clamp(fill, 0, 100)

  return (
    <section className="feLoanStoreMiniCard feLoanStoreMiniCard--emi" aria-label="EMI Calculator card">
      <div className="feLoanStoreMiniCard__top">
        <div className="feLoanStoreMiniCard__title">EMI Calculator</div>
        <span className="feLoanStoreMiniChip" aria-hidden="true">
          Flexible Rates
        </span>
      </div>

      <div className="feLoanStoreMiniCard__amountRow">
        <div className="feLoanStoreMiniCard__amountLabel">Loan Amount</div>
        <div className="feLoanStoreMiniCard__amount">{formatINR(amount)}</div>
      </div>

      <div className="feLoanStoreMiniCard__rangeWrap">
        <input
          className="feRange"
          type="range"
          min={MIN}
          max={MAX}
          step={10000}
          value={amount}
          style={{ '--fill': `${safeFill}%` }}
          aria-label="Loan amount"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      <div className="feLoanStoreMiniCard__divider" aria-hidden="true" />

      <div className="feLoanStoreMiniCard__results" aria-label="EMI results">
        <div className="feLoanStoreMiniResult">
          <div className="feLoanStoreMiniResult__label">MONTHLY EMI</div>
          <div className={`feLoanStoreMiniResult__value ${animate ? 'is-animate' : ''}`}>
            {formatINR(emi.monthly)}
          </div>
        </div>
        <div className="feLoanStoreMiniResult">
          <div className="feLoanStoreMiniResult__label">TOTAL INTEREST</div>
          <div className="feLoanStoreMiniResult__value feLoanStoreMiniResult__value--accent">
            {formatLakhCompact(emi.totalInterest)}
          </div>
        </div>
      </div>
    </section>
  )
}

function MiniCibilCard({ reduceMotion = false }) {
  const [score, setScore] = useState(785)
  const [delta] = useState(4)
  const [animate, setAnimate] = useState(false)

  const pct = useMemo(() => clamp((score - 300) / 600, 0, 1), [score])
  // Screenshot matches a single orange ring.
  const ringColor = '#f59e0b'

  useEffect(() => {
    if (reduceMotion) {
      setAnimate(true)
      return
    }
    const t = setTimeout(() => setAnimate(true), 120)
    return () => clearTimeout(t)
  }, [reduceMotion])

  return (
    <section className="feLoanStoreMiniCard feLoanStoreMiniCard--cibil" aria-label="CIBIL score card">
      <div
        className="feHomeCibilCard"
        role="button"
        tabIndex={0}
        onClick={() => navigateHash('cibil')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            navigateHash('cibil')
          }
        }}
        aria-label="Open CIBIL page"
      >
        <div className="feHomeCibilCard__ambient" aria-hidden="true" />

        <div className="feHomeCibilCard__title">Check Your CIBIL Score</div>

        <div className="feHomeCibilCard__gaugeWrap">
          <div className="feHomeCibilRingWrap">
            <div
              className={`feHomeCibilRing ${animate ? 'is-animate' : ''}`}
              style={{ '--p': pct, '--home-cibil-ring': ringColor }}
              aria-hidden="true"
            >
              <svg
                className="feHomeCibilRing__svg"
                viewBox="0 0 120 120"
                style={{ display: 'block', overflow: 'visible' }}
              >
                <circle className="feHomeCibilRing__track" cx="60" cy="60" r="46" />
                <circle
                  className="feHomeCibilRing__progress"
                  cx="60"
                  cy="60"
                  r="46"
                  pathLength="100"
                />
              </svg>
              <div className="feHomeCibilRing__center">
                <div className="feHomeCibilRing__score">{score}</div>
                <div className="feHomeCibilRing__status">/ 900</div>
              </div>
            </div>
          </div>
        </div>

        <div className="feHomeCibilCard__disclaimer">
          Get your credit report and personal loan offers instantly.
        </div>
        <div className="feHomeCibilCard__powered">
          Powered by trusted partner insights
          {delta > 0 ? <span className="feHomeCibilCard__tu"> · +{delta} pts</span> : null}
        </div>

        <button
          type="button"
          className="feHomeCibilCard__btn feHomeCibilCard__btn--primary"
          onClick={() => navigateHash('cibil')}
          aria-label="Check score"
        >
          <span className="feHomeCibilCard__btnInner">
            CHECK SCORE
            <span aria-hidden="true">→</span>
          </span>
        </button>
      </div>
    </section>
  )
}

function FintechBannerCarousel() {
  const banners = useMemo(
    () => [
      {
        id: 'b1',
        tone: 'purple',
        tag: 'Festive Offer',
        title: 'Zero Processing Fee',
        subtitle: 'Valid on Personal Loans till Oct 30',
        cta: 'Apply Now →',
        route: 'application_form',
      },
      {
        id: 'b2',
        tone: 'cyan',
        tag: 'Instant Approval',
        title: 'Get Loan in 5 Minutes',
        subtitle: 'Fast approval with minimum documents',
        cta: 'Apply Now →',
        route: 'eligibility_form',
      },
      {
        id: 'b3',
        tone: 'indigo',
        tag: 'Credit Cards',
        title: 'Pre-approved Credit Cards',
        subtitle: 'Check eligibility without affecting score',
        cta: 'Check Now →',
        route: 'credit_card_offers',
      },
      {
        id: 'b4',
        tone: 'sky',
        tag: 'Investments',
        title: 'Invest in Mutual Funds',
        subtitle: 'Start with just ₹500',
        cta: 'Explore Now →',
        route: 'mutual_funds',
      },
      {
        id: 'b5',
        tone: 'navy',
        tag: 'Free Service',
        title: 'Check Your CIBIL Score Free',
        subtitle: 'No hidden charges, instant result',
        cta: 'Check Now →',
        route: 'cibil',
      },
    ],
    [],
  )

  const [active, setActive] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % banners.length)
    }, 3000)
    return () => clearInterval(t)
  }, [banners.length])

  const onTouchStart = (e) => {
    setTouchStartX(e.touches[0]?.clientX ?? null)
    setTouchDeltaX(0)
  }

  const onTouchMove = (e) => {
    if (touchStartX == null) return
    const currentX = e.touches[0]?.clientX ?? touchStartX
    setTouchDeltaX(currentX - touchStartX)
  }

  const onTouchEnd = () => {
    const threshold = 36
    if (touchDeltaX <= -threshold) setActive((prev) => (prev + 1) % banners.length)
    else if (touchDeltaX >= threshold) setActive((prev) => (prev - 1 + banners.length) % banners.length)
    setTouchStartX(null)
    setTouchDeltaX(0)
  }

  return (
    <section className="feFintechBanner" aria-label="Featured offers">
      <div
        className="feFintechBanner__viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="feFintechBanner__track" style={{ transform: `translateX(calc(${-active * 100}% + ${touchDeltaX}px))` }}>
          {banners.map((b) => (
            <article key={b.id} className={`feFintechBanner__slide feFintechBanner__slide--${b.tone}`}>
              <div className="feFintechBanner__decor feFintechBanner__decor--a" aria-hidden="true" />
              <div className="feFintechBanner__decor feFintechBanner__decor--b" aria-hidden="true" />
              <div className="feFintechBanner__tag">{b.tag}</div>
              <div className="feFintechBanner__title">{b.title}</div>
              <div className="feFintechBanner__sub">{b.subtitle}</div>
              <button
                type="button"
                className="feFintechBanner__cta"
                onClick={() => navigateHash(b.route)}
              >
                {b.cta}
              </button>
            </article>
          ))}
        </div>
      </div>

      <div className="feFintechBanner__dots" role="tablist" aria-label="Offer indicators">
        {banners.map((b, idx) => (
          <button
            key={b.id}
            type="button"
            className={`feFintechBanner__dot ${idx === active ? 'is-active' : ''}`}
            onClick={() => setActive(idx)}
            aria-label={`Show banner ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

function LoanTopBannerCarousel() {
  const banners = useMemo(
    () => [
      {
        id: 'l1',
        kicker: 'WHY CHOOSE US',
        title: 'One Search.\n50+ Partners.',
        sub: 'Get the lowest interest rates with trusted partners, curated by India\'s top financial experts.',
        cta: 'Connect with Expert',
        route: 'eligibility_form',
        tone: 'navy',
      },
      {
        id: 'l2',
        kicker: 'INSTANT APPROVAL',
        title: 'Personal Loan\nin 5 Minutes',
        sub: 'Quick disbursal with minimum documents and fully digital processing.',
        cta: 'Apply Now',
        route: 'personal_loan_explorer',
        tone: 'orange',
      },
      {
        id: 'l3',
        kicker: 'HOME FINANCE',
        title: 'Lowest EMI\nHome Loans',
        sub: 'Compare offers from top lenders and choose the right tenure.',
        cta: 'Check EMI',
        route: 'home_loan_emi_calc',
        tone: 'blue',
      },
      {
        id: 'l4',
        kicker: 'BUSINESS FUNDING',
        title: 'Fuel Your\nBusiness Growth',
        sub: 'Working capital and expansion loans from trusted partners.',
        cta: 'Explore Loans',
        route: 'business_loan_explorer',
        tone: 'indigo',
      },
    ],
    [],
  )

  const [active, setActive] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % banners.length)
    }, 3400)
    return () => clearInterval(t)
  }, [banners.length])

  const onTouchStart = (e) => {
    setTouchStartX(e.touches[0]?.clientX ?? null)
    setTouchDeltaX(0)
  }

  const onTouchMove = (e) => {
    if (touchStartX == null) return
    const currentX = e.touches[0]?.clientX ?? touchStartX
    setTouchDeltaX(currentX - touchStartX)
  }

  const onTouchEnd = () => {
    const threshold = 36
    if (touchDeltaX <= -threshold) setActive((prev) => (prev + 1) % banners.length)
    else if (touchDeltaX >= threshold) setActive((prev) => (prev - 1 + banners.length) % banners.length)
    setTouchStartX(null)
    setTouchDeltaX(0)
  }

  return (
    <section className="feLoanTopSlider" aria-label="Featured loan banners">
      <div className="feLoanTopSlider__viewport" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="feLoanTopSlider__track" style={{ transform: `translateX(calc(${-active * 100}% + ${touchDeltaX}px))` }}>
          {banners.map((b) => (
            <article key={b.id} className={`feLoanTopSlider__slide feLoanTopSlider__slide--${b.tone}`}>
              <div className="feLoanTopSlider__kicker">{b.kicker}</div>
              <div className="feLoanTopSlider__title">{b.title.split('\n').map((line) => <div key={line}>{line}</div>)}</div>
              <div className="feLoanTopSlider__sub">{b.sub}</div>
              <button type="button" className="feLoanTopSlider__cta" onClick={() => navigateHash(b.route)}>
                {b.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
      <div className="feLoanTopSlider__dots" role="tablist" aria-label="Loan banner indicators">
        {banners.map((b, idx) => (
          <button
            key={b.id}
            type="button"
            className={`feLoanTopSlider__dot ${idx === active ? 'is-active' : ''}`}
            onClick={() => setActive(idx)}
            aria-label={`Show banner ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

/**
 * `stack`: split two-word titles onto two lines (tall column tiles).
 * Row tiles: soft break between words only (`<wbr />`), never mid-word; pair with fluid type on `.feLoanStoreCatCard--row`.
 */
function renderCatTitle(title, { stack = true } = {}) {
  const parts = String(title).split(' ').filter(Boolean)
  if (parts.length === 2 && stack) {
    return (
      <>
        <span>{parts[0]}</span>
        <br />
        <span>{parts[1]}</span>
      </>
    )
  }
  if (parts.length === 2 && !stack) {
    return (
      <>
        {parts[0]}
        <wbr /> {parts[1]}
      </>
    )
  }
  return title
}

export default function LoansPage() {
  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  }, [])

  const categories = useMemo(
    () => [
      {
        id: 'personal',
        area: 'personal',
        kicker: 'FLEXI CASH',
        title: 'Personal Loan',
        subtitle: null,
        icon: 'personal',
        route: 'personal_loan_explorer',
      },
      {
        id: 'business',
        area: 'business',
        kicker: null,
        title: 'Business Loan',
        subtitle: 'Scale up today',
        icon: 'business',
        route: 'business_loan_explorer',
      },
      {
        id: 'car',
        area: 'auto',
        kicker: null,
        title: 'Auto Loan',
        subtitle: 'Instant approval',
        icon: 'car',
        route: 'car_loan_emi_calc',
      },
      {
        id: 'home',
        area: 'home',
        kicker: null,
        title: 'Home Loan',
        subtitle: null,
        icon: 'home',
        route: 'home_loan_emi_calc',
      },
      {
        id: 'lap',
        area: 'lap',
        kicker: null,
        title: 'LAP',
        subtitle: null,
        icon: 'lap',
        route: 'eligibility_form',
      },
      {
        id: 'gold',
        area: 'gold',
        kicker: null,
        title: 'GOLD',
        subtitle: null,
        icon: 'gold',
        route: 'application_form',
      },
      {
        id: 'edu',
        area: 'education',
        kicker: null,
        title: 'Education',
        subtitle: 'Higher studies',
        icon: 'edu',
        route: 'application_form',
      },
      {
        id: 'mf',
        area: 'againstmf',
        kicker: null,
        title: 'Against MF',
        subtitle: 'Stay invested',
        icon: 'mf',
        route: 'eligibility_form',
      },
    ],
    [],
  )

  const partners = useMemo(
    () => [
      // Simple loan-related icons (no bank names, always render reliably).
      { id: 'p1', icon: 'home' },
      { id: 'p2', icon: 'car' },
      { id: 'p3', icon: 'business' },
      { id: 'p4', icon: 'personal' },
      { id: 'p5', icon: 'gold' },
      { id: 'p6', icon: 'edu' },
      { id: 'p7', icon: 'lap' },
      { id: 'p8', icon: 'mf' },
    ],
    [],
  )

  const categoryById = useMemo(() => {
    const map = {}
    for (const c of categories) map[c.id] = c
    return map
  }, [categories])

  function CategoryCard({ card, variant }) {
    if (!card) return null

    const isRow = variant === 'row'
    const isLeft = variant === 'col-left'
    const cls = ['feLoanStoreCatCard', isRow ? 'feLoanStoreCatCard--row' : '', isLeft ? 'feLoanStoreCatCard--left' : '', variant === 'small' ? 'feLoanStoreCatCard--small' : '']
      .filter(Boolean)
      .join(' ')

    if (isRow) {
      return (
        <button type="button" className={cls} onClick={() => navigateHash(card.route)} aria-label={card.title}>
          <span className="feLoanStoreCatCard__iconWrap" aria-hidden="true">
            <LoanStoreCategoryIcon name={card.icon} />
          </span>
          <span className="feLoanStoreCatCard__textRow">
            <span className="feLoanStoreCatCard__title">{renderCatTitle(card.title, { stack: false })}</span>
            {card.subtitle ? <span className="feLoanStoreCatCard__sub">{card.subtitle}</span> : null}
          </span>
        </button>
      )
    }

    return (
      <button type="button" className={cls} onClick={() => navigateHash(card.route)} aria-label={card.title}>
        {card.kicker ? <div className="feLoanStoreCatCard__kicker">{card.kicker}</div> : null}
        <span className="feLoanStoreCatCard__iconWrap" aria-hidden="true">
          <LoanStoreCategoryIcon name={card.icon} />
        </span>
        <span className="feLoanStoreCatCard__title">{renderCatTitle(card.title)}</span>
        {card.subtitle ? <span className="feLoanStoreCatCard__sub">{card.subtitle}</span> : null}
      </button>
    )
  }

  return (
    <div className="feLoans feLoanStore" aria-label="LoanStore">
      <LoanTopBannerCarousel />

      <section className="feLoanStorePartners" aria-label="Our trusted partners">
        <div className="feLoanStoreSectionHead feLoanStoreSectionHead--split">
          <div className="feLoanStoreSectionHead__title">Our Trusted Partners</div>
        </div>

        <div className="feLoanStoreMarquee" aria-label="Partner logos marquee">
          <div className="feLoanStoreMarquee__track" data-reduce-motion={reduceMotion ? 'true' : 'false'}>
            {[...partners, ...partners].map((p, idx) => (
              <div
                key={`${p.id}-${idx}`}
                className="feLoanStorePartnerTile"
                role="listitem"
                aria-label="Partner"
              >
                <span className="feLoanStorePartnerTile__icon" aria-hidden="true">
                  <LoanStoreIcon name={p.icon} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feLoanStoreCategories" aria-label="Popular loan categories">
        <div className="feLoanStoreSectionHead">
          <div className="feLoanStoreSectionHead__title">Popular Loan Categories</div>
        </div>

        <div className="feLoanStoreCatPremiumLayout" role="list" aria-label="Popular loan categories">
          <div className="feLoanStoreCatPremiumCol" role="listitem">
            <CategoryCard card={categoryById.personal} variant="col-left" />
            <CategoryCard card={categoryById.home} variant="col-left" />
            <CategoryCard card={categoryById.edu} variant="row" />
          </div>

          <div className="feLoanStoreCatPremiumCol" role="listitem">
            <CategoryCard card={categoryById.business} variant="row" />
            <CategoryCard card={categoryById.car} variant="row" />

            <div className="feLoanStoreCatPremiumSmallRow" role="listitem">
              <CategoryCard card={categoryById.lap} variant="small" />
              <CategoryCard card={categoryById.gold} variant="small" />
            </div>

            <CategoryCard card={categoryById.mf} variant="row" />
          </div>
        </div>
      </section>

      <FintechBannerCarousel />

      <div className="feLoanStoreMiniStack" aria-label="Loan tools">
        <MiniEmiCard reduceMotion={reduceMotion} />
        <MiniCibilCard reduceMotion={reduceMotion} />
      </div>

      <section className="feSection" aria-label="Premium cards">
        <div className="feSection__head feSection__head--split">
          <div>
            <div className="feSection__title">Premium Cards</div>
            <div className="feSection__sub">Exclusively curated for you</div>
          </div>
        </div>

        <div className="feHScroll" aria-label="Credit card horizontal list">
          <div className="feCardOffer feCardOffer--premiumStack">
            <div className="feCCStack" data-reduce-motion={reduceMotion ? 'true' : 'false'}>
              <div className="feCC feCC--infinite" aria-hidden="true">
                <div className="feCC__infiniteHead">
                  <span className="feCC__infiniteTier">INFINITE</span>
                  <span className="feCC__infiniteBrand">FinExpert</span>
                </div>
                <div className="feCC__infiniteFoot">
                  <span className="feCC__infiniteRupee">₹</span>
                  <div className="feCC__infiniteFootText">
                    <span className="feCC__infiniteSub">Total rewards</span>
                    <span className="feCC__infiniteHint">Tap to unlock</span>
                  </div>
                </div>
              </div>

              <div className="feCC feCC--prime">
                <div className="feCC__primeTop">
                  <span className="feCC__primeWord">Prime Gold</span>
                  <span className="feCC__mc" aria-hidden="true">
                    <span className="feCC__mcC feCC__mcC--l" />
                    <span className="feCC__mcC feCC__mcC--r" />
                  </span>
                </div>
                <div className="feCC__primeNumber" aria-hidden="true">
                  •••• •••• •••• 7850
                </div>
                <div className="feCC__primeMid">
                  <div>
                    <div className="feCC__metaLabel feCC__metaLabel--onGold">Valid thru</div>
                    <div className="feCC__primeMetaVal">12/29</div>
                  </div>
                  <div className="feCC__primeMidRight">
                    <div className="feCC__metaLabel feCC__metaLabel--onGold">Card holder</div>
                    <div className="feCC__primeName">RISHAB SHARMA</div>
                  </div>
                </div>
                <button type="button" className="feCC__applyOnCard" onClick={() => navigateHash('eligibility_form')}>
                  Apply now
                </button>
              </div>
            </div>

            <div className="feCardOffer__copy">
              <button type="button" className="feBtn feBtn--secondary" onClick={() => navigateHash('eligibility_form')}>
                Compare and Apply
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
