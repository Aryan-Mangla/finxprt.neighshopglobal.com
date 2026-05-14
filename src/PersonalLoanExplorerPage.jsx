const go = (route) => {
  if (typeof window !== 'undefined') window.location.hash = `#/${route}`
}

const INSTANT_FINTECH = [
  { id: 'es', name: 'EarlySalary', logo: 'plate', apply: 'muted' },
  { id: 'kb', name: 'KreditBee', logo: 'gold', apply: 'muted' },
  { id: 'mt', name: 'MoneyTap', logo: 'cyan', apply: 'muted' },
  { id: 'fb', name: 'Fibe', logo: 'avatarA', apply: 'muted' },
  { id: 'mp', name: 'mPokket', logo: 'avatarB', apply: 'accent' },
  { id: 'ks', name: 'Kissht', logo: 'avatarC', apply: 'muted' },
  { id: 'lz', name: 'Lazypay', logo: 'lazy', apply: 'muted' },
  { id: 'zm', name: 'ZestMoney', logo: 'zest', apply: 'muted' },
  { id: 'sf', name: 'Stashfin', logo: 'avatarD', apply: 'accent' },
  { id: 'cq', name: 'Cashe', logo: 'cashe', apply: 'accent' },
]

const BANKING_PARTNERS = [
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    rate: '10.50',
    accent: 'navy',
    tag: 'Pre-Approved',
    value: '₹10 Lakhs',
    logo: '/partner-hdfc-ergo.png',
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    rate: '10.75',
    accent: 'orange',
    tag: 'Processing Fee',
    value: '0%*',
    logo: '/partner-icici.png',
  },
  {
    id: 'sbi',
    name: 'State Bank of India',
    rate: '11.00',
    accent: 'slate',
    tag: 'Trust Score',
    value: 'Highest',
    logo: '/partner-sbi.png',
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    rate: '10.49',
    accent: 'slate',
    tag: 'Quick Disbursal',
    value: '24 Hours',
    logo: '/partner-lic.png',
  },
  {
    id: 'kotak',
    name: 'Kotak Bank',
    rate: '10.99',
    accent: 'slate',
    tag: 'Special Offer',
    value: 'Amazon Gift Card',
    logo: '/partner-tata-aia.png',
  },
]

function FintechIcon({ logo }) {
  if (logo === 'avatarA' || logo === 'avatarB' || logo === 'avatarC' || logo === 'avatarD') {
    return (
      <div className="feLoanMkt__markWrap" aria-hidden="true">
        <img className="feLoanMkt__markImg" src="/icons8-test-account-liquid-glass-16.png" alt="" />
      </div>
    )
  }
  return (
    <div className={`feLoanMkt__markWrap feLoanMkt__markWrap--${logo}`} aria-hidden="true">
      <span className="feLoanMkt__logoTxt">
        {logo === 'lazy' ? 'Lazy' : logo === 'zest' ? 'Zest' : logo === 'gold' ? 'KB' : logo === 'plate' ? 'ES' : logo === 'cashe' ? 'C' : 'M'}
      </span>
    </div>
  )
}

function CheckMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#ff9933" />
      <path d="M8 12l2.5 2.5L16 9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ShieldVerified() {
  return (
    <span className="feLoanMkt__verified">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#fff" stroke="#9aa7c1" strokeWidth="1.4" />
        <path d="M9 12l2 2 4-4" stroke="#7f8faa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified
    </span>
  )
}

