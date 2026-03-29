import { useEffect, useMemo, useRef, useState } from 'react'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

function Icon({ name }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    width: 18,
    height: 18,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'edit':
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      )
    case 'back':
      return (
        <svg {...common} width={20} height={20}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      )
    case 'chevron':
      return (
        <svg {...common}>
          <path d="M9 18l6-6-6-6" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
          <path d="M9.7 18a2.3 2.3 0 0 0 4.6 0" />
        </svg>
      )
    case 'id':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M7 9h6" />
          <path d="M7 13h8" />
          <path d="M17 12h.01" />
        </svg>
      )
    case 'link':
      return (
        <svg {...common}>
          <path d="M10 13a5 5 0 0 0 7.1 0l1.9-1.9a5 5 0 0 0-7.1-7.1L11 3.9" />
          <path d="M14 11a5 5 0 0 0-7.1 0L5 12.9A5 5 0 1 0 12.1 20L13 19.1" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18" />
          <path d="M12 3a14 14 0 0 0 0 18" />
        </svg>
      )
    case 'help':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4" />
          <path d="M12 17h.01" />
        </svg>
      )
    case 'logout':
      return (
        <svg {...common}>
          <path d="M10 17l-1 1a2 2 0 0 1-2 0l-1-1a2 2 0 0 1 0-2V7a2 2 0 0 1 0-2l1-1a2 2 0 0 1 2 0l1 1" />
          <path d="M15 12H8" />
          <path d="M15 12l-2-2" />
          <path d="M15 12l-2 2" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M12 6v12" />
          <path d="M6 12h12" />
        </svg>
      )
  }
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

