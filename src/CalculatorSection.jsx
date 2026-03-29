import { useEffect, useMemo, useRef, useState } from 'react'

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

const CALCS = [
  { id: 'emi', label: 'EMI Calculator' },
  { id: 'sip', label: 'SIP Calculator' },
  { id: 'fd', label: 'FD Calculator' },
  { id: 'eligibility', label: 'Loan Eligibility' },
]

function BackChevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width={20}
      height={20}
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

export default function CalculatorSection({ initial = 'emi', reduceMotion = false, onBack }) {
  const rangeFill = (value, min, max) => ({
    '--fill': `${Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))}%`,
  })

  const [active, setActive] = useState(initial)
  const [breakdownOpen, setBreakdownOpen] = useState(false)
  const [breakdownKey, setBreakdownKey] = useState('emi')

  // EMI
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

    return { monthly, totalPayment, totalInterest }
  }, [interestRate, loanAmount, tenureYears])

  const emiPrincipalPct = useMemo(() => {
    const tp = emi.totalPayment
    if (tp <= 0) return 0
    return clamp(loanAmount / tp, 0, 1)
  }, [emi.totalPayment, loanAmount])

  const aEmi = useAnimatedNumber(emi.monthly, { reduceMotion })
  const aEmiInterest = useAnimatedNumber(emi.totalInterest, { reduceMotion })
  const aEmiTotal = useAnimatedNumber(emi.totalPayment, { reduceMotion })

  // SIP
  const [sipMonthly, setSipMonthly] = useState(20000)
  const [sipRate, setSipRate] = useState(12)
  const [sipYears, setSipYears] = useState(10)

  const sip = useMemo(() => {
    const P = Math.max(0, sipMonthly)
    const n = Math.max(1, Math.round(sipYears * 12))
    const r = Math.max(0, sipRate) / 100
    const i = r / 12

    const invested = P * n
    const total = i === 0 ? invested : P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i))
    const returns = Math.max(0, total - invested)
    const investedPct = total <= 0 ? 0 : clamp(invested / total, 0, 1)

    return { invested, total, returns, investedPct }
  }, [sipMonthly, sipRate, sipYears])

  const aSipInvested = useAnimatedNumber(sip.invested, { reduceMotion })
  const aSipReturns = useAnimatedNumber(sip.returns, { reduceMotion })
  const aSipTotal = useAnimatedNumber(sip.total, { reduceMotion })

  // FD
  const [fdAmount, setFdAmount] = useState(250000)
  const [fdRate, setFdRate] = useState(7.25)
  const [fdYears, setFdYears] = useState(3)

  const fd = useMemo(() => {
    const P = Math.max(0, fdAmount)
    const r = Math.max(0, fdRate) / 100
    const t = Math.max(0.25, fdYears)
    const n = 4 // quarterly compounding

    const maturity = P * Math.pow(1 + r / n, n * t)
    const profit = Math.max(0, maturity - P)
    return { maturity, profit }
  }, [fdAmount, fdRate, fdYears])

  const aFdMaturity = useAnimatedNumber(fd.maturity, { reduceMotion })
  const aFdProfit = useAnimatedNumber(fd.profit, { reduceMotion })

  // Eligibility (simple, explainable heuristic)
  const [monthlyIncome, setMonthlyIncome] = useState(80000)
  const [existingEmi, setExistingEmi] = useState(5000)
  const [eligRate, setEligRate] = useState(11)
  const [eligYears, setEligYears] = useState(5)

  const eligibility = useMemo(() => {
    const disposable = Math.max(0, monthlyIncome - existingEmi)
    const maxEmi = disposable * 0.4

    const annual = Math.max(0, eligRate) / 100
    const n = Math.max(1, Math.round(eligYears * 12))
    const r = annual / 12

    const eligibleAmount =
      r === 0 ? maxEmi * n : (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n))
    return { maxEmi, eligibleAmount }
  }, [eligRate, eligYears, existingEmi, monthlyIncome])

  const aEligAmount = useAnimatedNumber(eligibility.eligibleAmount, { reduceMotion })
  const aEligEmi = useAnimatedNumber(eligibility.maxEmi, { reduceMotion })

  return (
    <section className="feCalcSection feCalcSection--premium" aria-label="Calculate Your Finances">
      {onBack ? (
        <div className="feCalcSection__headerBand">
          <div className="feScreenTop feCalcSection__top">
            <button type="button" className="feBackBtn" onClick={onBack} aria-label="Back">
              <BackChevron />
            </button>
            <div className="feScreenTop__texts">
              <div className="feScreenTop__title">Calculate Your Finances</div>
              <div className="feScreenTop__sub">EMI, SIP, FD &amp; eligibility</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="feSection__head">
          <div className="feSection__title">Calculate Your Finances</div>
        </div>
      )}

      <div className="feCalcTabs" role="tablist" aria-label="Calculator types">
        {CALCS.map((c) => {
          const isActive = c.id === active
          return (
            <button
              key={c.id}
              type="button"
              className={`feCalcTab ${isActive ? 'is-active' : ''}`}
              onClick={() => setActive(c.id)}
              role="tab"
              aria-selected={isActive}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      {active === 'emi' ? (
        <div className="feCalcCard feCalcCard--emi feCalcCard--emiPro" aria-label="EMI Calculator">
          <div className="feCalcCard__head">
            <div>
              <div className="feCalcCard__title">EMI Calculator</div>
              <div className="feCalcCard__sub">Adjust sliders — watch principal vs interest shift</div>
            </div>
            <span className="fePill fePill--live">Live</span>
          </div>

          <div className="feCalcEmiHero" aria-label="EMI overview">
            <div className="feCalcEmiHero__donutWrap">
              <div
                className="feDonut feDonut--emi"
                style={{ '--p': emiPrincipalPct }}
              >
                <div className="feDonut__center">
                  <div className="feDonut__label feDonut__label--emi">Monthly EMI</div>
                  <div className="feDonut__value feDonut__value--emi">{formatINR(aEmi)}</div>
                  <div className="feDonut__hint">of total repayment</div>
                </div>
              </div>
            </div>
            <div className="feCalcEmiLegend">
              <div className="feCalcEmiLegend__row">
                <span className="feCalcEmiLegend__sw feCalcEmiLegend__sw--principal" aria-hidden="true" />
                <div className="feCalcEmiLegend__texts">
                  <span className="feCalcEmiLegend__k">Principal</span>
                  <span className="feCalcEmiLegend__v">{formatINR(loanAmount)}</span>
                </div>
              </div>
              <div className="feCalcEmiLegend__row">
                <span className="feCalcEmiLegend__sw feCalcEmiLegend__sw--interest" aria-hidden="true" />
                <div className="feCalcEmiLegend__texts">
                  <span className="feCalcEmiLegend__k">Interest</span>
                  <span className="feCalcEmiLegend__v">{formatINR(aEmiInterest)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="feCalcInputs feCalcInputs--emi">
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
                style={rangeFill(loanAmount, 50000, 5000000)}
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
                style={rangeFill(interestRate, 6, 24)}
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
                style={rangeFill(tenureYears, 1, 30)}
                onChange={(e) => setTenureYears(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="feCalcResults feCalcResults--emi" aria-label="EMI Results">
            <button
              type="button"
              className="feResult feResult--highlight feResult--btn feResult--emiPrimary"
              onClick={() => {
                setBreakdownKey('monthly')
                setBreakdownOpen(true)
              }}
            >
              <div className="feResult__label">Monthly EMI</div>
              <div className="feResult__value feResult__value--orange">{formatINR(aEmi)}</div>
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
              <div className="feResult__value">{formatINR(aEmiInterest)}</div>
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
              <div className="feResult__value">{formatINR(aEmiTotal)}</div>
            </button>
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
      ) : null}

      {active === 'sip' ? (
        <div className="feCalcCard" aria-label="SIP Calculator">
          <div className="feCalcCard__head">
            <div>
              <div className="feCalcCard__title">SIP Calculator</div>
              <div className="feCalcCard__sub">Investment vs returns breakdown</div>
            </div>
            <span className="fePill fePill--green">{sipRate}% p.a.</span>
          </div>

          <div className="feSipRow">
            <div className="feDonut" style={{ '--p': sip.investedPct }}>
              <div className="feDonut__center">
                <div className="feDonut__label">Total</div>
                <div className="feDonut__value">{formatINR(aSipTotal)}</div>
              </div>
            </div>

            <div className="feCalcInputs">
              <label className="feCalcInput">
                <div className="feCalcInput__top">
                  <span>Monthly Investment</span>
                  <strong>{formatINR(sipMonthly)}</strong>
                </div>
                <input
                  className="feRange"
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={sipMonthly}
                  style={rangeFill(sipMonthly, 500, 100000)}
                  onChange={(e) => setSipMonthly(Number(e.target.value))}
                />
              </label>

              <label className="feCalcInput">
                <div className="feCalcInput__top">
                  <span>Expected Return</span>
                  <strong>{sipRate}%</strong>
                </div>
                <input
                  className="feRange"
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={sipRate}
                  style={rangeFill(sipRate, 0, 20)}
                  onChange={(e) => setSipRate(Number(e.target.value))}
                />
              </label>

              <label className="feCalcInput">
                <div className="feCalcInput__top">
                  <span>Time Period</span>
                  <strong>{sipYears} years</strong>
                </div>
                <input
                  className="feRange"
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={sipYears}
                  style={rangeFill(sipYears, 1, 30)}
                  onChange={(e) => setSipYears(Number(e.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="feCalcResults" aria-label="SIP Results">
            <div className="feResult">
              <div className="feResult__label">Invested Amount</div>
              <div className="feResult__value">{formatINR(aSipInvested)}</div>
            </div>
            <div className="feResult">
              <div className="feResult__label">Estimated Returns</div>
              <div className="feResult__value">{formatINR(aSipReturns)}</div>
            </div>
            <div className="feResult feResult--highlight">
              <div className="feResult__label">Total Value</div>
              <div className="feResult__value feResult__value--green">{formatINR(aSipTotal)}</div>
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
      ) : null}

      {active === 'fd' ? (
        <div className="feCalcCard" aria-label="FD Calculator">
          <div className="feCalcCard__head">
            <div>
              <div className="feCalcCard__title">FD Calculator</div>
              <div className="feCalcCard__sub">Quarterly compounding estimate</div>
            </div>
            <span className="fePill fePill--green">{fdRate.toFixed(2)}%</span>
          </div>

          <div className="feCalcInputs">
            <label className="feCalcInput">
              <div className="feCalcInput__top">
                <span>Investment Amount</span>
                <strong>{formatINR(fdAmount)}</strong>
              </div>
              <input
                className="feRange"
                type="range"
                min="10000"
                max="5000000"
                step="5000"
                value={fdAmount}
                style={rangeFill(fdAmount, 10000, 5000000)}
                onChange={(e) => setFdAmount(Number(e.target.value))}
              />
            </label>

            <label className="feCalcInput">
              <div className="feCalcInput__top">
                <span>Interest Rate</span>
                <strong>{fdRate.toFixed(2)}%</strong>
              </div>
              <input
                className="feRange"
                type="range"
                min="3"
                max="12"
                step="0.05"
                value={fdRate}
                style={rangeFill(fdRate, 3, 12)}
                onChange={(e) => setFdRate(Number(e.target.value))}
              />
            </label>

            <label className="feCalcInput">
              <div className="feCalcInput__top">
                <span>Tenure</span>
                <strong>{fdYears} years</strong>
              </div>
              <input
                className="feRange"
                type="range"
                min="1"
                max="10"
                step="1"
                value={fdYears}
                style={rangeFill(fdYears, 1, 10)}
                onChange={(e) => setFdYears(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="feCalcResults" aria-label="FD Results">
            <div className="feResult feResult--highlight">
              <div className="feResult__label">Maturity Amount</div>
              <div className="feResult__value feResult__value--green">{formatINR(aFdMaturity)}</div>
            </div>
            <div className="feResult">
              <div className="feResult__label">Profit</div>
              <div className="feResult__value feResult__value--green">{formatINR(aFdProfit)}</div>
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
      ) : null}

      {active === 'eligibility' ? (
        <div className="feCalcCard" aria-label="Loan Eligibility Calculator">
          <div className="feCalcCard__head">
            <div>
              <div className="feCalcCard__title">Loan Eligibility</div>
              <div className="feCalcCard__sub">Estimate eligible loan amount quickly</div>
            </div>
            <span className="fePill">Estimate</span>
          </div>

          <div className="feCalcInputs">
            <label className="feCalcInput">
              <div className="feCalcInput__top">
                <span>Monthly Income</span>
                <strong>{formatINR(monthlyIncome)}</strong>
              </div>
              <input
                className="feRange"
                type="range"
                min="10000"
                max="500000"
                step="1000"
                value={monthlyIncome}
                style={rangeFill(monthlyIncome, 10000, 500000)}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              />
            </label>

            <label className="feCalcInput">
              <div className="feCalcInput__top">
                <span>Existing EMI</span>
                <strong>{formatINR(existingEmi)}</strong>
              </div>
              <input
                className="feRange"
                type="range"
                min="0"
                max="150000"
                step="500"
                value={existingEmi}
                style={rangeFill(existingEmi, 0, 150000)}
                onChange={(e) => setExistingEmi(Number(e.target.value))}
              />
            </label>

            <label className="feCalcInput">
              <div className="feCalcInput__top">
                <span>Interest Rate</span>
                <strong>{eligRate.toFixed(1)}%</strong>
              </div>
              <input
                className="feRange"
                type="range"
                min="6"
                max="24"
                step="0.1"
                value={eligRate}
                style={rangeFill(eligRate, 6, 24)}
                onChange={(e) => setEligRate(Number(e.target.value))}
              />
            </label>

            <label className="feCalcInput">
              <div className="feCalcInput__top">
                <span>Tenure</span>
                <strong>{eligYears} years</strong>
              </div>
              <input
                className="feRange"
                type="range"
                min="1"
                max="30"
                step="1"
                value={eligYears}
                style={rangeFill(eligYears, 1, 30)}
                onChange={(e) => setEligYears(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="feCalcResults" aria-label="Eligibility Results">
            <div className="feResult feResult--highlight">
              <div className="feResult__label">Eligible Amount</div>
              <div className="feResult__value feResult__value--orange">{formatINR(aEligAmount)}</div>
            </div>
            <div className="feResult">
              <div className="feResult__label">Suggested Max EMI</div>
              <div className="feResult__value">{formatINR(aEligEmi)}</div>
            </div>
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
      ) : null}

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
                <div
                  className="fePie"
                  style={{
                    '--p': emi.totalPayment <= 0 ? 0 : clamp(loanAmount / emi.totalPayment, 0, 1),
                  }}
                >
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
                        ? formatINR(aEmiInterest)
                        : breakdownKey === 'total'
                          ? formatINR(aEmiTotal)
                          : formatINR(aEmi)}
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
                  <div className="feCCFact__v">{formatINR(aEmiInterest)}</div>
                </div>
                <div className="feCCFact">
                  <div className="feCCFact__k">Total Payment</div>
                  <div className="feCCFact__v">{formatINR(aEmiTotal)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

