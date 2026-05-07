import { useId, useMemo, useRef, useState } from 'react'

function formatINR(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

function clamp(n, lo, hi) {
  return Math.min(Math.max(n, lo), hi)
}

/** Future value at end of `y` full years */
function futureAtYear(principal, ratePct, y, compounding) {
  const p = Math.max(0, principal)
  const r = Math.max(0, ratePct) / 100
  if (y <= 0) return p
  if (compounding === 'monthly') return p * Math.pow(1 + r / 12, 12 * y)
  return p * Math.pow(1 + r, y)
}

export default function LumpsumCalculatorPage() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const compounding = 'annual'

  const chartRef = useRef(null)
  const areaGradId = `feLumpArea-${useId().replace(/:/g, '')}`

  const futureValue = useMemo(
    () => futureAtYear(Number(amount) || 0, Number(rate) || 0, Number(years) || 0, compounding),
    [amount, rate, years, compounding],
  )
  const invested = Number(amount) || 0
  const earnings = Math.max(0, futureValue - invested)

  const chartPaths = useMemo(() => {
    const padL = 38
    const padR = 14
    const padT = 18
    const padB = 30
    const W = 340
    const H = 178
    const innerW = W - padL - padR
    const innerH = H - padT - padB
    const n = Math.max(1, Math.round(Number(years) || 0))

    const topVal = Math.max(futureValue, invested, 1)
    const botVal = Math.min(invested, futureValue)
    const padY = Math.max(topVal * 0.02, 1)
    const yMax = topVal + padY * 2
    const yMin = Math.max(0, botVal - padY)
    const yRange = Math.max(yMax - yMin, 1)

    const xAtYear = (ty) => padL + (ty / n) * innerW
    const yAt = (v) => padT + innerH - ((v - yMin) / yRange) * innerH
    const yBase = padT + innerH

    const samples = 72
    const futPts = []
    for (let s = 0; s <= samples; s += 1) {
      const ty = (s / samples) * n
      const fv = futureAtYear(Number(amount) || 0, Number(rate) || 0, ty, compounding)
      futPts.push({ x: xAtYear(ty), y: yAt(fv) })
    }
    const futPath = futPts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ')

    const invY = yAt(invested)
    const invPath = `M ${padL.toFixed(2)} ${invY.toFixed(2)} L ${(padL + innerW).toFixed(2)} ${invY.toFixed(2)}`

    const last = futPts[futPts.length - 1]
    const areaPath = `${futPath} L ${last.x.toFixed(2)} ${yBase} L ${padL.toFixed(2)} ${yBase} Z`

    const ticks = Array.from({ length: n + 1 }, (_, i) => i)
    const xAt = (i) => xAtYear(i)

    return { futPath, invPath, areaPath, ticks, n, W, H, padB, padL, padR, padT, innerW, innerH, xAt, yBase, invY }
  }, [amount, rate, years, compounding, futureValue, invested])

  const reset = () => {
    setAmount('')
    setRate('')
    setYears('')
  }

  const goApply = () => {
    if (typeof window !== 'undefined') window.location.hash = '#/application_form'
  }

  const onCalculate = () => {
    chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="feLumpLux" lang="en" aria-label="Lumpsum Calculator">
      <header className="feLumpLux__pageHead">
        <p className="feLumpLux__kicker">Lumpsum Calculator</p>
        <h1 className="feLumpLux__title">Plan your wealth with precision</h1>
      </header>

      <section className="feLumpLux__mainCard" aria-label="Calculator inputs">
        <div className="feLumpLux__topGrid">
          <div className="feLumpLux__inputsCol">
            <label className="feLumpLux__field">
              <span className="feLumpLux__fieldLabel">Investment amount (₹)</span>
              <div className="feLumpLux__inputWrap feLumpLux__inputWrap--prefix">
                <span className="feLumpLux__prefix">₹</span>
                <input
                  className="feLumpLux__input"
                  type="number"
                  inputMode="numeric"
                  min={5000}
                  max={10000000}
                  step={500}
                  value={amount}
                  onChange={(e) => {
                    const raw = e.target.value
                    if (raw === '') return setAmount('')
                    const n = Number(raw)
                    if (!Number.isFinite(n)) return
                    setAmount(clamp(Math.round(n), 5000, 10000000))
                  }}
                />
              </div>
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
                    const raw = e.target.value
                    if (raw === '') return setRate('')
                    const n = Number(raw)
                    if (!Number.isFinite(n)) return
                    setRate(Math.round(clamp(n, 1, 30) * 10) / 10)
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
                    const raw = e.target.value
                    if (raw === '') return setYears('')
                    const n = Number(raw)
                    if (!Number.isFinite(n)) return
                    setYears(clamp(Math.round(n), 1, 30))
                  }}
                />
                <span className="feLumpLux__suffix feLumpLux__suffix--text">Yrs</span>
              </div>
            </label>
          </div>
        </div>

        <div className="feLumpLux__actions">
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
      </section>

      <section className="feLumpLux__quickRow" aria-label="Results summary">
        <div className="feLumpLux__quickCard">
          <span className="feLumpLux__quickLabel">Future value</span>
          <span className="feLumpLux__quickVal">{formatINR(futureValue)}</span>
        </div>
        <div className="feLumpLux__quickCard">
          <span className="feLumpLux__quickLabel">Invested amount</span>
          <span className="feLumpLux__quickVal">{formatINR(invested)}</span>
        </div>
        <div className="feLumpLux__quickCard feLumpLux__quickCard--accent">
          <span className="feLumpLux__quickLabel">Earnings</span>
          <span className="feLumpLux__quickVal feLumpLux__quickVal--accent">{formatINR(earnings)}</span>
        </div>
      </section>

      <section ref={chartRef} className="feLumpLux__chartCard" aria-label="Wealth growth projection">
        <div className="feLumpLux__chartHead">
          <span className="feLumpLux__chartIcon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M7 16l4-4 3 3 6-8" />
            </svg>
          </span>
          <h2 className="feLumpLux__chartTitle">Wealth growth projection</h2>
        </div>
        <div className="feLumpLux__chartSvgWrap">
          <svg
            className="feLumpLux__chartSvg"
            viewBox={`0 0 ${chartPaths.W} ${chartPaths.H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={areaGradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a4b8c" stopOpacity="0.22" />
                <stop offset="55%" stopColor="#1a4b8c" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#1a4b8c" stopOpacity="0" />
              </linearGradient>
            </defs>
            {chartPaths.ticks.map((i) => (
              <line
                key={`gv-${i}`}
                x1={chartPaths.xAt(i)}
                y1={chartPaths.padT}
                x2={chartPaths.xAt(i)}
                y2={chartPaths.yBase}
                className="feLumpLux__chartGridV"
              />
            ))}
            <line
              x1={chartPaths.padL}
              y1={chartPaths.yBase}
              x2={chartPaths.W - chartPaths.padR}
              y2={chartPaths.yBase}
              className="feLumpLux__chartAxisX"
            />
            <path d={chartPaths.areaPath} fill={`url(#${areaGradId})`} />
            <path
              d={chartPaths.invPath}
              fill="none"
              stroke="#ff7a1a"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={chartPaths.futPath}
              fill="none"
              stroke="#1a4b8c"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {chartPaths.ticks.map((i) => (
              <text
                key={i}
                x={chartPaths.xAt(i)}
                y={chartPaths.H - 10}
                textAnchor="middle"
                className="feLumpLux__chartTick"
              >
                {i}
              </text>
            ))}
          </svg>
        </div>
        <div className="feLumpLux__legend">
          <span className="feLumpLux__legendItem">
            <span className="feLumpLux__dot feLumpLux__dot--blue" /> Future value
          </span>
          <span className="feLumpLux__legendItem">
            <span className="feLumpLux__dot feLumpLux__dot--orange" /> Invested amount
          </span>
        </div>
      </section>

      <footer className="feLumpLux__ctaBanner">
        <div className="feLumpLux__ctaInner">
          <div className="feLumpLux__ctaCopy">
            <p className="feLumpLux__ctaEyebrow">
              <span className="feLumpLux__ctaDot" /> Expert guidance
            </p>
            <h3 className="feLumpLux__ctaHeading">
              Start your mutual funds journey with <em>NISM-certified expert</em>
            </h3>
            <p className="feLumpLux__ctaText">
              Get personalized investment strategies and professional advice to achieve your financial goals faster.
            </p>
          </div>
          <button type="button" className="feLumpLux__ctaBtn" onClick={goApply}>
            Get started now <span aria-hidden="true">→</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
