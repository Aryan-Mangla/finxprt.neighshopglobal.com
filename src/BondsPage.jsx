import { useMemo, useState } from 'react'

function Icon({ name }) {
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
    case 'gov':
      return (
        <svg {...common}>
          <path d="M4 10h16" />
          <path d="M6 10V8l6-4 6 4v2" />
          <path d="M6.5 10V20" />
          <path d="M10 10V20" />
          <path d="M14 10V20" />
          <path d="M17.5 10V20" />
          <path d="M4 20h16" />
        </svg>
      )
    case 'corp':
      return (
        <svg {...common}>
          <path d="M4 20V8l8-4 8 4v12" />
          <path d="M8 20V10" />
          <path d="M12 20V10" />
          <path d="M16 20V10" />
        </svg>
      )
    case 'taxfree':
      return (
        <svg {...common}>
          <path d="M7 4h10v16H7z" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
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

function RiskPill({ level }) {
  const tone = level === 'Low' ? 'good' : 'medium'
  return <span className={`feBadge feBadge--${tone}`}>Risk: {level}</span>
}

export default function BondsPage() {
  const types = useMemo(
    () => [
      {
        id: 'gov',
        title: 'Government Bonds',
        desc: 'Backed by the government. Typically lower risk.',
        icon: 'gov',
      },
      {
        id: 'corp',
        title: 'Corporate Bonds',
        desc: 'Higher yields from top-rated companies.',
        icon: 'corp',
      },
      {
        id: 'taxfree',
        title: 'Tax-Free Bonds',
        desc: 'Interest income may be tax-exempt for eligible bonds.',
        icon: 'taxfree',
      },
    ],
    [],
  )

  const bonds = useMemo(
    () => [
      { id: 'b1', name: 'Govt. G-Sec 2029', rate: 7.2, years: 5, risk: 'Low', type: 'gov' },
      { id: 'b2', name: 'AAA Corporate Bond 2028', rate: 8.6, years: 4, risk: 'Medium', type: 'corp' },
      { id: 'b3', name: 'Tax-Free Infra Bond 2032', rate: 7.8, years: 7, risk: 'Low', type: 'taxfree' },
      { id: 'b4', name: 'Govt. Savings Bond 2031', rate: 7.4, years: 6, risk: 'Low', type: 'gov' },
      { id: 'b5', name: 'Corporate Bond (Top Bank) 2027', rate: 8.1, years: 3, risk: 'Medium', type: 'corp' },
    ],
    [],
  )

  const [activeType, setActiveType] = useState('gov')

  const filtered = useMemo(() => bonds.filter((b) => b.type === activeType), [activeType, bonds])

  return (
    <div className="feBonds" aria-label="Bonds Investment">
      <div className="feBondsIntro">
        <div className="feBondsIntro__title">Invest in safe and stable bonds</div>
        <div className="feBondsInfo">
          <span className="feBondsInfo__dot" aria-hidden="true" />
          <span>
            Diversify with fixed-income options. Returns are indicative and may vary.
          </span>
        </div>
      </div>

      <div className="feBondsTypes" role="tablist" aria-label="Bond types">
        {types.map((t) => {
          const isActive = t.id === activeType
          return (
            <button
              key={t.id}
              type="button"
              className={`feBondsType ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveType(t.id)}
              role="tab"
              aria-selected={isActive}
            >
              <span className={`feBondsType__icon feBondsType__icon--${t.id}`} aria-hidden="true">
                <Icon name={t.icon} />
              </span>
              <span className="feBondsType__title">{t.title}</span>
              <span className="feBondsType__desc">{t.desc}</span>
              <span className="feBondsType__cta">View</span>
            </button>
          )
        })}
      </div>

      <div className="feBondsList" aria-label="Bond list">
        {filtered.map((b) => (
          <div key={b.id} className="feBondsCard" role="article" aria-label={b.name}>
            <div className="feBondsCard__top">
              <div className="feBondsCard__name">{b.name}</div>
              <RiskPill level={b.risk} />
            </div>
            <div className="feBondsCard__rows">
              <div className="feBondsMetric">
                <div className="feBondsMetric__k">Interest Rate</div>
                <div className="feBondsMetric__v">{b.rate.toFixed(1)}%</div>
              </div>
              <div className="feBondsMetric">
                <div className="feBondsMetric__k">Duration</div>
                <div className="feBondsMetric__v">{b.years} years</div>
              </div>
            </div>
            <button
              type="button"
              className="feBtn feBtn--primary feBtn--full"
              onClick={() => {
                if (typeof window !== 'undefined') window.location.hash = '#/application_form'
              }}
            >
              Invest Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

