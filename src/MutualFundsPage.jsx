import { useMemo, useState } from 'react'

function Pill({ tone, children }) {
  return <span className={`fePill fePill--mf fePill--${tone}`}>{children}</span>
}

export default function MutualFundsPage({ onSelectFund }) {
  const categories = useMemo(() => ['Equity', 'Debt', 'Hybrid', 'ELSS'], [])
  const [activeCat, setActiveCat] = useState('Equity')
  const [query, setQuery] = useState('')

  const funds = useMemo(
    () => [
      {
        id: 'mf1',
        name: 'Bluechip Growth Fund',
        amc: 'Horizon AMC',
        cat: 'Equity',
        returns1y: 18.4,
        risk: 'High',
      },
      {
        id: 'mf2',
        name: 'Balanced Advantage Fund',
        amc: 'Peak Investments',
        cat: 'Hybrid',
        returns1y: 12.2,
        risk: 'Medium',
      },
      {
        id: 'mf3',
        name: 'Short Term Debt Fund',
        amc: 'Secure AMC',
        cat: 'Debt',
        returns1y: 7.6,
        risk: 'Low',
      },
      {
        id: 'mf4',
        name: 'Tax Saver ELSS Fund',
        amc: 'Atlas AMC',
        cat: 'ELSS',
        returns1y: 15.1,
        risk: 'High',
      },
      {
        id: 'mf5',
        name: 'Flexi Cap Fund',
        amc: 'Horizon AMC',
        cat: 'Equity',
        returns1y: 16.7,
        risk: 'High',
      },
      {
        id: 'mf6',
        name: 'Corporate Bond Fund',
        amc: 'Peak Investments',
        cat: 'Debt',
        returns1y: 8.2,
        risk: 'Low',
      },
    ],
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return funds.filter((f) => {
      const catOk = f.cat === activeCat
      const qOk = q.length === 0 ? true : `${f.name} ${f.amc}`.toLowerCase().includes(q)
      return catOk && qOk
    })
  }, [activeCat, funds, query])

  return (
    <div className="feMf" aria-label="Mutual Funds">
      <label className="feSearch" aria-label="Search mutual funds">
        <span className="feSearch__icon" aria-hidden="true">
          ⌕
        </span>
        <input
          className="feSearch__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search funds..."
        />
      </label>

      <div className="feCalcTabs" role="tablist" aria-label="Mutual fund categories">
        {categories.map((c) => {
          const isActive = c === activeCat
          return (
            <button
              key={c}
              type="button"
              className={`feCalcTab ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveCat(c)}
              role="tab"
              aria-selected={isActive}
            >
              {c}
            </button>
          )
        })}
      </div>

      <div className="feMfList" aria-label="Fund cards">
        {filtered.map((f) => {
          const tone = f.risk === 'Low' ? 'good' : f.risk === 'Medium' ? 'medium' : 'poor'
          return (
            <button
              key={f.id}
              type="button"
              className="feMfCard"
              onClick={() => onSelectFund(f.id)}
              aria-label={`Open ${f.name}`}
            >
              <div className="feMfCard__top">
                <div className="feMfCard__left">
                  <div className="feMfCard__name">{f.name}</div>
                  <div className="feMfCard__amc">{f.amc}</div>
                </div>
                <div className="feMfCard__right">
                  <div className="feMfCard__returnsLabel">1Y Returns</div>
                  <div className="feMfCard__returns">{f.returns1y.toFixed(1)}%</div>
                </div>
              </div>

              <div className="feMfCard__meta">
                <Pill tone="navy">{f.cat}</Pill>
                <Pill tone={tone}>Risk: {f.risk}</Pill>
              </div>

              <div className="feMfCard__ctaRow">
                <span className="feMfCard__hint">Tap to view details</span>
                <span className="feBtn feBtn--primary feMfCard__cta">Invest Now</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