export default function ProfilePage({
  reduceMotion = false,
  user: userProp,
  languageLabel = 'English',
  onBack,
  onNavigate,
  onEditProfile,
  onOpenNotifications,
  onOpenSupport,
  onRequestLogout,
}) {
  const user = useMemo(
    () => ({
      name: userProp?.name ?? 'Prashant Kumar',
      email: userProp?.email ?? 'prashant@finexpert.app',
    }),
    [userProp?.name, userProp?.email],
  )

  // CIBIL highlight
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
    return { pct, color }
  }, [score])

  const displayScore = useAnimatedNumber(score, { durationMs: 520, reduceMotion })

  const [animateGauge, setAnimateGauge] = useState(false)
  const [gaugeKey, setGaugeKey] = useState(0)
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
    await new Promise((r) => setTimeout(r, 2400))

    const nextDelta = Math.max(1, Math.round(4 + Math.random() * 7))
    setScore((s) => Math.min(900, s + nextDelta))
    setScoreDelta(nextDelta)

    setGaugeKey((k) => k + 1)

    setToast('Score Updated Successfully')
    setIsRefreshing(false)
  }

  const [kycVerified] = useState(true)

  const summary = useMemo(
    () => [
      { key: 'Active Loans', value: formatINR(420000), status: 'On Track', tone: 'good' },
      { key: 'Insurance Policies', value: '3', status: 'Covered', tone: 'good' },
      { key: 'Portfolio Value', value: formatINR(1350000), status: '+8.4%', tone: 'medium' },
    ],
    [],
  )

  return (
    <div className="feProfilePage" aria-label="Profile">
      <div className="feScreenTop feProfilePage__top">
        <button type="button" className="feBackBtn" onClick={() => onBack?.()} aria-label="Back to home">
          <Icon name="back" />
        </button>
        <div className="feScreenTop__texts">
          <div className="feScreenTop__title">Profile</div>
          <div className="feScreenTop__sub">Account & credit overview</div>
        </div>
      </div>

      <section className="feProfileHeader" aria-label="User header">
        <div className="feProfileHeader__card">
          <button
            type="button"
            className="feProfileHeader__edit"
            aria-label="Edit profile"
            onClick={() => onEditProfile?.()}
          >
            <Icon name="edit" />
          </button>
          <div className="feProfileHeader__row">
            <div className="feProfileHeader__avatar" aria-hidden="true" />
            <div className="feProfileHeader__meta">
              <div className="feProfileHeader__name">{user.name}</div>
              <div className="feProfileHeader__email">{user.email}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="feSection" aria-label="CIBIL highlight">
        <div className="feProfileCibil">
          <div className="feProfileCibil__left">
            <div className="feSection__title">CIBIL Score</div>
            <div className="feProfileCibil__delta">▲ +{scoreDelta} points this month</div>
            <button
              type="button"
              className="feBtn feBtn--secondary"
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
          </div>

          <div
            key={gaugeKey}
            className={`feGauge feGauge--sm ${animateGauge ? 'is-animate' : ''}`}
            style={{ '--p': scoreMeta.pct, '--ring': scoreMeta.color }}
            aria-label="CIBIL gauge"
          >
            <svg className="feGauge__svg" viewBox="0 0 120 120" aria-hidden="true">
              <circle className="feGauge__track" cx="60" cy="60" r="46" />
              <circle className="feGauge__progress" cx="60" cy="60" r="46" pathLength="100" />
            </svg>
            <div className="feGauge__center">
              <div className="feGauge__score feGauge__score--sm">{displayScore}</div>
              <div className="feGauge__meta">/ 900</div>
            </div>
          </div>
        </div>
      </section>

      <section className="feSection" aria-label="Credit benefits">
        <div className="feSection__head">
          <div className="feSection__title">Credit Benefits</div>
        </div>
        <div className="feBenefitGrid" role="list">
          <button
            type="button"
            className="feBenefitCard feBenefitCard--btn"
            role="listitem"
            onClick={() => onNavigate?.('personal_loan_explorer')}
          >
            <div className="feBenefitCard__icon" aria-hidden="true">
              %
            </div>
            <div className="feBenefitCard__title">Better Loan Rates</div>
            <div className="feBenefitCard__text">Higher score = lower interest rates</div>
          </button>
          <button
            type="button"
            className="feBenefitCard feBenefitCard--btn"
            role="listitem"
            onClick={() => onNavigate?.('cibil')}
          >
            <div className="feBenefitCard__icon" aria-hidden="true">
              ⌁
            </div>
            <div className="feBenefitCard__title">Financial Health Tracking</div>
            <div className="feBenefitCard__text">Track your financial health easily</div>
          </button>
          <button
            type="button"
            className="feBenefitCard feBenefitCard--btn"
            role="listitem"
            onClick={() => onOpenNotifications?.()}
          >
            <div className="feBenefitCard__icon" aria-hidden="true">
              ⛨
            </div>
            <div className="feBenefitCard__title">Fraud Protection</div>
            <div className="feBenefitCard__text">Get alerts for suspicious activity</div>
          </button>
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

      <section className="feSection" aria-label="Settings and preferences">
        <div className="feSection__head">
          <div className="feSection__title">Settings & Preferences</div>
        </div>

        <div className="feSettingsCard" role="list">
          <button
            type="button"
            className="feSettingRow feSettingRow--btn"
            role="listitem"
            onClick={() => onOpenNotifications?.()}
          >
            <div className="feSettingRow__left">
              <span className="feSettingRow__icon" aria-hidden="true">
                <Icon name="bell" />
              </span>
              <div className="feSettingRow__texts">
                <div className="feSettingRow__title">Notifications</div>
                <div className="feSettingRow__sub">Offers, alerts & updates</div>
              </div>
            </div>
            <span className="feSettingRow__right" aria-hidden="true">
              <Icon name="chevron" />
            </span>
          </button>

          <button
            type="button"
            className="feSettingRow feSettingRow--btn"
            role="listitem"
            onClick={() => onNavigate?.('linked_accounts')}
          >
            <div className="feSettingRow__left">
              <span className="feSettingRow__icon" aria-hidden="true">
                <Icon name="id" />
              </span>
              <div className="feSettingRow__texts">
                <div className="feSettingRow__title">KYC Status</div>
                <div className="feSettingRow__sub">{kycVerified ? 'Verified' : 'Pending'}</div>
              </div>
            </div>
            <span className={`feStatus feStatus--${kycVerified ? 'good' : 'medium'}`}>
              {kycVerified ? 'Verified' : 'Pending'}
            </span>
          </button>

          <button
            type="button"
            className="feSettingRow feSettingRow--btn"
            role="listitem"
            onClick={() => onNavigate?.('linked_accounts')}
          >
            <div className="feSettingRow__left">
              <span className="feSettingRow__icon" aria-hidden="true">
                <Icon name="link" />
              </span>
              <div className="feSettingRow__texts">
                <div className="feSettingRow__title">Linked Accounts</div>
                <div className="feSettingRow__sub">Banks &amp; cards</div>
              </div>
            </div>
            <span className="feSettingRow__right" aria-hidden="true">
              <Icon name="chevron" />
            </span>
          </button>

          <button
            type="button"
            className="feSettingRow feSettingRow--btn"
            role="listitem"
            onClick={() => onNavigate?.('language')}
          >
            <div className="feSettingRow__left">
              <span className="feSettingRow__icon" aria-hidden="true">
                <Icon name="globe" />
              </span>
              <div className="feSettingRow__texts">
                <div className="feSettingRow__title">Language</div>
                <div className="feSettingRow__sub">{languageLabel}</div>
              </div>
            </div>
            <span className="feSettingRow__right" aria-hidden="true">
              <Icon name="chevron" />
            </span>
          </button>

          <button
            type="button"
            className="feSettingRow feSettingRow--btn"
            role="listitem"
            onClick={() => onOpenSupport?.()}
          >
            <div className="feSettingRow__left">
              <span className="feSettingRow__icon" aria-hidden="true">
                <Icon name="help" />
              </span>
              <div className="feSettingRow__texts">
                <div className="feSettingRow__title">Help &amp; Support</div>
                <div className="feSettingRow__sub">FAQs &amp; contact</div>
              </div>
            </div>
            <span className="feSettingRow__right" aria-hidden="true">
              <Icon name="chevron" />
            </span>
          </button>

          <button
            type="button"
            className="feSettingRow feSettingRow--btn feSettingRow--danger"
            role="listitem"
            onClick={() => onRequestLogout?.()}
          >
            <div className="feSettingRow__left">
              <span className="feSettingRow__icon" aria-hidden="true">
                <Icon name="logout" />
              </span>
              <div className="feSettingRow__texts">
                <div className="feSettingRow__title">Logout</div>
                <div className="feSettingRow__sub">Sign out of your account</div>
              </div>
            </div>
            <span className="feSettingRow__right" aria-hidden="true">
              <Icon name="chevron" />
            </span>
          </button>
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

