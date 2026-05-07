import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

function formatINR(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

function sipFutureEnd(monthly, years, ratePct) {
  const n = Math.max(1, Math.round(years * 12))
  const i = ratePct / 100 / 12
  if (i === 0) return monthly * n
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
}

function lumpFuture(principal, years, ratePct) {
  return principal * Math.pow(1 + ratePct / 100, years)
}

function GoalPlanIcon({ id }) {
  const svgProps = {
    className: 'feMfHub__goalSvg',
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (id) {
    case 'retirement':
      return (
        <svg {...svgProps}>
          <rect x="4" y="8" width="16" height="12" rx="2" />
          <path d="M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2" />
        </svg>
      )
    case 'home_loan':
    case 'new_home':
      return (
        <svg {...svgProps}>
          <path d="M3 12l9-8 9 8" />
          <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
        </svg>
      )
    case 'emergency':
      return (
        <svg {...svgProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'trip':
      return (
        <svg {...svgProps}>
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      )
    case 'new_car':
      return (
        <svg {...svgProps}>
          <path d="M5 17h14v-5H5v5z" />
          <path d="M5 12l1.5-3.5h11L19 12" />
          <circle cx="7.5" cy="17" r="1.5" />
          <circle cx="16.5" cy="17" r="1.5" />
        </svg>
      )
    case 'education':
      return (
        <svg {...svgProps}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 3 4 6 4s6-2 6-4v-5" />
        </svg>
      )
    case 'marriage':
      return (
        <svg {...svgProps}>
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      )
    case 'debt':
      return (
        <svg {...svgProps}>
          <path d="M12 3v18" />
          <path d="M5 21h14" />
          <path d="M5 8h2l3 6M19 8h-2l-3 6" />
          <path d="M8 14h8" />
          <path d="M7 5L6 3M17 5l1-2" />
        </svg>
      )
    default:
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
  }
}

const DIGITAL_BENEFITS = [
  'Zero joining fee',
  'Zero AMC',
  'Instant KYC & execution',
  'Free quarterly portfolio analysis',
  'Free mutual funds basket',
  "Compare all funds' returns and details",
  'Expert guidance to choose the best mutual funds',
  'Paperless onboarding via our partner Wealthy',
]

const OFFLINE_BENEFITS = [
  'Dedicated relationship manager',
  'Branch-assisted documentation',
  'Physical statements on request',
  'Assisted fund selection',
  'Quarterly portfolio review calls',
]

const GOALS = [
  { id: 'retirement', label: 'Retirement', ring: 'orange' },
  { id: 'home_loan', label: 'Early home loan repayment', ring: 'blue' },
  { id: 'emergency', label: 'Emergency funds', ring: 'red' },
  { id: 'trip', label: 'World trip', ring: 'cyan' },
  { id: 'new_home', label: 'Buy new home', ring: 'purple' },
  { id: 'new_car', label: 'Buy new car', ring: 'slate' },
  { id: 'education', label: 'Child education', ring: 'green' },
  { id: 'marriage', label: 'Child marriage', ring: 'pink' },
  { id: 'debt', label: 'Debt free', ring: 'amber' },
]

export default function MutualFundsPage({ onNavigate }) {
  const go = (route) => {
    if (onNavigate) onNavigate(route)
    else if (typeof window !== 'undefined') window.location.hash = `#/${route}`
  }

  const [journeyMode, setJourneyMode] = useState('digital')
  const [basketLockedOpen, setBasketLockedOpen] = useState(false)
  const [retirementOpen, setRetirementOpen] = useState(false)
  const [homeLoanOpen, setHomeLoanOpen] = useState(false)
  const [emergencyOpen, setEmergencyOpen] = useState(false)
  const [tripOpen, setTripOpen] = useState(false)
  const [newHomeOpen, setNewHomeOpen] = useState(false)
  const [carOpen, setCarOpen] = useState(false)
  const [educationOpen, setEducationOpen] = useState(false)
  const [marriageOpen, setMarriageOpen] = useState(false)
  const [debtFreeOpen, setDebtFreeOpen] = useState(false)
  const [sipCalcOpen, setSipCalcOpen] = useState(false)
  const [lumpsumCalcOpen, setLumpsumCalcOpen] = useState(false)
  const [swpCalcOpen, setSwpCalcOpen] = useState(false)
  const [genericGoalOpen, setGenericGoalOpen] = useState(false)
  const [activeGenericGoal, setActiveGenericGoal] = useState(null)
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [monthlyExpense, setMonthlyExpense] = useState(50000)
  const [loanOutstanding, setLoanOutstanding] = useState(5000000)
  const [currentEmi, setCurrentEmi] = useState(45000)
  const [pendingYears, setPendingYears] = useState(20)
  const [extraSavingsPct, setExtraSavingsPct] = useState(10)
  const [tripCost, setTripCost] = useState(500000)
  const [tripYears, setTripYears] = useState(3)
  const [newHomePrice, setNewHomePrice] = useState(8000000)
  const [newHomeYears, setNewHomeYears] = useState(5)
  const [newHomeMode, setNewHomeMode] = useState('down')
  const [carMonthlySip, setCarMonthlySip] = useState(5000)
  const [carYears, setCarYears] = useState(10)
  const [carReturn, setCarReturn] = useState(12)
  const [educationCost, setEducationCost] = useState(1500000)
  const [childCurrentAge, setChildCurrentAge] = useState(5)
  const [educationTargetAge, setEducationTargetAge] = useState(18)
  const [marriageCost, setMarriageCost] = useState(2000000)
  const [marriageChildAge, setMarriageChildAge] = useState(5)
  const [marriageTargetAge, setMarriageTargetAge] = useState(25)
  const [debtAmount, setDebtAmount] = useState(500000)
  const [debtMonthlyInvestment, setDebtMonthlyInvestment] = useState(20000)
  const [sipMonthly, setSipMonthly] = useState(5000)
  const [sipYears, setSipYears] = useState(10)
  const [sipRate, setSipRate] = useState(12)
  const [lumpAmount, setLumpAmount] = useState(50000)
  const [lumpYears, setLumpYears] = useState(5)
  const [lumpRate, setLumpRate] = useState(12)
  const [swpCorpus, setSwpCorpus] = useState(1000000)
  const [swpMonthlyWithdrawal, setSwpMonthlyWithdrawal] = useState(10000)
  const [swpYears, setSwpYears] = useState(10)
  const [swpRate, setSwpRate] = useState(8)

  const closeAllPlanners = () => {
    setRetirementOpen(false)
    setHomeLoanOpen(false)
    setEmergencyOpen(false)
    setTripOpen(false)
    setNewHomeOpen(false)
    setCarOpen(false)
    setEducationOpen(false)
    setMarriageOpen(false)
    setDebtFreeOpen(false)
    setSipCalcOpen(false)
    setLumpsumCalcOpen(false)
    setSwpCalcOpen(false)
    setGenericGoalOpen(false)
    setActiveGenericGoal(null)
  }

  const openPlanner = (id) => {
    closeAllPlanners()
    if (id === 'retirement') setRetirementOpen(true)
    else if (id === 'home_loan') setHomeLoanOpen(true)
    else if (id === 'emergency') setEmergencyOpen(true)
    else if (id === 'trip') setTripOpen(true)
    else if (id === 'new_home') setNewHomeOpen(true)
    else if (id === 'new_car') setCarOpen(true)
    else if (id === 'education') setEducationOpen(true)
    else if (id === 'marriage') setMarriageOpen(true)
    else if (id === 'debt') setDebtFreeOpen(true)
  }

  const openCalculator = (type) => {
    closeAllPlanners()
    if (type === 'sip') setSipCalcOpen(true)
    else if (type === 'lumpsum') setLumpsumCalcOpen(true)
    else if (type === 'swp') setSwpCalcOpen(true)
  }

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (
      !basketLockedOpen &&
      !retirementOpen &&
      !homeLoanOpen &&
      !emergencyOpen &&
      !tripOpen &&
      !newHomeOpen &&
      !carOpen &&
      !educationOpen &&
      !marriageOpen &&
      !debtFreeOpen &&
      !sipCalcOpen &&
      !lumpsumCalcOpen &&
      !swpCalcOpen &&
      !genericGoalOpen
    )
      return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [
    basketLockedOpen,
    retirementOpen,
    homeLoanOpen,
    emergencyOpen,
    tripOpen,
    newHomeOpen,
    carOpen,
    educationOpen,
    marriageOpen,
    debtFreeOpen,
    sipCalcOpen,
    lumpsumCalcOpen,
    swpCalcOpen,
    genericGoalOpen,
  ])

  const sipDemo = useMemo(() => {
    const monthly = 3000
    const years = 40
    const rate = 12
    const fv = sipFutureEnd(monthly, years, rate)
    const invested = monthly * years * 12
    const gain = Math.max(0, fv - invested)
    const growthPct = invested > 0 ? ((fv - invested) / invested) * 100 : 0
    return { fv, invested, gain, growthPct, monthly, years, rate }
  }, [])

  const lumpDemo = useMemo(() => {
    const p = 100000
    const years = 40
    const rate = 12
    const fv = lumpFuture(p, years, rate)
    const mult = p > 0 ? fv / p : 0
    const gain = fv - p
    return { fv, p, gain, mult, years, rate }
  }, [])

  const journeyList = journeyMode === 'digital' ? DIGITAL_BENEFITS : OFFLINE_BENEFITS

  const fvCr = sipDemo.fv / 1e7
  const fvLabel = fvCr >= 1 ? `₹${fvCr.toFixed(2)} Cr` : `₹${(sipDemo.fv / 1e5).toFixed(2)} Lakhs`
  const invL = sipDemo.invested / 1e5
  const invLabel = invL >= 1 ? `₹${invL.toFixed(1)} Lakhs` : formatINR(sipDemo.invested)
  const gainCr = sipDemo.gain / 1e7
  const gainLabel = gainCr >= 1 ? `₹${gainCr.toFixed(2)} Cr` : `₹${(sipDemo.gain / 1e5).toFixed(2)} Lakhs`

  const lumpFvL = lumpDemo.fv / 1e5
  const lumpFvLabel = `₹${lumpFvL.toFixed(2)} Lakhs`
  const lumpGainL = lumpDemo.gain / 1e5
  const lumpGainLabel = `₹${lumpGainL.toFixed(2)} Lakhs`
  const yearsToRetirement = Math.max(1, retirementAge - currentAge)
  const futureMonthlyExpense = monthlyExpense * Math.pow(1.06, yearsToRetirement)
  const requiredCorpus = (futureMonthlyExpense * 12) / 0.06
  const nMonths = Math.max(1, yearsToRetirement * 12)
  const monthlyReturn = 0.12 / 12
  const sipFactor = ((Math.pow(1 + monthlyReturn, nMonths) - 1) / monthlyReturn) * (1 + monthlyReturn)
  const requiredSip = requiredCorpus / sipFactor
  const corpusCr = requiredCorpus / 1e7
  const extraMonthly = (currentEmi * extraSavingsPct) / 100
  const investedExtraTotal = extraMonthly * pendingYears * 12
  const debtFreeYears = pendingYears - (pendingYears * extraSavingsPct) / (extraSavingsPct + 35)
  const yearsSaved = Math.max(0, pendingYears - debtFreeYears)
  const emergencyCorpus = monthlyExpense * 6
  const tripFutureCost = tripCost * Math.pow(1.07, tripYears)
  const tripSipMonths = Math.max(1, tripYears * 12)
  const tripSip =
    tripFutureCost / ((((Math.pow(1 + monthlyReturn, tripSipMonths) - 1) / monthlyReturn) * (1 + monthlyReturn)))
  const newHomeTarget = newHomeMode === 'full' ? newHomePrice : newHomePrice * 0.304
  const newHomeMonths = Math.max(1, newHomeYears * 12)
  const newHomeSip =
    newHomeTarget / ((((Math.pow(1 + monthlyReturn, newHomeMonths) - 1) / monthlyReturn) * (1 + monthlyReturn)))
  const carEstimatedWealth = sipFutureEnd(carMonthlySip, carYears, carReturn)
  const carInvested = carMonthlySip * Math.max(1, carYears) * 12
  const carGain = Math.max(0, carEstimatedWealth - carInvested)
  const educationYears = Math.max(1, educationTargetAge - childCurrentAge)
  const educationFutureCost = educationCost * Math.pow(1.08, educationYears)
  const educationMonths = Math.max(1, educationYears * 12)
  const educationSip = educationFutureCost / ((((Math.pow(1 + monthlyReturn, educationMonths) - 1) / monthlyReturn) * (1 + monthlyReturn)))
  const marriageYears = Math.max(1, marriageTargetAge - marriageChildAge)
  const marriageFutureCost = marriageCost * Math.pow(1.08, marriageYears)
  const marriageMonths = Math.max(1, marriageYears * 12)
  const marriageSip = marriageFutureCost / ((((Math.pow(1 + monthlyReturn, marriageMonths) - 1) / monthlyReturn) * (1 + monthlyReturn)))
  const debtMonthlyRate = 0.12 / 12
  const debtReachMonthsRaw = Math.log((debtAmount * debtMonthlyRate) / (Math.max(1, debtMonthlyInvestment) * (1 + debtMonthlyRate)) + 1) / Math.log(1 + debtMonthlyRate)
  const debtReachMonths = Math.max(1, Math.ceil(Number.isFinite(debtReachMonthsRaw) ? debtReachMonthsRaw : debtAmount / Math.max(1, debtMonthlyInvestment)))
  const sipEstimatedWealth = sipFutureEnd(sipMonthly, sipYears, sipRate)
  const sipInvested = sipMonthly * Math.max(1, sipYears) * 12
  const sipGain = Math.max(0, sipEstimatedWealth - sipInvested)
  const lumpEstimatedWealth = lumpFuture(lumpAmount, lumpYears, lumpRate)
  const swpMonths = Math.max(1, swpYears * 12)
  const swpMonthlyRate = swpRate / 100 / 12
  const swpFinalBalance =
    swpMonthlyRate === 0
      ? Math.max(0, swpCorpus - swpMonthlyWithdrawal * swpMonths)
      : Math.max(
          0,
          swpCorpus * Math.pow(1 + swpMonthlyRate, swpMonths) -
            swpMonthlyWithdrawal * ((Math.pow(1 + swpMonthlyRate, swpMonths) - 1) / swpMonthlyRate)
        )
  const swpTotalWithdrawn = swpMonthlyWithdrawal * swpMonths

  return (
    <>
      <div className="feMfHub" lang="en">
      {/* 1 — Show Mutual Funds */}
      <section className="feMfHub__block feMfHub__block--flush" aria-label="Show mutual funds">
        <div className="feMfHub__pad">
          <div className="feMfHub__pairRow">
            <div className="feMfHub__promoCard">
              <span className="feMfHub__promoIcon feMfHub__promoIcon--blue" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
                </svg>
              </span>
              <span className="feMfHub__promoTitle">Get a ready to invest MF basket</span>
              <button
                type="button"
                className="feMfHub__promoCta feMfHub__promoCta--blue"
                onClick={() => setBasketLockedOpen(true)}
              >
                Unlock now <span aria-hidden="true">→</span>
              </button>
            </div>
            <button type="button" className="feMfHub__promoCard" onClick={() => go('profile')}>
              <span className="feMfHub__promoIcon feMfHub__promoIcon--green" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12h4l2 5 4-10 2 5h4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="feMfHub__promoTitle">Check health of your MF portfolio</span>
              <span className="feMfHub__promoCta feMfHub__promoCta--green">
                Check now <span aria-hidden="true">→</span>
              </span>
            </button>
          </div>

          <button type="button" className="feMfHub__scoreCard" onClick={() => go('cibil')}>
            <span className="feMfHub__scoreIcon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17.8 5.7 21l2.3-7-6-4.6h7.6L12 2z" />
              </svg>
            </span>
            <span className="feMfHub__scoreBody">
              <span className="feMfHub__scoreTitle">Unlock your financial score</span>
              <span className="feMfHub__scoreSub">Get instant analysis</span>
            </span>
            <span className="feMfHub__scoreChev" aria-hidden="true">
              ›
            </span>
          </button>
        </div>
      </section>

      {/* 2 — Financial calculator */}
      <section className="feMfHub__block" aria-label="Financial calculator">
        <div className="feMfHub__pad feMfHub__pad--tightTop">
          <h2 className="feMfHub__sectionTitle">Financial calculator</h2>
          <div className="feMfHub__calcRow">
            <button type="button" className="feMfHub__calcCard" onClick={() => openCalculator('sip')}>
              <span className="feMfHub__calcTile feMfHub__calcTile--blue" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="6" y="3" width="12" height="18" rx="2" />
                  <path d="M9 7h6M9 11h.01M12 11h.01M15 11h.01" />
                </svg>
              </span>
              <span className="feMfHub__calcLabel">SIP</span>
            </button>
            <button type="button" className="feMfHub__calcCard" onClick={() => openCalculator('lumpsum')}>
              <span className="feMfHub__calcTile feMfHub__calcTile--mint" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="12" r="5" />
                  <circle cx="15" cy="12" r="5" />
                </svg>
              </span>
              <span className="feMfHub__calcLabel">Lumpsum</span>
            </button>
            <button type="button" className="feMfHub__calcCard" onClick={() => openCalculator('swp')}>
              <span className="feMfHub__calcTile feMfHub__calcTile--lav" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h4l2 8 2-12 2 10h6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="feMfHub__calcLabel">SWP</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 — Mutual funds journey */}
      <section className="feMfHub__block" aria-label="Mutual funds journey">
        <div className="feMfHub__pad">
          <div className="feMfHub__journeyCard">
            <h2 className="feMfHub__journeyTitle">Start your mutual funds journey</h2>
            <p className="feMfHub__journeySub">Choose the path that suits you best</p>

            <div className="feMfHub__toggle" role="tablist" aria-label="Onboarding type">
              <button
                type="button"
                role="tab"
                className={`feMfHub__toggleBtn${journeyMode === 'digital' ? ' is-on' : ''}`}
                aria-selected={journeyMode === 'digital'}
                onClick={() => setJourneyMode('digital')}
              >
                Digital process
              </button>
              <button
                type="button"
                role="tab"
                className={`feMfHub__toggleBtn${journeyMode === 'offline' ? ' is-on' : ''}`}
                aria-selected={journeyMode === 'offline'}
                onClick={() => setJourneyMode('offline')}
              >
                Offline process
              </button>
            </div>

            <ul className="feMfHub__checkList">
              {journeyList.map((line) => (
                <li key={line} className="feMfHub__checkItem">
                  <span className="feMfHub__checkIcon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <button type="button" className="feMfHub__openAcct" onClick={() => go('application_form')}>
              Open account
              <span className="feMfHub__openAcctIcon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 — Goal plan */}
      <section className="feMfHub__block" aria-label="Goal plan">
        <div className="feMfHub__pad">
          <div className="feMfHub__goalHead">
            <h2 className="feMfHub__sectionTitle feMfHub__sectionTitle--inline">Goal plan section</h2>
          </div>
          <div className="feMfHub__goalGrid">
            {GOALS.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`feMfHub__goalCard feMfHub__goalCard--${g.ring}`}
                onClick={() => {
                  if (['retirement', 'home_loan', 'emergency', 'trip', 'new_home', 'new_car', 'education', 'marriage', 'debt'].includes(g.id)) {
                    openPlanner(g.id)
                    return
                  }
                  closeAllPlanners()
                  setActiveGenericGoal(g)
                  setGenericGoalOpen(true)
                }}
              >
                <span className={`feMfHub__goalRing feMfHub__goalRing--${g.ring}`} aria-hidden="true">
                  <GoalPlanIcon id={g.id} />
                </span>
                <span className="feMfHub__goalLabel">{g.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Power of compounding / SIP */}
      <section className="feMfHub__block" aria-label="Power of compounding">
        <div className="feMfHub__pad">
          <div className="feMfHub__powHead">
            <h2 className="feMfHub__powTitle">
              Power of
              <br />
              compounding
            </h2>
            <span className="feMfHub__powBadge">Magic of time</span>
          </div>
          <button type="button" className="feMfHub__sipCard" onClick={() => go('sip_investment')}>
            <div className="feMfHub__sipTop">
              <span className="feMfHub__sipBolt" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.2">
                  <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <div className="feMfHub__sipKicker">SIP power</div>
                <div className="feMfHub__sipMeta">
                  ₹{sipDemo.monthly.toLocaleString('en-IN')} / month · {sipDemo.years} years · {sipDemo.rate}% returns
                </div>
              </div>
            </div>
            <div className="feMfHub__sipMid">
              <div>
                <div className="feMfHub__sipLab">Future value</div>
                <div className="feMfHub__sipFv">{fvLabel}</div>
              </div>
              <div className="feMfHub__sipGrowth">+{sipDemo.growthPct.toFixed(0)}% growth</div>
            </div>
            <div className="feMfHub__sipRule" />
            <div className="feMfHub__sipFoot">
              <div>
                <div className="feMfHub__sipLab">Total invested</div>
                <div className="feMfHub__sipNum">{invLabel}</div>
              </div>
              <div className="feMfHub__sipFootR">
                <div className="feMfHub__sipLab">Wealth gained</div>
                <div className="feMfHub__sipGain">{gainLabel}</div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* 6 — Lumpsum + thought */}
      <section className="feMfHub__block" aria-label="Lumpsum highlight">
        <div className="feMfHub__pad">
          <button type="button" className="feMfHub__lumpCard" onClick={() => go('lumpsum_calc')}>
            <div className="feMfHub__lumpTop">
              <span className="feMfHub__lumpCoins" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                  <circle cx="9" cy="12" r="6" />
                  <circle cx="15" cy="12" r="6" />
                </svg>
              </span>
              <div>
                <div className="feMfHub__lumpKicker">Lumpsum power</div>
                <div className="feMfHub__lumpMeta">
                  ₹1 Lakh once · {lumpDemo.years} years · {lumpDemo.rate}% returns
                </div>
              </div>
            </div>
            <div className="feMfHub__lumpMid">
              <div className="feMfHub__sipLab">Future value</div>
              <div className="feMfHub__lumpFvRow">
                <span className="feMfHub__lumpFv">{lumpFvLabel}</span>
                <span className="feMfHub__lumpMult">{Math.round(lumpDemo.mult)}x wealth</span>
              </div>
            </div>
            <div className="feMfHub__sipRule feMfHub__sipRule--dim" />
            <div className="feMfHub__sipFoot">
              <div>
                <div className="feMfHub__sipLab">Total invested</div>
                <div className="feMfHub__sipNum">₹1 Lakh</div>
              </div>
              <div className="feMfHub__sipFootR">
                <div className="feMfHub__sipLab">Wealth gained</div>
                <div className="feMfHub__sipGain">{lumpGainLabel}</div>
              </div>
            </div>
          </button>

          <div className="feMfHub__thoughtCard">
            <span className="feMfHub__thoughtBulb" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M9 18h6M10 22h4M12 3a5 5 0 015 5c0 2-1.5 3-2 4H9c-.5-1-2-2-2-4a5 5 0 015-5z" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <div className="feMfHub__thoughtTitle">The thought</div>
              <p className="feMfHub__thoughtBody">
                Compounding is the 8th wonder of the world. A small monthly SIP of ₹3,000 can grow to over ₹3.5 Crore in
                40 years. The secret isn&apos;t the amount, it&apos;s the <strong>time</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <>
            {basketLockedOpen ? (
        <div className="feMfHub__lockOverlay" role="dialog" aria-modal="true" aria-label="Basket locked">
          <button
            type="button"
            className="feMfHub__lockBackdrop"
            aria-label="Close popup"
            onClick={() => setBasketLockedOpen(false)}
          />
          <div className="feMfHub__lockSheet">
            <div className="feMfHub__lockHead">
              <div className="feMfHub__lockTitle">Basket Locked</div>
              <button type="button" className="feMfHub__lockClose" onClick={() => setBasketLockedOpen(false)}>
                ×
              </button>
            </div>
            <div className="feMfHub__lockBody">
              <span className="feMfHub__lockIcon" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V8a4 4 0 118 0v3" />
                </svg>
              </span>
              <div className="feMfHub__lockBodyTitle">Onboarding Required</div>
              <p className="feMfHub__lockBodySub">
                Please complete your onboarding to unlock expert-curated goal baskets.
              </p>
              <button
                type="button"
                className="feMfHub__lockCta"
                onClick={() => {
                  setBasketLockedOpen(false)
                  go('application_form')
                }}
              >
                Onboard Now
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {retirementOpen ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label="Retirement planner">
          <button
            type="button"
            className="feMfHub__retBackdrop"
            aria-label="Close planner"
            onClick={closeAllPlanners}
          />
          <div className="feMfHub__retSheet">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">Retirement Planner</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>
                ×
              </button>
            </div>

            <div className="feMfHub__retBody">
              <div className="feMfHub__retGrid2">
                <label className="feMfHub__retField">
                  <span>Current Age</span>
                  <input
                    type="number"
                    min="18"
                    max="90"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value || 18))}
                  />
                </label>
                <label className="feMfHub__retField">
                  <span>Retirement Age</span>
                  <input
                    type="number"
                    min="30"
                    max="95"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value || 30))}
                  />
                </label>
              </div>

              <label className="feMfHub__retField feMfHub__retField--full">
                <span>Current Monthly Expenses</span>
                <div className="feMfHub__retInputWrap">
                  <span>₹</span>
                  <input
                    type="number"
                    min="0"
                    value={monthlyExpense}
                    onChange={(e) => setMonthlyExpense(Number(e.target.value || 0))}
                  />
                </div>
              </label>

              <div className="feMfHub__retResultCard">
                <div className="feMfHub__retResultKicker">Required Corpus</div>
                <div className="feMfHub__retResultValue">₹{corpusCr.toFixed(2)} Cr</div>
                <div className="feMfHub__retResultRow">
                  <div>
                    <div className="feMfHub__retLab">Monthly SIP</div>
                    <div className="feMfHub__retSip">₹{Math.round(requiredSip).toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="feMfHub__retLab">Future Expense</div>
                    <div className="feMfHub__retExp">₹{Math.round(futureMonthlyExpense).toLocaleString('en-IN')}/mo</div>
                  </div>
                </div>
              </div>

              <div className="feMfHub__retLogic">
                <div className="feMfHub__retLogicTitle">Calculation Logic</div>
                <ul>
                  <li>Inflation considered at 6% per annum</li>
                  <li>Pre-retirement returns estimated at 12%</li>
                  <li>Post-retirement corpus yield considered at 6%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {homeLoanOpen ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label="Early home loan repayment">
          <button type="button" className="feMfHub__retBackdrop" onClick={closeAllPlanners} />
          <div className="feMfHub__retSheet">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">Early Home Loan Repayment</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>
                ×
              </button>
            </div>
            <div className="feMfHub__retBody">
              <label className="feMfHub__retField feMfHub__retField--full">
                <span>Loan Outstanding</span>
                <input type="number" value={loanOutstanding} onChange={(e) => setLoanOutstanding(Number(e.target.value || 0))} />
              </label>
              <div className="feMfHub__retGrid2">
                <label className="feMfHub__retField">
                  <span>Current EMI</span>
                  <input type="number" value={currentEmi} onChange={(e) => setCurrentEmi(Number(e.target.value || 0))} />
                </label>
                <label className="feMfHub__retField">
                  <span>Pending Tenure (Y)</span>
                  <input type="number" value={pendingYears} onChange={(e) => setPendingYears(Number(e.target.value || 1))} />
                </label>
              </div>
              <div className="feMfHub__retField feMfHub__retField--full">
                <span>Extra Savings (Monthly)</span>
                <div className="feMfHub__optRow">
                  {[10, 20, 30].map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`feMfHub__optBtn${extraSavingsPct === v ? ' is-on' : ''}`}
                      onClick={() => setExtraSavingsPct(v)}
                    >
                      {v}%
                    </button>
                  ))}
                </div>
              </div>
              <div className="feMfHub__retResultCard feMfHub__retResultCard--loan">
                <div className="feMfHub__retResultRow">
                  <div>
                    <div className="feMfHub__retLab">Debt Free In</div>
                    <div className="feMfHub__retResultValue feMfHub__retResultValue--sm">{debtFreeYears.toFixed(1)} Years</div>
                  </div>
                  <div>
                    <div className="feMfHub__retLab">Years Saved</div>
                    <div className="feMfHub__retResultValue feMfHub__retResultValue--sm">{yearsSaved.toFixed(1)} Years</div>
                  </div>
                </div>
                <div className="feMfHub__retNote">
                  By investing ₹{Math.round(extraMonthly).toLocaleString('en-IN')}/mo @ 12% returns
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {emergencyOpen ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label="Emergency fund">
          <button type="button" className="feMfHub__retBackdrop" onClick={closeAllPlanners} />
          <div className="feMfHub__retSheet feMfHub__retSheet--centerCard feMfHub__retSheet--emg">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">Emergency Fund</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>
                ×
              </button>
            </div>
            <div className="feMfHub__retBody feMfHub__retBody--emg">
              <label className="feMfHub__retField feMfHub__retField--full">
                <span>Monthly Expenses</span>
                <div className="feMfHub__retInputWrap">
                  <span>₹</span>
                  <input type="number" value={monthlyExpense} onChange={(e) => setMonthlyExpense(Number(e.target.value || 0))} />
                </div>
              </label>
              <div className="feMfHub__retResultCard feMfHub__retResultCard--emg">
                <div className="feMfHub__retResultKicker">Recommended Fund (6 Months)</div>
                <div className="feMfHub__retResultValue">₹{Math.round(emergencyCorpus).toLocaleString('en-IN')}</div>
              </div>
              <button type="button" className="feMfHub__lockCta feMfHub__lockCta--emg" onClick={() => go('application_form')}>
                Invest Now
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {tripOpen ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label="World trip planner">
          <button type="button" className="feMfHub__retBackdrop" onClick={closeAllPlanners} />
          <div className="feMfHub__retSheet feMfHub__retSheet--trip">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">World Trip Planner</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>
                ×
              </button>
            </div>
            <div className="feMfHub__retBody">
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop">
                  <span>Current Trip Cost</span>
                  <div className="feMfHub__sliderInputWrap">
                    <span>₹</span>
                    <input type="number" value={tripCost} onChange={(e) => setTripCost(Number(e.target.value || 0))} />
                  </div>
                </div>
                <input type="range" min="100000" max="2000000" value={tripCost} onChange={(e) => setTripCost(Number(e.target.value))} />
              </div>
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop">
                  <span>Years to Plan</span>
                  <input type="number" min="1" max="20" value={tripYears} onChange={(e) => setTripYears(Number(e.target.value || 1))} />
                </div>
                <input type="range" min="1" max="20" value={tripYears} onChange={(e) => setTripYears(Number(e.target.value))} />
              </div>
              <div className="feMfHub__retResultCard feMfHub__retResultCard--trip">
                <div className="feMfHub__retResultKicker">Future Cost (7% Infl.)</div>
                <div className="feMfHub__retResultValue">₹{Math.round(tripFutureCost).toLocaleString('en-IN')}</div>
                <div className="feMfHub__retResultRow">
                  <div>
                    <div className="feMfHub__retLab">Monthly SIP</div>
                    <div className="feMfHub__retSip">₹{Math.round(tripSip).toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="feMfHub__retLab">Total Invested</div>
                    <div className="feMfHub__retExp">₹{Math.round(tripSip * tripSipMonths).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
              <div className="feMfHub__retLogic">
                <div className="feMfHub__retLogicTitle">Planning Assumptions</div>
                <ul>
                  <li>Travel inflation estimated at 7% per year</li>
                  <li>Expected investment returns at 12% per year</li>
                  <li>SIP payments assumed at the start of each month</li>
                </ul>
              </div>
              <button type="button" className="feMfHub__lockCta feMfHub__lockCta--trip" onClick={() => go('application_form')}>
                Invest Now
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {newHomeOpen ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label="New home planner">
          <button type="button" className="feMfHub__retBackdrop" onClick={closeAllPlanners} />
          <div className="feMfHub__retSheet feMfHub__retSheet--home">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">New Home Planner</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>
                ×
              </button>
            </div>
            <div className="feMfHub__retBody">
              <label className="feMfHub__retField feMfHub__retField--full">
                <span>Current Property Price</span>
                <input type="number" value={newHomePrice} onChange={(e) => setNewHomePrice(Number(e.target.value || 0))} />
              </label>
              <label className="feMfHub__retField feMfHub__retField--full">
                <span>Years to Buy</span>
                <input type="number" min="1" max="25" value={newHomeYears} onChange={(e) => setNewHomeYears(Number(e.target.value || 1))} />
              </label>
              <div className="feMfHub__optRow feMfHub__optRow--two">
                <button
                  type="button"
                  className={`feMfHub__optBtn${newHomeMode === 'full' ? ' is-on' : ''}`}
                  onClick={() => setNewHomeMode('full')}
                >
                  Full Payment
                </button>
                <button
                  type="button"
                  className={`feMfHub__optBtn${newHomeMode === 'down' ? ' is-on' : ''}`}
                  onClick={() => setNewHomeMode('down')}
                >
                  Down Payment (25%)
                </button>
              </div>
              <div className="feMfHub__retResultCard feMfHub__retResultCard--home">
                <div className="feMfHub__retResultKicker">Target Amount</div>
                <div className="feMfHub__retResultValue">₹{Math.round(newHomeTarget).toLocaleString('en-IN')}</div>
                <div className="feMfHub__retResultKicker feMfHub__retResultKicker--mt">Required Monthly SIP</div>
                <div className="feMfHub__retSip">₹{Math.round(newHomeSip).toLocaleString('en-IN')}</div>
              </div>
              <button type="button" className="feMfHub__lockCta feMfHub__lockCta--home" onClick={() => go('application_form')}>
                Invest Now
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {carOpen ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label="Buy new car planner">
          <button type="button" className="feMfHub__retBackdrop" onClick={closeAllPlanners} />
          <div className="feMfHub__retSheet">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">SIP Calculator</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>
                ×
              </button>
            </div>
            <div className="feMfHub__retBody">
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop">
                  <span>Monthly SIP</span>
                  <div className="feMfHub__sliderInputWrap">
                    <span>₹</span>
                    <input type="number" min="500" value={carMonthlySip} onChange={(e) => setCarMonthlySip(Number(e.target.value || 0))} />
                  </div>
                </div>
                <input type="range" min="500" max="100000" step="500" value={carMonthlySip} onChange={(e) => setCarMonthlySip(Number(e.target.value))} />
              </div>
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop">
                  <span>Duration (Years)</span>
                  <input type="number" min="1" max="30" value={carYears} onChange={(e) => setCarYears(Number(e.target.value || 1))} />
                </div>
                <input type="range" min="1" max="30" value={carYears} onChange={(e) => setCarYears(Number(e.target.value))} />
              </div>
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop">
                  <span>Expected Return (%)</span>
                  <input type="number" min="1" max="30" value={carReturn} onChange={(e) => setCarReturn(Number(e.target.value || 1))} />
                </div>
                <div className="feMfHub__optRow feMfHub__optRow--four">
                  {[8, 12, 15, 18].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      className={`feMfHub__optBtn${carReturn === rate ? ' is-on' : ''}`}
                      onClick={() => setCarReturn(rate)}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
                <input type="range" min="1" max="30" value={carReturn} onChange={(e) => setCarReturn(Number(e.target.value))} />
              </div>
              <div className="feMfHub__retResultCard feMfHub__retResultCard--car">
                <div className="feMfHub__retResultKicker feMfHub__retResultKicker--blue">Estimated Wealth</div>
                <div className="feMfHub__retResultValue">₹{Math.round(carEstimatedWealth).toLocaleString('en-IN')}</div>
                <div className="feMfHub__retResultRow feMfHub__retResultRow--subtle">
                  <div>
                    <div className="feMfHub__retExp">Invested: ₹{Math.round(carInvested).toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="feMfHub__retSip feMfHub__retSip--green">Gain: ₹{Math.round(carGain).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
              <button type="button" className="feMfHub__lockCta" onClick={() => go('application_form')}>
                Invest Now
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {educationOpen ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label="Child education planner">
          <button type="button" className="feMfHub__retBackdrop" onClick={closeAllPlanners} />
          <div className="feMfHub__retSheet">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">Child Education Planner</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>
                ×
              </button>
            </div>
            <div className="feMfHub__retBody">
              <label className="feMfHub__retField feMfHub__retField--full">
                <span>Current Education Cost</span>
                <input type="number" min="10000" value={educationCost} onChange={(e) => setEducationCost(Number(e.target.value || 0))} />
              </label>
              <div className="feMfHub__retGrid2">
                <label className="feMfHub__retField">
                  <span>Child's Current Age</span>
                  <input type="number" min="1" max="17" value={childCurrentAge} onChange={(e) => setChildCurrentAge(Number(e.target.value || 1))} />
                </label>
                <div className="feMfHub__retField">
                  <span>Target Age</span>
                  <div className="feMfHub__optRow feMfHub__optRow--two">
                    {[18, 21].map((age) => (
                      <button
                        key={age}
                        type="button"
                        className={`feMfHub__optBtn feMfHub__optBtn--green${educationTargetAge === age ? ' is-on' : ''}`}
                        onClick={() => setEducationTargetAge(age)}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="feMfHub__retResultCard feMfHub__retResultCard--edu">
                <div className="feMfHub__retResultKicker feMfHub__retResultKicker--green">Total Funds Needed</div>
                <div className="feMfHub__retResultValue">₹{Math.round(educationFutureCost).toLocaleString('en-IN')}</div>
                <div className="feMfHub__retResultRow">
                  <div className="feMfHub__retOnlyCol">
                    <div className="feMfHub__retLab">Required Monthly SIP</div>
                    <div className="feMfHub__retSip feMfHub__retSip--emerald">₹{Math.round(educationSip).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
              <button type="button" className="feMfHub__lockCta feMfHub__lockCta--green" onClick={() => go('application_form')}>
                Invest Now
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {marriageOpen ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label="Child marriage planner">
          <button type="button" className="feMfHub__retBackdrop" onClick={closeAllPlanners} />
          <div className="feMfHub__retSheet feMfHub__retSheet--marriage">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">Child Marriage Planner</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>
                ×
              </button>
            </div>
            <div className="feMfHub__retBody">
              <label className="feMfHub__retField feMfHub__retField--full">
                <span>Current Marriage Cost</span>
                <input type="number" min="10000" value={marriageCost} onChange={(e) => setMarriageCost(Number(e.target.value || 0))} />
              </label>
              <div className="feMfHub__retGrid2">
                <label className="feMfHub__retField">
                  <span>Child's Current Age</span>
                  <input
                    type="number"
                    min="1"
                    max={Math.max(2, marriageTargetAge - 1)}
                    value={marriageChildAge}
                    onChange={(e) => setMarriageChildAge(Number(e.target.value || 1))}
                  />
                </label>
                <label className="feMfHub__retField">
                  <span>Target Age</span>
                  <input
                    type="number"
                    min={Math.max(2, marriageChildAge + 1)}
                    max="35"
                    value={marriageTargetAge}
                    onChange={(e) => setMarriageTargetAge(Number(e.target.value || 2))}
                  />
                </label>
              </div>
              <div className="feMfHub__retResultCard feMfHub__retResultCard--marriage">
                <div className="feMfHub__retResultKicker feMfHub__retResultKicker--pink">Total Funds Needed</div>
                <div className="feMfHub__retResultValue">₹{Math.round(marriageFutureCost).toLocaleString('en-IN')}</div>
                <div className="feMfHub__retResultRow">
                  <div className="feMfHub__retOnlyCol">
                    <div className="feMfHub__retLab">Required Monthly SIP</div>
                    <div className="feMfHub__retSip feMfHub__retSip--pink">₹{Math.round(marriageSip).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
              <button type="button" className="feMfHub__lockCta feMfHub__lockCta--pink" onClick={() => go('application_form')}>
                Invest Now
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {debtFreeOpen ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label="Debt free planner">
          <button type="button" className="feMfHub__retBackdrop" onClick={closeAllPlanners} />
          <div className="feMfHub__retSheet feMfHub__retSheet--debt">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">Debt Free Planner</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>
                ×
              </button>
            </div>
            <div className="feMfHub__retBody">
              <label className="feMfHub__retField feMfHub__retField--full">
                <span>Current Debt Amount</span>
                <input type="number" min="1000" value={debtAmount} onChange={(e) => setDebtAmount(Number(e.target.value || 0))} />
              </label>
              <label className="feMfHub__retField feMfHub__retField--full">
                <span>Monthly Investment</span>
                <input type="number" min="500" value={debtMonthlyInvestment} onChange={(e) => setDebtMonthlyInvestment(Number(e.target.value || 0))} />
              </label>
              <div className="feMfHub__retResultCard feMfHub__retResultCard--debt">
                <div className="feMfHub__retResultKicker feMfHub__retResultKicker--amber">Debt Free In</div>
                <div className="feMfHub__retResultValue">{debtReachMonths} Months</div>
                <div className="feMfHub__retNote">Estimated at 12% annual returns</div>
              </div>
              <button type="button" className="feMfHub__lockCta feMfHub__lockCta--amber" onClick={() => go('application_form')}>
                Invest Now
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {sipCalcOpen ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label="SIP calculator">
          <button type="button" className="feMfHub__retBackdrop" onClick={closeAllPlanners} />
          <div className="feMfHub__retSheet feMfHub__retSheet--calc">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">SIP Calculator</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>×</button>
            </div>
            <div className="feMfHub__retBody">
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop">
                  <span>Monthly SIP</span>
                  <div className="feMfHub__sliderInputWrap">
                    <span>₹</span>
                    <input type="number" min="500" max="100000" value={sipMonthly} onChange={(e) => setSipMonthly(Math.min(100000, Math.max(500, Number(e.target.value || 500))))} />
                  </div>
                </div>
              </div>
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop"><span>Duration (Years)</span><input type="number" min="1" max="30" value={sipYears} onChange={(e) => setSipYears(Math.min(30, Math.max(1, Number(e.target.value || 1))))} /></div>
              </div>
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop"><span>Expected Return (%)</span><input type="number" min="1" max="24" value={sipRate} onChange={(e) => setSipRate(Number(e.target.value || 1))} /></div>
              </div>
              <div className="feMfHub__retResultCard feMfHub__retResultCard--car">
                <div className="feMfHub__retResultKicker feMfHub__retResultKicker--blue">Estimated Wealth</div>
                <div className="feMfHub__retResultValue">₹{Math.round(sipEstimatedWealth).toLocaleString('en-IN')}</div>
                <div className="feMfHub__retResultRow feMfHub__retResultRow--subtle">
                  <div><div className="feMfHub__retExp">Invested: ₹{Math.round(sipInvested).toLocaleString('en-IN')}</div></div>
                  <div><div className="feMfHub__retSip feMfHub__retSip--green">Gain: ₹{Math.round(sipGain).toLocaleString('en-IN')}</div></div>
                </div>
              </div>
              <button type="button" className="feMfHub__lockCta">Check Result</button>
            </div>
          </div>
        </div>
      ) : null}

      {lumpsumCalcOpen ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label="Lumpsum calculator">
          <button type="button" className="feMfHub__retBackdrop" onClick={closeAllPlanners} />
          <div className="feMfHub__retSheet feMfHub__retSheet--calc">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">Lumpsum Calculator</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>×</button>
            </div>
            <div className="feMfHub__retBody">
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop">
                  <span>One-time Investment</span>
                  <div className="feMfHub__sliderInputWrap"><span>₹</span><input type="number" min="1000" max="10000000" value={lumpAmount} onChange={(e) => setLumpAmount(Math.min(10000000, Math.max(1000, Number(e.target.value || 1000))))} /></div>
                </div>
              </div>
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop"><span>Duration (Years)</span><input type="number" min="1" max="30" value={lumpYears} onChange={(e) => setLumpYears(Math.min(30, Math.max(1, Number(e.target.value || 1))))} /></div>
              </div>
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop"><span>Expected Return (%)</span><input type="number" min="1" max="24" value={lumpRate} onChange={(e) => setLumpRate(Number(e.target.value || 1))} /></div>
              </div>
              <div className="feMfHub__retResultCard feMfHub__retResultCard--edu">
                <div className="feMfHub__retResultKicker feMfHub__retResultKicker--green">Estimated Wealth</div>
                <div className="feMfHub__retResultValue">₹{Math.round(lumpEstimatedWealth).toLocaleString('en-IN')}</div>
                <div className="feMfHub__retResultRow feMfHub__retResultRow--subtle">
                  <div className="feMfHub__retOnlyCol"><div className="feMfHub__retExp">Invested: ₹{Math.round(lumpAmount).toLocaleString('en-IN')}</div></div>
                </div>
              </div>
              <button type="button" className="feMfHub__lockCta feMfHub__lockCta--green">Check Result</button>
            </div>
          </div>
        </div>
      ) : null}

      {swpCalcOpen ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label="SWP calculator">
          <button type="button" className="feMfHub__retBackdrop" onClick={closeAllPlanners} />
          <div className="feMfHub__retSheet feMfHub__retSheet--calc">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">SWP Calculator</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>×</button>
            </div>
            <div className="feMfHub__retBody">
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop"><span>Total Corpus</span><div className="feMfHub__sliderInputWrap"><span>₹</span><input type="number" min="100000" max="50000000" value={swpCorpus} onChange={(e) => setSwpCorpus(Math.min(50000000, Math.max(100000, Number(e.target.value || 100000))))} /></div></div>
              </div>
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop"><span>Monthly Withdrawal</span><div className="feMfHub__sliderInputWrap"><span>₹</span><input type="number" min="1000" max="1000000" value={swpMonthlyWithdrawal} onChange={(e) => setSwpMonthlyWithdrawal(Math.min(1000000, Math.max(1000, Number(e.target.value || 1000))))} /></div></div>
              </div>
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop"><span>Withdraw for (Years)</span><input type="number" min="1" max="40" value={swpYears} onChange={(e) => setSwpYears(Math.min(40, Math.max(1, Number(e.target.value || 1))))} /></div>
              </div>
              <div className="feMfHub__sliderField">
                <div className="feMfHub__sliderTop"><span>Expected Return (%)</span><input type="number" min="1" max="20" value={swpRate} onChange={(e) => setSwpRate(Number(e.target.value || 1))} /></div>
              </div>
              <div className="feMfHub__retResultCard feMfHub__retResultCard--swp">
                <div className="feMfHub__retResultKicker feMfHub__retResultKicker--purple">Final Balance</div>
                <div className="feMfHub__retResultValue">₹{Math.round(swpFinalBalance).toLocaleString('en-IN')}</div>
                <div className="feMfHub__retResultRow feMfHub__retResultRow--subtle">
                  <div className="feMfHub__retOnlyCol"><div className="feMfHub__retExp">Total Withdrawn: ₹{Math.round(swpTotalWithdrawn).toLocaleString('en-IN')}</div></div>
                </div>
              </div>
              <button type="button" className="feMfHub__lockCta feMfHub__lockCta--purple">Check Result</button>
            </div>
          </div>
        </div>
      ) : null}

      {genericGoalOpen && activeGenericGoal ? (
        <div className="feMfHub__retOverlay" role="dialog" aria-modal="true" aria-label={`${activeGenericGoal.label} planner`}>
          <button type="button" className="feMfHub__retBackdrop" onClick={closeAllPlanners} />
          <div className="feMfHub__retSheet">
            <div className="feMfHub__retHead">
              <div className="feMfHub__retTitle">{activeGenericGoal.label} Planner</div>
              <button type="button" className="feMfHub__retClose" onClick={closeAllPlanners}>
                ×
              </button>
            </div>
            <div className="feMfHub__retBody">
              <div className="feMfHub__retTipCard">
                <div className="feMfHub__retTipTitle">Plan this goal easily</div>
                <div className="feMfHub__retTipMeta">
                  We are preparing a detailed calculator for {activeGenericGoal.label.toLowerCase()}. You can still start planning with our
                  complete goal planner now.
                </div>
              </div>
              <button type="button" className="feMfHub__lockCta" onClick={() => go('goal_planner_calc')}>
                Open Goal Planner
              </button>
            </div>
          </div>
        </div>
      ) : null}
          </>,
          document.body,
        )}
    </>
  )
}
