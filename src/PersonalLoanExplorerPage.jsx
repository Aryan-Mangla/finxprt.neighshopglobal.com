import { useMemo } from 'react'
import SectionPromoBanner from './SectionPromoBanner.jsx'

export default function PersonalLoanExplorerPage() {
  const offers = useMemo(
    () => [
      { id: 'o1', bank: 'HDFC', rate: 10.5, tag: 'Instant approval', tone: 'good' },
      { id: 'o2', bank: 'ICICI', rate: 11.2, tag: 'Low documentation', tone: 'medium' },
      { id: 'o3', bank: 'SBI', rate: 10.9, tag: 'Trusted rates', tone: 'good' },
      { id: 'o4', bank: 'Axis', rate: 11.6, tag: 'Fast disbursal', tone: 'medium' },
    ],
    [],
  )

  return (
    <div className="feLoanExp" aria-label="Personal Loan Explorer">
      <SectionPromoBanner
        icon="loan"
        title="⚡ Instant Personal Loan"
        subtitle="Get money in 5 minutes"
      />
      <SectionPromoBanner
        icon="bank"
        title="🏦 Smart Savings Account"
        subtitle="High interest + zero balance"
      />
      <div className="feLoanExpTop">
        <div className="feLoanExpTop__title">Personal Loan Offers</div>
        <div className="feLoanExpTop__sub">Compare interest rates and apply instantly.</div>
      </div>

      <div className="feBankRow" aria-label="Bank logos">
        {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'IDFC'].map((b) => (
          <div key={b} className="feBankPill" aria-label={b}>
            {b}
          </div>
        ))}
      </div>

      <div className="feLoanOffers" aria-label="Loan offers list">
        {offers.map((o) => (
          <div key={o.id} className="feLoanOffer" aria-label={`${o.bank} offer`}>
            <div className="feLoanOffer__top">
              <div className="feLoanOffer__bank">{o.bank}</div>
              <span className={`feStatus feStatus--${o.tone}`}>{o.tag}</span>
            </div>
            <div className="feLoanOffer__rateRow">
              <div className="feLoanOffer__k">Interest rate</div>
              <div className="feLoanOffer__v">{o.rate.toFixed(1)}% p.a.</div>
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
        ))}
      </div>
    </div>
  )
}

