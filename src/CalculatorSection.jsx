import { useEffect, useMemo, useRef, useState } from 'react'

const INVESTMENT_TOOLS = [
  { id: 'sip_investment', label: 'SIP', sub: 'SYSTEMATIC PLAN', icon: 'chart', tone: 'orange' },
  { id: 'fixed_deposit_calc', label: 'Fixed Deposit', sub: 'SECURE RETURNS', icon: 'bank', tone: 'blue' },
  { id: 'lumpsum_calc', label: 'Lumpsum', sub: 'ONE-TIME INVESTMENT', icon: 'chart', tone: 'green' },
  { id: 'rd_calc', label: 'RD', sub: 'RECURRING DEPOSIT', icon: 'clock', tone: 'purple' },
]

const LOAN_TOOLS = [
  { id: 'emi_calculator', title: 'EMI Calculator', sub: 'Calculate monthly payments', icon: 'calc' },
  { id: 'eligibility_form', title: 'Loan Eligibility', sub: 'Check how much you can borrow', icon: 'badge' },
]

const TAX_TOOLS = [
  { id: 'income_tax_calc', title: 'Income Tax', sub: 'FY 2024-25 Ready', icon: 'tax', tone: 'blue' },
  { id: 'gratuity_calc', title: 'Gratuity', sub: 'Retirement Benefits', icon: 'gift', tone: 'green' },
  { id: 'hra_calc', title: 'HRA Calculator', sub: 'Save tax on rent', icon: 'home', tone: 'purple' },
  { id: 'elss_funds', title: 'ELSS Funds', sub: 'Tax saving investment', icon: 'growth', tone: 'gradblue' },
  { id: 'ppf_calc', title: 'PPF / NPS', sub: 'Long-term savings', icon: 'shield', tone: 'indigo' },
]

const MORE_TOOLS = [
  { id: 'home_loan_emi_calc', title: 'Home Loan EMI', sub: 'Long-term EMI plan', icon: 'calc' },
  { id: 'car_loan_emi_calc', title: 'Car Loan EMI', sub: 'Vehicle finance estimate', icon: 'calc' },
  { id: 'goal_planner_calc', title: 'Goal Planner', sub: 'Save for life goals', icon: 'bank' },
]

function goToRoute(route, onNavigate) {
  if (onNavigate) onNavigate(route)
  else if (typeof window !== 'undefined') window.location.hash = `#/${route}`
}

function CalcIcon({ name }) {
  if (name === 'chart') return <span aria-hidden="true">↗</span>
  if (name === 'bank') return <span aria-hidden="true">🏦</span>
  if (name === 'shield') return <span aria-hidden="true">🛡</span>
  if (name === 'clock') return <span aria-hidden="true">🕘</span>
  if (name === 'calc') return <span aria-hidden="true">🧮</span>
  if (name === 'badge') return <span aria-hidden="true">🛡</span>
  if (name === 'tax') return <span aria-hidden="true">🧾</span>
  return <span aria-hidden="true">🎁</span>
}

function TaxIcon({ name }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    width: 18,
    height: 18,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (name === 'tax')
    return (
      <svg {...common}>
        <rect x="6" y="4" width="12" height="16" rx="2" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
      </svg>
    )
  if (name === 'gift')
    return (
      <svg {...common}>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M12 10v10" />
        <path d="M4 14h16" />
        <path d="M12 10c-1.8 0-3-1-3-2.2C9 6.8 10 6 11 6c.8 0 1.5.4 2 1.2.5-.8 1.2-1.2 2-1.2 1 0 2 .8 2 1.8 0 1.2-1.2 2.2-3 2.2" />
      </svg>
    )
  if (name === 'home')
    return (
      <svg {...common}>
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 10.5V21h14V10.5" />
      </svg>
    )
  if (name === 'growth')
    return (
      <svg {...common}>
        <path d="M4 20h16" />
        <path d="M7 14l3-3 3 2 4-5" />
        <path d="M17 8h-4" />
      </svg>
    )
  return (
    <svg {...common}>
      <path d="M12 2l7 4v6c0 6-7 10-7 10S5 18 5 12V6l7-4z" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
    </svg>
  )
}

