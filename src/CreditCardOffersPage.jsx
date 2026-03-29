import { useMemo } from 'react'

export default function CreditCardOffersPage({ onSelectCard }) {
  const offers = useMemo(
    () => [
      { id: 'cc1', name: 'FinExpert Platinum', meta: '5% cashback • Lounge', perks: 'Rewards + Travel perks' },
      { id: 'cc2', name: 'FinExpert Cashback', meta: 'Up to 7% on select spends', perks: 'Best for daily spends' },
      { id: 'cc3', name: 'FinExpert Travel', meta: 'Lounge + miles', perks: 'Flights & hotels rewards' },
    ],
    [],
  )

  return (
    <div className="feCCOffers" aria-label="Credit card offers">
      <div className="feCCOffersTop">
        <div className="feCCOffersTop__title">Credit Card Offers</div>
        <div className="feCCOffersTop__sub">Compare benefits and apply in minutes.</div>
      </div>

      <div className="feCCOffersList" aria-label="Card offers list">
        {offers.map((o) => (
          <button
            key={o.id}
            type="button"
            className="feCCOffer"
            onClick={() => onSelectCard(o.id)}
            aria-label={`Open ${o.name}`}
          >
            <div className="feCCOffer__card" aria-hidden="true">
              <div className="feCCOffer__brand">FinExpert</div>
              <div className="feCCOffer__name">{o.name}</div>
              <div className="feCCOffer__num">•••• •••• •••• 7850</div>
            </div>

            <div className="feCCOffer__body">
              <div className="feCCOffer__meta">{o.meta}</div>
              <div className="feCCOffer__perks">{o.perks}</div>
              <span
                className="feBtn feBtn--primary feCCOffer__cta"
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (typeof window !== 'undefined') window.location.hash = '#/application_form'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    if (typeof window !== 'undefined') window.location.hash = '#/application_form'
                  }
                }}
              >
                Apply Now
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

