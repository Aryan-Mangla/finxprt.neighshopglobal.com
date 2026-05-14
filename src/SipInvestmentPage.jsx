import { useRef, useState } from 'react'

function clamp(n, lo, hi) {
  return Math.min(Math.max(n, lo), hi)
}

const STEP_UP_PCT = 10

export default function SipInvestmentPage({ onInvestNow }) {
  const [frequency, setFrequency] = useState('monthly')
  const [amount, setAmount] = useState(5000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const [stepUp, setStepUp] = useState(false)

  const ctaRef = useRef(null)

  const reset = () => {
    setFrequency('monthly')
    setAmount(5000)
    setRate(12)
    setYears(10)
    setStepUp(false)
  }

  const onCalculate = () => {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const goStarted = () => {
    if (onInvestNow) onInvestNow('Apply for SIP Investment', 'Plan your wealth with precision')
  }

  const investLabel = frequency === 'monthly' ? 'Investment amount (₹)' : 'Yearly investment (₹)'
  const investHint = frequency === 'monthly' ? 'Per month' : 'Once every year'
  const amountMin = frequency === 'monthly' ? 100 : 500
  const amountMax = frequency === 'monthly' ? 1000000 : 5000000
  const amountStep = frequency === 'monthly' ? 100 : 500

  return (
    <div className="feLumpLux feSipLux" lang="en" aria-label="SIP Calculator">
      <header className="feLumpLux__pageHead feSipLux__pageHead">
        <h1 className="feLumpLux__title feSipLux__mainTitle">SIP Calculator</h1>
        <p className="feSipLux__subtitle">Plan your wealth with precision</p>
      </header>

      <section className="feLumpLux__mainCard" aria-label="Calculator inputs">
        <div className="feLumpLux__topGrid">
          <div className="feLumpLux__inputsCol">
            <div className="feSipLux__freq">
              <span className="feLumpLux__fieldLabel" id="sip-freq-label">
                Frequency
              </span>
              <div className="feSipLux__freqSeg" role="group" aria-labelledby="sip-freq-label">
                <button
                  type="button"
                  className={`feSipLux__freqBtn${frequency === 'monthly' ? ' is-active' : ''}`}
                  aria-pressed={frequency === 'monthly'}
                  onClick={() => setFrequency('monthly')}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  className={`feSipLux__freqBtn${frequency === 'yearly' ? ' is-active' : ''}`}
                  aria-pressed={frequency === 'yearly'}
                  onClick={() => setFrequency('yearly')}
                >
                  Yearly
                </button>
              </div>
            </div>

            <label className="feLumpLux__field">
              <span className="feLumpLux__fieldLabel">{investLabel}</span>
              <div className="feLumpLux__inputWrap feLumpLux__inputWrap--prefix">
                <span className="feLumpLux__prefix">₹</span>
                <input
                  className="feLumpLux__input"
                  type="number"
                  inputMode="numeric"
                  min={amountMin}
                  max={amountMax}
                  step={amountStep}
                  value={amount}
                  onChange={(e) => {
                    const raw = e.target.value === '' ? 0 : Number(e.target.value)
                    if (!Number.isFinite(raw)) return
                    // Keep typing smooth; enforce min/max on blur.
                    setAmount(Math.max(0, Math.round(raw)))
                  }}
                  onBlur={() => setAmount(clamp(Math.round(amount), amountMin, amountMax))}
                  aria-describedby="sip-amt-hint"
                />
              </div>
              <span id="sip-amt-hint" className="feSipLux__fieldHint">
                {investHint}
              </span>
            </label>

            <label className="feLumpLux__field">
              <span className="feLumpLux__fieldLabel">Expected returns (% p.a.)</span>
              <div className="feLumpLux__inputWrap">
                <input
                  className="feLumpLux__input"
                  type="number"
                  inputMode="decimal"
                  min={1}
                  max={30}
                  step={0.1}
                  value={rate}
                  onChange={(e) => {
                    const raw = e.target.value === '' ? 0 : Number(e.target.value)
                    if (!Number.isFinite(raw)) return
                    setRate(Math.round(clamp(raw, 1, 30) * 10) / 10)
                  }}
                />
                <span className="feLumpLux__suffix">%</span>
              </div>
            </label>

            <label className="feLumpLux__field">
              <span className="feLumpLux__fieldLabel">Tenure (years)</span>
              <div className="feLumpLux__inputWrap">
                <input
                  className="feLumpLux__input"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={30}
                  step={1}
                  value={years}
                  onChange={(e) => {
                    const raw = e.target.value === '' ? 1 : Number(e.target.value)
                    if (!Number.isFinite(raw)) return
                    setYears(clamp(Math.round(raw), 1, 30))
                  }}
                />
                <span className="feLumpLux__suffix feLumpLux__suffix--text">Yrs</span>
              </div>
            </label>
          </div>

          <div className="feLumpLux__compoundCol feSipLux__stepCard">
            <div className="feSipLux__stepRow">
              <div className="feSipLux__stepTitles">
                <span className="feSipLux__stepName">Annual step-up</span>
                <span className="feSipLux__stepCaps">Increase investment yearly</span>
              </div>
              <button
                type="button"
                className={`feLumpLux__switch${stepUp ? ' is-on' : ''}`}
                aria-pressed={stepUp}
                onClick={() => setStepUp((s) => !s)}
                aria-label={stepUp ? 'Turn off annual step-up' : 'Turn on annual step-up'}
              >
                <span className="feLumpLux__switchKnob" />
              </button>
            </div>
            <p className="feLumpLux__compoundHint">
              {stepUp
                ? `Investment rises ${STEP_UP_PCT}% every year on the SIP anniversary.`
                : 'Keep the same instalment each year.'}
            </p>
            <div className="feSipLux__sideActions">
              <div className="feLumpLux__actions feSipLux__actions">
                <button type="button" className="feLumpLux__btnReset" onClick={reset}>
                  <span className="feLumpLux__btnResetIcon" aria-hidden="true">
                    ↻
                  </span>
                  Reset
                </button>
                <button type="button" className="feLumpLux__btnCalc" onClick={onCalculate}>
                  <span className="feLumpLux__btnCalcIcon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="6" y="3" width="12" height="18" rx="2" />
                      <path d="M9 7h6M9 11h.01M12 11h.01M15 11h.01M9 15h.01M12 15h.01M15 15h.01" />
                    </svg>
                  </span>
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer ref={ctaRef} className="feLumpLux__ctaBanner">
        <div className="feLumpLux__ctaInner">
          <div className="feLumpLux__ctaCopy">
            <p className="feLumpLux__ctaEyebrow">
              <span className="feLumpLux__ctaDot" /> Expert guidance
            </p>
            <h3 className="feLumpLux__ctaHeading">
              Start your SIP journey with <em>NISM-certified expert</em>
            </h3>
            <p className="feLumpLux__ctaText">
              Get personalized investment strategies and professional advice to achieve your financial goals faster.
            </p>
          </div>
          <button type="button" className="feLumpLux__ctaBtn feSipLux__ctaBtn" onClick={goStarted}>
            Get started now{' '}
            <span className="feSipLux__ctaTrend" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M4 16l6-6 4 4 6-8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 6h6v6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </footer>
    </div>
  )
}
