import { useEffect, useMemo, useRef, useState } from 'react'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

function useAnimatedNumber(target, { durationMs = 420, reduceMotion = false } = {}) {
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
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setV(from + (target - from) * eased)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else fromRef.current = target
    }
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [durationMs, reduceMotion, target])

  return Math.round(v)
}

export default function CibilPage({ reduceMotion = false, onViewFullReport, hideTopHeader = false }) {
  const [score, setScore] = useState(785)
  const [scoreDelta, setScoreDelta] = useState(12)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [toast, setToast] = useState('')

  const scoreMeta = useMemo(() => {
    const min = 300
    const max = 900
    const pct = clamp((score - min) / (max - min), 0, 1)
    const color =
      score < 600 ? 'var(--error)' : score < 750 ? 'var(--orange)' : 'var(--success)'
    const label = score < 600 ? 'Poor' : score < 750 ? 'Medium' : 'Good'
    return { pct, color, label }
  }, [score])

  const displayScore = useAnimatedNumber(score, { durationMs: 520, reduceMotion })

  // trigger gauge animation on mount
  const [animateGauge, setAnimateGauge] = useState(false)
  const [gaugeKey, setGaugeKey] = useState(0)
  const gradientId = `feGaugeGrad-${gaugeKey}`
  useEffect(() => {
    if (reduceMotion) {
      setAnimateGauge(true)
      return
    }
    const t = setTimeout(() => setAnimateGauge(true), 80)
    return () => clearTimeout(t)
  }, [reduceMotion])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const refreshScore = async () => {
    if (isRefreshing) return
    setIsRefreshing(true)
    setToast('')

    // Simulate API latency
    const delay = 2500
    await new Promise((r) => setTimeout(r, delay))

    // Update score realistically (small jump)
    const nextDelta = Math.max(1, Math.round(5 + Math.random() * 8))
    setScore((s) => Math.min(900, s + nextDelta))
    setScoreDelta(nextDelta)

    // Remount gauge so the ring animates smoothly from empty → new value (no flicker)
    setGaugeKey((k) => k + 1)

    setToast('Score Updated Successfully')
    setIsRefreshing(false)
  }

  const summary = useMemo(
    () => [
      { key: 'Active Loans', value: formatINR(420000), status: 'On Track', tone: 'good' },
      { key: 'Insurance Policies', value: '3', status: 'Covered', tone: 'good' },
      { key: 'Portfolio Value', value: formatINR(1350000), status: '+8.4%', tone: 'medium' },
    ],
    [],
  )

  const factors = useMemo(
    () => [
      { key: 'Payment History', value: 0.86, label: 'Good', tone: 'good' },
      { key: 'Credit Utilization', value: 0.62, label: 'Medium', tone: 'medium' },
      { key: 'Credit Age', value: 0.74, label: 'Good', tone: 'good' },
      { key: 'Credit Mix', value: 0.48, label: 'Poor', tone: 'poor' },
    ],
    [],
  )

  return (
    <div className="feCibilPage" aria-label="Your Credit Health">
      {hideTopHeader ? null : (
        <section className="feCibilTop" aria-label="Credit health header">
          <div className="feCibilTop__title">Your Credit Health</div>
          <div className="feCibilTop__sub">Track and improve your CIBIL score</div>
        </section>
      )}

      <section className="feCibilHero" aria-label="CIBIL score card">
        <div className={`feCibilHero__card ${isRefreshing ? 'is-refreshing' : ''}`}>
          <div className="feCibilHero__head">
            <div>
              <div className="feCibilHero__kicker">CIBIL Score</div>
              <div className="feCibilHero__range">Score range: 300 – 900</div>
            </div>
            <div className="feDelta" aria-label="Monthly score delta">
              ▲ +{scoreDelta} points this month
            </div>
          </div>

          <div className="feCibilHero__body">
            <div
              key={gaugeKey}
              className={`feGauge ${animateGauge ? 'is-animate' : ''}`}
              style={{ '--p': scoreMeta.pct, '--ring': scoreMeta.color }}
              aria-label="Circular score gauge"
            >
              <svg className="feGauge__svg" viewBox="0 0 120 120" aria-hidden="true">
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="52%" stopColor="#ff7d00" />
                    <stop offset="100%" stopColor="#15616d" />
                  </linearGradient>
                </defs>
                <circle className="feGauge__track" cx="60" cy="60" r="46" />
                <circle
                  className="feGauge__progress"
                  cx="60"
                  cy="60"
                  r="46"
                  pathLength="100"
                  stroke={`url(#${gradientId})`}
                />
              </svg>
              <div className="feGauge__center">
                <div className="feGauge__score">{displayScore}</div>
                <div className="feGauge__meta">/ 900</div>
                <div className="feGauge__label" style={{ color: scoreMeta.color }}>
                  {scoreMeta.label}
                </div>
              </div>
            </div>

            <div className="feCibilHero__actions" aria-label="Score actions">
              <button
                type="button"
                className="feBtn feBtn--secondary feBtn--full"
                onClick={refreshScore}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <span className="feBtn__loading" aria-label="Refreshing">
                    <span className="feSpinner" aria-hidden="true" />
                    Refreshing…
                  </span>
                ) : (
                  'Refresh Score'
                )}
              </button>
              <button
                type="button"
                className="feBtn feBtn--primary feBtn--full"
                onClick={() => onViewFullReport?.()}
              >
                View Full Report
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="feSection" aria-label="Credit health benefits">
        <div className="feSection__head">
          <div className="feSection__title">Credit Health Benefits</div>
        </div>
        <div className="feBenefitGrid" role="list">
          <div className="feBenefitCard" role="listitem">
            <div className="feBenefitCard__icon" aria-hidden="true">
              %
            </div>
            <div className="feBenefitCard__title">Better Loan Rates</div>
            <div className="feBenefitCard__text">Higher score = lower interest rates</div>
          </div>
          <div className="feBenefitCard" role="listitem">
            <div className="feBenefitCard__icon" aria-hidden="true">
              ⌁
            </div>
            <div className="feBenefitCard__title">Health Tracking</div>
            <div className="feBenefitCard__text">Track your financial health easily</div>
          </div>
          <div className="feBenefitCard" role="listitem">
            <div className="feBenefitCard__icon" aria-hidden="true">
              ⛨
            </div>
            <div className="feBenefitCard__title">Fraud Protection</div>
            <div className="feBenefitCard__text">Get alerts for suspicious activity</div>
          </div>
        </div>
      </section>

      <section className="feSection" aria-label="Personal finance summary">
        <div className="feSection__head">
          <div className="feSection__title">Personal Finance Summary</div>
        </div>
        <div className="feSummaryCard" role="table" aria-label="Finance summary table">
          {summary.map((row) => (
            <div key={row.key} className="feSummaryRow" role="row">
              <div className="feSummaryRow__k" role="cell">
                {row.key}
              </div>
              <div className="feSummaryRow__v" role="cell">
                {row.value}
              </div>
              <div className={`feStatus feStatus--${row.tone}`} role="cell">
                {row.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="feSection" aria-label="Score factors">
        <div className="feSection__head">
          <div className="feSection__title">Score Factors</div>
        </div>
        <div className="feFactorsCard">
          {factors.map((f) => (
            <div key={f.key} className="feFactor">
              <div className="feFactor__top">
                <div className="feFactor__name">{f.key}</div>
                <div className={`feBadge feBadge--${f.tone}`}>{f.label}</div>
              </div>
              <div className="feBar" aria-hidden="true">
                <div
                  className={`feBar__fill feBar__fill--${f.tone}`}
                  style={{ width: `${Math.round(f.value * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="feSection" aria-label="Credit tips">
        <div className="feSection__head">
          <div className="feSection__title">Credit Tips</div>
        </div>
        <div className="feTipsCard">
          {[
            'Pay EMIs on time',
            'Keep credit utilization below 30%',
            'Avoid multiple loan applications',
          ].map((t) => (
            <div key={t} className="feTip">
              <span className="feTip__dot" aria-hidden="true" />
              <span className="feTip__text">{t}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="feSection" aria-label="Premium waitlist">
        <div className="fePremiumCard">
          <div>
            <div className="fePremiumCard__title">Unlock Premium Credit Insights</div>
            <div className="fePremiumCard__text">
              Personalized recommendations, alerts, and detailed reports.
            </div>
          </div>
          <div className="fePremiumCard__form" aria-label="Waitlist form">
            <input className="feInput" placeholder="Email address" />
            <button type="button" className="feBtn feBtn--primary feBtn--full">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      {toast ? (
        <div className="feToast" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}
    </div>
  )
}

