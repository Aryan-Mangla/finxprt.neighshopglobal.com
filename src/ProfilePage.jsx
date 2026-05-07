import { useEffect, useMemo, useState } from 'react'

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

function formatPhoneDisplay(raw) {
  const d = String(raw ?? '').replace(/\D/g, '')
  if (d.length === 10) return `+91 ${d.slice(0, 5)} ${d.slice(5)}`
  if (raw && String(raw).trim()) return String(raw).trim()
  return ''
}

function avatarUrlForName(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&size=256&background=002366&color=ffffff&bold=true`
}

function Icon({ name }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    width: 20,
    height: 20,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
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
    case 'investments':
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="M7 16l4-4 4 4 5-5" />
        </svg>
      )
    case 'loan':
      return (
        <svg {...common}>
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 10h.01M10 10h4" />
        </svg>
      )
    case 'emi':
      return (
        <svg {...common}>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h10" />
          <circle cx="18" cy="17" r="2" />
        </svg>
      )
    case 'calculator':
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8M8 11h2M12 11h2M16 11h2M8 15h2M12 15h2M16 15h2" />
        </svg>
      )
    case 'document':
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h6M9 17h6" />
        </svg>
      )
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )
    case 'logout':
      return (
        <svg {...common}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5M21 12H9" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
  }
}

const MENU_ITEMS = [
  { id: 'investments', label: 'My Investments', sub: 'SIP, funds & more', icon: 'investments', route: 'sip_investment' },
  { id: 'loans', label: 'Loan History', sub: 'Applications & status', icon: 'loan', route: 'loans' },
  { id: 'emi', label: 'EMI Details', sub: 'Track repayments', icon: 'emi', route: 'emi_calculator' },
  { id: 'saved', label: 'Saved Calculations', sub: 'EMI, SIP & tools', icon: 'calculator', route: 'calculator' },
  { id: 'docs', label: 'Documents', sub: 'KYC & uploads', icon: 'document', route: 'application_form' },
  { id: 'settings', label: 'Settings', sub: 'Language & preferences', icon: 'settings', route: 'language' },
]

export default function ProfilePage({
  user: userProp,
  onBack,
  onNavigate,
  onEditProfile,
  onRequestLogout,
}) {
  const user = useMemo(
    () => ({
      name: userProp?.name ?? 'Prashant Kumar',
      email: userProp?.email ?? 'prashant@finexpert.app',
      phone: userProp?.phone ?? '',
    }),
    [userProp?.name, userProp?.email, userProp?.phone],
  )

  const [avatarSrc, setAvatarSrc] = useState(() => avatarUrlForName(user.name))

  useEffect(() => {
    setAvatarSrc(avatarUrlForName(user.name))
  }, [user.name])

  const phoneLine = formatPhoneDisplay(user.phone)
  const creditScore = 785

  const stats = useMemo(
    () => [
      { key: 'investment', label: 'Total Investment', value: formatINR(1350000), hint: 'Portfolio' },
      { key: 'plans', label: 'Active Plans', value: '4', hint: 'Insurance & FD' },
      { key: 'score', label: 'Credit Score', value: String(creditScore), hint: 'CIBIL' },
    ],
    [],
  )

  return (
    <div className="feProfilePage feProfilePage--modern" aria-label="Profile">
      <div className="feScreenTop feProfilePage__top">
        <button type="button" className="feBackBtn" onClick={() => onBack?.()} aria-label="Back to home">
          <Icon name="back" />
        </button>
        <div className="feScreenTop__texts">
          <div className="feScreenTop__title">Profile</div>
          <div className="feScreenTop__sub">Your account at a glance</div>
        </div>
      </div>

      <section className="feProfileHero" aria-label="Profile header">
        <div className="feProfileHero__avatarWrap">
          <img
            className="feProfileHero__avatar"
            src={avatarSrc}
            alt=""
            width={80}
            height={80}
            draggable={false}
            decoding="async"
            onError={() => setAvatarSrc(avatarUrlForName(user.name))}
          />
        </div>
        <h1 className="feProfileHero__name">{user.name}</h1>
        <p className="feProfileHero__meta">
          <span className="feProfileHero__email">{user.email}</span>
          {phoneLine ? (
            <>
              <span className="feProfileHero__dot" aria-hidden="true">
                ·
              </span>
              <span className="feProfileHero__phone">{phoneLine}</span>
            </>
          ) : null}
        </p>
        <button type="button" className="feBtn feBtn--secondary feProfileHero__edit" onClick={() => onEditProfile?.()}>
          Edit profile
        </button>
      </section>

      <section className="feProfileStats" aria-label="Your stats">
        {stats.map((s) =>
          s.key === 'score' ? (
            <button
              key={s.key}
              type="button"
              className="feProfileStat feProfileStat--btn"
              onClick={() => onNavigate?.('cibil')}
            >
              <span className="feProfileStat__label">{s.label}</span>
              <span className="feProfileStat__value feProfileStat__value--score">{s.value}</span>
              <span className="feProfileStat__hint">{s.hint} · Tap to view</span>
            </button>
          ) : (
            <div key={s.key} className="feProfileStat">
              <span className="feProfileStat__label">{s.label}</span>
              <span className="feProfileStat__value">{s.value}</span>
              <span className="feProfileStat__hint">{s.hint}</span>
            </div>
          ),
        )}
      </section>

      <section className="feProfileMenu" aria-label="Menu">
        <div className="feProfileMenu__card">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="feProfileMenu__row"
              onClick={() => onNavigate?.(item.route)}
            >
              <span className="feProfileMenu__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <span className="feProfileMenu__texts">
                <span className="feProfileMenu__title">{item.label}</span>
                <span className="feProfileMenu__sub">{item.sub}</span>
              </span>
              <span className="feProfileMenu__chevron" aria-hidden="true">
                <Icon name="chevron" />
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="feProfileLogoutWrap">
        <button type="button" className="feProfileLogout" onClick={() => onRequestLogout?.()}>
          <span className="feProfileLogout__icon" aria-hidden="true">
            <Icon name="logout" />
          </span>
          Logout
        </button>
      </div>
    </div>
  )
}
