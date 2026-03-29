import { useMemo } from 'react'

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

function Icon({ name }) {
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

  switch (name) {
    case 'plane':
      return (
        <svg {...common}>
          <path d="M22 16l-10-4-10 4 10-14 10 14z" />
          <path d="M12 12v8" />
        </svg>
      )
    case 'lounge':
      return (
        <svg {...common}>
          <path d="M4 20h16" />
          <path d="M7 20V9a3 3 0 0 1 6 0v11" />
          <path d="M13 14h4a2 2 0 0 1 2 2v4" />
        </svg>
      )
    case 'cash':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="12" rx="2" />
          <path d="M7 11h.01" />
          <path d="M17 15h.01" />
          <path d="M12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
      )
    case 'gift':
      return (
        <svg {...common}>
          <path d="M20 12v8H4v-8" />
          <path d="M2 7h20v5H2z" />
          <path d="M12 7v13" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C14 2 12 7 12 7z" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C10 2 12 7 12 7z" />
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

export default function CreditCardDetailPage({ cardId = 'cc1' }) {
  const card = useMemo(() => {
    const cards = {
      cc1: {
        name: 'FinExpert Platinum',
        tagline: 'Rewards • Lounge • Cashback',
        joiningFee: 499,
        annualFee: 999,
        cashback: 'Up to 5% on select spends',
        rewards: '2X points on dining & travel',
        perks: [
          { id: 'p1', icon: 'plane', title: 'Travel perks', text: 'Fuel surcharge waiver + travel insurance.' },
          { id: 'p2', icon: 'lounge', title: 'Lounge access', text: '2 domestic lounge visits per quarter.' },
          { id: 'p3', icon: 'cash', title: 'Cashback', text: '1–5% cashback based on category.' },
          { id: 'p4', icon: 'gift', title: 'Rewards', text: 'Redeem points for vouchers & flights.' },
        ],
      },
    }
    return cards[cardId] ?? cards.cc1
  }, [cardId])

  return (
    <div className="feCCDetail" aria-label="Credit card details">
      <div className="feCCBig" aria-label="Credit card">
        <div className="feCCBig__brand">FinExpert</div>
        <div className="feCCBig__name">{card.name}</div>
        <div className="feCCBig__number">•••• •••• •••• 7850</div>
        <div className="feCCBig__row">
          <div className="feCCBig__meta">
            <div className="feCCBig__k">VALID THRU</div>
            <div className="feCCBig__v">12/29</div>
          </div>
          <div className="feCCBig__meta">
            <div className="feCCBig__k">HOLDER</div>
            <div className="feCCBig__v">USER</div>
          </div>
        </div>
      </div>

      <div className="feCCDetailCard">
        <div className="feCCDetailCard__title">Details</div>
        <div className="feCCFacts" role="table" aria-label="Card fee details">
          <div className="feCCFact" role="row">
            <div className="feCCFact__k" role="cell">Joining fee</div>
            <div className="feCCFact__v" role="cell">{formatINR(card.joiningFee)}</div>
          </div>
          <div className="feCCFact" role="row">
            <div className="feCCFact__k" role="cell">Annual fee</div>
            <div className="feCCFact__v" role="cell">{formatINR(card.annualFee)}</div>
          </div>
          <div className="feCCFact" role="row">
            <div className="feCCFact__k" role="cell">Cashback offers</div>
            <div className="feCCFact__v" role="cell">{card.cashback}</div>
          </div>
          <div className="feCCFact" role="row">
            <div className="feCCFact__k" role="cell">Rewards</div>
            <div className="feCCFact__v" role="cell">{card.rewards}</div>
          </div>
        </div>
      </div>

      <div className="feCCDetailCard">
        <div className="feCCDetailCard__title">Benefits</div>
        <div className="feCCPerks" role="list" aria-label="Card benefits">
          {card.perks.map((p) => (
            <div key={p.id} className="feCCPerk" role="listitem">
              <span className="feCCPerk__icon" aria-hidden="true">
                <Icon name={p.icon} />
              </span>
              <div className="feCCPerk__texts">
                <div className="feCCPerk__title">{p.title}</div>
                <div className="feCCPerk__text">{p.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="feBtn feBtn--primary feBtn--full"
        onClick={() => {
          if (typeof window !== 'undefined') window.location.hash = '#/application_form'
        }}
      >
        Apply Now
      </button>
    </div>
  )
}

