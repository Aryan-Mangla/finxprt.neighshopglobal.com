import { useState } from 'react'
import CreditCardPromoHero from './CreditCardPromoHero.jsx'

const BANK_FILTERS = [
  { id: 'all', label: 'All Banks' },
  { id: 'hdfc', label: 'HDFC Bank' },
  { id: 'icici', label: 'ICICI Bank' },
]

const CARDS = [
  {
    id: 'hdfc_infinia',
    bankId: 'hdfc',
    brandLine: 'HDFC BANK',
    tier: 'INFINIA',
    tierAccent: true,
    last4: '8892',
    skin: 'navy',
    title: 'HDFC Infinia',
    subtitle: 'The ultimate luxury card for global high-flyers.',
    perks: [
      { key: 'h1', kind: 'star', text: '10x Reward Points on SmartBuy' },
      { key: 'h2', kind: 'check', text: 'Unlimited Airport Lounge Access' },
      { key: 'h3', kind: 'shieldPlus', text: 'Comprehensive Travel Insurance' },
    ],
  },
  {
    id: 'icici_coral',
    bankId: 'icici',
    brandLine: 'ICICI BANK',
    tier: 'CORAL',
    tierAccent: false,
    last4: '4201',
    skin: 'gold',
    title: 'ICICI Coral',
    subtitle: 'Designed for daily savings and cashback rewards.',
    perks: [
      { key: 'i1', kind: 'bag', text: 'Buy 1 Get 1 on Movie Tickets' },
      { key: 'i2', kind: 'fuel', text: '1% Fuel Surcharge Waiver' },
      { key: 'i3', kind: 'gift', text: '2,000 Bonus Reward Points' },
    ],
  }
]

function goHash(route) {
  if (typeof window !== 'undefined') window.location.hash = `#/${route}`
}

function DownloadGlyph() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v12m0 0l4-4m-4 4L8 11M5 21h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FeatIcon({ kind }) {
  const c = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    width: 17,
    height: 17,
    stroke: '#ea580c',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  switch (kind) {
    case 'star':
      return (
        <svg {...c}>
          <path d="M12 2l2.6 7.9H22l-6.4 4.9 2.4 7.6L12 17.6l-6 4.8 2.4-7.6L2 9.9h7.4L12 2z" />
        </svg>
      )
    case 'check':
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'shieldPlus':
      return (
        <svg {...c}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 10v8M8 14h8" />
        </svg>
      )
    case 'bag':
      return (
        <svg {...c}>
          <path d="M6 7h12l-1 12H7L6 7z" />
          <path d="M9 7V5a3 3 0 016 0v2" />
        </svg>
      )
    case 'fuel':
      return (
        <svg {...c}>
          <path d="M3 22V8a2 2 0 012-2h8a2 2 0 012 2v14" />
          <path d="M5 12h10M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" />
        </svg>
      )
    case 'gift':
      return (
        <svg {...c}>
          <path d="M20 12v8H4v-8" />
          <path d="M2 7h20v5H2z" />
          <path d="M12 7v13" />
          <path d="M12 7h4.5a2.5 2.5 0 000-5C14 2 12 7 12 7z" />
          <path d="M12 7H7.5a2.5 2.5 0 010-5C10 2 12 7 12 7z" />
        </svg>
      )
    default:
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
  }
}

function PlasticCard({ offer }) {
  const navy = offer.skin === 'navy'
  return (
    <div className={`feCCElig__plastic feCCElig__plastic--${offer.skin}`} aria-hidden="true">
      <div className="feCCElig__plasticShine" />
      <div className="feCCElig__plasticTop">
        {navy ? (
          <span className="feCCElig__plasticNfc">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#ff9f43" strokeWidth="1.85" />
              <path d="M12 12a4.5 4.5 0 014.5 4.5" stroke="#fff" strokeWidth="1.5" />
              <path d="M12 12a7.5 7.5 0 017.5 7.5" stroke="#ff9f43" strokeWidth="1.2" opacity="0.9" />
            </svg>
          </span>
        ) : (
          <span className="feCCElig__plasticSq" />
        )}
        <div className="feCCElig__plasticBrand">
          <span>{offer.brandLine}</span>
          <strong className={offer.tierAccent ? 'feCCElig__plasticTier--accent' : ''}>{offer.tier}</strong>
        </div>
      </div>
      <div className={`feCCElig__plasticChip feCCElig__plasticChip--${navy ? 'gold' : 'silver'}`} />
      <div className="feCCElig__plasticPan">**** **** **** {offer.last4}</div>
    </div>
  )
}

function ProductBlock({ offer, onApply }) {
  return (
    <section className="feCCElig__product" aria-label={offer.title}>
      <div className="feCCElig__productSheet">
        <PlasticCard offer={offer} />
        <h2 className="feCCElig__productTitle">{offer.title}</h2>
        <p className="feCCElig__productSub">{offer.subtitle}</p>
        <ul className="feCCElig__feats">
          {offer.perks.map((p) => (
            <li key={p.key} className="feCCElig__feat">
              <span className="feCCElig__featIco">
                <FeatIcon kind={p.kind} />
              </span>
              <span className="feCCElig__featTxt">{p.text}</span>
            </li>
          ))}
        </ul>
        <div className="feCCElig__actions">
          <button 
            type="button" 
            className="feCCElig__btn feCCElig__btn--primary" 
            onClick={() => {
              if (onApply) {
                onApply('Apply for Credit Card', 'Instant approval with partner banks.')
              } else {
                goHash('application_form')
              }
            }}
          >
            Apply now
          </button>
          <button type="button" className="feCCElig__btn feCCElig__btn--ghost" onClick={() => goHash('credit_card_offers')}>
            <DownloadGlyph />
            Download brochure
          </button>
        </div>
      </div>
    </section>
  )
}

export default function CreditCardEligibilityPage({ onApply }) {
  const [bank, setBank] = useState('all')

  const filteredCards = bank === 'all' 
    ? CARDS 
    : CARDS.filter(c => c.bankId === bank);

  return (
    <div className="feCCElig" lang="en" aria-label="Credit card eligibility">
      {/* —— Block 1: hero + bank filters (reference layout 1) —— */}
      <section className="feCCElig__hero">
        <CreditCardPromoHero onAction={() => {}} />
      </section>

      <section className="feCCElig__filters" aria-label="Filter by bank">
        <p className="feCCElig__filterLabel">Filter by bank</p>
        <div className="feCCElig__filterRow" role="list">
          {BANK_FILTERS.map((b) => (
            <button
              key={b.id}
              type="button"
              role="listitem"
              className={`feCCElig__pill${bank === b.id ? ' is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setBank(b.id);
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </section>

      {/* —— Dynamic Card List —— */}
      <div className="feCCElig__list">
        {filteredCards.map(card => (
          <ProductBlock key={card.id} offer={card} onApply={onApply} />
        ))}
        {filteredCards.length === 0 && (
          <div className="feCCElig__empty">No cards found for this bank.</div>
        )}
      </div>
    </div>
  )
}