export default function CalculatorSection({ onNavigate, onNotifications }) {
  const [query, setQuery] = useState('')
  const [taxIdx, setTaxIdx] = useState(0)
  const taxScrollerRef = useRef(null)
  const q = query.trim().toLowerCase()

  const investment = useMemo(
    () => INVESTMENT_TOOLS.filter((t) => !q || `${t.label} ${t.sub}`.toLowerCase().includes(q)),
    [q],
  )
  const loans = useMemo(
    () => LOAN_TOOLS.filter((t) => !q || `${t.title} ${t.sub}`.toLowerCase().includes(q)),
    [q],
  )
  const tax = useMemo(
    () => TAX_TOOLS.filter((t) => !q || `${t.title} ${t.sub}`.toLowerCase().includes(q)),
    [q],
  )
  const more = useMemo(
    () => MORE_TOOLS.filter((t) => !q || `${t.title} ${t.sub}`.toLowerCase().includes(q)),
    [q],
  )

  useEffect(() => {
    if (!tax.length) return
    const timer = setInterval(() => {
      setTaxIdx((prev) => (prev + 1) % tax.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [tax.length])

  useEffect(() => {
    const scroller = taxScrollerRef.current
    if (!scroller || !tax.length) return
    const first = scroller.querySelector('.feCalcHub__taxCard')
    if (!first) return
    const cardW = first.getBoundingClientRect().width
    const style = window.getComputedStyle(scroller)
    const gap = Number.parseFloat(style.columnGap || style.gap || '0') || 0
    scroller.scrollTo({ left: taxIdx * (cardW + gap), behavior: 'smooth' })
  }, [taxIdx, tax.length])

  return (
    <section className="feCalcHub" aria-label="Financial Calculators">
      <div className="feCalcHub__top">
        <div className="feCalcHub__titleWrap">
          <h2 className="feCalcHub__title">
            <span className="feCalcHub__brand">
              <span className="feCalcHub__brandFin">Fin</span>
              <span className="feCalcHub__brandExprt">Exprt</span>
            </span>{' '}
            Calculator
          </h2>
        </div>
        <button
          type="button"
          className="feCalcHub__notify"
          aria-label="Notifications"
          onClick={() => {
            if (onNotifications) onNotifications()
          }}
        >
          🔔
        </button>
      </div>

      <div className="feCalcHub__sectionHead">
        <h3>Investment</h3>
      </div>
      <div className="feCalcHub__grid">
        {investment.map((tool) => (
          <button
            key={`${tool.id}-${tool.label}`}
            type="button"
            className={`feCalcHub__tile feCalcHub__tile--${tool.tone}`}
            onClick={() => goToRoute(tool.id, onNavigate)}
          >
            <span className="feCalcHub__tileIcon">
              <CalcIcon name={tool.icon} />
            </span>
            <span className="feCalcHub__tileTitle">{tool.label}</span>
            <span className="feCalcHub__tileSub">{tool.sub}</span>
          </button>
        ))}
      </div>

      <h3 className="feCalcHub__blockTitle">Loans & EMI</h3>
      <div className="feCalcHub__list">
        {loans.map((tool) => (
          <button
            key={tool.id}
            type="button"
            className="feCalcHub__row"
            onClick={() => goToRoute(tool.id, onNavigate)}
          >
            <span className="feCalcHub__rowIcon">
              <CalcIcon name={tool.icon} />
            </span>
            <span className="feCalcHub__rowText">
              <span className="feCalcHub__rowTitle">{tool.title}</span>
              <span className="feCalcHub__rowSub">{tool.sub}</span>
            </span>
            <span className="feCalcHub__rowArrow" aria-hidden="true">
              ›
            </span>
          </button>
        ))}
      </div>

      <h3 className="feCalcHub__blockTitle">Tax & Savings</h3>
      <div className="feTaxCarousel">
        <div className="feTaxCarousel__viewport">
          <div className="feTaxCarousel__scroller" ref={taxScrollerRef}>
            {tax.map((tool) => (
              <button
                key={tool.id}
                type="button"
                className={`feCalcHub__taxCard feCalcHub__taxCard--${tool.tone}`}
                onClick={() => goToRoute(tool.id, onNavigate)}
              >
                <span className="feCalcHub__taxCardIcon">
                  <TaxIcon name={tool.icon} />
                </span>
                <span className="feCalcHub__taxCardTitle">{tool.title}</span>
                <span className="feCalcHub__taxCardSub">{tool.sub}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="feTaxCarousel__dots" aria-hidden="true">
          {tax.map((t, idx) => (
            <span key={t.id} className={`feTaxCarousel__dot ${idx === taxIdx ? 'is-active' : ''}`} />
          ))}
        </div>
      </div>

      <h3 className="feCalcHub__blockTitle">More Calculators</h3>
      <div className="feCalcHub__moreGrid">
        {more.map((tool, idx) => (
          <button
            key={`${tool.title}-${idx}`}
            type="button"
            className="feCalcHub__more"
            onClick={() => goToRoute(tool.id, onNavigate)}
          >
            <span className="feCalcHub__moreIcon">
              <CalcIcon name={tool.icon} />
            </span>
            <span className="feCalcHub__moreTexts">
              <span className="feCalcHub__moreTitle">{tool.title}</span>
              <span className="feCalcHub__moreSub">{tool.sub}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
