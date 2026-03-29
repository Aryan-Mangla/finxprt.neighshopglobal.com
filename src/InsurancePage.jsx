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
    case 'health':
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.4-9.3-9a5.5 5.5 0 0 1 9.3-5 5.5 5.5 0 0 1 9.3 5C19 16.6 12 21 12 21z" />
        </svg>
      )
    case 'life':
      return (
        <svg {...common}>
          <path d="M12 3l7 4v6c0 5-3 8-7 8s-7-3-7-8V7l7-4z" />
          <path d="M12 9v7" />
          <path d="M9 12h6" />
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
    case 'bike':
      return (
        <svg {...common}>
          <circle cx="6.5" cy="16.5" r="2.5" />
          <circle cx="17.5" cy="16.5" r="2.5" />
          <path d="M7 16.5l4-7h3l2.5 7" />
          <path d="M11 9.5l-2-3" />
          <path d="M14 9.5h3" />
        </svg>
      )
    case 'travel':
      return (
        <svg {...common}>
          <path d="M12 2l3.5 7.5L22 12l-6.5 2.5L12 22l-3.5-7.5L2 12l6.5-2.5L12 2z" />
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

export default function InsurancePage({ onSelectType, onExplore }) {
  const types = useMemo(
    () => [
      {
        id: 'health',
        title: 'Health Insurance',
        desc: 'Cashless claims, family cover and wellness benefits.',
        icon: 'health',
      },
      {
        id: 'life',
        title: 'Life Insurance',
        desc: 'Protect your family with term plans and add-ons.',
        icon: 'life',
      },
      {
        id: 'car',
        title: 'Car Insurance',
        desc: 'Instant renewal, zero-dep options and quick claims.',
        icon: 'car',
      },
      {
        id: 'bike',
        title: 'Bike Insurance',
        desc: 'Affordable cover with theft and accident protection.',
        icon: 'bike',
      },
      {
        id: 'travel',
        title: 'Travel Insurance',
        desc: 'Medical, delay and luggage protection worldwide.',
        icon: 'travel',
      },
    ],
    [],
  )

  return (
    <div className="feIns" aria-label="Insurance types">
      <div className="feInsGrid" role="list" aria-label="Insurance type cards">
        {types.map((t) => (
          <button
            key={t.id}
            type="button"
            className="feInsCard"
            onClick={() => onSelectType(t.id)}
            aria-label={`View plans for ${t.title}`}
            role="listitem"
          >
            <span className={`feInsCard__icon feInsCard__icon--${t.id}`} aria-hidden="true">
              <Icon name={t.icon} />
            </span>
            <div className="feInsCard__title">{t.title}</div>
            <div className="feInsCard__desc">{t.desc}</div>
            <div className="feInsCard__ctaRow">
              <button
                type="button"
                className="feBtn feBtn--primary feInsCard__cta"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onExplore?.(t.id)
                }}
              >
                View Plans
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

