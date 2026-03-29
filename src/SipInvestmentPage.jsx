import { useMemo, useState } from 'react'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

function makePath(points) {
  if (points.length === 0) return ''
  const [first, ...rest] = points
  return `M ${first.x} ${first.y} ` + rest.map((p) => `L ${p.x} ${p.y}`).join(' ')
}

export default function SipInvestmentPage() {
  const [monthly, setMonthly] = useState(20000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const sip = useMemo(() => {
    const P = Math.max(0, monthly)
    const n = Math.max(1, Math.round(years * 12))
    const r = Math.max(0, rate) / 100
    const i = r / 12

    const invested = P * n
    const total = i === 0 ? invested : P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i))
    const returns = Math.max(0, total - invested)

    return { invested, total, returns }
  }, [monthly, rate, years])

  const series = useMemo(() => {
    // yearly points for a simple growth line chart
    const width = 320
    const height = 140
    const pad = 18
    const pts = []
    const r = Math.max(0, rate) / 100
    const i = r / 12

    const yearsCount = Math.max(1, Math.round(years))
    for (let y = 0; y <= yearsCount; y++) {
      const n = Math.max(1, y * 12)
      const P = Math.max(0, monthly)
      const total = i === 0 ? P * n : P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i))
      pts.push({ year: y, value: total })
    }

    const maxV = Math.max(...pts.map((p) => p.value), 1)
    const minV = 0

    const toX = (idx) => pad + (idx / Math.max(1, pts.length - 1)) * (width - pad * 2)
    const toY = (v) =>
      pad + (1 - (v - minV) / (maxV - minV)) * (height - pad * 2)

    const points = pts.map((p, idx) => ({ x: toX(idx), y: toY(p.value) }))
    const path = makePath(points)

    return { width, height, pad, points, path, maxV }
  }, [monthly, rate, years])

  return (
    <div className="feSipInv" aria-label="SIP Investment">
      <div className="feCalcCard" aria-label="SIP investment calculator">
        <div className="feCalcCard__head">
          <div>
            <div className="feCalcCard__title">SIP Investment</div>
            <div className="feCalcCard__sub">Visualize long-term growth in seconds</div>
          </div>
          <span className="fePill fePill--green">{rate}% p.a.</span>
        </div>

        <div className="feSipGraph" aria-label="Growth graph">
          <div className="feSipGraph__top">
            <div className="feSipGraph__k">Projected value</div>
            <div className="feSipGraph__v">{formatINR(sip.total)}</div>
          </div>
          <svg
            className="feSipGraph__svg"
            viewBox={`0 0 ${series.width} ${series.height}`}
            role="img"
            aria-label="SIP growth line chart"
          >
            <defs>
              <linearGradient id="sipLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(0, 21, 36, 0.95)" />
                <stop offset="60%" stopColor="rgba(255, 125, 0, 0.92)" />
                <stop offset="100%" stopColor="rgba(21, 97, 109, 0.95)" />
              </linearGradient>
              <linearGradient id="sipFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 125, 0, 0.2)" />
                <stop offset="100%" stopColor="rgba(255, 125, 0, 0)" />
              </linearGradient>
            </defs>

            <path
              d={`M ${series.pad} ${series.height - series.pad} L ${series.pad} ${series.pad}`}
              stroke="rgba(148, 163, 184, 0.35)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d={`M ${series.pad} ${series.height - series.pad} L ${series.width - series.pad} ${
                series.height - series.pad
              }`}
              stroke="rgba(148, 163, 184, 0.35)"
              strokeWidth="1"
              fill="none"
            />

            <path
              d={`${series.path} L ${series.width - series.pad} ${series.height - series.pad} L ${series.pad} ${
                series.height - series.pad
              } Z`}
              fill="url(#sipFill)"
            />
            <path
              d={series.path}
              fill="none"
              stroke="url(#sipLine)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {series.points.slice(-1).map((p, idx) => (
              <circle key={idx} cx={p.x} cy={p.y} r="4.5" fill="rgba(22, 163, 74, 0.95)" />
            ))}
          </svg>
        </div>

        <div className="feCalcInputs">
          <label className="feCalcInput">
            <div className="feCalcInput__top">
              <span>Monthly amount</span>
              <strong>{formatINR(monthly)}</strong>
            </div>
            <input
              className="feRange"
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
            />
          </label>

          <label className="feCalcInput">
            <div className="feCalcInput__top">
              <span>Return rate</span>
              <strong>{rate}%</strong>
            </div>
            <input
              className="feRange"
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </label>

          <label className="feCalcInput">
            <div className="feCalcInput__top">
              <span>Time</span>
              <strong>{years} years</strong>
            </div>
            <input
              className="feRange"
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="feCalcResults" aria-label="SIP Results">
          <div className="feResult">
            <div className="feResult__label">Invested</div>
            <div className="feResult__value">{formatINR(sip.invested)}</div>
          </div>
          <div className="feResult">
            <div className="feResult__label">Returns</div>
            <div className="feResult__value">{formatINR(sip.returns)}</div>
          </div>
          <div className="feResult feResult--highlight">
            <div className="feResult__label">Total value</div>
            <div className="feResult__value feResult__value--green">{formatINR(sip.total)}</div>
          </div>
        </div>

        <button
          type="button"
          className="feBtn feBtn--primary feBtn--full"
          onClick={() => {
            if (typeof window !== 'undefined') window.location.hash = '#/application_form'
          }}
        >
          Start SIP
        </button>
      </div>
    </div>
  )
}

