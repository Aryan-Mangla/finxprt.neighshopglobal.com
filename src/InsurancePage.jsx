import { useMemo } from 'react'

function Icon({ name }) {
  switch (name) {
    case 'term':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <rect x="3" y="4" width="7" height="6" rx="1.2" />
          <rect x="14" y="4" width="7" height="6" rx="1.2" />
          <circle cx="12" cy="19" r="3.1" />
          <path d="M10 7h4v2h-4z" />
          <path d="M6.5 10.5h11v2h-11z" />
          <path d="M11 12.2h2v3.7h-2z" />
        </svg>
      )
    case 'health':
      return (
        <img
          src="https://img.icons8.com/arcade/32/medical-insurance.png"
          alt=""
          width="22"
          height="22"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      )
    case 'car':
      return (
        <img
          src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/32/external-car-insurance-car-services-smashingstocks-mixed-smashing-stocks-2.png"
          alt=""
          width="22"
          height="22"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      )
    case 'bike':
      return (
        <img
          src="https://img.icons8.com/ios-filled/32/motorcycle.png"
          alt=""
          width="22"
          height="22"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      )
    case 'fire':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M12 2.8c1.8 2.6 1.3 4.3 2.8 6 1.6 1.7 3.2 3.2 3.2 5.9 0 3.3-2.7 5.9-6 5.9s-6-2.6-6-5.9c0-2.5 1.5-4.1 2.9-5.8 1.6-1.9 2.6-3.4 3.1-6.1z" />
          <path d="M12 10.1c1.1 1.4.4 2.2 1.3 3.1.6.6 1.1 1.3 1.1 2.2a2.4 2.4 0 0 1-4.8 0c0-1 .6-1.7 1.2-2.4.6-.7 1.1-1.3 1.2-2.9z" fill="#ffffff" />
        </svg>
      )
    case 'travel':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M10 14l9-9" />
          <path d="M15 5h4v4" />
          <path d="M5 19l3-7 7-3-3 7-7 3z" />
        </svg>
      )
    case 'commercial':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="2.5" y="9" width="12" height="8" rx="1.5" />
          <path d="M14.5 11h3l3 3v3h-6z" />
          <circle cx="7" cy="18" r="1.5" />
          <circle cx="17" cy="18" r="1.5" />
        </svg>
      )
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 6v12" />
          <path d="M6 12h12" />
        </svg>
      )
  }
}

export default function InsurancePage({ onSelectType, onExplore }) {
  const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )

  const types = useMemo(
    () => [
      {
        id: 'term',
        title: 'Term Insurance',
        desc: '',
        icon: 'term',
      },
      {
        id: 'health',
        title: 'Health Insurance',
        desc: '',
        icon: 'health',
      },
      {
        id: 'fire',
        title: 'Fire Insurance',
        desc: 'Protect your assets and home',
        icon: 'fire',
      },
      {
        id: 'travel',
        title: 'Travel Insurance',
        desc: 'Coverage for delays, baggage and emergencies',
        icon: 'travel',
      },
      {
        id: 'commercial',
        title: 'Commercial Vehicle',
        desc: 'Protect your business vehicle and fleet',
        icon: 'commercial',
      },
      {
        id: 'car',
        title: 'Car Insurance',
        desc: '',
        icon: 'car',
      },
      {
        id: 'bike',
        title: 'Bike Insurance',
        desc: '',
        icon: 'bike',
      },
    ],
    [],
  )

  const partners = useMemo(
    () => [
      { name: 'HDFC ERGO', initials: 'HE', logo: '/partner-hdfc-ergo.png' },
      { name: 'LIC India', initials: 'LIC', logo: '/partner-lic.png' },
      { name: 'SBI General', initials: 'SBI', logo: '/partner-sbi.png' },
      { name: 'ICICI Lombard', initials: 'ICICI', logo: '/partner-icici.png' },
      { name: 'Kotak Life', initials: 'KOTAK', logo: '/partner-kotak.png' },
      { name: 'TATA AIA', initials: 'TA', logo: '/partner-tata-aia.png' },
    ],
    [],
  )

  return (
    <div className="feInsCats" aria-label="Insurance categories">
      <div className="feInsCats__head">
        <div className="feInsCats__title">Our Categories</div>
      </div>

      <div className="feInsCats__grid" role="list" aria-label="Insurance type cards">
        {types
          .filter((t) => !['fire', 'travel', 'commercial'].includes(t.id))
          .map((t) => (
            <button
              key={t.id}
              type="button"
              className="feInsCatTile"
              onClick={() => onSelectType?.(t.id)}
              aria-label={`View plans for ${t.title}`}
              role="listitem"
            >
              <span className={`feInsCatTile__icon feInsCatTile__icon--${t.id}`} aria-hidden="true">
                <Icon name={t.icon} />
              </span>
              <span className="feInsCatTile__title">{t.title}</span>
            </button>
          ))}

        {types
          .filter((t) => ['fire', 'travel', 'commercial'].includes(t.id))
          .map((t) => (
            <button
              key={t.id}
              type="button"
              className="feInsCatWide"
              onClick={() => onSelectType?.(t.id)}
              aria-label={`View plans for ${t.title}`}
              role="listitem"
            >
              <span className={`feInsCatWide__icon feInsCatWide__icon--${t.id}`} aria-hidden="true">
                <Icon name={t.icon} />
              </span>
              <span className="feInsCatWide__texts">
                <span className="feInsCatWide__title">{t.title}</span>
                <span className="feInsCatWide__sub">{t.desc}</span>
              </span>
              <span className="feInsCatWide__chev" aria-hidden="true">
                <ChevronRight />
              </span>
            </button>
          ))}
      </div>

      <section className="feInsExtra" aria-label="Insurance advisory and partners">
        <div className="feInsAdvice">
          <div className="feInsAdvice__kicker">EXPERT ADVICE</div>
          <div className="feInsAdvice__title">Choose your insurance with IRDA certified expert</div>
          <button type="button" className="feInsAdvice__btn">
            Book Meeting <span aria-hidden="true">🗓</span>
          </button>
        </div>

        <div className="feInsPartners">
          <div className="feInsPartners__title">OUR INSURANCE PARTNERS</div>
          <div className="feInsPartners__marquee" aria-label="Insurance partner logos">
            <div className="feInsPartners__marqueeTrack" aria-hidden="true">
              {[...partners, ...partners].map((p, idx) => (
                <span key={`${p.name}-${idx}`} className="feInsPartners__logo">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="feInsPartners__logoImg"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const next = e.currentTarget.nextElementSibling
                      if (next) next.style.display = 'inline-flex'
                    }}
                  />
                  <span className="feInsPartners__logoFallback">{p.initials}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

