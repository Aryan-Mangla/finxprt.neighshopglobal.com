import { useMemo, useState } from 'react'

const CARD_OFFERS = [
  {
    id: 'cc_zenith',
    bank: 'HDFC Bank',
    name: 'Zenith Infinite',
    line: 'The ultimate lifestyle companion for high-flyers.',
    colorClass: 'is-navy',
    digits: '8892',
    perks: ['10x Reward Points on Dining', 'No Annual Fee for 1st Year', '$1M Comprehensive Insurance'],
  },
  {
    id: 'cc_gold',
    bank: 'ICICI Bank',
    name: 'Gold Elite',
    line: 'Optimized for daily luxury and cashback.',
    colorClass: 'is-gold',
    digits: '4201',
    perks: ['3% Cashback on Groceries', '1% Fuel Surcharge Waiver', 'Welcome Voucher worth ₹2,000'],
  },
  {
    id: 'cc_platinum',
    bank: 'All Banks',
    name: 'FinExprt Platinum',
    line: 'Balanced rewards for everyday spends.',
    colorClass: 'is-blue',
    digits: '7850',
    perks: ['2x Rewards on Travel', 'Airport Lounge Access', 'EMI Conversion in one tap'],
  },
]

export default function CreditCardDetailPage() {
  const [bank, setBank] = useState('All Banks')

  const banks = useMemo(() => ['All Banks', 'HDFC Bank', 'ICICI Bank'], [])
  const list = useMemo(
    () => (bank === 'All Banks' ? CARD_OFFERS : CARD_OFFERS.filter((item) => item.bank === bank)),
    [bank],
  )

  return (
    <section className="feCCHub" aria-label="Credit card offers">
      <article className="feCCHubHero">
        <div className="feCCHubHero__title">5% Cashback on All Spends</div>
        <div className="feCCHubHero__sub">
          Experience the smooth rewards ecosystem and premium lifestyle perks.
        </div>
      </article>

      <div className="feCCHubFilter">
        <div className="feCCHubFilter__label">Filter by Bank</div>
        <div className="feCCHubFilter__row">
          {banks.map((item) => (
            <button
              key={item}
              type="button"
              className={`feCCHubFilter__pill${bank === item ? ' is-active' : ''}`}
              onClick={() => setBank(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="feCCHubList">
        {list.map((card) => (
          <article key={card.id} className="feCCHubCard">
            <div className={`feCCHubCardFace ${card.colorClass}`}>
              <div className="feCCHubCardFace__top">
                <span className="feCCHubCardFace__signal" />
                <span className="feCCHubCardFace__brand">ZENITHPAY</span>
              </div>
              <div className="feCCHubCardFace__chip" />
              <div className="feCCHubCardFace__num">**** **** **** {card.digits}</div>
            </div>

            <div className="feCCHubCard__name">{card.name}</div>
            <div className="feCCHubCard__line">{card.line}</div>

            <div className="feCCHubPerks">
              {card.perks.map((perk) => (
                <div key={perk} className="feCCHubPerk">
                  <span className="feCCHubPerk__dot">✦</span>
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            <div className="feCCHubActions">
              <button
                type="button"
                className="feCCHubActions__apply"
                onClick={() => {
                  if (typeof window !== 'undefined') window.location.hash = '#/application_form'
                }}
              >
                Apply Now
              </button>
              <button type="button" className="feCCHubActions__brochure">
                Download Brochure
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

