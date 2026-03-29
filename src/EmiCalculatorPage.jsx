import { useEffect, useMemo, useRef, useState } from 'react'
import SectionPromoBanner from './SectionPromoBanner.jsx'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

function useAnimatedNumber(target, { durationMs = 260, reduceMotion = false } = {}) {
  const [v, setV] = useState(target)
  const fromRef = useRef(target)
  const rafRef = useRef(0)

  useEffect(() => {
    if (reduceMotion) {
      setV(target)
      fromRef.current = target
      return
    }

    const from = fromRef.current
    const start = performance.now()

    const tick = (now) => {
      const t = clamp((now - start) / durationMs, 0, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = from + (target - from) * eased
      setV(next)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else fromRef.current = target
    }

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [durationMs, reduceMotion, target])

  return v
}

export default function EmiCalculatorPage({ reduceMotion = false }) {
  const [loanAmount, setLoanAmount] = useState(750000)
  const [interestRate, setInterestRate] = useState(11.5)
  const [tenureYears, setTenureYears] = useState(5)

  const emi = useMemo(() => {
    const P = Math.max(0, loanAmount)
    const annual = Math.max(0, interestRate) / 100
    const n = Math.max(1, Math.round(tenureYears * 12))
    const r = annual / 12

    const monthly =
      r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = monthly * n
    const totalInterest = Math.max(0, totalPayment - P)
    const principalPct = totalPayment <= 0 ? 0 : clamp(P / totalPayment, 0, 1)

    return { monthly, totalPayment, totalInterest, principalPct }
  }, [interestRate, loanAmount, tenureYears])

  const aMonthly = useAnimatedNumber(emi.monthly, { reduceMotion })
  const aInterest = useAnimatedNumber(emi.totalInterest, { reduceMotion })
  const aTotal = useAnimatedNumber(emi.totalPayment, { reduceMotion })
  const [breakdownOpen, setBreakdownOpen] = useState(false)
  const [breakdownKey, setBreakdownKey] = useState('monthly')

  return (
    <div className="feEmi" aria-label="EMI Calculator">
      <SectionPromoBanner
        icon="money"
        title="💰 Low Interest EMI"
        subtitle="Starting from 10.5% p.a."
      />
      <div className="feCalcCard" aria-label="EMI calculator card">
        <div className="feCalcCard__head">
          <div>
            <div className="feCalcCard__title">EMI Calculator</div>
            <div className="feCalcCard__sub">Calculate monthly EMI and total cost</div>
          </div>
          <span className="fePill">Live</span>
        </div>

        <div className="feEmiChartRow">
          <div className="fePie" style={{ '--p': emi.principalPct }} aria-label="Principal vs Interest chart">
            <div className="fePie__center">
              <div className="fePie__label">Monthly EMI</div>
              <div className="fePie__value">{formatINR(aMonthly)}</div>
            </div>
          </div>

          <div className="fePieLegend" aria-label="Chart legend">
            <div className="fePieLegend__item">
              <span className="fePieLegend__swatch fePieLegend__swatch--principal" aria-hidden="true" />
              <span className="fePieLegend__text">Principal</span>
            </div>
            <div className="fePieLegend__item">
              <span className="fePieLegend__swatch fePieLegend__swatch--interest" aria-hidden="true" />
              <span className="fePieLegend__text">Interest</span>
            </div>
            <div className="fePieLegend__note">Indicative split over total payment</div>
          </div>
        </div>

        <div className="feCalcInputs">
          <label className="feCalcInput">
            <div className="feCalcInput__top">
              <span>Loan Amount</span>
              <strong>{formatINR(loanAmount)}</strong>
            </div>
            <input
              className="feRange"
              type="range"
              min="50000"
              max="5000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </label>

          <label className="feCalcInput">
            <div className="feCalcInput__top">
              <span>Interest Rate</span>
              <strong>{interestRate.toFixed(1)}%</strong>
            </div>
            <input
              className="feRange"
              type="range"
              min="6"
              max="24"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </label>

          <label className="feCalcInput">
            <div className="feCalcInput__top">
              <span>Tenure</span>
              <strong>{tenureYears} years</strong>
            </div>
            <input
              className="feRange"
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="feCalcResults" aria-label="EMI Results">
          <button
            type="button"
            className="feResult feResult--highlight feResult--btn"
            onClick={() => {
              setBreakdownKey('monthly')
              setBreakdownOpen(true)
            }}
          >
            <div className="feResult__label">Monthly EMI</div>
            <div className="feResult__value feResult__value--orange">{formatINR(aMonthly)}</div>
          </button>
          <button
            type="button"
            className="feResult feResult--btn"
            onClick={() => {
              setBreakdownKey('interest')
              setBreakdownOpen(true)
            }}
          >
            <div className="feResult__label">Total Interest</div>
            <div className="feResult__value">{formatINR(aInterest)}</div>
          </button>
          <button
            type="button"
            className="feResult feResult--btn"
            onClick={() => {
              setBreakdownKey('total')
              setBreakdownOpen(true)
            }}
          >
            <div className="feResult__label">Total Payment</div>
            <div className="feResult__value">{formatINR(aTotal)}</div>
          </button>
        </div>

        <button
          type="button"
          className="feBtn feBtn--primary feBtn--full"
          onClick={() => {
            if (typeof window !== 'undefined') window.location.hash = '#/application_form'
          }}
        >
          Apply for Loan
        </button>
      </div>

      {breakdownOpen ? (
        <div className="feModal" role="dialog" aria-label="EMI Breakdown">
          <button
            type="button"
            className="feModal__backdrop"
            aria-label="Close"
            onClick={() => setBreakdownOpen(false)}
          />
          <div className="feModal__sheet">
            <div className="feModal__head">
              <div className="feModal__title">EMI Breakdown</div>
              <button type="button" className="feModal__close" onClick={() => setBreakdownOpen(false)}>
                ✕
              </button>
            </div>
            <div className="feModal__body">
              <div className="feModal__chart">
                <div className="fePie" style={{ '--p': emi.principalPct }}>
                  <div className="fePie__center">
                    <div className="fePie__label">
                      {breakdownKey === 'interest'
                        ? 'Total Interest'
                        : breakdownKey === 'total'
                          ? 'Total Payment'
                          : 'Monthly EMI'}
                    </div>
                    <div className="fePie__value">
                      {breakdownKey === 'interest'
                        ? formatINR(aInterest)
                        : breakdownKey === 'total'
                          ? formatINR(aTotal)
                          : formatINR(aMonthly)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="feModal__facts">
                <div className="feCCFact">
                  <div className="feCCFact__k">Principal</div>
                  <div className="feCCFact__v">{formatINR(loanAmount)}</div>
                </div>
                <div className="feCCFact">
                  <div className="feCCFact__k">Total Interest</div>
                  <div className="feCCFact__v">{formatINR(aInterest)}</div>
                </div>
                <div className="feCCFact">
                  <div className="feCCFact__k">Total Payment</div>
                  <div className="feCCFact__v">{formatINR(aTotal)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

