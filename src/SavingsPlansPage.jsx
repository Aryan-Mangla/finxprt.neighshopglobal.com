import { useMemo } from 'react'

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
    case 'fd':
      return (
        <svg {...common}>
          <path d="M7 4h10v16H7z" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </svg>
      )
    case 'rd':
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M5 7h14" />
          <path d="M7 17h10" />
          <path d="M8 12h8" />
        </svg>
      )
    case 'goal':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 6v6l4 2" />
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

export default function SavingsPlansPage() {
  const plans = useMemo(
    () => [
      {
        id: 'fd',
        title: 'Fixed Deposit (FD)',
        desc: 'Lock-in savings with predictable returns and low risk.',
        returns: 'Up to 7.5% p.a.',
        icon: 'fd',
        tone: 'navy',
      },
      {
        id: 'rd',
        title: 'Recurring Deposit (RD)',
        desc: 'Save monthly—build discipline with steady growth.',
        returns: 'Up to 7.0% p.a.',
        icon: 'rd',
        tone: 'orange',
      },
      {
        id: 'goal',
        title: 'Goal-based Savings',
        desc: 'Save for goals like education, travel, or emergency funds.',
        returns: 'Personalized plans',
        icon: 'goal',
        tone: 'green',
      },
    ],
    [],
  )

  return (
    <div className="feSavings" aria-label="Savings plans">
      <div className="feSavingsBanner" aria-label="Savings banner">
        <div className="feSavingsBanner__title">Start saving for your future</div>
        <div className="feSavingsBanner__sub">
          Pick a plan that matches your timeline and risk comfort.
        </div>
      </div>

      <div className="feSavingsList" role="list" aria-label="Savings plans list">
        {plans.map((p) => (
          <div key={p.id} className="feSavingsCard" role="listitem" aria-label={p.title}>
            <div className="feSavingsCard__top">
              <span className={`feSavingsCard__icon feSavingsCard__icon--${p.tone}`} aria-hidden="true">
                <Icon name={p.icon} />
              </span>
              <div className="feSavingsCard__texts">
                <div className="feSavingsCard__title">{p.title}</div>
                <div className="feSavingsCard__desc">{p.desc}</div>
              </div>
            </div>

            <div className="feSavingsCard__meta">
              <div className="feSavingsMetric">
                <div className="feSavingsMetric__k">Expected returns</div>
                <div className="feSavingsMetric__v">{p.returns}</div>
              </div>
              <button
                type="button"
                className="feBtn feBtn--primary feBtn--full"
                onClick={() => {
                  if (typeof window !== 'undefined') window.location.hash = '#/application_form'
                }}
              >
                Start Saving
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

