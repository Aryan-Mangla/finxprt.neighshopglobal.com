const stroke = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.85,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

/** Credit / trend line — clean strokes */
function IconCibil() {
  return (
    <svg {...stroke}>
      <path d="M4 18h16" opacity="0.35" />
      <path d="M6 15.5l3-4 3 2.5 3-3 3-4" />
      <circle cx="6" cy="15.5" r="1.35" fill="currentColor" stroke="none" />
      <circle cx="9" cy="11.5" r="1.35" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r="1.35" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11" r="1.35" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Calculator — outline + key grid */
function IconEmi() {
  return (
    <svg {...stroke}>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M8 7.5h8" opacity="0.5" />
      <circle cx="8.5" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="15" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="15" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="15" r="1.1" fill="currentColor" stroke="none" />
      <path d="M9 18.5h6" opacity="0.45" strokeWidth="1.5" />
    </svg>
  )
}

/** Growth — baseline + rising path */
function IconSip() {
  return (
    <svg {...stroke}>
      <path d="M4 19h16" opacity="0.35" />
      <path d="M6 16l3.5-4 3 2.5 4-6 3.5-2" />
      <circle cx="6" cy="16" r="1.35" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="12" r="1.35" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="7" r="1.35" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg {...stroke}>
      <path d="M12 3.5l7.5 3.8v5.2c0 4.3-3 7.3-7.5 8.8-4.5-1.5-7.5-4.5-7.5-8.8V7.3L12 3.5z" />
      <path d="M9 12l2 2 4.5-5" strokeWidth="1.75" />
    </svg>
  )
}

function IconCard() {
  return (
    <svg {...stroke}>
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="M3 10h18" opacity="0.45" />
      <path d="M7 15.5h5" strokeWidth="1.75" />
    </svg>
  )
}

function IconEconomy() {
  return (
    <svg {...stroke}>
      <path d="M4 19h16" opacity="0.35" />
      <path d="M6 19V12 M10 19V9 M14 19V14 M18 19V7" strokeWidth="2.25" />
    </svg>
  )
}

function ChevronSimple() {
  return (
    <svg
      className="feBlogBanner__chevSvg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

const ICONS = {
  cibil: IconCibil,
  emi: IconEmi,
  sip: IconSip,
  shield: IconShield,
  card: IconCard,
  economy: IconEconomy,
}

export function blogIconFromCategory(cat) {
  switch (cat) {
    case 'Loans':
      return 'emi'
    case 'Investment':
      return 'sip'
    case 'Insurance':
      return 'shield'
    case 'Credit Cards':
      return 'card'
    case 'Economy':
      return 'economy'
    default:
      return 'sip'
  }
}

export default function BlogBannerCard({
  title,
  subtitle,
  icon = 'sip',
  meta = null,
  coverSrc = null,
  onClick,
}) {
  const Icon = ICONS[icon] ?? ICONS.sip

  return (
    <button type="button" className="feBlogBanner" onClick={onClick} aria-label={title}>
      {coverSrc ? (
        <span className="feBlogBanner__photoWrap" aria-hidden="true">
          <img
            className="feBlogBanner__photoImg"
            src={coverSrc}
            alt=""
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <span className="feBlogBanner__photoScrim" />
        </span>
      ) : null}
      <span className="feBlogBanner__inner">
        <span className="feBlogBanner__row">
          <span className="feBlogBanner__iconWrap" aria-hidden="true">
            <Icon />
          </span>
          <span className="feBlogBanner__copy">
            <span className="feBlogBanner__title">{title}</span>
            <span className="feBlogBanner__sub">{subtitle}</span>
            {meta ? <span className="feBlogBanner__meta">{meta}</span> : null}
          </span>
          <span className="feBlogBanner__chev" aria-hidden="true">
            <ChevronSimple />
          </span>
        </span>
      </span>
    </button>
  )
}
