function IconLoan() {
  const c = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    width: 22,
    height: 22,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  return (
    <svg {...c}>
      <path d="M7 7h10v12H7z" />
      <path d="M9 11h6" />
      <path d="M9 14h4" />
      <path d="M12 7V5" />
      <path d="M10 5h4" />
    </svg>
  )
}

function IconMoney() {
  const c = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    width: 22,
    height: 22,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  return (
    <svg {...c}>
      <circle cx="9" cy="9" r="3.5" />
      <circle cx="15" cy="15" r="3.5" />
      <path d="M6 18c2-3 4-5 7-6" />
    </svg>
  )
}

function IconBank() {
  const c = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    width: 22,
    height: 22,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  return (
    <svg {...c}>
      <path d="M3 10h18L12 4 3 10z" />
      <path d="M5 10v8" />
      <path d="M9 10v8" />
      <path d="M15 10v8" />
      <path d="M19 10v8" />
      <path d="M3 20h18" />
    </svg>
  )
}

const ICONS = {
  loan: IconLoan,
  money: IconMoney,
  bank: IconBank,
}

/**
 * Dark blue premium promo strip for Loan / EMI sections (glass + glow, no extra CTAs).
 */
export default function SectionPromoBanner({ title, subtitle, icon = 'loan' }) {
  const Icon = ICONS[icon] ?? IconLoan

  return (
    <div className="feSectionPromo" role="region" aria-label={title}>
      <div className="feSectionPromo__glow" aria-hidden="true" />
      <div className="feSectionPromo__glass" aria-hidden="true" />
      <div className="feSectionPromo__sheen" aria-hidden="true" />
      <div className="feSectionPromo__inner">
        <div className="feSectionPromo__row">
          <span className="feSectionPromo__iconWrap" aria-hidden="true">
            <Icon />
          </span>
          <div className="feSectionPromo__copy">
            <div className="feSectionPromo__title">{title}</div>
            <div className="feSectionPromo__sub">{subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
