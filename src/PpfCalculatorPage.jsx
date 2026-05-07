import { useMemo, useRef, useState } from 'react'

function formatINR(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

function clamp(n, lo, hi) {
  return Math.min(Math.max(n, lo), hi)
}

/** Annual deposit at start of each year; interest compounded yearly (simplified PPF model). */
function computePpf(yearlyInvest, years, ratePct) {
  const P = Math.round(clamp(yearlyInvest, 500, 150000))
  const n = Math.round(clamp(years, 1, 50))
  const r = clamp(ratePct, 1, 12) / 100
  let bal = 0
  for (let i = 0; i < n; i += 1) {
    bal = (bal + P) * (1 + r)
  }
  const principal = P * n
  const interest = Math.max(0, bal - principal)
  return { maturity: bal, principal, interest }
}

/** Indian financial year label (Apr–Mar), e.g. FY 2026-27. */
function currentFyLabel() {
  const d = new Date()
  const y = d.getFullYear()
  const m = d.getMonth()
  const start = m >= 3 ? y : y - 1
  const endShort = (start + 1) % 100
  return `FY ${start}-${String(endShort).padStart(2, '0')}`
}

export default function PpfCalculatorPage() {
  const [yearlyInvest, setYearlyInvest] = useState(150000)
  const [years, setYears] = useState(15)
  const [rate, setRate] = useState(7.1)

  const distRef = useRef(null)

  const { maturity, principal, interest } = useMemo(
    () => computePpf(yearlyInvest, years, rate),
    [yearlyInvest, years, rate],
  )

  const investShare = maturity > 0 ? principal / maturity : 0
  const interestShare = maturity > 0 ? interest / maturity : 0
  const interestRatioPct = maturity > 0 ? (interest / maturity) * 100 : 0

  /* Larger inner hole: moderate radius + thin stroke so centre text fits */
  const donutR = 55
  const donutStroke = 9
  const donutC = 2 * Math.PI * donutR
  const lenInv = investShare * donutC
  const lenInt = interestShare * donutC

  const reset = () => {
    setYearlyInvest(150000)
    setYears(15)
    setRate(7.1)
  }

  const onCalculate = () => {
    distRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goApply = () => {
    if (typeof window !== 'undefined') window.location.hash = '#/application_form'
  }

  const fy = currentFyLabel()

  return (
    <div className="fePpfLux" lang="en" aria-label="PPF Calculator">
      <header className="fePpfLux__pageHead">
        <span className="fePpfLux__headIcon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="6" y="3" width="12" height="18" rx="2" />
            <path d="M9 7h6M9 11h.01M12 11h.01M15 11h.01M9 15h.01M12 15h.01M15 15h.01" />
          </svg>
        </span>
        <div className="fePpfLux__headText">
          <h1 className="fePpfLux__title">PPF Calculator</h1>
          <p className="fePpfLux__subtitle">
            Plan your wealth with precision <span className="fePpfLux__fyDot">•</span>{' '}
            <span className="fePpfLux__fy">{fy}</span>
          </p>
        </div>
      </header>

      <section className="fePpfLux__mainCard" aria-label="PPF inputs and highlights">
        <div className="fePpfLux__topGrid">
          <div className="fePpfLux__investCol">
            <div className="fePpfLux__sectionLabel">
              <span className="fePpfLux__sectionIcon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M7 16l4-4 3 3 6-8" />
                </svg>
              </span>
              Investment details
            </div>

            <label className="fePpfLux__field">
              <span className="fePpfLux__fieldLabel">Yearly investment (₹)</span>
              <div className="fePpfLux__inputWrap fePpfLux__inputWrap--prefix">
                <span className="fePpfLux__prefix">₹</span>
                <input
                  className="fePpfLux__input fePpfLux__input--alignEnd"
                  type="number"
                  inputMode="numeric"
                  min={500}
                  max={150000}
                  step={500}
                  value={yearlyInvest}
                  onChange={(e) => {
                    const raw = e.target.value === '' ? 0 : Number(e.target.value)
                    if (!Number.isFinite(raw)) return
                    setYearlyInvest(clamp(Math.round(raw / 500) * 500, 500, 150000))
                  }}
                />
              </div>
            </label>

            <label className="fePpfLux__field">
              <span className="fePpfLux__fieldLabel">Time period (years)</span>
              <div className="fePpfLux__inputWrap">
                <input
                  className="fePpfLux__input fePpfLux__input--alignEnd"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={50}
                  step={1}
                  value={years}
                  onChange={(e) => {
                    const raw = e.target.value === '' ? 1 : Number(e.target.value)
                    if (!Number.isFinite(raw)) return
                    setYears(clamp(Math.round(raw), 1, 50))
                  }}
                />
                <span className="fePpfLux__suffix fePpfLux__suffix--text">Yrs</span>
              </div>
            </label>

            <label className="fePpfLux__field">
              <span className="fePpfLux__fieldLabel">Interest rate (%)</span>
              <div className="fePpfLux__inputWrap">
                <input
                  className="fePpfLux__input fePpfLux__input--alignEnd"
                  type="number"
                  inputMode="decimal"
                  min={1}
                  max={12}
                  step={0.1}
                  value={rate}
                  onChange={(e) => {
                    const raw = e.target.value === '' ? 0 : Number(e.target.value)
                    if (!Number.isFinite(raw)) return
                    setRate(Math.round(clamp(raw, 1, 12) * 10) / 10)
                  }}
                />
                <span className="fePpfLux__suffix">%</span>
              </div>
            </label>

            <div className="fePpfLux__actions">
              <button type="button" className="fePpfLux__btnReset" onClick={reset}>
                <span className="fePpfLux__btnResetIcon" aria-hidden="true">
                  ↻
                </span>
                Reset
              </button>
              <button type="button" className="fePpfLux__btnCalc" onClick={onCalculate}>
                Calculate returns <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <aside className="fePpfLux__highlights" aria-label="PPF highlights">
            <div className="fePpfLux__highlightsHead">
              <span className="fePpfLux__highlightsTitle">PPF highlights</span>
              <span className="fePpfLux__infoIcon" aria-hidden="true" title="Reference information">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <ul className="fePpfLux__hiList">
              <li className="fePpfLux__hiRow">
                <span className="fePpfLux__hiK">Current interest rate</span>
                <span className="fePpfLux__hiV">{rate}% p.a.</span>
              </li>
              <li className="fePpfLux__hiRow">
                <span className="fePpfLux__hiK">Lock-in period</span>
                <span className="fePpfLux__hiV">15 years</span>
              </li>
              <li className="fePpfLux__hiRow">
                <span className="fePpfLux__hiK">Tax benefit</span>
                <span className="fePpfLux__hiV">80C · EEE</span>
              </li>
              <li className="fePpfLux__hiRow">
                <span className="fePpfLux__hiK">Max investment</span>
                <span className="fePpfLux__hiV">₹1,50,000 / yr</span>
              </li>
            </ul>
            <p className="fePpfLux__hiNote">
              Illustrative only; RBI notifies PPF rates each quarter. Extension blocks and partial years are not
              modelled here.
            </p>
          </aside>
        </div>
      </section>

      <section className="fePpfLux__quickRow" aria-label="Results summary">
        <div className="fePpfLux__quickCard fePpfLux__quickCard--accent">
          <span className="fePpfLux__quickLabel">Total investment</span>
          <span className="fePpfLux__quickVal fePpfLux__quickVal--accent">{formatINR(principal)}</span>
        </div>
        <div className="fePpfLux__quickCard">
          <span className="fePpfLux__quickLabel">Total interest</span>
          <span className="fePpfLux__quickVal">{formatINR(interest)}</span>
        </div>
        <div className="fePpfLux__quickCard">
          <span className="fePpfLux__quickLabel">Maturity value</span>
          <span className="fePpfLux__quickVal">{formatINR(maturity)}</span>
        </div>
      </section>

      <section ref={distRef} className="fePpfLux__distCard" aria-label="Returns distribution">
        <h2 className="fePpfLux__distTitle">Returns distribution</h2>
        <div className="fePpfLux__distGrid">
          <div className="fePpfLux__donutWrap">
            <svg className="fePpfLux__donutSvg" viewBox="0 0 160 160" aria-hidden="true">
              <g transform={`rotate(-90 ${80} ${80})`}>
                <circle
                  cx="80"
                  cy="80"
                  r={donutR}
                  fill="none"
                  stroke="#e8eef6"
                  strokeWidth={donutStroke}
                />
                <circle
                  cx="80"
                  cy="80"
                  r={donutR}
                  fill="none"
                  stroke="#ff7a1a"
                  strokeWidth={donutStroke}
                  strokeLinecap="round"
                  strokeDasharray={`${lenInv} ${donutC}`}
                />
                <circle
                  cx="80"
                  cy="80"
                  r={donutR}
                  fill="none"
                  stroke="#1a4b8c"
                  strokeWidth={donutStroke}
                  strokeLinecap="round"
                  strokeDasharray={`${lenInt} ${donutC}`}
                  strokeDashoffset={-lenInv}
                />
              </g>
            </svg>
            <div className="fePpfLux__donutCenter">
              <div className="fePpfLux__donutInner">
                <span className="fePpfLux__donutCenterLabel">
                  <span className="fePpfLux__donutLabelLine">Interest</span>
                  <span className="fePpfLux__donutLabelLine">Ratio</span>
                </span>
                <span className="fePpfLux__donutCenterVal">
                  {maturity > 0 ? `${interestRatioPct.toFixed(1)}%` : '—'}
                </span>
              </div>
            </div>
          </div>

          <div className="fePpfLux__distSide">
            <div className="fePpfLux__legendRows">
              <div className="fePpfLux__legendRow">
                <span className="fePpfLux__legendLab">
                  <span className="fePpfLux__dot fePpfLux__dot--orange" aria-hidden="true" />
                  Total investment
                </span>
                <span className="fePpfLux__legendAmt">{formatINR(principal)}</span>
              </div>
              <div className="fePpfLux__legendRow">
                <span className="fePpfLux__legendLab">
                  <span className="fePpfLux__dot fePpfLux__dot--blue" aria-hidden="true" />
                  Total interest
                </span>
                <span className="fePpfLux__legendAmt">{formatINR(interest)}</span>
              </div>
            </div>

            <div className="fePpfLux__barBlock">
              <div className="fePpfLux__barHead">
                <span className="fePpfLux__barLabel">Maturity value</span>
                <span className="fePpfLux__barTotal">{formatINR(maturity)}</span>
              </div>
              <div className="fePpfLux__ratioBar" role="img" aria-label="Principal versus interest share of maturity">
                <span
                  className="fePpfLux__ratioSeg fePpfLux__ratioSeg--inv"
                  style={{ width: `${investShare * 100}%` }}
                />
                <span
                  className="fePpfLux__ratioSeg fePpfLux__ratioSeg--int"
                  style={{ width: `${interestShare * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="fePpfLux__ctaBanner">
        <div className="fePpfLux__ctaInner">
          <div className="fePpfLux__ctaCopy">
            <p className="fePpfLux__ctaEyebrow">
              <span className="fePpfLux__ctaDot" /> Expert guidance
            </p>
            <h3 className="fePpfLux__ctaHeading">
              Start your wealth journey with <em>expert advice</em>
            </h3>
            <p className="fePpfLux__ctaText">
              Get personalized investment strategies and professional guidance to align PPF and mutual funds with your
              goals.
            </p>
          </div>
          <button type="button" className="fePpfLux__ctaBtn" onClick={goApply}>
            Get started now <span aria-hidden="true">›</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
