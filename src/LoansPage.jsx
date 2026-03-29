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
    default:
      return (
        <svg {...common}>
          <path d="M12 6v12" />
          <path d="M6 12h12" />
        </svg>
      )
  }
}

export default function LoansPage({ onExplorePersonal, onOpenEligibility }) {
  const loanTypes = useMemo(
    () => [
      { id: 'personal', title: 'Personal Loan', icon: 'personal', rate: 10.5 },
      { id: 'home', title: 'Home Loan', icon: 'home', rate: 8.4 },
      { id: 'car', title: 'Car Loan', icon: 'car', rate: 8.9 },
      { id: 'business', title: 'Business Loan', icon: 'business', rate: 12.2 },
      { id: 'gold', title: 'Gold Loan', icon: 'gold', rate: 9.2 },
      { id: 'edu', title: 'Education Loan', icon: 'edu', rate: 9.9 },
    ],
    [],
  )

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [income, setIncome] = useState('')

  return (
    <div className="feLoans" aria-label="Loans">
      <div className="feLoansBanner" aria-label="Loans banner">
        <div className="feLoansBanner__kicker">Fast • Paperless • Secure</div>
        <div className="feLoansBanner__title">Get Instant Loan up to ₹50 Lakhs</div>
        <div className="feLoansBanner__sub">
          Check eligibility in minutes with trusted partners.
        </div>
      </div>

      <div className="feSection__head">
        <div className="feSection__title">Loan Types</div>
      </div>

      <div className="feLoansGrid" role="list" aria-label="Loan types grid">
        {loanTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            className="feLoanTile"
            role="listitem"
            aria-label={t.title}
            onClick={() => {
              if (t.id === 'personal') onExplorePersonal?.()
            }}
          >
            <div className="feLoanTile__top">
              <span className={`feLoanTile__icon feLoanTile__icon--${t.id}`} aria-hidden="true">
                <Icon name={t.id} />
              </span>
              <span className="feLoanTile__tag">Quick approval</span>
            </div>
            <div className="feLoanTile__title">{t.title}</div>
            <div className="feLoanTile__meta">Starting from</div>
            <div className="feLoanTile__rate">{t.rate.toFixed(1)}% p.a.</div>
          </button>
        ))}
      </div>

      <div className="feSection__head">
        <div className="feSection__title">Check Eligibility</div>
      </div>

      <div className="feLoansForm" aria-label="Eligibility form">
        <label className="feField">
          <span className="feField__label">Name</span>
          <input
            className="feField__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
          />
        </label>

        <label className="feField">
          <span className="feField__label">Phone</span>
          <input
            className="feField__input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            inputMode="numeric"
          />
        </label>

        <label className="feField">
          <span className="feField__label">Monthly Income</span>
          <input
            className="feField__input"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="e.g. 80,000"
            inputMode="numeric"
          />
        </label>

        <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={() => onOpenEligibility?.()}>
          Check Eligibility
        </button>
      </div>
    </div>
  )
}