export default function PersonalLoanExplorerPage({ mode = 'personal', onApply, onCheckEligibility }) {
  const isBiz = mode === 'business'
  const scope = isBiz ? 'business' : 'personal'
  const productTitle = isBiz ? 'Business Loan' : 'Personal Loan'

  const handleApply = (title, subtitle) => {
    if (onApply) {
      onApply(title || `Apply for ${productTitle}`, subtitle || (isBiz ? 'Working capital & growth finance' : 'Instant fintech & verified bank partners'))
    } else {
      go('application_form')
    }
  }

  const handleCheckEligibility = () => {
    if (onCheckEligibility) {
      onCheckEligibility()
    } else {
      go('eligibility_form')
    }
  }

  return (
    <div className="feLoanMkt" data-scope={scope} aria-label={isBiz ? 'Business loan marketplace' : 'Personal loan marketplace'}>
      <section className="feLoanMkt__heroCard" aria-label="Balance transfer offer">
        <span className="feLoanMkt__heroPct" aria-hidden="true">
          ⚡
        </span>
        <div className="feLoanMkt__heroCardInner">
          <p className="feLoanMkt__heroKicker">Instant Approval</p>
          <h2 className="feLoanMkt__heroTitle">
            Zero Collateral
            <br />
            Credit Line
          </h2>
          <p className="feLoanMkt__heroSub">Get up to ₹5,00,000 instantly with minimal documentation.</p>
          <button type="button" className="feLoanMkt__heroCta" onClick={() => handleApply(`Apply for ${productTitle}`, 'Zero collateral credit line')}>
            Get Started
          </button>
        </div>
      </section>

      <section className="feLoanMkt__section" aria-label="Instant lenders">
        <div className="feLoanMkt__headRow">
          <div>
            <h3 className="feLoanMkt__h">Instant Lenders</h3>
            <p className="feLoanMkt__sub">Fintech partners for quick digital credit</p>
          </div>
          <button type="button" className="feLoanMkt__viewAll" onClick={() => handleApply(`Apply for ${productTitle}`, 'View all verified partners')}>
            View all
          </button>
        </div>
        <div className="feLoanMkt__grid2">
          {INSTANT_FINTECH.map((x) => (
            <div key={x.id} className="feLoanMkt__tile">
              <FintechIcon logo={x.logo} />
              <div className="feLoanMkt__tileName">{x.name}</div>
              <button type="button" className={`feLoanMkt__applyPill feLoanMkt__applyPill--${x.apply}`} onClick={() => handleApply(`Apply for ${x.name}`, `Verified ${productTitle} Partner`)}>
                Apply
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="feLoanMkt__section" aria-label="Banking partners">
        <div className="feLoanMkt__headRow feLoanMkt__headRow--wrap">
          <div>
            <h3 className="feLoanMkt__h">Banking Partners</h3>
            <p className="feLoanMkt__sub">Traditional offline bank {isBiz ? 'business' : 'personal'} loans</p>
          </div>
          <ShieldVerified />
        </div>
        <ul className="feLoanMkt__bankList">
          {BANKING_PARTNERS.map((b) => (
            <li key={b.id} className={`feLoanMkt__bankCard feLoanMkt__bankCard--${b.accent}`}>
              <div className="feLoanMkt__bankLeft">
                <div className="feLoanMkt__bankLogo" aria-hidden="true">
                  <img src={b.logo} alt="" />
                </div>
                <div>
                  <div className="feLoanMkt__bankName">{b.name}</div>
                  <div className="feLoanMkt__bankRate">Interest starting @ {b.rate}% p.a.</div>
                </div>
              </div>
              <div className="feLoanMkt__bankRight">
                <div className="feLoanMkt__bankTag">{b.tag}</div>
                <div className="feLoanMkt__bankValue">{b.value}</div>
                <button type="button" className="feLoanMkt__bankCta" onClick={handleCheckEligibility}>
                  Check eligibility <span aria-hidden="true">›</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="feLoanMkt__calcCard" aria-label="Smart eligibility calculator">
        <h3 className="feLoanMkt__calcTitle">Smart Eligibility Calculator</h3>
        <p className="feLoanMkt__calcBody">
          Not sure which lender fits you? Use our AI-powered engine to check eligibility across 25+ partners without impacting
          your credit score.
        </p>
        <ul className="feLoanMkt__calcList">
          <li>
            <CheckMini /> No credit score hit
          </li>
          <li>
            <CheckMini /> Instant results
          </li>
        </ul>
        <button type="button" className="feLoanMkt__calcBtn" onClick={handleCheckEligibility}>
          Calculate Now
        </button>
      </section>
      <button type="button" className="feLoanMkt__supportFab" aria-label="Support">
        ☎
      </button>
    </div>
  )
}
