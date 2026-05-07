import { useMemo, useRef, useState } from 'react'

function formatINR(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

function clamp(n, lo, hi) {
  return Math.min(Math.max(n, lo), hi)
}

/** Loan principal from EMI (reducing balance), monthly rate, n months */
function principalFromEmi(emi, annualRatePct, years) {
  const n = Math.max(1, Math.round(years * 12))
  const r = Math.max(0, annualRatePct) / 100 / 12
  if (emi <= 0) return 0
  if (r === 0) return emi * n
  return (emi * (1 - Math.pow(1 + r, -n))) / r
}

export default function EligibilityFormPage() {
  const [salary, setSalary] = useState('')
  const [currentEmi, setCurrentEmi] = useState('')
  const [rate, setRate] = useState('')
  const [tenureYears, setTenureYears] = useState('')
  const [foir, setFoir] = useState(50)
  const [showResults, setShowResults] = useState(false)

  const resultsRef = useRef(null)
  const ctaRef = useRef(null)

  const { maxObligation, availableEmi, eligiblePrincipal } = useMemo(() => {
    const s = Math.max(0, Number(salary) || 0)
    const emi = Math.max(0, Number(currentEmi) || 0)
    const r = Number(rate) || 0
    const t = Number(tenureYears) || 0
    const foirRatio = clamp(foir / 100, 0.1, 0.95)
    const maxOb = s * foirRatio
    const avail = Math.max(0, maxOb - emi)
    const principal = principalFromEmi(avail, r, t)
    return {
      maxObligation: maxOb,
      availableEmi: avail,
      eligiblePrincipal: principal,
    }
  }, [salary, currentEmi, rate, tenureYears, foir])

  const validationError = useMemo(() => {
    const s = Number(salary)
    const emi = Number(currentEmi)
    const r = Number(rate)
    const t = Number(tenureYears)
    if (!Number.isFinite(s) || salary === '') return 'Enter monthly salary.'
    if (s < 10000) return 'Enter a monthly salary of at least ₹10,000.'
    if (!Number.isFinite(emi) || currentEmi === '') return 'Enter current monthly EMI.'
    if (emi > s) return 'Current EMI cannot exceed monthly salary.'
    if (!Number.isFinite(r) || rate === '') return 'Enter expected interest rate.'
    if (r < 1 || r > 24) return 'Interest rate should be between 1% and 24%.'
    if (!Number.isFinite(t) || tenureYears === '') return 'Enter tenure in years.'
    if (t < 1 || t > 30) return 'Tenure should be between 1 and 30 years.'
    return null
  }, [salary, currentEmi, rate, tenureYears])

  const reset = () => {
    setSalary('')
    setCurrentEmi('')
    setRate('')
    setTenureYears('')
    setFoir(50)
    setShowResults(false)
  }

  const goApply = () => {
    if (typeof window !== 'undefined') window.location.hash = '#/application_form'
  }

  const onCalculate = () => {
    if (validationError) {
      setShowResults(true)
      window.requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }
    setShowResults(true)
    window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const scrollToCta = () => {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="feLoanElig" lang="en" aria-label="Loan Eligibility Calculator">
      <header className="feLoanElig__pageHead">
        <p className="feLoanElig__kicker">Loan Eligibility Calculator</p>
        <h1 className="feLoanElig__title">Plan your financial future with precision</h1>
      </header>

      <section className="feLoanElig__mainCard" aria-label="Eligibility inputs">
        <div className="feLoanElig__fields">
          <label className="feLoanElig__field">
            <span className="feLoanElig__fieldLabel">Monthly salary (₹)</span>
            <input
              className="feLoanElig__input"
              type="number"
              inputMode="numeric"
              min={0}
              max={500000}
              step={500}
              value={salary}
              onChange={(e) => {
                  const raw = e.target.value
                  if (raw === '') return setSalary('')
                  const n = Number(raw)
                  if (!Number.isFinite(n)) return
                  setSalary(clamp(Math.round(n), 0, 500000))
              }}
            />
          </label>

          <label className="feLoanElig__field">
            <span className="feLoanElig__fieldLabel">Current monthly EMI (₹)</span>
            <input
              className="feLoanElig__input"
              type="number"
              inputMode="numeric"
              min={0}
              max={500000}
              step={500}
              value={currentEmi}
              onChange={(e) => {
                  const raw = e.target.value
                  if (raw === '') return setCurrentEmi('')
                  const n = Number(raw)
                  if (!Number.isFinite(n)) return
                  setCurrentEmi(clamp(Math.round(n), 0, 500000))
              }}
            />
          </label>

          <label className="feLoanElig__field">
            <span className="feLoanElig__fieldLabel">Expected interest rate (% p.a.)</span>
            <div className="feLoanElig__inputWrap">
              <input
                className="feLoanElig__input"
                type="number"
                inputMode="decimal"
                min={1}
                max={24}
                step={0.1}
                value={rate}
                onChange={(e) => {
                  const raw = e.target.value
                  if (raw === '') return setRate('')
                  const n = Number(raw)
                  if (!Number.isFinite(n)) return
                  setRate(Math.round(clamp(n, 1, 24) * 10) / 10)
                }}
              />
            </div>
          </label>

          <label className="feLoanElig__field">
            <span className="feLoanElig__fieldLabel">Tenure (years)</span>
            <div className="feLoanElig__inputWrap">
              <input
                className="feLoanElig__input"
                type="number"
                inputMode="numeric"
                min={1}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => {
                  const raw = e.target.value
                  if (raw === '') return setTenureYears('')
                  const n = Number(raw)
                  if (!Number.isFinite(n)) return
                  setTenureYears(clamp(Math.round(n), 1, 30))
                }}
              />
            </div>
          </label>

          <div className="feLoanElig__foirBlock">
            <span className="feLoanElig__fieldLabel feLoanElig__fieldLabel--solo">
              Select FOIR (fixed obligation to income ratio)
            </span>
            <div className="feLoanElig__foirPills" role="group" aria-label="FOIR percentage">
              {[50, 60, 70].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  className={`feLoanElig__foirPill${foir === pct ? ' is-active' : ''}`}
                  aria-pressed={foir === pct}
                  onClick={() => setFoir(pct)}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div className="feLoanElig__actions">
            <button type="button" className="feLoanElig__btnReset" onClick={reset}>
              <span className="feLoanElig__btnResetIcon" aria-hidden="true">
                ↻
              </span>
              Reset
            </button>
            <button type="button" className="feLoanElig__btnCalc" onClick={onCalculate}>
              Calculate
            </button>
          </div>
        </div>
      </section>

      {showResults ? (
        <section ref={resultsRef} className="feLoanElig__outcome" aria-live="polite">
          {validationError ? (
            <div className="feLoanElig__outcomeInner feLoanElig__outcomeInner--warn">
              <p className="feLoanElig__outcomeWarnTitle">Check your inputs</p>
              <p className="feLoanElig__outcomeWarnText">{validationError}</p>
              <button type="button" className="feLoanElig__outcomeLink" onClick={() => setShowResults(false)}>
                Back to edit
              </button>
            </div>
          ) : (
            <div className="feLoanElig__outcomeInner">
              <p className="feLoanElig__outcomeKicker">Estimated eligible loan</p>
              <p className="feLoanElig__outcomeHero">{formatINR(eligiblePrincipal)}</p>
              <p className="feLoanElig__outcomeSub">Based on FOIR, your inputs, and a standard EMI-to-principal conversion.</p>
              <div className="feLoanElig__outcomeGrid">
                <div className="feLoanElig__outcomeCell">
                  <span className="feLoanElig__ogLabel">Max obligation (FOIR)</span>
                  <span className="feLoanElig__ogVal">{formatINR(maxObligation)}</span>
                </div>
                <div className="feLoanElig__outcomeCell">
                  <span className="feLoanElig__ogLabel">Available for new EMI</span>
                  <span className="feLoanElig__ogVal">{formatINR(availableEmi)}</span>
                </div>
                <div className="feLoanElig__outcomeCell">
                  <span className="feLoanElig__ogLabel">FOIR selected</span>
                  <span className="feLoanElig__ogVal">{foir}%</span>
                </div>
                <div className="feLoanElig__outcomeCell">
                  <span className="feLoanElig__ogLabel">Rate &amp; tenure</span>
                  <span className="feLoanElig__ogVal">
                    {rate.toFixed(1)}% · {tenureYears} yrs
                  </span>
                </div>
              </div>
              <p className="feLoanElig__outcomeNote">
                Indicative only. Lenders use credit score, employer, property value, and internal rules — not a substitute
                for an official sanction letter.
              </p>
              <div className="feLoanElig__outcomeActions">
                <button type="button" className="feLoanElig__outcomeSecondary" onClick={scrollToCta}>
                  Talk to an expert
                </button>
                <button type="button" className="feLoanElig__outcomePrimary" onClick={goApply}>
                  Apply now
                </button>
              </div>
            </div>
          )}
        </section>
      ) : null}

      <footer ref={ctaRef} className="feLoanElig__ctaBanner">
        <div className="feLoanElig__ctaCopy">
          <p className="feLoanElig__ctaEyebrow">
            <span className="feLoanElig__ctaDot" aria-hidden="true" /> Expert guidance
          </p>
          <h3 className="feLoanElig__ctaHeading">
            Start your home loan journey with <em>expert advice</em>
          </h3>
          <p className="feLoanElig__ctaText">
            Get personalized loan strategies and professional advice to achieve your dream home goals faster.
          </p>
        </div>
        <button type="button" className="feLoanElig__ctaBtn" onClick={goApply}>
          Get started now <span aria-hidden="true">›</span>
        </button>
      </footer>
    </div>
  )
}
