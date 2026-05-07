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
import CreditCardEligibilityPage from './CreditCardEligibilityPage.jsx'
import EmiCalculatorPage from './EmiCalculatorPage.jsx'
import HomeLoanPage from './HomeLoanPage.jsx'
import IncomeTaxCalculatorPage from './IncomeTaxCalculatorPage.jsx'
import GratuityCalculatorPage from './GratuityCalculatorPage.jsx'
import SipInvestmentPage from './SipInvestmentPage.jsx'
import FixedDepositCalculatorPage from './FixedDepositCalculatorPage.jsx'
import PpfCalculatorPage from './PpfCalculatorPage.jsx'
import RdCalculatorPage from './RdCalculatorPage.jsx'
import LumpsumCalculatorPage from './LumpsumCalculatorPage.jsx'
import GoalPlannerPage from './GoalPlannerPage.jsx'
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
import VerifyDetailsPage from './VerifyDetailsPage.jsx'
import TermsConditionsPage from './TermsConditionsPage.jsx'
import PrivacyPolicyPage from './PrivacyPolicyPage.jsx'
import TaxationScreen from './TaxationScreen.jsx'

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

function NavIcon({ name, size = 22, strokeWidth: sw = 2 }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    width: size,
    height: size,
    stroke: 'currentColor',
    strokeWidth: sw,
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
    case 'loans':
      return (
        <svg {...common}>
          <rect x="3.5" y="6" width="17" height="12" rx="2.5" />
          <path d="M7 12h10" />
          <path d="M7 9.2h2.5" />
          <path d="M14.5 14.8H17" />
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
        <svg {...common}>
          <path d="M4 19h16" />
          <path d="M6 15l4-4 3 3 5-7" />
          <path d="M18 7v4h-4" />
        </svg>
      )
    case 'mfChart':
      return (
        <svg {...common}>
          <path d="M4 19h16" />
          <path d="M6 15l3.5-3 3 2.5L18 7" fill="none" />
          <circle cx="6" cy="15" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="9.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12.5" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="18" cy="7" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'lock':
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="10" rx="2.2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="16" r="1.35" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'party':
      return (
        <svg {...common} width={size} height={size} strokeWidth={1.75}>
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
        <svg {...common}>
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
    case 'tax':
      return (
        <svg {...common}>
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M12 18V12" />
          <path d="M9 15h6" />
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
  { id: 'loans', label: 'Loans', icon: 'loans' },
  { id: 'blogs', label: 'Insight', icon: 'blogs' },
  { id: 'calculator', label: 'Calculator', icon: 'calculator' },
  { id: 'cibil', label: 'CIBIL', icon: 'cibil' },
]

const ROUTE_TO_TAB = {
  home: 'home',
  blogs: 'blogs',
  loans: 'loans',
  calculator: 'calculator',
  cibil: 'cibil',
  profile: 'home',
  mutual_funds: 'home',
  insurance: 'home',
  bonds: 'home',
  savings: 'home',
  taxation: 'home',
  credit_cards: 'home',
  emi_calculator: 'calculator',
  fixed_deposit_calc: 'calculator',
  fixed_deposit_soon: 'home',
  ppf_calc: 'calculator',
  rd_calc: 'calculator',
  lumpsum_calc: 'calculator',
  home_loan_emi_calc: 'calculator',
  car_loan_emi_calc: 'calculator',
  goal_planner_calc: 'calculator',
  income_tax_calc: 'calculator',
  gratuity_calc: 'calculator',
  sip_investment: 'home',
  insurance_explorer: 'home',
  personal_loan_explorer: 'loans',
  business_loan_explorer: 'loans',
  credit_card_offers: 'home',
  credit_card_eligibility: 'home',
  eligibility_form: 'home',
  blog_detail: 'blogs',
  application_form: 'home',
  notifications: 'home',
  account: 'home',
  full_credit_report: 'cibil',
  edit_profile: 'home',
  linked_accounts: 'home',
  language: 'home',
  support: 'home',
  login: 'home',
  signup: 'home',
  forgot_password: 'home',
  otp_login: 'home',
  verify_details: 'home',
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

function ScreenShell({ title, subtitle, onBack, children, showBand = true, onNotifications, onProfile }) {
  return (
    <div className="feScreen feScreen--subpage" aria-label={title}>
      {showBand ? (
        <div className="feScreen__headerBand">
          <div className="feScreenTop" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button type="button" className="feBackBtn" onClick={onBack} aria-label="Back">
                <NavIcon name="back" />
              </button>
              <div className="feScreenTop__texts">
                <div className="feScreenTop__title">{title}</div>
                {subtitle ? <div className="feScreenTop__sub">{subtitle}</div> : null}
              </div>
            </div>
            
            <div className="feHeader__right" style={{ padding: 0 }}>
              <button
                type="button"
                className="feHeader__iconBtn feHeader__iconBtn--bell"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
                aria-label="Notifications"
                onClick={onNotifications}
              >
                <NavIcon name="bell" />
              </button>
              <button
                type="button"
                className="feHeader__avatar feHeader__avatar--glass"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
                aria-label="Profile"
                onClick={onProfile}
              >
                <svg
                  className="feHeader__avatarIcon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : null}
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
  const [authFlowPhone, setAuthFlowPhone] = useState('')
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const lastMainScrollTopRef = useRef(0)
  const headerHiddenRef = useRef(false)
  const headerToggleAnchorRef = useRef(0)
  const mainRef = useRef(null)



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
    // Scroll the main content area back to the top on every navigation
    if (mainRef.current) mainRef.current.scrollTo({ top: 0, behavior: 'instant' })
  }

  const goBack = () => {
    if (typeof window === 'undefined') return
    setTransitionDir('back')
    
    // For specific detail routes, go to their parent section
    if (route === 'mutual_funds_detail') {
      navigate('mutual_funds')
    } else if (route === 'insurance_detail' || route === 'insurance_explorer') {
      navigate('insurance')
    } else if (route === 'personal_loan_explorer' || route === 'business_loan_explorer') {
      navigate('loans')
    } else if (route === 'blog_detail') {
      navigate('blogs')
    } else {
      // Default: Go to home as requested
      navigate('home')
    }
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

  // Explore Financial Products slider data + behavior
  const exploreProducts = useMemo(
    () => [
      {
        id: 'x_ins',
        title: 'Insurance Plans',
        benefit: 'Coverage options for every need',
        route: 'insurance',
        icon: 'shield',
        isPrimary: true,
      },
      {
        id: 'x_loan',
        title: 'Personal Loan',
        benefit: 'Compare loan offers & get eligibility',
        route: 'personal_loan_explorer',
        icon: 'home',
      },
      {
        id: 'x_mf',
        title: 'Mutual Funds (SIP)',
        benefit: 'Curated portfolios for your goals',
        route: 'sip_investment',
        icon: 'mfChart',
      },
      {
        id: 'x_fd',
        title: 'Fixed Deposit (FD)',
        benefit: 'Secure fixed returns with flexibility',
        route: 'savings',
        icon: 'lock',
      },
      {
        id: 'x_cc',
        title: 'Credit Cards',
        benefit: 'Unlock rewards with eligibility checks',
        route: 'credit_cards',
        icon: 'card',
      },
      {
        id: 'x_emi',
        title: 'EMI / Loan Calculator',
        benefit: 'Estimate monthly payments instantly',
        route: 'emi_calculator',
        icon: 'calculator',
      },
      {
        id: 'x_tax',
        title: 'Tax Saving Plans',
        benefit: 'Optimize with smart tax strategies',
        route: 'ppf_calc',
        icon: 'doc',
      },
      {
        id: 'x_ret',
        title: 'Retirement / Pension Plans',
        benefit: 'Plan long-term with confidence',
        route: 'gratuity_calc',
        icon: 'pig',
      },
    ],
    [],
  )

  const exploreRailRef = useRef(null)
  const [exploreIdx, setExploreIdx] = useState(0)
  const [explorePaused, setExplorePaused] = useState(false)
  const [exploreSwiping, setExploreSwiping] = useState(false)
  const exploreResumeTimerRef = useRef(null)
  const exploreSwipingTimerRef = useRef(null)
  const exploreProgrammaticScrollRef = useRef(false)
  const exploreStepRef = useRef(0)

  const scheduleExploreResume = useCallback(() => {
    if (typeof window === 'undefined') return
    if (exploreResumeTimerRef.current) clearTimeout(exploreResumeTimerRef.current)
    exploreResumeTimerRef.current = window.setTimeout(() => {
      setExplorePaused(false)
    }, 2200)
  }, [])

  const pauseExplore = useCallback(() => {
    setExplorePaused(true)
    if (exploreResumeTimerRef.current) clearTimeout(exploreResumeTimerRef.current)
  }, [])

  const computeExploreStep = useCallback(() => {
    const rail = exploreRailRef.current
    if (!rail) return
    const cards = Array.from(rail.children).filter((el) => el instanceof HTMLElement)
    if (cards.length >= 2) {
      const step = (cards[1].offsetLeft ?? 0) - (cards[0].offsetLeft ?? 0)
      exploreStepRef.current = step > 0 ? step : (cards[0].offsetWidth ?? 220) + 12
      return
    }
    if (cards.length === 1) {
      exploreStepRef.current = cards[0].offsetWidth ?? 220
    }
  }, [])

  const scrollExploreToIndex = useCallback(
    (idx) => {
      const rail = exploreRailRef.current
      if (!rail) return
      const card = rail.children?.[idx]
      if (!(card instanceof HTMLElement)) return
      const targetLeft = card.offsetLeft ?? 0

      exploreProgrammaticScrollRef.current = true
      rail.scrollTo({
        left: targetLeft,
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
      setExploreIdx(idx)

      window.setTimeout(() => {
        exploreProgrammaticScrollRef.current = false
      }, reduceMotion ? 0 : 1300)
    },
    [reduceMotion],
  )

  useEffect(() => {
    if (route !== 'home') return
    computeExploreStep()
    // Keep explore index in a valid range on resize/re-render.
    setExploreIdx((i) => Math.max(0, Math.min(exploreProducts.length - 1, i)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, exploreProducts.length, computeExploreStep])

  useEffect(() => {
    if (reduceMotion) return
    if (route !== 'home') return
    if (explorePaused) return
    if (exploreProducts.length <= 1) return
    const t = window.setInterval(() => {
      const next = (exploreIdx + 1) % exploreProducts.length
      scrollExploreToIndex(next)
    }, 3600)
    return () => clearInterval(t)
  }, [reduceMotion, route, explorePaused, exploreIdx, exploreProducts.length, scrollExploreToIndex])

  const onExploreScroll = useCallback(() => {
    const rail = exploreRailRef.current
    if (!rail) return
    if (exploreProgrammaticScrollRef.current) return

    const cards = Array.from(rail.children).filter((el) => el instanceof HTMLElement)
    if (cards.length === 0) return

    const sl = rail.scrollLeft
    let bestIdx = 0
    let bestDist = Number.POSITIVE_INFINITY
    for (let i = 0; i < cards.length; i += 1) {
      const dist = Math.abs((cards[i].offsetLeft ?? 0) - sl)
      if (dist < bestDist) {
        bestDist = dist
        bestIdx = i
      }
    }

    const clamped = Math.max(0, Math.min(exploreProducts.length - 1, bestIdx))
    setExploreIdx((prev) => (prev === clamped ? prev : clamped))

    setExploreSwiping(true)
    if (exploreSwipingTimerRef.current) clearTimeout(exploreSwipingTimerRef.current)
    exploreSwipingTimerRef.current = window.setTimeout(() => setExploreSwiping(false), 160)
    scheduleExploreResume()
  }, [exploreProducts.length, scheduleExploreResume])

  // 3) Reviews auto-scroll
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
  const baseBlogCategories = useMemo(() => ['All', 'India'], [])

  const fallbackNewsCovers = useMemo(
    () => [
      // Use source.unsplash.com so images always resolve.
      // We rely on scrim in CSS for readability.
      'https://source.unsplash.com/900x600/?news,breaking&sig=1',
      'https://source.unsplash.com/900x600/?journalism,newspaper&sig=2',
      'https://source.unsplash.com/900x600/?india,news&sig=3',
      'https://source.unsplash.com/900x600/?business,news&sig=4',
      'https://source.unsplash.com/900x600/?finance,market&sig=5',
      'https://source.unsplash.com/900x600/?headlines,reporting&sig=6',
    ],
    [],
  )
  const [blogCat, setBlogCat] = useState('All')
  const [blogQuery, setBlogQuery] = useState('')
  const [homeNewsTab, setHomeNewsTab] = useState('All News')
  const blogTabsRef = useRef(null)
  const trendingScrollRef = useRef(null)
  const marketTickerRef = useRef(null)
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

  const staticNewsPosts = useMemo(
    () => [
      {
        id: 'fallback-1',
        title: 'World Markets & Economy — Live updates',
        desc: 'Fetching live news feeds in the background. If your network blocks RSS, this fallback shows while you connect.',
        cat: 'India',
        time: 'Now',
        author: 'FinExpert',
        date: 'Today',
        coverSrc: fallbackNewsCovers[0],
      },
      {
        id: 'fallback-2',
        title: 'Finance Insights — Smart investing tips',
        desc: 'Stay informed with curated headlines across investing, credit and savings themes.',
        cat: 'India',
        time: 'Now',
        author: 'FinExpert',
        date: 'Today',
        coverSrc: fallbackNewsCovers[1],
      },
      {
        id: 'fallback-3',
        title: 'Global Headlines — What matters today',
        desc: 'News feed loading…',
        cat: 'India',
        time: 'Now',
        author: 'FinExpert',
        date: 'Today',
        coverSrc: fallbackNewsCovers[2],
      },
      {
        id: 'fallback-4',
        title: 'FinExpert News — curated for your interests',
        desc: 'If live fetch succeeds, these cards will update automatically.',
        cat: 'India',
        time: 'Now',
        author: 'FinExpert',
        date: 'Today',
        coverSrc: fallbackNewsCovers[3],
      },
      {
        id: 'fallback-5',
        title: 'Economic updates — market pulse',
        desc: 'Tune into global finance developments with quick summaries.',
        cat: 'India',
        time: 'Now',
        author: 'FinExpert',
        date: 'Today',
        coverSrc: fallbackNewsCovers[4],
      },
      {
        id: 'fallback-6',
        title: 'Investing & savings — latest stories',
        desc: 'Loading live RSS feeds…',
        cat: 'India',
        time: 'Now',
        author: 'FinExpert',
        date: 'Today',
        coverSrc: fallbackNewsCovers[5],
      },
    ],
    [],
  )

  const [blogPosts, setBlogPosts] = useState(staticNewsPosts)

  const [newsLoading, setNewsLoading] = useState(false)

  const marketNewsPool = useMemo(
    () => [
      {
        id: 'mkt-tata',
        tag: 'Stocks',
        tab: 'Markets',
        time: '45 mins ago',
        title: 'Tata Motors share price surges 5% after record-breaking quarterly profits.',
        source: 'Reuters',
        cover:
          'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=420&q=80',
      },
      {
        id: 'mkt-bitcoin',
        tag: 'Crypto',
        tab: 'Markets',
        time: '1 hour ago',
        title: 'Bitcoin stabilizes at $65k as institutional inflow remains steady in India.',
        source: 'Bloomberg',
        cover:
          'https://images.unsplash.com/photo-1518544866330-4e6f7a0c4e41?auto=format&fit=crop&w=420&q=80',
      },
      {
        id: 'mkt-nifty',
        tag: 'Stocks',
        tab: 'Markets',
        time: '9 mins ago',
        title: 'Nifty midcap index extends gains as banking and auto stocks lead.',
        source: 'CNBC TV18',
        cover:
          'https://images.unsplash.com/photo-1642052501978-0e6f8f7cf1e6?auto=format&fit=crop&w=420&q=80',
      },
      {
        id: 'mkt-rupee',
        tag: 'Forex',
        tab: 'Markets',
        time: '18 mins ago',
        title: 'Rupee trades in a tight range ahead of US inflation print this evening.',
        source: 'Mint',
        cover:
          'https://images.unsplash.com/photo-1580041065738-e72023775cdc?auto=format&fit=crop&w=420&q=80',
      },
    ],
    [],
  )

  const economyNewsPool = useMemo(
    () => [
      {
        id: 'eco-repo',
        tag: 'Economy',
        tab: 'Economy',
        time: '12 mins ago',
        title: 'RBI Keeps Repo Rate Unchanged: Impact on Your Home Loan EMIs and Savings',
        source: 'The Monetary Policy Committee has decided to maintain the status quo for the seventh time in a row.',
        cover:
          'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'eco-gst',
        tag: 'Policy',
        tab: 'Economy',
        time: '26 mins ago',
        title: 'GST council meet likely to review compliance norms for digital businesses.',
        source: 'Business Standard',
        cover:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'eco-inflation',
        tag: 'Inflation',
        tab: 'Economy',
        time: '33 mins ago',
        title: 'Food inflation cools in metros while fuel-linked costs stay elevated.',
        source: 'ET Now',
        cover:
          'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'eco-manufacturing',
        tag: 'Growth',
        tab: 'Economy',
        time: '51 mins ago',
        title: 'Manufacturing PMI remains in expansion zone for the tenth month.',
        source: 'The Hindu BusinessLine',
        cover:
          'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    [],
  )

  const homeNewsInsights = useMemo(
    () => [
      {
        id: 'ins-1',
        title: 'Why mid-cap stocks are outperforming large-caps this season.',
        date: 'May 24, 2024',
        cat: 'Analysis',
        icon: 'trending',
      },
      {
        id: 'ins-2',
        title: 'GST council meeting scheduled: Tax revisions for digital services expected.',
        date: 'May 24, 2024',
        cat: 'Policy',
        icon: 'shield',
      },
      {
        id: 'ins-3',
        title: 'Mumbai real estate market hits 5-year high in luxury segment sales.',
        date: 'May 23, 2024',
        cat: 'Real Estate',
        icon: 'home',
      },
    ],
    [],
  )

  const [marketNewsLive, setMarketNewsLive] = useState(marketNewsPool)
  const [economyNewsLive, setEconomyNewsLive] = useState(economyNewsPool)

  useEffect(() => {
    setMarketNewsLive(marketNewsPool)
    setEconomyNewsLive(economyNewsPool)
  }, [marketNewsPool, economyNewsPool])

  useEffect(() => {
    const rotate = (arr) => (arr.length > 1 ? [...arr.slice(1), arr[0]] : arr)
    const id = window.setInterval(() => {
      setMarketNewsLive((prev) => rotate(prev))
      setEconomyNewsLive((prev) => rotate(prev))
    }, 5500)
    return () => clearInterval(id)
  }, [])

  const homeNewsFiltered = useMemo(() => {
    if (homeNewsTab === 'Markets') return marketNewsLive
    if (homeNewsTab === 'Economy') return economyNewsLive
    return [...economyNewsLive.slice(0, 2), ...marketNewsLive.slice(0, 2)]
  }, [homeNewsTab, marketNewsLive, economyNewsLive])

  const homeNewsLead = homeNewsFiltered[0] ?? economyNewsLive[0] ?? marketNewsLive[0]
  const homeNewsList = homeNewsFiltered.slice(1, 3)
  const asBlogPost = (item) => ({
    id: item.id,
    title: item.title,
    desc: item.source,
    cat: item.tag,
    time: item.time,
    author: 'SilkLend Desk',
    date: 'Today',
    coverSrc: item.cover,
    sections: [{ title: 'Summary', text: item.source }],
  })
  const marketTickersBase = useMemo(
    () => [
      { id: 'nifty50', label: 'Nifty 50', sub: 'NSE Index', value: 21853.8, change: -0.24 },
      { id: 'sensex', label: 'Sensex', sub: 'BSE Index', value: 72112.35, change: 0.36 },
      { id: 'banknifty', label: 'Bank Nifty', sub: 'Banking Index', value: 46822.15, change: 0.54 },
      { id: 'gold', label: 'Gold', sub: 'MCX', value: 62450, change: 1.12, prefix: '₹', compact: true },
      { id: 'silver', label: 'Silver', sub: 'MCX', value: 73600, change: -0.44, prefix: '₹', compact: true },
      { id: 'crude', label: 'Crude Oil', sub: 'Commodity', value: 6785, change: -0.31, prefix: '₹', compact: true },
      { id: 'usd-inr', label: 'USD/INR', sub: 'Forex', value: 83.12, change: 0.09 },
      { id: 'btc', label: 'Bitcoin', sub: 'Crypto', value: 65210.2, change: 1.48, prefix: '$' },
    ],
    [],
  )
  const [marketTickers, setMarketTickers] = useState(marketTickersBase)
  const [marketSlide, setMarketSlide] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setMarketTickers((prev) =>
        prev.map((t) => {
          const drift = (Math.random() - 0.5) * (t.compact ? 60 : 24)
          const pctDrift = (Math.random() - 0.5) * 0.1
          return {
            ...t,
            value: Math.max(1, t.value + drift),
            change: Number(Math.max(-9.99, Math.min(9.99, t.change + pctDrift)).toFixed(2)),
          }
        }),
      )
    }, 3500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (route !== 'blogs') return
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setMarketSlide((i) => (i + 1) % marketTickers.length)
    }, 2300)
    return () => clearInterval(id)
  }, [route, reduceMotion, marketTickers.length])

  useEffect(() => {
    const rail = marketTickerRef.current
    if (!rail) return
    const firstCard = rail.querySelector('.feNewsTicker__card')
    if (!firstCard) return
    const gap = 8
    const step = firstCard.clientWidth + gap
    rail.scrollTo({ left: step * marketSlide, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [marketSlide, reduceMotion])

  useEffect(() => {
    // Fetch news for both: full News page + the News preview section on Home.
    const shouldFetch = route === 'blogs' || route === 'home'
    if (!shouldFetch) return

    let cancelled = false

    const stripHtml = (s) =>
      (s ?? '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim()

    const formatRelative = (isoLike) => {
      if (!isoLike) return 'Now'
      const d = new Date(isoLike)
      if (Number.isNaN(d.getTime())) return 'Now'
      const diff = Date.now() - d.getTime()
      const m = Math.floor(diff / 60000)
      if (m < 60) return `${Math.max(1, m)} min ago`
      const h = Math.floor(m / 60)
      if (h < 24) return `${h} hrs ago`
      const day = Math.floor(h / 24)
      return `${day} days ago`
    }

    const loadRss = async (sourceName, rssUrl, maxItems = 8) => {
      const proxyUrl = `https://r.jina.ai/https://${rssUrl.replace(/^https?:\/\//, '')}`
      const res = await fetch(proxyUrl)
      if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`)
      const text = await res.text()
      const doc = new DOMParser().parseFromString(text, 'text/xml')
      // RSS: <item> | Atom: <entry>
      const items = Array.from(doc.querySelectorAll('item, entry')).slice(0, maxItems)

      const toPost = (it, idx) => {
        const title = it.querySelector('title')?.textContent?.trim() ?? ''
        const linkEl = it.querySelector('link')
        const link =
          linkEl?.getAttribute('href') ?? linkEl?.textContent?.trim() ?? ''
        const descRaw =
          it.querySelector('description')?.textContent ??
          it.querySelector('summary')?.textContent ??
          ''
        const desc = stripHtml(descRaw)
        const pubDate =
          it.querySelector('pubDate')?.textContent?.trim() ??
          it.querySelector('published')?.textContent?.trim() ??
          it.querySelector('updated')?.textContent?.trim() ??
          ''

        const normalizeImageUrl = (u) => {
          if (!u) return ''
          const s = String(u)
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .trim()
          if (!s) return ''
          if (s.startsWith('//')) return `https:${s}`
          return s
        }

        const isLikelyValidImageUrl = (u) => {
          const s = normalizeImageUrl(u)
          if (!s) return false
          // Avoid non-http(s) junk. Unsplash "images.unsplash.com/photo-XXX" is ok too.
          return /^https?:\/\//i.test(s) && s.length > 12
        }

        // Try to extract a relevant news image from the RSS/Atom item.
        // Many feeds include it as media:* or enclosure. If not present, attempt
        // to grab the first <img src="..."> from the HTML-ish description.
        const defaultCoverSrc = fallbackNewsCovers[idx % fallbackNewsCovers.length] ?? null
        const coverFromMedia =
          it.querySelector('media\\:content')?.getAttribute('url') ||
          it.querySelector('media\\:thumbnail')?.getAttribute('url') ||
          it.querySelector('enclosure')?.getAttribute('url') ||
          it.querySelector('enclosure')?.getAttribute('href') ||
          ''
        const coverFromDescMatch =
          descRaw?.match(/(?:<img|&lt;img)[^>]*src\s*=\s*["']([^"']+)["']/i)?.[1] ||
          descRaw?.match(/src\s*=\s*["']([^"']+)["']/i)?.[1] ||
          ''

        const coverCandidate = normalizeImageUrl(coverFromMedia) || normalizeImageUrl(coverFromDescMatch)
        const coverSrc = isLikelyValidImageUrl(coverCandidate) ? coverCandidate : defaultCoverSrc

        const summary = desc ? desc.slice(0, 160) : title
        return {
          id: `news-${sourceName}-${idx}-${pubDate || link}`,
          title: title || 'Untitled news',
          desc: summary,
          cat: 'India',
          time: formatRelative(pubDate),
          author: sourceName,
          date: pubDate ? new Date(pubDate).toLocaleDateString(undefined, { month: 'short', day: '2-digit' }) : 'Today',
          coverSrc,
          sections: [
            {
              title: 'Summary',
              text: summary,
            },
          ],
        }
      }

      return items.map(toPost)
    }

    let inFlight = false
    const run = async () => {
      if (inFlight) return
      inFlight = true
      try {
        setNewsLoading(true)
        const sources = [
          { name: 'BBC India', url: 'https://feeds.bbci.co.uk/news/world/asia/india/rss.xml' },
          { name: 'The Hindu (National)', url: 'https://www.thehindu.com/news/national/feeder/default.rss' },
          { name: 'NDTV India', url: 'http://feeds.feedburner.com/ndtvkhabar-india' },
          { name: 'Hindustan Times', url: 'https://www.hindustantimes.com/rss/topnews/rssfeed.xml' },
          // If this feed is temporarily blocked, others will still show fallback/partial results.
          { name: 'India Today', url: 'https://www.indiatoday.in/rss/home' },
        ]

        const results = []
        for (const s of sources) {
          try {
            const posts = await loadRss(s.name, s.url, 3)
            results.push(...posts)
          } catch {
            // ignore per-source errors
          }
        }

        if (cancelled) return

        const next = results.slice(0, 10)
        setBlogPosts(next.length ? next : staticNewsPosts)
      } finally {
        if (!cancelled) setNewsLoading(false)
        inFlight = false
      }
    }

    run()
    const refreshMs = 30 * 60 * 1000 // refresh ~ every 30 minutes
    const refreshId = window.setInterval(() => run(), refreshMs)

    return () => {
      cancelled = true
      window.clearInterval(refreshId)
    }
  }, [route, staticNewsPosts])

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
    const title = post?.title ?? 'FinExpert News'
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

  const onMainScroll = useCallback((e) => {
    const scrollTop = e.currentTarget.scrollTop
    const prevTop = lastMainScrollTopRef.current
    const delta = scrollTop - prevTop
    lastMainScrollTopRef.current = scrollTop

    if (scrollTop <= 8) {
      if (headerHiddenRef.current) {
        headerHiddenRef.current = false
        setHeaderHidden(false)
      }
      headerToggleAnchorRef.current = scrollTop
      return
    }

    if (Math.abs(delta) < 5) return

    const movedSinceToggle = Math.abs(scrollTop - headerToggleAnchorRef.current)

    // Hide only after meaningful downward movement (prevents flicker near edges).
    if (!headerHiddenRef.current && delta > 0 && scrollTop > 84 && movedSinceToggle > 28) {
      headerHiddenRef.current = true
      headerToggleAnchorRef.current = scrollTop
      setHeaderHidden(true)
      return
    }

    // Show only after meaningful upward movement.
    if (headerHiddenRef.current && delta < 0 && movedSinceToggle > 18) {
      headerHiddenRef.current = false
      headerToggleAnchorRef.current = scrollTop
      setHeaderHidden(false)
    }
  }, [])

  useEffect(() => {
    setHeaderHidden(false)
    headerHiddenRef.current = false
    lastMainScrollTopRef.current = 0
    headerToggleAnchorRef.current = 0
  }, [route])

  const isAuthFlowRoute =
    route === 'login' ||
    route === 'signup' ||
    route === 'forgot_password' ||
    route === 'otp_login' ||
    route === 'verify_details' ||
    route === 'terms_conditions' ||
    route === 'privacy_policy'
  const isAuthStaticRoute = route === 'login'

  const ROUTES_WITH_SCREEN_BAND = [
    'edit_profile', 'linked_accounts', 'language', 'support', 'mutual_funds_detail', 'bonds', 'savings', 'notifications', 'account', 'credit_card_offers', 'blog_detail', 'income_tax_calc', 'gratuity_calc', 'fixed_deposit_calc', 'fixed_deposit_soon', 'ppf_calc', 'rd_calc', 'lumpsum_calc', 'goal_planner_calc', 'car_loan_emi_calc', 'emi_calculator', 'sip_investment', 'credit_card_eligibility', 'news'
  ];

  const showHeader =
    route !== 'login' &&
    route !== 'signup' &&
    route !== 'forgot_password' &&
    route !== 'otp_login' &&
    route !== 'verify_details' &&
    route !== 'terms_conditions' &&
    route !== 'privacy_policy' &&
    !ROUTES_WITH_SCREEN_BAND.includes(route)

  return (
    <div className={`feMobile${route === 'home' ? ' feMobile--home' : ''}${ROUTES_WITH_SCREEN_BAND.includes(route) ? ' feMobile--subpage' : ''}`}>
      {showHeader ? (
        <header className={`feHeader${headerHidden ? ' feHeader--hidden' : ''}`} aria-label="FinExpert header">
          <div className="feHeader__left">
            {route === 'home' ? (
              <div className="feHeader__brandHome" aria-label="FinExprt">
                <div className="feHeader__brandText">
                  <span className="feHeader__brandFin">Fin</span>
                  <span className="feHeader__brandExprt">Exprt</span>
                </div>
                <div className="feHeader__brandTagline">ALL IN ONE FINANCIAL APP</div>
              </div>
            ) : route === 'insurance' ||
              route === 'insurance_detail' ||
              route === 'insurance_explorer' ||
              route === 'blogs' ||
              route === 'loans' ||
              route === 'credit_cards' ||
              route === 'home_loan_emi_calc' ||
              route === 'personal_loan_explorer' ||
              route === 'business_loan_explorer' ||
              route === 'eligibility_form' ||
              route === 'application_form' ||
              route === 'cibil' ||
              route === 'taxation' ||
              route === 'full_credit_report' ? (
              <div className="feHeader__backTitle">
                <button
                  type="button"
                  className="feHeader__iconBtn feHeader__iconBtn--back"
                  aria-label="Back"
                  onClick={goBack}
                >
                  <NavIcon name="back" />
                </button>
                {route === 'taxation' ? (
                  <div className="feHeader__brandText" style={{ marginLeft: '8px', fontSize: '18px' }}>
                    <span className="feHeader__brandFin">Fin</span>
                    <span className="feHeader__brandExprt">Exprt</span>
                  </div>
                ) : (
                  <div className="feHeader__sectionTitle">
                    {route === 'cibil' || route === 'full_credit_report'
                      ? 'CIBIL'
                      : route === 'loans'
                        ? 'Loans'
                        : route === 'credit_cards'
                          ? 'Credit Cards'
                          : route === 'home_loan_emi_calc'
                            ? 'Home Loan'
                        : route === 'personal_loan_explorer'
                          ? 'Personal Loan'
                          : route === 'business_loan_explorer'
                            ? 'Business Loan'
                            : route === 'eligibility_form'
                              ? 'Eligibility'
                              : route === 'application_form'
                                ? 'Apply'
                                : route === 'blogs'
                                  ? 'Insight'
                                  : 'Insurance'}
                  </div>
                )}
              </div>
            ) : route === 'mutual_funds' ? (
              <button
                type="button"
                className="feHeader__iconBtn feHeader__iconBtn--back"
                aria-label="Back"
                onClick={goBack}
              >
                <NavIcon name="back" />
              </button>
            ) : (
              <></>
            )}
          </div>

          <div className="feHeader__right">
            <button
              type="button"
              className="feHeader__iconBtn feHeader__iconBtn--bell"
              aria-label="Notifications"
              onClick={() => navigate('notifications')}
            >
              <NavIcon name="bell" />
            </button>
            <button
              type="button"
              className="feHeader__avatar feHeader__avatar--glass"
              aria-label="Profile"
              onClick={() => navigate('profile')}
            >
              <svg
                className="feHeader__avatarIcon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </header>
      ) : null}

      <main ref={mainRef} className={`feMain${isAuthStaticRoute ? ' feMain--auth' : ''}`} aria-label="Main content" onScroll={onMainScroll}>
        <div
          key={transitionKey}
          className={`feRoute feRoute--${transitionDir}`}
          data-reduce-motion={reduceMotion ? 'true' : 'false'}
        >
          {route === 'login' ? (
            <LoginPage
              onGetStarted={(payload) => {
                setAuthFlowPhone(payload.mobile)
                navigate('otp_login')
              }}
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
              initialPhone={authFlowPhone}
              onSuccess={(payload) => {
                setAuthFlowPhone(payload.phone)
                navigate('verify_details')
              }}
            />
          ) : route === 'verify_details' ? (
            <VerifyDetailsPage
              phone={authFlowPhone}
              onBack={() => navigate('otp_login')}
              onSubmit={(payload) => {
                setProfileUser((prev) => ({
                  ...prev,
                  name: `${payload.firstName} ${payload.lastName}`.trim(),
                  email: payload.email,
                  phone: payload.phone,
                }))
                navigate('home', { replace: true })
              }}
            />
          ) : route === 'blogs' ? (
            <>
              <section className="feSection feNewsReplica" aria-label="News preview">
                <div className="feNewsTicker" aria-label="Live market updates">
                  <div ref={marketTickerRef} className="feNewsTicker__rail">
                    {marketTickers.map((t) => {
                      const up = t.change >= 0
                      return (
                        <div key={t.id} className="feNewsTicker__card">
                          <div className="feNewsTicker__row">
                            <div className="feNewsTicker__titleWrap">
                              <span className="feNewsTicker__name">{t.label}</span>
                              <span className="feNewsTicker__sub">{t.sub}</span>
                            </div>
                            <span className={`feNewsTicker__arrow${up ? ' is-up' : ' is-down'}`}>{up ? '↗' : '↘'}</span>
                          </div>
                          <div className="feNewsTicker__value">
                            {t.prefix ?? ''}
                            {Number(t.value).toLocaleString('en-IN', {
                              minimumFractionDigits: t.compact ? 0 : 2,
                              maximumFractionDigits: t.compact ? 0 : 2,
                            })}
                          </div>
                          <div className={`feNewsTicker__delta${up ? ' is-up' : ' is-down'}`}>
                            {up ? '+' : ''}
                            {t.change}%
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="feNewsReplica__tabs" role="tablist" aria-label="News tabs">
                  {['All News', 'Markets', 'Economy'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={homeNewsTab === tab}
                      className={`feNewsReplica__tab${homeNewsTab === tab ? ' is-active' : ''}`}
                      onClick={() => setHomeNewsTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <button type="button" className="feNewsReplica__lead" onClick={() => openBlog(asBlogPost(homeNewsLead))}>
                  <div className="feNewsReplica__leadMedia">
                    <div className="feNewsReplica__leadBadge">TOP STORY</div>
                    <img src={homeNewsLead.cover} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="feNewsReplica__leadBody">
                    <div className="feNewsReplica__meta">
                      <span className="feNewsReplica__tag">{homeNewsLead.tag}</span>
                      <span>{homeNewsLead.time}</span>
                    </div>
                    <div className="feNewsReplica__leadTitle">{homeNewsLead.title}</div>
                    <div className="feNewsReplica__leadSub">{homeNewsLead.source}</div>
                  </div>
                </button>

                <div className="feNewsReplica__list">
                  {homeNewsList.map((item) => (
                    <button key={item.id} type="button" className="feNewsReplica__item" onClick={() => openBlog(asBlogPost(item))}>
                      <div className="feNewsReplica__itemBody">
                        <div className="feNewsReplica__itemTag">{item.tag}</div>
                        <div className="feNewsReplica__itemTitle">{item.title}</div>
                        <div className="feNewsReplica__itemMeta">
                          {item.time} • {item.source}
                        </div>
                      </div>
                      <img className="feNewsReplica__itemThumb" src={item.cover} alt="" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>

                <div className="feNewsReplica__promo">
                  <div className="feNewsReplica__promoEyebrow">SILKLEND EXCLUSIVE</div>
                  <div className="feNewsReplica__promoTitle">Earn up to 7.5% p.a. with Silk Savings</div>
                  <div className="feNewsReplica__promoSub">
                    Open a premium savings account instantly with zero paperwork and premium concierge services.
                  </div>
                  <button type="button" className="feNewsReplica__promoBtn">
                    Join Now
                  </button>
                </div>

                <div className="feNewsReplica__insights">
                  <div className="feNewsReplica__insightsTitle">Market Insights</div>
                  <div className="feNewsReplica__insightsList">
                    {homeNewsInsights.map((ins) => (
                      <div key={ins.id} className="feNewsReplica__insight">
                        <span className="feNewsReplica__insightIcon" aria-hidden="true">
                          <NavIcon name={ins.icon} size={15} />
                        </span>
                        <div className="feNewsReplica__insightBody">
                          <div className="feNewsReplica__insightText">{ins.title}</div>
                          <div className="feNewsReplica__insightMeta">
                            {ins.date} <span>{ins.cat}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="feNewsReplica__cta">
                  <div>
                    <div className="feNewsReplica__ctaTitle">Build your wealth journey with Silk Invest</div>
                    <div className="feNewsReplica__ctaSub">
                      Open a FREE Demat account. Zero brokerage for the first 30 days.
                    </div>
                    <button type="button" className="feNewsReplica__ctaBtn">
                      Get Started
                    </button>
                  </div>
                  <div className="feNewsReplica__ctaIcon" aria-hidden="true">
                    <NavIcon name="trending" size={26} />
                  </div>
                </div>
              </section>
            </>
          ) : route === 'blog_detail' ? (
            <ScreenShell title="News" subtitle="Read insights" onBack={goBack}>
              <BlogDetailPage
                article={blogSelected}
                onShare={() => shareBlog(blogSelected)}
              />
            </ScreenShell>
          ) : route === 'calculator' ? (
            <CalculatorSection
              onNavigate={(to) => navigate(to)}
              onNotifications={() => navigate('notifications')}
            />
          ) : route === 'income_tax_calc' ? (
            <ScreenShell title="Income Tax" subtitle="Quick estimate (not tax advice)" onBack={goBack}>
              <IncomeTaxCalculatorPage />
            </ScreenShell>
          ) : route === 'gratuity_calc' ? (
            <ScreenShell title="Gratuity" subtitle="Retirement benefit estimate" onBack={goBack}>
              <GratuityCalculatorPage />
            </ScreenShell>
          ) : route === 'fixed_deposit_calc' ? (
            <ScreenShell title="Fixed Deposit" subtitle="Secure returns estimate" onBack={goBack}>
              <FixedDepositCalculatorPage />
            </ScreenShell>
          ) : route === 'fixed_deposit_soon' ? (
            <ScreenShell title="" subtitle="" onBack={goBack}>
              <div className="feCibilPage" aria-label="Fixed Deposit coming soon">
                <section className="feCibilSoon" aria-label="Fixed Deposit coming soon card">
                  <div className="feCibilSoon__badge" aria-hidden="true">
                    <span className="feCibilSoon__dot" />
                    FIXED DEPOSIT
                  </div>
                  <div className="feCibilSoon__icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="11" width="16" height="10" rx="2.5" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      <path d="M12 16v2" />
                    </svg>
                  </div>
                  <div className="feCibilSoon__title">
                    Coming <span className="feCibilSoon__titleAccent">Soon</span>
                  </div>
                  <div className="feCibilSoon__sub">
                    Fixed Deposit plans with secure returns, bank-wise rates, and maturity projections will be available shortly.
                  </div>
                  <div className="feCibilSoon__points" aria-label="Upcoming Fixed Deposit features">
                    <span className="feCibilSoon__point">Bank-wise latest FD rates</span>
                    <span className="feCibilSoon__point">Maturity and payout projections</span>
                    <span className="feCibilSoon__point">Tenure comparison insights</span>
                  </div>
                  <button type="button" className="feBtn feBtn--primary feBtn--full">
                    Notify Me
                  </button>
                </section>
              </div>
            </ScreenShell>
          ) : route === 'ppf_calc' ? (
            <ScreenShell title="PPF Calculator" subtitle="Plan your wealth with precision" onBack={goBack}>
              <PpfCalculatorPage />
            </ScreenShell>
          ) : route === 'rd_calc' ? (
            <ScreenShell title="RD" subtitle="Recurring deposit projection" onBack={goBack}>
              <RdCalculatorPage />
            </ScreenShell>
          ) : route === 'lumpsum_calc' ? (
            <ScreenShell title="Lumpsum" subtitle="One-time investment growth" onBack={goBack}>
              <LumpsumCalculatorPage />
            </ScreenShell>
          ) : route === 'goal_planner_calc' ? (
            <ScreenShell title="Goal Planner" subtitle="Monthly saving needed for goals" onBack={goBack}>
              <GoalPlannerPage />
            </ScreenShell>
          ) : route === 'home_loan_emi_calc' ? (
            <ScreenShell title="" subtitle="" onBack={goBack} showBand={false}>
              <HomeLoanPage />
            </ScreenShell>
          ) : route === 'car_loan_emi_calc' ? (
            <ScreenShell title="Car Loan EMI" subtitle="Monthly EMI & breakdown" onBack={goBack}>
              <EmiCalculatorPage reduceMotion={reduceMotion} />
            </ScreenShell>
          ) : route === 'emi_calculator' ? (
            <ScreenShell title="EMI Calculator" subtitle="Monthly EMI & breakdown" onBack={goBack}>
              <EmiCalculatorPage reduceMotion={reduceMotion} />
            </ScreenShell>
          ) : route === 'sip_investment' ? (
            <ScreenShell title="SIP Calculator" subtitle="Plan your wealth with precision" onBack={goBack}>
              <SipInvestmentPage onInvestNow={() => navigate('application_form')} />
            </ScreenShell>
          ) : route === 'cibil' ? (
            <ScreenShell
              title=""
              subtitle=""
              onBack={goBack}
              showBand={false}
            >
              <CibilPage
                reduceMotion={reduceMotion}
                hideTopHeader
                onViewFullReport={() => navigate('full_credit_report')}
              />
            </ScreenShell>
          ) : route === 'full_credit_report' ? (
            <ScreenShell title="Full Credit Report" subtitle="Detailed credit profile" onBack={goBack} showBand={false}>
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
            <ScreenShell title="Edit Profile" subtitle="Update your details" onBack={goBack} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
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
            <ScreenShell title="Linked Accounts" subtitle="Banks & cards you have connected" onBack={goBack} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <LinkedAccountsPage />
            </ScreenShell>
          ) : route === 'language' ? (
            <ScreenShell title="Language" subtitle="Choose app language" onBack={goBack} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
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
            <ScreenShell title="Help & Support" subtitle="FAQs and contact support" onBack={goBack} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <SupportPage />
            </ScreenShell>
          ) : route === 'mutual_funds' ? (
            <MutualFundsPage onNavigate={(to) => navigate(to)} />
          ) : route === 'mutual_funds_detail' ? (
            <ScreenShell title="Fund Details" subtitle="Returns, risk and highlights" onBack={goBack} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <MutualFundDetailPage fundId={mfSelectedId} />
            </ScreenShell>
          ) : route === 'insurance' ? (
            <ScreenShell title="" subtitle="" onBack={goBack} showBand={false} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
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
            <ScreenShell title="" subtitle="" onBack={goBack} showBand={false} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <InsuranceDetailPage
                typeId={insSelectedId}
                onExplorePlans={() => navigate('insurance_explorer')}
              />
            </ScreenShell>
          ) : route === 'insurance_explorer' ? (
            <ScreenShell title="" subtitle="" onBack={goBack} showBand={false} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <InsuranceExplorerPage typeId={insSelectedId} />
            </ScreenShell>
          ) : route === 'bonds' ? (
            <ScreenShell title="Bonds" subtitle="Safer fixed-income options" onBack={goBack} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <BondsPage />
            </ScreenShell>
          ) : route === 'savings' ? (
            <ScreenShell title="Savings" subtitle="Plans to grow steadily" onBack={goBack} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <SavingsPlansPage />
            </ScreenShell>
          ) : route === 'taxation' ? (
            <TaxationScreen onBack={goBack} />
          ) : route === 'loans' ? (
            <LoansPage />
          ) : route === 'personal_loan_explorer' || route === 'business_loan_explorer' ? (
            <ScreenShell
              title={route === 'business_loan_explorer' ? 'Business Loan' : 'Personal Loan'}
              subtitle={route === 'business_loan_explorer' ? 'Working capital & growth finance' : 'Instant fintech & verified bank partners'}
              onBack={goBack}
              showBand={false}
            >
              <PersonalLoanExplorerPage mode={route === 'business_loan_explorer' ? 'business' : 'personal'} />
            </ScreenShell>
          ) : route === 'credit_card_eligibility' ? (
            <ScreenShell title="Credit Cards" subtitle="Exclusive offers for you" onBack={goBack} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <CreditCardEligibilityPage />
            </ScreenShell>
          ) : route === 'eligibility_form' ? (
            <ScreenShell title="Eligibility" subtitle="Quick eligibility check" onBack={goBack} showBand={false} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <EligibilityFormPage />
            </ScreenShell>
          ) : route === 'application_form' ? (
            <ScreenShell title="Apply" subtitle="Application form" onBack={goBack} showBand={false} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <ApplicationFormPage />
            </ScreenShell>
          ) : route === 'notifications' ? (
            <ScreenShell title="Notifications" subtitle="Offers, alerts & updates" onBack={goBack} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <NotificationsPage />
            </ScreenShell>
          ) : route === 'account' ? (
            <ScreenShell title="Account" subtitle="Your profile & shortcuts" onBack={goBack} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <AccountPage
                onOpenProfile={() => navigate('profile')}
                onOpenCibil={() => navigate('cibil')}
                onOpenApplication={() => navigate('application_form')}
              />
            </ScreenShell>
          ) : route === 'credit_cards' ? (
            <CreditCardDetailPage cardId={ccSelectedId} />
          ) : route === 'credit_card_offers' ? (
            <ScreenShell title="Credit Card Offers" subtitle="Cashback, rewards & perks" onBack={goBack} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <CreditCardOffersPage
                onSelectCard={(id) => {
                  setCcSelectedId(id)
                  navigate('credit_cards')
                }}
              />
            </ScreenShell>
          ) : route !== 'home' ? (
            <ScreenShell title="FinExpert" subtitle="Screen coming soon" onBack={goBack} onNotifications={() => navigate('notifications')} onProfile={() => navigate('profile')}>
              <div className="fePlaceholderPage">
                <div className="fePlaceholderBlock" />
                <div className="fePlaceholderBlock" />
              </div>
            </ScreenShell>
          ) : (
            <>
              <section className="feSection feSection--premiumPromo" aria-label="Premium access">
                <button
                  type="button"
                  className="fePremiumPromo"
                  onClick={() => navigate('mutual_funds')}
                >
                  <span className="fePremiumPromo__badge">PREMIUM ACCESS</span>
                  <h2 className="fePremiumPromo__title">
                    FinExpert: Your and Your Family&apos;s All-in-One Financial App
                  </h2>
                  <span className="fePremiumPromo__cta">
                    Explore Private Wealth <span aria-hidden="true">›</span>
                  </span>
                  <span className="fePremiumPromo__deco" aria-hidden="true">
                    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M60 8L20 28v42c0 32 18 52 40 60 22-8 40-28 40-60V28L60 8z"
                        stroke="currentColor"
                        strokeWidth="3"
                        opacity="0.22"
                      />
                      <circle cx="60" cy="58" r="18" stroke="currentColor" strokeWidth="2.5" opacity="0.18" />
                    </svg>
                  </span>
                </button>
              </section>

              <section className="feSection" aria-label="Our Products">
                <div className="feSection__head feSection__head--split">
                  <div className="feSection__title">Our Products</div>
                </div>

                <div className="feQuickBento" role="list" aria-label="Wealth solutions">
                  <div className="feQuickBento__heroRow">
                    <button
                      type="button"
                      className="feQuickBento__mf"
                      aria-label="Mutual Funds — expert curated baskets"
                      onClick={() => navigate('mutual_funds')}
                    >
                      <span className="feQuickBento__mfIcon" aria-hidden="true">
                        <NavIcon name="mfChart" size={28} strokeWidth={2.25} />
                      </span>
                      <span className="feQuickBento__mfTitle">Mutual Funds</span>
                      <span className="feQuickBento__mfSub">Expert curated baskets</span>
                      <span className="feQuickBento__mfStat">
                        +14.2% p.a
                      </span>
                    </button>

                    <div className="feQuickBento__rail">
                      <button
                        type="button"
                        className="feQuickBento__ins"
                        aria-label="Insurance"
                        onClick={() => navigate('insurance')}
                      >
                        <span className="feQuickBento__insIcon" aria-hidden="true">
                          <NavIcon name="shield" size={28} strokeWidth={2.25} />
                        </span>
                        <span className="feQuickBento__insTitle">Insurance</span>
                      </button>
                      <button
                        type="button"
                        className="feQuickBento__duo feQuickBento__duo--tax"
                        style={{ flex: 1, minHeight: 0, borderRadius: '24px' }}
                        aria-label="Taxation — filing and compliance"
                        onClick={() => navigate('taxation')}
                      >
                        <span className="feQuickBento__duoIcon" aria-hidden="true">
                          <NavIcon name="tax" size={28} strokeWidth={2.25} />
                        </span>
                        <span className="feQuickBento__duoTitle">Taxation</span>
                      </button>
                    </div>
                  </div>

                  <div className="feQuickBento__duoRow">
                    <button
                      type="button"
                      className="feQuickBento__duo feQuickBento__duo--bonds"
                      aria-label="Bonds — corporate and government"
                      onClick={() => navigate('bonds')}
                    >
                      <span className="feQuickBento__duoIcon" aria-hidden="true">
                        <NavIcon name="doc" size={26} strokeWidth={2.2} />
                      </span>
                      <span className="feQuickBento__duoTitle">Bonds</span>
                      <span className="feQuickBento__duoSub">Corporate &amp; Govt</span>
                    </button>
                    <button
                      type="button"
                      className="feQuickBento__fd"
                      style={{ minHeight: '92px', borderRadius: '20px' }}
                      aria-label="Fixed Deposit"
                      onClick={() => navigate('fixed_deposit_soon')}
                    >
                      <span className="feQuickBento__fdIcon" aria-hidden="true">
                        <NavIcon name="lock" size={26} strokeWidth={2.2} />
                      </span>
                      <span className="feQuickBento__fdTitle">Fixed Deposit</span>
                    </button>
                    <button
                      type="button"
                      className="feQuickBento__duo feQuickBento__duo--cards"
                      aria-label="Credit Cards"
                      onClick={() => navigate('credit_cards')}
                    >
                      <span className="feQuickBento__duoIcon" aria-hidden="true">
                        <NavIcon name="card" size={26} strokeWidth={2.2} />
                      </span>
                      <span className="feQuickBento__duoTitle">Credit Cards</span>
                      <span className="feQuickBento__duoSub">&nbsp;</span>
                    </button>
                  </div>

                  <div className="feExploreSlider" aria-label="Explore Financial Products">
                    <div className="feExploreSlider__title">Explore Financial Products</div>

                    <div
                      ref={exploreRailRef}
                      className="feExploreSlider__rail"
                      aria-label="Product slider"
                      role="list"
                      data-swiping={exploreSwiping ? 'true' : 'false'}
                      onScroll={onExploreScroll}
                      onTouchStart={() => {
                        pauseExplore()
                      }}
                      onTouchEnd={() => {
                        scheduleExploreResume()
                      }}
                      onMouseEnter={() => {
                        pauseExplore()
                      }}
                    >
                      {exploreProducts.map((p, idx) => (
                        <button
                          key={p.id}
                          type="button"
                          className={`feExploreProductCard ${p.isPrimary ? 'feExploreProductCard--primary' : ''}`}
                          onClick={() => navigate(p.route)}
                          aria-label={`${p.title} — Explore`}
                        >
                          <span className="feExploreProductCard__icon" aria-hidden="true">
                            <NavIcon name={p.icon} size={22} strokeWidth={2.1} />
                          </span>
                          <span className="feExploreProductCard__title">{p.title}</span>
                          <span className="feExploreProductCard__benefit">{p.benefit}</span>
                          <span className="feExploreProductCard__cta" aria-hidden="true">
                            Explore
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="feExploreSlider__dots" role="tablist" aria-label="Explore slider pagination">
                      {exploreProducts.map((p, idx) => (
                        <button
                          key={`${p.id}-dot`}
                          type="button"
                          className={`feExploreSlider__dot ${idx === exploreIdx ? 'is-active' : ''}`}
                          onClick={() => {
                            pauseExplore()
                            scrollExploreToIndex(idx)
                            scheduleExploreResume()
                          }}
                          aria-label={`Go to slide ${idx + 1}`}
                          aria-selected={idx === exploreIdx}
                          role="tab"
                        />
                      ))}
                    </div>
                  </div>

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

                </div>
              </section>

              {/* CIBIL removed from home tab */}

              {/* CalculatorSection removed from home (product-focused home UI) */}

              <section className="feSection" aria-label="Credit card offers">
                <div className="feSection__head feSection__head--split">
                  <div>
                    <div className="feSection__title">Premium Cards</div>
                    <div className="feSection__sub">Exclusively curated for you</div>
                  </div>
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
                            navigate('credit_card_eligibility')
                          }}
                        >
                          Apply now
                        </button>
                      </div>
                    </div>
                    <div className="feCardOffer__copy">
                      <div className="feCardOffer__title">Compare and Apply</div>
                      <button
                        type="button"
                        className="feBtn feBtn--secondary"
                        onClick={() => navigate('credit_card_eligibility')}
                      >
                        Check Eligibility
                      </button>
                    </div>
                  </div>
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
                      v.play?.().catch(() => { })
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
                  className={`feStorySlide feStorySlide--${activeStory?.theme ?? 'navy'} ${activeStory?.videoUrl && !reduceMotion ? 'feStorySlide--hasVideo' : ''
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

      {!isAuthFlowRoute ? (
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
                  <NavIcon name={t.icon} size={18} strokeWidth={2.4} />
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

