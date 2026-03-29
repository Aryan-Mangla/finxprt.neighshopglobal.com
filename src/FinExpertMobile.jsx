import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import CalculatorSection from './CalculatorSection.jsx'
import CibilPage from './CibilPage.jsx'
import ProfilePage from './ProfilePage.jsx'
import MutualFundsPage from './MutualFundsPage.jsx'
import MutualFundDetailPage from './MutualFundDetailPage.jsx'
import InsurancePage from './InsurancePage.jsx'
import InsuranceDetailPage from './InsuranceDetailPage.jsx'
import BondsPage from './BondsPage.jsx'
import SavingsPlansPage from './SavingsPlansPage.jsx'
import LoansPage from './LoansPage.jsx'
import CreditCardDetailPage from './CreditCardDetailPage.jsx'
import EmiCalculatorPage from './EmiCalculatorPage.jsx'
import SipInvestmentPage from './SipInvestmentPage.jsx'
import InsuranceExplorerPage from './InsuranceExplorerPage.jsx'
import PersonalLoanExplorerPage from './PersonalLoanExplorerPage.jsx'
import CreditCardOffersPage from './CreditCardOffersPage.jsx'
import EligibilityFormPage from './EligibilityFormPage.jsx'
import BlogDetailPage from './BlogDetailPage.jsx'
import BlogBannerCard, { blogIconFromCategory } from './BlogBannerCard.jsx'
import ApplicationFormPage from './ApplicationFormPage.jsx'
import NotificationsPage from './NotificationsPage.jsx'
import AccountPage from './AccountPage.jsx'
import FullCreditReportPage from './FullCreditReportPage.jsx'
import EditProfilePage from './EditProfilePage.jsx'
import LinkedAccountsPage from './LinkedAccountsPage.jsx'
import LanguagePage from './LanguagePage.jsx'
import SupportPage from './SupportPage.jsx'
import LoginPage from './LoginPage.jsx'
import SignupPage from './SignupPage.jsx'
import ForgotPasswordPage from './ForgotPasswordPage.jsx'
import OtpLoginPage from './OtpLoginPage.jsx'
import TermsConditionsPage from './TermsConditionsPage.jsx'
import PrivacyPolicyPage from './PrivacyPolicyPage.jsx'

const FE_QUICK_UNSPLASH = {
  mutualFunds:
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  insurance:
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  fixedDeposit:
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  guaranteedPlan:
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
  bonds:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  savingsDuo:
    'https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  emiTool:
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  creditTool:
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
}

const FE_CAT_COVERS = {
  investments:
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  insurance:
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  loans:
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  creditCards:
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
}

function FeCatPhotoBg({ src }) {
  return (
    <span className="feCatCard__photoWrap" aria-hidden="true">
      <img
        className="feCatCard__photoImg"
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        draggable={false}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
      <span className="feCatCard__photoScrim" />
    </span>
  )
}

function FeQuickPhotoBg({ src, tone, loading = 'lazy' }) {
  const eager = loading === 'eager'
  return (
    <span className="feQuickBento__photoWrap" aria-hidden="true">
      <img
        className="feQuickBento__photoImg"
        src={src}
        alt=""
        loading={loading}
        decoding="async"
        fetchPriority={eager ? 'high' : 'low'}
        draggable={false}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
      <span className={`feQuickBento__photoScrim feQuickBento__photoScrim--${tone}`} />
    </span>
  )
}

const DEFAULT_PROFILE = {
  name: 'Prashant Kumar',
  email: 'prashant@finexpert.app',
  phone: '9876543210',
}

const DEFAULT_AUTH_USER = {
  name: 'Prashant Kumar',
  email: 'prashant@finexpert.app',
  phone: '9876543210',
  password: '123456',
}

function loadProfile() {
  if (typeof window === 'undefined') return DEFAULT_PROFILE
  try {
    const raw = localStorage.getItem('fe_profile')
    if (!raw) return DEFAULT_PROFILE
    const p = JSON.parse(raw)
    return { ...DEFAULT_PROFILE, ...p }
  } catch {
    return DEFAULT_PROFILE
  }
}

function loadLanguage() {
  const supported = new Set(['en', 'hi', 'mr', 'bn', 'ta', 'te', 'kn', 'gu', 'pa', 'ml'])
  if (typeof window === 'undefined') return 'en'
  try {
    const v = localStorage.getItem('fe_language')
    if (supported.has(v)) return v
  } catch {
    /* ignore */
  }
  return 'en'
}

function loadAuthUser() {
  if (typeof window === 'undefined') return DEFAULT_AUTH_USER
  try {
    const raw = localStorage.getItem('fe_auth_user')
    if (!raw) return DEFAULT_AUTH_USER
    const a = JSON.parse(raw)
    return { ...DEFAULT_AUTH_USER, ...a }
  } catch {
    return DEFAULT_AUTH_USER
  }
}

const LANGUAGE_LABELS = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi',
  bn: 'Bengali',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  gu: 'Gujarati',
  pa: 'Punjabi',
  ml: 'Malayalam',
}

function avatarFallbackUrl(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=256&background=15616d&color=ffecd1&bold=true`
}

function StoryAvatarImg({ name, src, className, width, height, loading }) {
  const [current, setCurrent] = useState(src)
  useEffect(() => {
    setCurrent(src)
  }, [src])
  return (
    <img
      className={className}
      src={current}
      alt=""
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onError={() => setCurrent(avatarFallbackUrl(name))}
    />
  )
}

function NavIcon({ name }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    width: 22,
    height: 22,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 10.5V21h14V10.5" />
        </svg>
      )
    case 'blogs':
      return (
        <svg {...common}>
          <path d="M6 4h12v16H6z" />
          <path d="M8.5 8h7" />
          <path d="M8.5 12h7" />
          <path d="M8.5 16H13" />
        </svg>
      )
    case 'calculator':
      return (
        <svg {...common}>
          <rect x="6" y="3" width="12" height="18" rx="2.5" />
          <path d="M9 7h6" />
          <path d="M9 11h.01" />
          <path d="M12 11h.01" />
          <path d="M15 11h.01" />
          <path d="M9 14h.01" />
          <path d="M12 14h.01" />
          <path d="M15 14h.01" />
        </svg>
      )
    case 'cibil':
      return (
        <svg {...common}>
          <path d="M4 18h16" />
          <path d="M7 16l4-5 3 3 3-5" />
          <path d="M17 9v4h-4" />
        </svg>
      )
    case 'profile':
      return (
        <svg {...common}>
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
          <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
          <path d="M9.7 18a2.3 2.3 0 0 0 4.6 0" />
        </svg>
      )
    case 'search':
      return (
        <svg {...common}>
          <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      )
    case 'back':
      return (
        <svg {...common}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      )
    // Quick actions
    case 'trending':
      return (
        <svg {...common} width={20} height={20}>
          <path d="M4 19h16" />
          <path d="M6 15l4-4 3 3 5-7" />
          <path d="M18 7v4h-4" />
        </svg>
      )
    case 'lock':
      return (
        <svg {...common} width={20} height={20}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'party':
      return (
        <svg {...common} width={36} height={36} strokeWidth={1.75}>
          <path d="M8 20c2-4 6-8 14-10" />
          <path d="M6 10l4 2-1 4-4-1 1-5z" fill="currentColor" fillOpacity={0.35} />
          <circle cx="18" cy="8" r="1.2" fill="currentColor" />
          <circle cx="22" cy="12" r="0.9" fill="currentColor" />
          <circle cx="14" cy="14" r="0.8" fill="currentColor" />
        </svg>
      )
    case 'graph': // Mutual Funds 📈
      return (
        <svg {...common}>
          <path d="M4 19h16" />
          <path d="M6 15l4-4 3 3 5-7" />
          <path d="M18 7v4h-4" />
        </svg>
      )
    case 'shield': // Insurance 🛡️
      return (
        <svg {...common}>
          <path d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z" />
          <path d="M9.5 12l1.8 1.8L15.2 10" />
        </svg>
      )
    case 'refresh':
      return (
        <svg {...common} width={18} height={18}>
          <path d="M23 4v6h-6" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
      )
    case 'doc': // Bonds 📄
      return (
        <svg {...common}>
          <path d="M7 3h7l3 3v15H7z" />
          <path d="M14 3v4h4" />
          <path d="M9 11h6" />
          <path d="M9 15h6" />
        </svg>
      )
    case 'pig': // Savings 🐷
      return (
        <svg {...common}>
          <path d="M7 12a4.5 4.5 0 0 1 4.5-4.5h3A4.5 4.5 0 0 1 19 12v2a2 2 0 0 1-2 2h-1" />
          <path d="M7 12v4a2 2 0 0 0 2 2h4" />
          <path d="M6 11H4v3h2" />
          <path d="M9 18v2" />
          <path d="M15 18v2" />
          <path d="M14.5 10.5h.01" />
        </svg>
      )
    case 'card': // Credit Cards 💳
      return (
        <svg {...common}>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="M4 10h16" />
          <path d="M8 15h5" />
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

function Stars({ value = 5 }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    width: 14,
    height: 14,
    fill: 'currentColor',
    'aria-hidden': true,
  }

  return (
    <span className="feStars" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          {...common}
          className={`feStar ${i < value ? 'is-on' : 'is-off'}`}
        >
          <path d="M12 17.3l-5.5 3 1.5-6.2L3 9.8l6.4-.6L12 3.4l2.6 5.8 6.4.6-5 4.3 1.5 6.2z" />
        </svg>
      ))}
    </span>
  )
}

const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'blogs', label: 'Blogs', icon: 'blogs' },
  { id: 'calculator', label: 'Calculator', icon: 'calculator' },
  { id: 'cibil', label: 'CIBIL', icon: 'cibil' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
]

const ROUTE_TO_TAB = {
  home: 'home',
  blogs: 'blogs',
  calculator: 'calculator',
  cibil: 'cibil',
  profile: 'profile',
  mutual_funds: 'home',
  insurance: 'home',
  bonds: 'home',
  savings: 'home',
  credit_cards: 'home',
  emi_calculator: 'calculator',
  sip_investment: 'home',
  insurance_explorer: 'home',
  personal_loan_explorer: 'home',
  credit_card_offers: 'home',
  eligibility_form: 'home',
  blog_detail: 'blogs',
  application_form: 'home',
  notifications: 'home',
  account: 'home',
  full_credit_report: 'cibil',
  edit_profile: 'profile',
  linked_accounts: 'profile',
  language: 'profile',
  support: 'profile',
  login: 'home',
  signup: 'home',
  forgot_password: 'home',
  otp_login: 'home',
  terms_conditions: 'home',
  privacy_policy: 'home',
}

function routeToHash(route) {
  return `#/${route}`
}

