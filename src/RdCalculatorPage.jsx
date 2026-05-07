import { useMemo, useRef, useState } from 'react'

function formatINR(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

function addMonths(base, months) {
  const d = new Date(base)
  d.setMonth(d.getMonth() + months)
  return d
}

export default function RdCalculatorPage() {
  const [monthly, setMonthly] = useState(50000)
  const [rate, setRate] = useState(7.5)
  const [tenY, setTenY] = useState(1)
  const [tenM, setTenM] = useState(0)
  const [tenD, setTenD] = useState(0)

  const totalMonths = useMemo(() => {
    const y = Math.max(0, tenY)
    const m = Math.max(0, Math.min(11, tenM))
    const d = Math.max(0, Math.min(31, tenD))
    const approx = y * 12 + m + Math.round(d / 30)
    return Math.max(1, approx)
  }, [tenY, tenM, tenD])

  const { maturity, invested, gain } = useMemo(() => {
    const p = Math.max(0, monthly)
    const r = Math.max(0, rate) / 100 / 12
    const n = totalMonths
    let mat = 0
    if (r === 0) mat = p * n
    else mat = p * ((Math.pow(1 + r, n) - 1) / r)
    const inv = p * n
    return { maturity: mat, invested: inv, gain: Math.max(0, mat - inv) }
  }, [monthly, rate, totalMonths])

  const depositDate = useMemo(() => new Date(), [])
  const maturityDate = useMemo(() => addMonths(depositDate, totalMonths), [depositDate, totalMonths])

  const formatDate = (d) =>
    d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

  const investPct = maturity > 0 ? Math.min(99.9, (invested / maturity) * 100) : 0

  const reset = () => {
    setMonthly(50000)
    setRate(7.5)
    setTenY(1)
    setTenM(0)
    setTenD(0)
  }

  const goApply = () => {
    if (typeof window !== 'undefined') window.location.hash = '#/application_form'
  }

  const goEligibility = () => {
    if (typeof window !== 'undefined') window.location.hash = '#/eligibility_form'
  }

  const quickRef = useRef(null)

  return (
    <div className="feRdLux" lang="en" aria-label="RD Calculator">
      <header className="feRdLux__pageHead">
        <p className="feRdLux__kicker">RD Calculator</p>
        <h1 className="feRdLux__title">Plan your wealth with precision</h1>
      </header>

      <section className="feRdLux__mainCard" aria-label="Calculator inputs">
        <div className="feRdLux__mainGrid">
          <div className="feRdLux__inputsCol">
            <label className="feRdLux__field">
              <span className="feRdLux__fieldLabel">Monthly investment amount</span>
              <input
                className="feRdLux__input"
                type="number"
                inputMode="numeric"
                min={500}
                max={100000}
                step={500}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value) || 0)}
              />
            </label>

            <label className="feRdLux__field">
              <span className="feRdLux__fieldLabel">Expected returns (% p.a.)</span>
              <div className="feRdLux__inputWrap feRdLux__inputWrap--suffix">
                <input
                  className="feRdLux__input"
                  type="number"
                  inputMode="decimal"
                  min={1}
                  max={15}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value) || 0)}
                />
                <span className="feRdLux__suffix">%</span>
              </div>
            </label>

            <div className="feRdLux__tenure">
              <span className="feRdLux__fieldLabel">Tenure</span>
              <div className="feRdLux__tenureRow">
                <label className="feRdLux__tenureCell">
                  <span className="feRdLux__tenureUnit">YRS</span>
                  <input
                    className="feRdLux__input feRdLux__input--small"
                    type="number"
                    min={0}
                    max={30}
                    value={tenY}
                    onChange={(e) => setTenY(Math.max(0, Number(e.target.value) || 0))}
                  />
                </label>
                <label className="feRdLux__tenureCell">
                  <span className="feRdLux__tenureUnit">MO</span>
                  <input
                    className="feRdLux__input feRdLux__input--small"
                    type="number"
                    min={0}
                    max={11}
                    value={tenM}
                    onChange={(e) => setTenM(Math.max(0, Math.min(11, Number(e.target.value) || 0)))}
                  />
                </label>
                <label className="feRdLux__tenureCell">
                  <span className="feRdLux__tenureUnit">DAY</span>
                  <input
                    className="feRdLux__input feRdLux__input--small"
                    type="number"
                    min={0}
                    max={31}
                    value={tenD}
                    onChange={(e) => setTenD(Math.max(0, Math.min(31, Number(e.target.value) || 0)))}
                  />
                </label>
              </div>
            </div>
          </div>

          <aside className="feRdLux__sideCol">
            <div className="feRdLux__datesBox">
              <div className="feRdLux__dateRow">
                <span className="feRdLux__dateIcon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </span>
                <div>
                  <div className="feRdLux__dateLabel">Deposit date</div>
                  <div className="feRdLux__dateVal">{formatDate(depositDate)}</div>
                </div>
              </div>
              <div className="feRdLux__dateRow">
                <span className="feRdLux__dateIcon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </span>
                <div>
                  <div className="feRdLux__dateLabel">Maturity date</div>
                  <div className="feRdLux__dateVal">{formatDate(maturityDate)}</div>
                </div>
              </div>
            </div>
            <div className="feRdLux__infoBox" role="note">
              <span className="feRdLux__infoIcon" aria-hidden="true">
                i
              </span>
              <p>Calculations are based on quarterly compounding, as commonly used for recurring deposits.</p>
            </div>
          </aside>
        </div>

        <div className="feRdLux__actions">
          <button type="button" className="feRdLux__btnReset" onClick={reset}>
            <span className="feRdLux__btnResetIcon" aria-hidden="true">
              ↻
            </span>
            Reset
          </button>
          <button
            type="button"
            className="feRdLux__btnCalc"
            onClick={() => quickRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Calculate
          </button>
        </div>
      </section>

      <section ref={quickRef} className="feRdLux__quickRow" aria-label="Quick results">
        <div className="feRdLux__quickCard">
          <span className="feRdLux__quickLabel">Future value</span>
          <span className="feRdLux__quickVal">{formatINR(maturity)}</span>
        </div>
        <div className="feRdLux__quickCard">
          <span className="feRdLux__quickLabel">Invested amount</span>
          <span className="feRdLux__quickVal">{formatINR(invested)}</span>
        </div>
        <div className="feRdLux__quickCard feRdLux__quickCard--accent">
          <span className="feRdLux__quickLabel">Total earnings</span>
          <span className="feRdLux__quickVal feRdLux__quickVal--accent">{formatINR(gain)}</span>
        </div>
      </section>

      <section className="feRdLux__chartCard" aria-label="Wealth growth projection">
        <div className="feRdLux__chartHead">
          <span className="feRdLux__chartIcon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20V10M6 20V4M18 20v-6" />
            </svg>
          </span>
          <h2 className="feRdLux__chartTitle">Wealth growth projection</h2>
        </div>
        <div className="feRdLux__donutWrap">
          <div
            className="feRdLux__donut"
            style={{
              background: `conic-gradient(from -90deg, #ff6b00 0deg ${investPct * 3.6}deg, #1a3673 ${investPct * 3.6}deg 360deg)`,
            }}
          >
            <div className="feRdLux__donutHole">
              <span className="feRdLux__donutTotalLabel">Total</span>
              <span className="feRdLux__donutTotalVal">{formatINR(maturity)}</span>
            </div>
          </div>
        </div>
        <div className="feRdLux__legend">
          <span className="feRdLux__legendItem">
            <span className="feRdLux__dot feRdLux__dot--orange" /> Invested amount
          </span>
          <span className="feRdLux__legendItem">
            <span className="feRdLux__dot feRdLux__dot--blue" /> Total interest
          </span>
        </div>
        <div className="feRdLux__eligibilityRow">
          <button type="button" className="feRdLux__eligibilityBtn" onClick={goEligibility}>
            Check my eligibility
          </button>
        </div>
      </section>

      <footer className="feRdLux__ctaBanner">
        <div className="feRdLux__ctaCopy">
          <p className="feRdLux__ctaEyebrow">Expert guidance</p>
          <h3 className="feRdLux__ctaHeading">
            Start your RD journey with <em>expert</em> advice
          </h3>
          <p className="feRdLux__ctaText">
            Compare rates across banks and pick a plan that fits your monthly budget.
          </p>
        </div>
        <button type="button" className="feRdLux__ctaBtn" onClick={goApply}>
          Get started now <span aria-hidden="true">›</span>
        </button>
      </footer>
    </div>
  )
}
