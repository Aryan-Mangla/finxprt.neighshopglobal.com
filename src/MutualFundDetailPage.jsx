import { useMemo } from 'react'

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

export default function MutualFundDetailPage({ fundId }) {
  const fund = useMemo(() => {
    const base = {
      mf1: { name: 'Bluechip Growth Fund', amc: 'Horizon AMC', cat: 'Equity', risk: 'High', r1: 18.4 },
      mf2: { name: 'Balanced Advantage Fund', amc: 'Peak Investments', cat: 'Hybrid', risk: 'Medium', r1: 12.2 },
      mf3: { name: 'Short Term Debt Fund', amc: 'Secure AMC', cat: 'Debt', risk: 'Low', r1: 7.6 },
      mf4: { name: 'Tax Saver ELSS Fund', amc: 'Atlas AMC', cat: 'ELSS', risk: 'High', r1: 15.1 },
      mf5: { name: 'Flexi Cap Fund', amc: 'Horizon AMC', cat: 'Equity', risk: 'High', r1: 16.7 },
      mf6: { name: 'Corporate Bond Fund', amc: 'Peak Investments', cat: 'Debt', risk: 'Low', r1: 8.2 },
    }
    return base[fundId] ?? base.mf1
  }, [fundId])

  return (
    <div className="feMfDetail" aria-label="Fund details">
      <div className="feMfHero">
        <div className="feMfHero__name">{fund.name}</div>
        <div className="feMfHero__sub">
          {fund.amc} • {fund.cat} • Risk: {fund.risk}
        </div>
      </div>

      <div className="feMfStats">
        <div className="feMfStat">
          <div className="feMfStat__k">1Y Returns</div>
          <div className="feMfStat__v">{fund.r1.toFixed(1)}%</div>
        </div>
        <div className="feMfStat">
          <div className="feMfStat__k">Min SIP</div>
          <div className="feMfStat__v">{formatINR(500)}</div>
        </div>
        <div className="feMfStat">
          <div className="feMfStat__k">AUM</div>
          <div className="feMfStat__v">{formatINR(1250000000)}</div>
        </div>
      </div>

      <div className="feMfCardX">
        <div className="feMfCardX__title">About this fund</div>
        <div className="feMfCardX__text">
          A clean, diversified strategy designed for long-term investors. Past performance does not
          guarantee future returns.
        </div>
      </div>

      <div className="feMfCardX">
        <div className="feMfCardX__title">Key highlights</div>
        <div className="feMfBullets">
          <div className="feMfBullet">Expense ratio: 0.62%</div>
          <div className="feMfBullet">Exit load: 1% (if redeemed within 1 year)</div>
          <div className="feMfBullet">Ideal horizon: 3–7 years</div>
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
  )
}