function hashToRoute() {
  const raw = typeof window === 'undefined' ? '' : window.location.hash
  const m = raw.match(/^#\/([^/?#]+)/)
  return m?.[1] || 'home'
}

function ScreenShell({ title, subtitle, onBack, children }) {
  return (
    <div className="feScreen feScreen--subpage" aria-label={title}>
      <div className="feScreen__headerBand">
        <div className="feScreenTop">
          <button type="button" className="feBackBtn" onClick={onBack} aria-label="Back">
            <NavIcon name="back" />
          </button>
          <div className="feScreenTop__texts">
            <div className="feScreenTop__title">{title}</div>
            {subtitle ? <div className="feScreenTop__sub">{subtitle}</div> : null}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default function FinExpertMobile() {
  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  }, [])

  const [route, setRoute] = useState(() => hashToRoute())
  /** Bottom nav selection (synced with route + hash). Default: home */
  const [activeTab, setActiveTab] = useState(() => ROUTE_TO_TAB[hashToRoute()] ?? 'home')

  const [transitionDir, setTransitionDir] = useState('none')
  const [transitionKey, setTransitionKey] = useState(0)
  const [mfSelectedId, setMfSelectedId] = useState('mf1')
  const [insSelectedId, setInsSelectedId] = useState('health')
  const [ccSelectedId, setCcSelectedId] = useState('cc1')
  const [blogSelected, setBlogSelected] = useState(null)
  const [profileUser, setProfileUser] = useState(loadProfile)
  const [appLanguage, setAppLanguage] = useState(loadLanguage)
  const [authUser, setAuthUser] = useState(loadAuthUser)
  const [logoutOpen, setLogoutOpen] = useState(false)

  const languageLabel = LANGUAGE_LABELS[appLanguage] ?? 'English'

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.lang = appLanguage
  }, [appLanguage])

  useEffect(() => {
    setActiveTab(ROUTE_TO_TAB[route] ?? 'home')
  }, [route])

  const navigate = (to, { replace = false } = {}) => {
    setTransitionDir('forward')
    setTransitionKey((k) => k + 1)
    setRoute(to)
    if (typeof window === 'undefined') return
    const url = routeToHash(to)
    if (replace) window.history.replaceState({ route: to }, '', url)
    else window.history.pushState({ route: to }, '', url)
  }

  const goBack = () => {
    if (typeof window === 'undefined') return
    setTransitionDir('back')
    window.history.back()
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Ensure initial URL is normalized
    window.history.replaceState({ route: hashToRoute() }, '', routeToHash(hashToRoute()))
    const onPop = () => {
      setTransitionDir('back')
      setTransitionKey((k) => k + 1)
      setRoute(hashToRoute())
    }
    window.addEventListener('popstate', onPop)
    window.addEventListener('hashchange', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('hashchange', onPop)
    }
  }, [])

  // 1) Stories — video clips (finance-themed samples from public CDN)
  const statuses = useMemo(
    () => [
      {
        id: 'satish',
        name: 'Satish',
        avatarUrl: 'https://i.pravatar.cc/200?img=12',
        stories: [
          {
            id: 's1',
            title: 'Markets',
            subtitle: 'New offers added today — stay ahead of the rally',
            time: '2h ago',
            theme: 'teal',
            videoUrl:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
          },
          {
            id: 's2',
            title: 'Budget smart',
            subtitle: 'Keep card utilization under 30% for a better score',
            time: '6h ago',
            theme: 'navy',
            videoUrl:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
          },
          {
            id: 's3',
            title: 'Plan ahead',
            subtitle: 'Check your CIBIL weekly — consistency wins',
            time: '1d ago',
            theme: 'green',
            videoUrl:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          },
        ],
      },
      {
        id: 'team',
        name: 'Team',
        avatarUrl: 'https://i.pravatar.cc/200?img=45',
        stories: [
          {
            id: 't1',
            title: 'New offers',
            subtitle: 'Credit card perks refreshed — compare before you apply',
            time: '3h ago',
            theme: 'navy',
            videoUrl:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
          },
          {
            id: 't2',
            title: 'Rates watch',
            subtitle: 'Loan rates on select products are changing — review EMI',
            time: '10h ago',
            theme: 'teal',
            videoUrl:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          },
        ],
      },
      {
        id: 'support',
        name: 'Support',
        avatarUrl: 'https://i.pravatar.cc/200?img=68',
        stories: [
          {
            id: 'u1',
            title: 'Stay secure',
            subtitle: 'Turn on alerts for logins & transactions',
            time: '1d ago',
            theme: 'green',
            videoUrl:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          },
        ],
      },
    ],
    [],
  )

  const [seenStatusIds, setSeenStatusIds] = useState(() => new Set())
  const [storyOpen, setStoryOpen] = useState(false)
  const [statusIdx, setStatusIdx] = useState(0)
  const [storyIdx, setStoryIdx] = useState(0)
  /** Progress bar + fallback timer length for current slide (ms) */
  const [storySlideMs, setStorySlideMs] = useState(5000)
  /** Prefer sound on (Instagram-style); browsers may mute until user tap */
  const [storyVideoMuted, setStoryVideoMuted] = useState(false)
  const [storySoundHint, setStorySoundHint] = useState(false)
  const storyVideoRef = useRef(null)

  const activeStatus = statuses[Math.max(0, Math.min(statuses.length - 1, statusIdx))]
  const activeStory =
    activeStatus?.stories?.[Math.max(0, Math.min((activeStatus?.stories?.length ?? 1) - 1, storyIdx))]

  const closeStory = () => {
    if (activeStatus?.id) {
      setSeenStatusIds((prev) => {
        const next = new Set(prev)
        next.add(activeStatus.id)
        return next
      })
    }
    setStoryOpen(false)
  }

  const openStoryAt = (idx) => {
    setStatusIdx(idx)
    setStoryIdx(0)
    setStoryOpen(true)
  }

  const goNextStory = () => {
    const count = activeStatus?.stories?.length ?? 0
    if (count === 0) return
    if (storyIdx < count - 1) {
      setStoryIdx((i) => i + 1)
      return
    }

    const nextStatus = statusIdx + 1
    if (nextStatus < statuses.length) {
      const finishedId = statuses[statusIdx]?.id
      setStatusIdx(nextStatus)
      setStoryIdx(0)
      if (finishedId) {
        setSeenStatusIds((prev) => {
          const next = new Set(prev)
          next.add(finishedId)
          return next
        })
      }
      return
    }

    closeStory()
  }

  const goPrevStory = () => {
    if (storyIdx > 0) {
      setStoryIdx((i) => i - 1)
      return
    }
    const prevStatus = statusIdx - 1
    if (prevStatus >= 0) {
      const prevCount = statuses[prevStatus]?.stories?.length ?? 0
      setStatusIdx(prevStatus)
      setStoryIdx(Math.max(0, prevCount - 1))
      return
    }

    // Loop to last status so "previous" always works.
    if (statuses.length > 0) {
      const lastStatus = statuses.length - 1
      const lastCount = statuses[lastStatus]?.stories?.length ?? 0
      setStatusIdx(lastStatus)
      setStoryIdx(Math.max(0, lastCount - 1))
    }
  }

  useEffect(() => {
    const v = storyVideoRef.current
    if (v) v.muted = storyVideoMuted
  }, [storyVideoMuted])

  useEffect(() => {
    const v = storyVideoRef.current
    if (!v || !storyOpen) return
    setStorySoundHint(false)
    const p = v.play?.()
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        setStoryVideoMuted(true)
        setStorySoundHint(true)
      })
    }
  }, [activeStory?.id, storyOpen])

  useEffect(() => {
    if (!storyOpen) return
    setStoryVideoMuted(false)
    setStorySoundHint(false)
    if (reduceMotion || !activeStory?.videoUrl) {
      setStorySlideMs(5000)
      return
    }
    setStorySlideMs(10000)
  }, [storyOpen, activeStory?.id, reduceMotion, activeStory?.videoUrl])

  useEffect(() => {
    if (!storyOpen || typeof document === 'undefined') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [storyOpen])

  useEffect(() => {
    if (!storyOpen) return
    if (reduceMotion) {
      const t = window.setTimeout(() => goNextStory(), 5000)
      return () => clearTimeout(t)
    }
    if (activeStory?.videoUrl) {
      const safety = window.setTimeout(() => goNextStory(), 45000)
      return () => clearTimeout(safety)
    }
    const t = window.setTimeout(() => goNextStory(), storySlideMs)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyOpen, storyIdx, statusIdx, reduceMotion, activeStory?.videoUrl, activeStory?.id, storySlideMs])

  // 3) Banner carousel
  const banners = useMemo(
    () => [
      {
        id: 'fd',
        title: '🔥 Special FD Rates',
        text: 'Earn up to 8.5% returns',
        icon: 'pig',
        coverSrc:
          'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'cc',
        title: '💳 Lifetime Free Credit Card',
        text: 'No joining or annual fees',
        icon: 'card',
        coverSrc:
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'mf',
        title: '📈 Top Mutual Funds',
        text: 'Expert curated portfolios',
        icon: 'graph',
        coverSrc:
          'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      },
    ],
    [],
  )
  const [bannerIdx, setBannerIdx] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const t = setInterval(() => setBannerIdx((i) => (i + 1) % banners.length), 4200)
    return () => clearInterval(t)
  }, [banners.length, reduceMotion])

  // 4) CIBIL score card
  const [homeCibilScore, setHomeCibilScore] = useState(785)
  const [homeCibilRefreshing, setHomeCibilRefreshing] = useState(false)
  const [homeCibilToast, setHomeCibilToast] = useState('')
  const [homeCibilAnimate, setHomeCibilAnimate] = useState(true)

  useEffect(() => {
    if (!homeCibilToast) return
    const t = setTimeout(() => setHomeCibilToast(''), 2200)
    return () => clearTimeout(t)
  }, [homeCibilToast])

  const cibil = useMemo(() => {
    const min = 300
    const max = 900
    const pct = Math.max(0, Math.min(1, (homeCibilScore - min) / (max - min)))
    const color =
      homeCibilScore < 600 ? 'var(--error)' : homeCibilScore < 750 ? 'var(--orange)' : 'var(--success)'
    const label = homeCibilScore < 600 ? 'Needs attention' : homeCibilScore < 750 ? 'Fair' : 'Excellent'
    const band = homeCibilScore < 600 ? 'low' : homeCibilScore < 750 ? 'mid' : 'high'
    const gradId =
      band === 'low'
        ? 'feHomeCibilGradLow'
        : band === 'mid'
          ? 'feHomeCibilGradMid'
          : 'feHomeCibilGradGood'
    return { pct, color, label, band, gradId }
  }, [homeCibilScore])

  const refreshHomeCibil = async () => {
    if (homeCibilRefreshing) return
    setHomeCibilRefreshing(true)
    setHomeCibilToast('')

    await new Promise((r) => setTimeout(r, 2400))
    const bump = Math.max(1, Math.round(3 + Math.random() * 6))
    setHomeCibilScore((s) => Math.min(900, s + bump))

    setHomeCibilAnimate(false)
    if (!reduceMotion) setTimeout(() => setHomeCibilAnimate(true), 30)
    else setHomeCibilAnimate(true)

    setHomeCibilToast('Score Updated Successfully')
    setHomeCibilRefreshing(false)
  }

  // 8) Reviews auto-scroll
  const reviews = useMemo(
    () => [
      {
        id: 'r1',
        name: 'Aarav',
        stars: 5,
        text: 'Clean UI and super fast eligibility checks.',
        bannerSrc:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=82',
        bannerPos: 'center 52%',
      },
      {
        id: 'r2',
        name: 'Priya',
        stars: 5,
        text: 'The CIBIL view is simple and trustworthy.',
        bannerSrc:
          'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=82',
        bannerPos: 'center 62%',
      },
      {
        id: 'r3',
        name: 'Rahul',
        stars: 5,
        text: 'Loved the calculators—quick and clear results.',
        bannerSrc:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=82',
        bannerPos: 'center 44%',
      },
      {
        id: 'r4',
        name: 'Sneha',
        stars: 5,
        text: 'Great offers and neat navigation.',
        bannerSrc:
          'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=82',
        bannerPos: 'center 36%',
      },
      {
        id: 'r5',
        name: 'Vikram',
        stars: 5,
        text: 'Notifications are timely — never miss a bill or EMI reminder.',
        bannerSrc:
          'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=82',
        bannerPos: 'center 48%',
      },
      {
        id: 'r6',
        name: 'Ananya',
        stars: 5,
        text: 'Goal-based SIP view keeps me motivated every month.',
        bannerSrc:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=82',
        bannerPos: 'center 42%',
      },
    ],
    [],
  )
  const [reviewIdx, setReviewIdx] = useState(0)
  useEffect(() => {
    if (reduceMotion) return
    const t = setInterval(() => setReviewIdx((i) => (i + 1) % reviews.length), 3200)
    return () => clearInterval(t)
  }, [reduceMotion, reviews.length])

  // Blogs page state + data
  const baseBlogCategories = useMemo(
    () => ['All', 'Loans', 'Insurance', 'Investment', 'Credit Cards', 'Economy'],
    [],
  )
  const [blogCat, setBlogCat] = useState('All')
  const [blogQuery, setBlogQuery] = useState('')
  const blogTabsRef = useRef(null)
  const trendingScrollRef = useRef(null)
  const trendingAutoScrollRef = useRef(false)
  const trendingUserPauseRef = useRef(false)
  const trendingUserPauseTimerRef = useRef(null)
  const [trendingSlideIdx, setTrendingSlideIdx] = useState(0)
  const blogCategories = baseBlogCategories

  const setBlogCatAndFocus = (c) => {
    setBlogCat(c)
    setTimeout(() => {
      const root = blogTabsRef.current
      if (!root) return
      const selector = `[data-cat="${c.replace(/"/g, '\\"')}"]`
      const btn = root.querySelector(selector)
      btn?.scrollIntoView?.({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }, 0)
  }

  const blogPosts = useMemo(
    () => [
      {
        id: 'cibil',
        title: 'How to Improve Your CIBIL Score',
        desc: 'Practical steps to build strong credit health and unlock better offers.',
        cat: 'Loans',
        time: 'Today',
        author: 'FinExpert Team',
        date: 'Mar 26, 2026',
        coverSrc:
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'p1',
        title: 'SIP strategies to stay consistent in 2026',
        desc: 'Build a simple plan, automate your investments, and avoid common mistakes.',
        cat: 'Investment',
        time: '2 hrs ago',
        coverSrc:
          'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'p2',
        title: 'Loan EMI: reduce interest without refinancing',
        desc: 'Prepayments, tenure optimization, and practical rules to cut total cost.',
        cat: 'Loans',
        time: '5 hrs ago',
        coverSrc:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'p3',
        title: 'Health insurance: what to check before you buy',
        desc: 'Coverage gaps, room rent limits, and claim settlement basics explained.',
        cat: 'Insurance',
        time: '8 hrs ago',
        coverSrc:
          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'p4',
        title: 'Credit cards: rewards vs cashback—what wins?',
        desc: 'A quick framework to pick the best card for your lifestyle and spending.',
        cat: 'Credit Cards',
        time: '1 day ago',
        coverSrc:
          'https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'p5',
        title: 'Economy snapshot: inflation, rates, and you',
        desc: 'How policy changes affect loans, savings, and monthly budgets.',
        cat: 'Economy',
        time: '2 days ago',
        coverSrc:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      },
    ],
    [],
  )

  const filteredPosts = useMemo(() => {
    const q = blogQuery.trim().toLowerCase()
    return blogPosts.filter((p) => {
      const catOk = blogCat === 'All' ? true : p.cat === blogCat
      const qOk =
        q.length === 0
          ? true
          : `${p.title} ${p.desc} ${p.cat}`.toLowerCase().includes(q)
      return catOk && qOk
    })
  }, [blogCat, blogPosts, blogQuery])

  const featured = filteredPosts[0] ?? blogPosts[0]
  const listPosts = filteredPosts.filter((p) => p.id !== featured?.id)
  const trending = blogPosts.slice(1, 5)

  const onTrendingScroll = useCallback(
    (e) => {
      const el = e.currentTarget
      const card = el.querySelector('.feTrendingCard')
      if (!card) return
      const step = card.offsetWidth + 12
      const i = Math.max(
        0,
        Math.min(trending.length - 1, Math.round(el.scrollLeft / Math.max(step, 1))),
      )
      setTrendingSlideIdx(i)
      if (trendingAutoScrollRef.current) return
      trendingUserPauseRef.current = true
      if (trendingUserPauseTimerRef.current) clearTimeout(trendingUserPauseTimerRef.current)
      trendingUserPauseTimerRef.current = setTimeout(() => {
        trendingUserPauseRef.current = false
        trendingUserPauseTimerRef.current = null
      }, 4800)
    },
    [trending.length],
  )

  const goToTrendingSlide = useCallback(
    (i) => {
      const el = trendingScrollRef.current
      if (!el) return
      const card = el.querySelector('.feTrendingCard')
      if (!card) return
      const step = card.offsetWidth + 12
      trendingAutoScrollRef.current = true
      trendingUserPauseRef.current = true
      el.scrollTo({ left: i * step, behavior: 'smooth' })
      window.setTimeout(() => {
        trendingAutoScrollRef.current = false
      }, 520)
      if (trendingUserPauseTimerRef.current) clearTimeout(trendingUserPauseTimerRef.current)
      trendingUserPauseTimerRef.current = setTimeout(() => {
        trendingUserPauseRef.current = false
        trendingUserPauseTimerRef.current = null
      }, 5000)
    },
    [],
  )

  useEffect(() => {
    if (reduceMotion || route !== 'blogs') return
    const id = window.setInterval(() => {
      if (trendingUserPauseRef.current) return
      const el = trendingScrollRef.current
      if (!el) return
      const card = el.querySelector('.feTrendingCard')
      if (!card) return
      const step = card.offsetWidth + 12
      const max = el.scrollWidth - el.clientWidth
      if (max <= 0) return
      trendingAutoScrollRef.current = true
      if (el.scrollLeft >= max - 3) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollTo({ left: el.scrollLeft + step, behavior: 'smooth' })
      }
      window.setTimeout(() => {
        trendingAutoScrollRef.current = false
      }, 520)
    }, 4400)
    return () => {
      clearInterval(id)
      if (trendingUserPauseTimerRef.current) {
        clearTimeout(trendingUserPauseTimerRef.current)
        trendingUserPauseTimerRef.current = null
      }
    }
  }, [reduceMotion, route])

  const openBlog = (post) => {
    setBlogSelected(post)
    navigate('blog_detail')
  }

  const shareBlog = async (post) => {
    const title = post?.title ?? 'FinExpert Blog'
    const text = `${title} — via FinExpert`
    const url = typeof window === 'undefined' ? '' : window.location.href
    try {
      if (navigator?.share) await navigator.share({ title, text, url })
      else if (navigator?.clipboard?.writeText) await navigator.clipboard.writeText(`${text}\n${url}`)
      else window.prompt('Copy this link', `${text}\n${url}`)
    } catch {
      // user cancelled share
    }
  }

  const confirmLogout = () => {
    setLogoutOpen(false)
    navigate('login', { replace: true })
  }

  return (
    <div className={`feMobile${route === 'home' ? ' feMobile--home' : ''}`}>
      {route !== 'login' && route !== 'signup' && route !== 'forgot_password' && route !== 'otp_login' && route !== 'terms_conditions' && route !== 'privacy_policy' ? (
      <header className="feHeader" aria-label="FinExpert header">
        <div className="feHeader__left">
          <div className="feHeader__appName">FinExpert</div>
          <div className="feHeader__greeting">{appLanguage === 'hi' ? 'Hi, User 👋' : 'Hi, User 👋'}</div>
          <div className="feHeader__subtitle">
            Your All-in-One Financial App
          </div>
        </div>

        <div className="feHeader__right">
          <button
            className="feHeader__iconBtn"
            type="button"
            aria-label="Notifications"
            onClick={() => navigate('notifications')}
          >
            <NavIcon name="bell" />
          </button>
          <button
            className="feHeader__avatar"
            type="button"
            aria-label="Profile"
            onClick={() => navigate('account')}
          >
            <span className="feHeader__avatarInner" aria-hidden="true" />
          </button>
        </div>
      </header>
      ) : null}

      <main className="feMain" aria-label="Main content">
        <div
          key={transitionKey}
          className={`feRoute feRoute--${transitionDir}`}
          data-reduce-motion={reduceMotion ? 'true' : 'false'}
        >
          {route === 'login' ? (
            <LoginPage
              onLogin={async (payload) => {
                const email = (payload?.email ?? '').trim().toLowerCase()
                const password = payload?.password ?? ''
                const ok =
                  email === (authUser.email ?? '').trim().toLowerCase() &&
                  password === (authUser.password ?? '')
                if (ok) {
                  navigate('home', { replace: true })
                  return { ok: true }
                }
                return { ok: false, message: 'Invalid email or password' }
              }}
              onCreateAccount={() => navigate('signup')}
              onBack={() => navigate('home', { replace: true })}
              onForgotPassword={() => navigate('forgot_password')}
              onLoginWithOtp={() => navigate('otp_login')}
            />
          ) : route === 'signup' ? (
            <SignupPage
              onSignup={async (payload) => {
                setProfileUser((prev) => ({
                  ...prev,
                  name: payload.name,
                  email: payload.email,
                  phone: payload.phone,
                }))
                const nextAuth = {
                  name: payload.name,
                  email: payload.email,
                  phone: payload.phone,
                  password: payload.password,
                }
                setAuthUser(nextAuth)
                try {
                  localStorage.setItem(
                    'fe_profile',
                    JSON.stringify({
                      ...profileUser,
                      name: payload.name,
                      email: payload.email,
                      phone: payload.phone,
                    }),
                  )
                  localStorage.setItem('fe_auth_user', JSON.stringify(nextAuth))
                } catch {
                  /* ignore */
                }
                navigate('home', { replace: true })
                return { ok: true }
              }}
              onGotoLogin={() => navigate('login')}
              onBack={() => navigate('login')}
              onOpenTerms={() => navigate('terms_conditions')}
              onOpenPrivacy={() => navigate('privacy_policy')}
            />
          ) : route === 'terms_conditions' ? (
            <ScreenShell title="Terms & Conditions" subtitle="Please review before signup" onBack={() => navigate('signup')}>
              <TermsConditionsPage />
            </ScreenShell>
          ) : route === 'privacy_policy' ? (
            <ScreenShell title="Privacy Policy" subtitle="How we handle your data" onBack={() => navigate('signup')}>
              <PrivacyPolicyPage />
            </ScreenShell>
          ) : route === 'forgot_password' ? (
            <ForgotPasswordPage
              onBack={() => navigate('login')}
              onDone={(payload) => {
                const nextAuth = { ...authUser, password: payload.password }
                setAuthUser(nextAuth)
                try {
                  localStorage.setItem('fe_auth_user', JSON.stringify(nextAuth))
                } catch {
                  /* ignore */
                }
                navigate('login', { replace: true })
              }}
            />
          ) : route === 'otp_login' ? (
            <OtpLoginPage
              onBack={() => navigate('login')}
              onSuccess={() => navigate('home', { replace: true })}
            />
          ) : route === 'blogs' ? (
          <>
            <section className="feBlogsTop" aria-label="Blogs header">
              <div className="feBlogsTop__title">Blogs</div>
              <div className="feBlogsTop__sub">Latest financial news & insights</div>
            </section>

            <section className="feBlogsTabs" aria-label="Blog categories">
              <div ref={blogTabsRef} className="feTabsRow" role="tablist" aria-label="Category tabs">
                {blogCategories.map((c) => {
                  const isActive = c === blogCat
                  return (
                    <button
                      key={c}
                      type="button"
                      className={`feCatTab ${isActive ? 'is-active' : ''}`}
                      data-cat={c}
                      onClick={() => setBlogCatAndFocus(c)}
                      role="tab"
                      aria-selected={isActive}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="feBlogsSearch" aria-label="Search">
              <label className="feSearch">
                <span className="feSearch__icon" aria-hidden="true">
                  <NavIcon name="search" />
                </span>
                <input
                  className="feSearch__input"
                  value={blogQuery}
                  onChange={(e) => setBlogQuery(e.target.value)}
                  placeholder="Search articles..."
                />
              </label>
            </section>

            <section className="feSection" aria-label="Featured blog">
              <div
                className="feFeatured"
                role="button"
                tabIndex={0}
                onClick={() => openBlog(featured)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') openBlog(featured)
                }}
              >
                <div className="feFeatured__banner" aria-hidden="true">
                  <img
                    className="feFeatured__photo"
                    src={
                      featured.coverSrc ??
                      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                    }
                    alt=""
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="feFeatured__photoScrim" />
                </div>
                <div className="feFeatured__body">
                  <div className="feMetaRow">
                    <span className="feTag">{featured.cat}</span>
                    <span className="feTime">{featured.time}</span>
                  </div>
                  <div className="feFeatured__title">{featured.title}</div>
                  <div className="feFeatured__desc">{featured.desc}</div>
                </div>
              </div>
            </section>

            <section className="feSection" aria-label="Trending Now">
              <div className="feSection__head">
                <div className="feSection__title">Trending Now</div>
              </div>
              <div
                className="feTrendingWrap"
                data-reduce-motion={reduceMotion ? 'true' : 'false'}
              >
                <div
                  ref={trendingScrollRef}
                  className="feTrendingRow"
                  aria-label="Trending articles carousel"
                  onScroll={onTrendingScroll}
                >
                  {trending.map((t) => (
                    <div
                      key={t.id}
                      className="feTrendingCard"
                      role="button"
                      tabIndex={0}
                      onClick={() => openBlog(t)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') openBlog(t)
                      }}
                    >
                      <div className="feTrendingCard__media" aria-hidden="true">
                        <img
                          className="feTrendingCard__photo"
                          src={
                            t.coverSrc ??
                            'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
                          }
                          alt=""
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        <div className="feTrendingCard__mediaScrim" />
                      </div>
                      <div className="feTrendingCard__body">
                        <div className="feTrendingCard__title">{t.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="feTrendingDots" role="tablist" aria-label="Trending slides">
                  {trending.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={i === trendingSlideIdx}
                      className={`feTrendingDot${i === trendingSlideIdx ? ' feTrendingDot--active' : ''}`}
                      aria-label={`Slide ${i + 1}: ${t.title}`}
                      onClick={() => goToTrendingSlide(i)}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section className="feSection feSection--blogLatest" aria-label="Blog list">
              <div className="feSection__head">
                <div className="feSection__title">Latest</div>
                <div className="feSection__sub feSection__sub--blogLatest">
                  Curated reads — tap any article to open
                </div>
              </div>
              <div className="feBlogList feBlogList--latest" aria-label="Articles">
                {listPosts.map((p) => (
                  <BlogBannerCard
                    key={p.id}
                    title={p.title}
                    subtitle={p.desc}
                    icon={blogIconFromCategory(p.cat)}
                    coverSrc={p.coverSrc}
                    meta={
                      <span className="feMetaRow feMetaRow--blogBanner">
                        <span className="feTag feTag--onDark">{p.cat}</span>
                        <span className="feTime feTime--onDark">{p.time}</span>
                      </span>
                    }
                    onClick={() => openBlog(p)}
                  />
                ))}
              </div>
            </section>
          </>
        ) : route === 'blog_detail' ? (
          <ScreenShell title="Blog" subtitle="Read insights" onBack={goBack}>
            <BlogDetailPage
              article={blogSelected}
              onShare={() => shareBlog(blogSelected)}
            />
          </ScreenShell>
        ) : route === 'calculator' ? (
          <CalculatorSection reduceMotion={reduceMotion} onBack={() => navigate('home')} />
        ) : route === 'emi_calculator' ? (
          <ScreenShell title="EMI Calculator" subtitle="Monthly EMI & breakdown" onBack={goBack}>
            <EmiCalculatorPage reduceMotion={reduceMotion} />
          </ScreenShell>
        ) : route === 'sip_investment' ? (
          <ScreenShell title="SIP Investment" subtitle="Plan long-term wealth" onBack={goBack}>
            <SipInvestmentPage />
          </ScreenShell>
        ) : route === 'cibil' ? (
          <ScreenShell
            title="Your Credit Health"
            subtitle="Track and improve your CIBIL score"
            onBack={goBack}
          >
            <CibilPage
              reduceMotion={reduceMotion}
              hideTopHeader
              onViewFullReport={() => navigate('full_credit_report')}
            />
          </ScreenShell>
        ) : route === 'full_credit_report' ? (
          <ScreenShell title="Full Credit Report" subtitle="Detailed credit profile" onBack={goBack}>
            <FullCreditReportPage />
          </ScreenShell>
        ) : route === 'profile' ? (
          <ProfilePage
            reduceMotion={reduceMotion}
            user={profileUser}
            languageLabel={languageLabel}
            onBack={() => navigate('home')}
            onNavigate={(to) => navigate(to)}
            onEditProfile={() => navigate('edit_profile')}
            onOpenNotifications={() => navigate('notifications')}
            onOpenSupport={() => navigate('support')}
            onRequestLogout={() => setLogoutOpen(true)}
          />
        ) : route === 'edit_profile' ? (
          <ScreenShell title="Edit Profile" subtitle="Update your details" onBack={goBack}>
            <EditProfilePage
              initialName={profileUser.name}
              initialEmail={profileUser.email}
              initialPhone={profileUser.phone}
              onSave={(next) => {
                setProfileUser(next)
                try {
                  localStorage.setItem('fe_profile', JSON.stringify(next))
                } catch {
                  /* ignore */
                }
              }}
            />
          </ScreenShell>
        ) : route === 'linked_accounts' ? (
          <ScreenShell title="Linked Accounts" subtitle="Banks & cards you have connected" onBack={goBack}>
            <LinkedAccountsPage />
          </ScreenShell>
        ) : route === 'language' ? (
          <ScreenShell title="Language" subtitle="Choose app language" onBack={goBack}>
            <LanguagePage
              initialCode={appLanguage}
              onApply={(code) => {
                setAppLanguage(code)
                try {
                  localStorage.setItem('fe_language', code)
                } catch {
                  /* ignore */
                }
              }}
            />
          </ScreenShell>
        ) : route === 'support' ? (
          <ScreenShell title="Help & Support" subtitle="FAQs and contact support" onBack={goBack}>
            <SupportPage />
          </ScreenShell>
        ) : route === 'mutual_funds' ? (
          <ScreenShell
            title="Mutual Funds"
            subtitle="Explore funds and start investing"
            onBack={goBack}
          >
            <MutualFundsPage
              onSelectFund={(id) => {
                setMfSelectedId(id)
                navigate('mutual_funds_detail')
              }}
            />
          </ScreenShell>
        ) : route === 'mutual_funds_detail' ? (
          <ScreenShell title="Fund Details" subtitle="Returns, risk and highlights" onBack={goBack}>
            <MutualFundDetailPage fundId={mfSelectedId} />
          </ScreenShell>
        ) : route === 'insurance' ? (
          <ScreenShell title="Insurance" subtitle="Plans for every need" onBack={goBack}>
            <InsurancePage
              onSelectType={(id) => {
                setInsSelectedId(id)
                navigate('insurance_detail')
              }}
              onExplore={(id) => {
                setInsSelectedId(id)
                navigate('insurance_explorer')
              }}
            />
          </ScreenShell>
        ) : route === 'insurance_detail' ? (
          <ScreenShell title="Insurance" subtitle="Compare plans and benefits" onBack={goBack}>
            <InsuranceDetailPage
              typeId={insSelectedId}
              onExplorePlans={() => navigate('insurance_explorer')}
            />
          </ScreenShell>
        ) : route === 'insurance_explorer' ? (
          <ScreenShell title="Insurance Plans" subtitle="Compare & buy instantly" onBack={goBack}>
            <InsuranceExplorerPage typeId={insSelectedId} />
          </ScreenShell>
        ) : route === 'bonds' ? (
          <ScreenShell title="Bonds" subtitle="Safer fixed-income options" onBack={goBack}>
            <BondsPage />
          </ScreenShell>
        ) : route === 'savings' ? (
          <ScreenShell title="Savings" subtitle="Plans to grow steadily" onBack={goBack}>
            <SavingsPlansPage />
          </ScreenShell>
        ) : route === 'loans' ? (
          <ScreenShell title="Loans" subtitle="Quick approval from partners" onBack={goBack}>
            <LoansPage
              onExplorePersonal={() => navigate('personal_loan_explorer')}
              onOpenEligibility={() => navigate('eligibility_form')}
            />
          </ScreenShell>
        ) : route === 'personal_loan_explorer' ? (
          <ScreenShell title="Personal Loan" subtitle="Offers from banks" onBack={goBack}>
            <PersonalLoanExplorerPage />
          </ScreenShell>
        ) : route === 'eligibility_form' ? (
          <ScreenShell title="Eligibility" subtitle="Quick eligibility check" onBack={goBack}>
            <EligibilityFormPage />
          </ScreenShell>
        ) : route === 'application_form' ? (
          <ScreenShell title="Apply" subtitle="Application form" onBack={goBack}>
            <ApplicationFormPage />
          </ScreenShell>
        ) : route === 'notifications' ? (
          <ScreenShell title="Notifications" subtitle="Offers, alerts & updates" onBack={goBack}>
            <NotificationsPage />
          </ScreenShell>
        ) : route === 'account' ? (
          <ScreenShell title="Account" subtitle="Your profile & shortcuts" onBack={goBack}>
            <AccountPage
              onOpenProfile={() => navigate('profile')}
              onOpenCibil={() => navigate('cibil')}
              onOpenApplication={() => navigate('application_form')}
            />
          </ScreenShell>
        ) : route === 'credit_cards' ? (
          <ScreenShell title="Credit Cards" subtitle="Compare offers and benefits" onBack={goBack}>
            <CreditCardDetailPage cardId={ccSelectedId} />
          </ScreenShell>
        ) : route === 'credit_card_offers' ? (
          <ScreenShell title="Credit Card Offers" subtitle="Cashback, rewards & perks" onBack={goBack}>
            <CreditCardOffersPage
              onSelectCard={(id) => {
                setCcSelectedId(id)
                navigate('credit_cards')
              }}
            />
          </ScreenShell>
        ) : route !== 'home' ? (
          <ScreenShell title="FinExpert" subtitle="Screen coming soon" onBack={goBack}>
            <div className="fePlaceholderPage">
              <div className="fePlaceholderBlock" />
              <div className="fePlaceholderBlock" />
            </div>
          </ScreenShell>
        ) : (
          <>
            <section className="feSection" aria-label="Stories">
              <div className="feSection__head">
                <div>
                  <div className="feSection__title">Stories</div>
                  <p className="feSection__sub">Tap a profile to watch video stories</p>
                </div>
              </div>

              <div className="feStories" role="list" aria-label="Admin updates list">
                {statuses.map((s, idx) => {
                  const isNew = !seenStatusIds.has(s.id)
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className="feStory"
                      onClick={() => openStoryAt(idx)}
                      aria-label={`Open ${s.name} updates`}
                    >
                      <span
                        className={`feStory__ring ${isNew ? 'is-new' : 'is-seen'}`}
                        aria-hidden="true"
                      >
                        <StoryAvatarImg
                          name={s.name}
                          src={s.avatarUrl}
                          className="feStory__avatarImg"
                          width={200}
                          height={200}
                          loading="lazy"
                        />
                      </span>
                      <span className="feStory__name">{s.name}</span>
                    </button>
                  )
                })}
              </div>
            </section>

        <section className="feSection" aria-label="Quick Actions">
          <div className="feSection__head feSection__head--split">
            <div className="feSection__title">Quick Actions</div>
            <button type="button" className="feTextBtn" onClick={() => navigate('sip_investment')}>
              View All
            </button>
          </div>

          <div className="feQuickBento" role="list" aria-label="Quick actions">
            <div className="feQuickBento__heroRow">
              <button
                type="button"
                className="feQuickBento__mf"
                aria-label="Mutual Funds — expert curated baskets"
                onClick={() => navigate('mutual_funds')}
              >
                <FeQuickPhotoBg src={FE_QUICK_UNSPLASH.mutualFunds} tone="mf" loading="eager" />
                <span className="feQuickBento__mfIcon" aria-hidden="true">
                  <NavIcon name="trending" />
                </span>
                <span className="feQuickBento__mfTitle">Mutual Funds</span>
                <span className="feQuickBento__mfSub">Expert curated baskets</span>
                <span className="feQuickBento__mfStat">
                  <span className="feQuickBento__mfBolt" aria-hidden="true">
                    ⚡
                  </span>
                  +14.2% p.a.
                </span>
              </button>

              <div className="feQuickBento__rail">
                <button
                  type="button"
                  className="feQuickBento__ins"
                  aria-label="Insurance"
                  onClick={() => navigate('insurance')}
                >
                  <FeQuickPhotoBg src={FE_QUICK_UNSPLASH.insurance} tone="ins" loading="eager" />
                  <span className="feQuickBento__insIcon" aria-hidden="true">
                    <NavIcon name="shield" />
                  </span>
                  <span className="feQuickBento__insTitle">Insurance</span>
                </button>
                <button
                  type="button"
                  className="feQuickBento__fd"
                  aria-label="Fixed Deposit"
                  onClick={() => navigate('savings')}
                >
                  <FeQuickPhotoBg src={FE_QUICK_UNSPLASH.fixedDeposit} tone="fd" loading="eager" />
                  <span className="feQuickBento__fdIcon" aria-hidden="true">
                    <NavIcon name="lock" />
                  </span>
                  <span className="feQuickBento__fdTitle">Fixed Deposit</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              className="feQuickBento__offer"
              aria-label="Independence offer — extra APY on senior citizen FDs"
              onClick={() => navigate('savings')}
            >
              <div className="feQuickBento__offerText">
                <span className="feQuickBento__offerKicker">Independence offer</span>
                <span className="feQuickBento__offerHeadline">Extra 1.5% APY</span>
                <span className="feQuickBento__offerSub">On Senior Citizen FDs</span>
              </div>
              <span className="feQuickBento__offerArt" aria-hidden="true">
                <NavIcon name="party" />
              </span>
            </button>

            <button
              type="button"
              className="feQuickBento__guaranteed"
              aria-label="Guaranteed saving plan — tax-free maturity benefits"
              onClick={() => navigate('savings')}
            >
              <div className="feQuickBento__guaranteedLeft">
                <span className="feQuickBento__badge">
                  <span aria-hidden="true">✓</span> Tax free savings
                </span>
                <span className="feQuickBento__guaranteedTitle">Guaranteed Saving Plan</span>
                <span className="feQuickBento__guaranteedDesc">
                  Secure your family&apos;s future with tax-free maturity benefits
                </span>
                <span className="feQuickBento__guaranteedCta">Explore Plan</span>
              </div>
              <div className="feQuickBento__guaranteedGold" aria-hidden="true">
                <img
                  className="feQuickBento__guaranteedPhoto"
                  src={FE_QUICK_UNSPLASH.guaranteedPlan}
                  alt=""
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <span className="feQuickBento__guaranteedScrim" />
              </div>
            </button>

            <div className="feQuickBento__duoRow">
              <button
                type="button"
                className="feQuickBento__duo feQuickBento__duo--bonds"
                aria-label="Bonds — corporate and government"
                onClick={() => navigate('bonds')}
              >
                <FeQuickPhotoBg src={FE_QUICK_UNSPLASH.bonds} tone="duoBonds" />
                <span className="feQuickBento__duoIcon" aria-hidden="true">
                  <NavIcon name="doc" />
                </span>
                <span className="feQuickBento__duoTitle">Bonds</span>
                <span className="feQuickBento__duoSub">Corporate &amp; Govt</span>
              </button>
              <button
                type="button"
                className="feQuickBento__duo feQuickBento__duo--savings"
                aria-label="Savings plans — high interest accounts"
                onClick={() => navigate('savings')}
              >
                <FeQuickPhotoBg src={FE_QUICK_UNSPLASH.savingsDuo} tone="duoSav" />
                <span className="feQuickBento__duoIcon" aria-hidden="true">
                  <NavIcon name="pig" />
                </span>
                <span className="feQuickBento__duoTitle">Savings</span>
                <span className="feQuickBento__duoSub">High interest acc.</span>
              </button>
            </div>

            <div className="feQuickBento__toolsRow">
              <button
                type="button"
                className="feQuickBento__tool"
                aria-label="EMI Calculator"
                onClick={() => navigate('emi_calculator')}
              >
                <FeQuickPhotoBg src={FE_QUICK_UNSPLASH.emiTool} tone="tool" />
                <span className="feQuickBento__toolGlow" aria-hidden="true">
                  <NavIcon name="calculator" />
                </span>
                <span className="feQuickBento__toolLabel">EMI Calculator</span>
              </button>
              <button
                type="button"
                className="feQuickBento__tool"
                aria-label="Credit Cards"
                onClick={() => navigate('credit_cards')}
              >
                <FeQuickPhotoBg src={FE_QUICK_UNSPLASH.creditTool} tone="tool" />
                <span className="feQuickBento__toolGlow" aria-hidden="true">
                  <NavIcon name="card" />
                </span>
                <span className="feQuickBento__toolLabel">Credit Cards</span>
              </button>
            </div>
          </div>
        </section>

        <section className="feSection" aria-label="Offers carousel">
          <div className="feSection__head">
            <div className="feSection__title">Offers</div>
          </div>

          <div className="feCarousel" aria-roledescription="carousel" aria-label="Banner carousel">
            <div
              className="feCarousel__track"
              style={{ transform: `translateX(${-bannerIdx * 100}%)` }}
            >
                {banners.map((b) => (
                  <div key={b.id} className="feBanner feBanner--premium">
                    <span className="feBanner__photoWrap" aria-hidden="true">
                      <img
                        className="feBanner__photoImg"
                        src={b.coverSrc}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <span className="feBanner__photoScrim" />
                    </span>
                    <div className="feBanner__glass" aria-hidden="true" />
                    <div className="feBanner__sheen" aria-hidden="true" />
                    <div className="feBanner__overlay">
                      <div className="feBanner__row">
                        <span className="feBanner__iconWrap">
                          <NavIcon name={b.icon} />
                        </span>
                        <div className="feBanner__copy">
                          <div className="feBanner__title">{b.title}</div>
                          <div className="feBanner__text">{b.text}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="feBtn feBtn--primary feBanner__cta"
                        onClick={() => {
                          if (b.id === 'cc') navigate('credit_card_offers')
                          else if (b.id === 'fd') navigate('savings')
                          else navigate('mutual_funds')
                        }}
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="feDots" role="tablist" aria-label="Carousel dots">
              {banners.map((b, idx) => (
                <button
                  key={b.id}
                  type="button"
                  className={`feDot ${idx === bannerIdx ? 'is-active' : ''}`}
                  onClick={() => setBannerIdx(idx)}
                  aria-label={`Go to banner ${idx + 1}`}
                  aria-selected={idx === bannerIdx}
                  role="tab"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="feSection" aria-label="CIBIL score">
          <div
            className={`feCibil feCibil--premium card${homeCibilRefreshing ? ' is-refreshing' : ''}`}
          >
            <div className="feCibil__mesh" aria-hidden="true" />
            <div className="feCibil__glow feCibil__glow--a" aria-hidden="true" />
            <div className="feCibil__glow feCibil__glow--b" aria-hidden="true" />
            <div className="feCibil__inner">
              <div className="feCibil__left">
                <div className="feCibil__head">
                  <span className="feCibil__iconWrap" aria-hidden="true">
                    <NavIcon name="shield" />
                  </span>
                  <div className="feCibil__headText">
                    <div className="feCibil__title">CIBIL Score</div>
                    <div className="feCibil__kicker">Credit health · 300 – 900</div>
                  </div>
                </div>
                <span className={`feCibil__badge feCibil__badge--${cibil.band}`}>
                  {cibil.label}
                </span>
                <p className="feCibil__hint">Higher scores unlock better loan and card offers.</p>
                <button
                  type="button"
                  className="feCibil__btn"
                  onClick={refreshHomeCibil}
                  disabled={homeCibilRefreshing}
                >
                  {homeCibilRefreshing ? (
                    <span className="feCibil__btnInner feCibil__btnInner--loading">
                      <span className="feSpinner" aria-hidden="true" />
                      Refreshing…
                    </span>
                  ) : (
                    <span className="feCibil__btnInner">
                      <span className="feCibil__btnIcon" aria-hidden="true">
                        <NavIcon name="refresh" />
                      </span>
                      Refresh Score
                    </span>
                  )}
                </button>
              </div>

              <div className="feCibil__right" aria-label="CIBIL indicator">
                <div
                  className={`feRing feRing--premium ${homeCibilAnimate ? 'is-animate' : ''}`}
                  data-band={cibil.band}
                  style={{ '--p': cibil.pct, '--ring': cibil.color }}
                >
                  <svg className="feRing__svg" viewBox="0 0 120 120" aria-hidden="true">
                    <defs>
                      <linearGradient
                        id="feHomeCibilGradGood"
                        x1="15%"
                        y1="85%"
                        x2="85%"
                        y2="15%"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#0d9488" />
                        <stop offset="55%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#4ade80" />
                      </linearGradient>
                      <linearGradient
                        id="feHomeCibilGradMid"
                        x1="10%"
                        y1="90%"
                        x2="90%"
                        y2="10%"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#ea580c" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#fbbf24" />
                      </linearGradient>
                      <linearGradient
                        id="feHomeCibilGradLow"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#b91c1c" />
                        <stop offset="55%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#fb923c" />
                      </linearGradient>
                    </defs>
                    <circle className="feRing__track" cx="60" cy="60" r="46" />
                    <circle
                      className="feRing__progress"
                      cx="60"
                      cy="60"
                      r="46"
                      pathLength="100"
                      style={{ stroke: `url(#${cibil.gradId})` }}
                    />
                  </svg>
                  <div className="feRing__center">
                    <div className="feRing__score">{homeCibilScore}</div>
                    <div className="feRing__meta">out of 900</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {homeCibilToast ? (
          <div className="feToast" role="status" aria-live="polite">
            {homeCibilToast}
          </div>
        ) : null}

        <section className="feSection" aria-label="Financial categories">
          <div className="feSection__head">
            <div className="feSection__title">Categories</div>
          </div>

          <div className="feCatGrid" role="list" aria-label="Category blocks">
            <button
              type="button"
              className="feCatCard feCatCard--banner"
              aria-label="Open Investments"
              onClick={() => navigate('sip_investment')}
            >
              <FeCatPhotoBg src={FE_CAT_COVERS.investments} />
              <div className="feCatCard__body">
                <div className="feCatCard__top">
                  <span className="feCatCard__icon" aria-hidden="true">
                    <NavIcon name="cibil" />
                  </span>
                  <span className="feCatCard__title">Investments</span>
                </div>
                <div className="feCatCard__items">SIP • FD • Mutual Funds • Bonds</div>
              </div>
            </button>

            <button type="button" className="feCatCard feCatCard--banner" aria-label="Open Insurance">
              <FeCatPhotoBg src={FE_CAT_COVERS.insurance} />
              <div className="feCatCard__body">
                <div className="feCatCard__top">
                  <span className="feCatCard__icon" aria-hidden="true">
                    <NavIcon name="profile" />
                  </span>
                  <span className="feCatCard__title">Insurance</span>
                </div>
                <div className="feCatCard__items">Health • Life • Car • Travel</div>
              </div>
            </button>

            <button
              type="button"
              className="feCatCard feCatCard--banner"
              aria-label="Open Loans"
              onClick={() => navigate('loans')}
            >
              <FeCatPhotoBg src={FE_CAT_COVERS.loans} />
              <div className="feCatCard__body">
                <div className="feCatCard__top">
                  <span className="feCatCard__icon" aria-hidden="true">
                    <NavIcon name="home" />
                  </span>
                  <span className="feCatCard__title">Loans</span>
                </div>
                <div className="feCatCard__items">Personal • Home • Education • EMI</div>
              </div>
            </button>

            <button type="button" className="feCatCard feCatCard--banner" aria-label="Open Credit Cards">
              <FeCatPhotoBg src={FE_CAT_COVERS.creditCards} />
              <div className="feCatCard__body">
                <div className="feCatCard__top">
                  <span className="feCatCard__icon" aria-hidden="true">
                    <NavIcon name="blogs" />
                  </span>
                  <span className="feCatCard__title">Credit Cards</span>
                </div>
                <div className="feCatCard__items">Offers • Cashback • Lounge • Fuel</div>
              </div>
            </button>
          </div>
        </section>

        <CalculatorSection reduceMotion={reduceMotion} />

        <section className="feSection" aria-label="Credit card offers">
          <div className="feSection__head feSection__head--split">
            <div>
              <div className="feSection__title">Premium Cards</div>
              <div className="feSection__sub">Exclusively curated for you</div>
            </div>
            <button
              type="button"
              className="feTextBtn"
              onClick={() => navigate('credit_card_offers')}
            >
              Compare All
            </button>
          </div>

          <div className="feHScroll" aria-label="Credit card horizontal list">
            <div className="feCardOffer feCardOffer--premiumStack">
              <div
                className="feCCStack"
                data-reduce-motion={reduceMotion ? 'true' : 'false'}
              >
                <div className="feCC feCC--infinite" aria-hidden="true">
                  <div className="feCC__infiniteHead">
                    <span className="feCC__infiniteTier">INFINITE</span>
                    <span className="feCC__infiniteBrand">FinExpert</span>
                  </div>
                  <div className="feCC__infiniteFoot">
                    <span className="feCC__infiniteRupee">₹</span>
                    <div className="feCC__infiniteFootText">
                      <span className="feCC__infiniteSub">Total rewards</span>
                      <span className="feCC__infiniteHint">Tap to unlock</span>
                    </div>
                  </div>
                </div>

                <div className="feCC feCC--prime">
                  <div className="feCC__primeTop">
                    <span className="feCC__primeWord">Prime Gold</span>
                    <span className="feCC__mc" aria-hidden="true">
                      <span className="feCC__mcC feCC__mcC--l" />
                      <span className="feCC__mcC feCC__mcC--r" />
                    </span>
                  </div>
                  <div className="feCC__primeNumber" aria-hidden="true">
                    •••• •••• •••• 7850
                  </div>
                  <div className="feCC__primeMid">
                    <div>
                      <div className="feCC__metaLabel feCC__metaLabel--onGold">Valid thru</div>
                      <div className="feCC__primeMetaVal">12/29</div>
                    </div>
                    <div className="feCC__primeMidRight">
                      <div className="feCC__metaLabel feCC__metaLabel--onGold">Card holder</div>
                      <div className="feCC__primeName">
                        {(profileUser?.name ?? authUser?.name ?? 'USER').trim().toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="feCC__applyOnCard"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('eligibility_form')
                    }}
                  >
                    Apply now
                  </button>
                </div>
              </div>
              <div className="feCardOffer__copy">
                <div className="feCardOffer__title">Instant approval offers</div>
                <div className="feCardOffer__text">Compare cashback and rewards.</div>
                <button
                  type="button"
                  className="feBtn feBtn--secondary"
                  onClick={() => navigate('eligibility_form')}
                >
                  Check Eligibility
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="feSection" aria-label="Reviews">
          <div className="feSection__head">
            <div className="feSection__title">Reviews</div>
          </div>

          <div
            className="feCarousel feCarousel--reviews"
            aria-roledescription="carousel"
            aria-label="Reviews carousel"
          >
            <div className="feAutoRow">
              <div
                className="feAutoRow__track"
                style={{ transform: `translateX(${-reviewIdx * 82}%)` }}
              >
                {reviews.map((r) => (
                  <div key={r.id} className="feReviewCard">
                    <div
                      className="feReviewCard__banner"
                      data-review={r.id}
                      aria-hidden="true"
                    >
                      <img
                        className="feReviewCard__bannerImg"
                        src={r.bannerSrc}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        style={{ objectPosition: r.bannerPos ?? 'center center' }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <div className="feReviewCard__bannerScrim" />
                      <span className="feReviewCard__bannerBrand">FinExpert</span>
                    </div>
                    <div className="feReviewCard__body">
                      <div className="feReviewCard__top">
                        <div className="feReviewCard__name">{r.name}</div>
                        <Stars value={r.stars} />
                      </div>
                      <div className="feReviewCard__text">{r.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="feDots feDots--reviews" role="tablist" aria-label="Review slides">
              {reviews.map((r, idx) => (
                <button
                  key={r.id}
                  type="button"
                  className={`feDot ${idx === reviewIdx ? 'is-active' : ''}`}
                  onClick={() => setReviewIdx(idx)}
                  aria-label={`Go to review ${idx + 1}: ${r.name}`}
                  aria-selected={idx === reviewIdx}
                  role="tab"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="feSection" aria-label="Blog preview">
          <div className="feSection__head feSection__head--split">
            <div className="feSection__title">Blogs</div>
            <button type="button" className="feTextBtn" onClick={() => navigate('blogs')}>
              View All Blogs
            </button>
          </div>

          <div className="feBlogBannerStack" role="list" aria-label="Blog cards">
            {[
              { id: 'cibil', icon: 'cibil' },
              { id: 'p2', icon: 'emi' },
              { id: 'p1', icon: 'sip' },
            ].map((row) => {
              const post = blogPosts.find((p) => p.id === row.id)
              if (!post) return null
              return (
                <BlogBannerCard
                  key={row.id}
                  title={post.title}
                  subtitle={post.desc}
                  icon={row.icon}
                  coverSrc={post.coverSrc}
                  onClick={() => openBlog(post)}
                />
              )
            })}
          </div>
        </section>
          </>
        )}
        </div>
      </main>

      {storyOpen
        ? createPortal(
            <div className="feStoryModal feStoryModal--immersive" role="dialog" aria-label="Story viewer" aria-modal="true">
              <button
                type="button"
                className="feStoryModal__backdrop"
                aria-label="Close story"
                onClick={closeStory}
              />
              <div className="feStoryModal__sheet">
                {storySoundHint && activeStory?.videoUrl && !reduceMotion ? (
                  <button
                    type="button"
                    className="feStorySoundHint"
                    onClick={() => {
                      setStoryVideoMuted(false)
                      setStorySoundHint(false)
                      const v = storyVideoRef.current
                      if (v) {
                        v.muted = false
                        v.play?.().catch(() => {})
                      }
                    }}
                  >
                    Tap for sound
                  </button>
                ) : null}

                <button
                  type="button"
                  className="feStoryTap feStoryTap--left"
                  aria-label="Previous story"
                  onClick={goPrevStory}
                />
                <button
                  type="button"
                  className="feStoryTap feStoryTap--right"
                  aria-label="Next story"
                  onClick={goNextStory}
                />

                <div className="feStoryModal__top">
                  <div className="feStoryBars" aria-hidden="true">
                    {activeStatus?.stories?.map((s, idx) => {
                      const state =
                        idx < storyIdx ? 'is-done' : idx === storyIdx ? 'is-active' : ''
                      return (
                        <div key={s.id} className={`feStoryBar ${state}`}>
                          <div
                            className="feStoryBar__fill"
                            style={{
                              animationDuration: `${storySlideMs}ms`,
                              animationPlayState: reduceMotion ? 'paused' : 'running',
                            }}
                            key={`${activeStatus?.id}-${storyIdx}-${s.id}-${storySlideMs}`}
                          />
                        </div>
                      )
                    })}
                  </div>
                  <div className="feStoryModal__metaRow">
                    <div className="feStoryModal__meta">
                      <StoryAvatarImg
                        name={activeStatus?.name ?? 'Admin'}
                        src={activeStatus?.avatarUrl}
                        className="feStoryModal__avatarImg"
                        width={72}
                        height={72}
                      />
                      <div>
                        <div className="feStoryModal__name">{activeStatus?.name}</div>
                        <div className="feStoryModal__sub">
                          {activeStory?.time ? `${activeStory.time} • ` : ''}
                          Stories
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="feStoryModal__close"
                      aria-label="Close"
                      onClick={closeStory}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="feStoryModal__content">
                  <div
                    className={`feStorySlide feStorySlide--${activeStory?.theme ?? 'navy'} ${
                      activeStory?.videoUrl && !reduceMotion ? 'feStorySlide--hasVideo' : ''
                    } ${reduceMotion ? 'feStorySlide--reduceMotion' : ''}`}
                  >
                    {activeStory?.videoUrl && !reduceMotion ? (
                      <>
                        <div className="feStorySlide__mediaWrap">
                          <video
                            ref={storyVideoRef}
                            key={activeStory.id}
                            className="feStorySlide__video"
                            src={activeStory.videoUrl}
                            playsInline
                            muted={storyVideoMuted}
                            autoPlay
                            onLoadedMetadata={(e) => {
                              const el = e.target
                              const ms = Math.min(Math.max(el.duration * 1000, 3500), 15000)
                              setStorySlideMs(ms)
                              el.muted = storyVideoMuted
                            }}
                            onEnded={goNextStory}
                          />
                          <div className="feStorySlide__videoScrim" aria-hidden="true" />
                        </div>
                        <button
                          type="button"
                          className="feStorySlide__soundBtn"
                          onClick={() => {
                            setStorySoundHint(false)
                            setStoryVideoMuted((m) => !m)
                          }}
                          aria-label={storyVideoMuted ? 'Unmute video' : 'Mute video'}
                        >
                          {storyVideoMuted ? '🔇' : '🔊'}
                        </button>
                      </>
                    ) : (
                      <div
                        className={`feStorySlide__media feStorySlide__media--fallback feStorySlide__media--${activeStory?.theme ?? 'navy'}`}
                        aria-hidden="true"
                      />
                    )}
                    <div className="feStorySlide__body">
                      <div className="feStorySlide__kicker">{activeStory?.title}</div>
                      <div className="feStorySlide__title">{activeStory?.subtitle}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      {logoutOpen ? (
        <div className="feConfirmModal" role="dialog" aria-modal="true" aria-label="Confirm logout">
          <button
            type="button"
            className="feConfirmModal__backdrop"
            aria-label="Close logout confirmation"
            onClick={() => setLogoutOpen(false)}
          />
          <div className="feConfirmModal__sheet">
            <div className="feConfirmModal__title">Confirm Logout</div>
            <div className="feConfirmModal__text">Are you sure you want to logout from your account?</div>
            <div className="feConfirmModal__actions">
              <button type="button" className="feBtn feBtn--secondary feBtn--full" onClick={() => setLogoutOpen(false)}>
                Cancel
              </button>
              <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={confirmLogout}>
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {route !== 'login' && route !== 'signup' && route !== 'forgot_password' && route !== 'otp_login' && route !== 'terms_conditions' && route !== 'privacy_policy' ? (
      <nav className="feBottomNav" aria-label="Bottom navigation">
        {TABS.map((t) => {
          const isActive = t.id === activeTab
          return (
            <button
              key={t.id}
              type="button"
              className={`feTab ${isActive ? 'is-active' : ''}`}
              onClick={() => {
                setActiveTab(t.id)
                navigate(t.id)
              }}
              data-reduce-motion={reduceMotion ? 'true' : 'false'}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="feTab__icon">
                <NavIcon name={t.icon} />
              </span>
              <span className="feTab__label">{t.label}</span>
            </button>
          )
        })}
      </nav>
      ) : null}
    </div>
  )
}

