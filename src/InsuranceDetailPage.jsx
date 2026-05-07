import { useMemo, useState } from 'react'

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

const TRAVEL_POPULAR_DESTINATIONS_SPRITE = `${import.meta.env.BASE_URL}travel-popular-destinations.png`

const TRAVEL_POPULAR_DESTINATIONS = ['Schengen', 'UAE', 'Thailand', 'USA', 'United Kingdom', 'Singapore']

function toneForType(typeId) {
  switch (typeId) {
    case 'health':
      return 'green'
    case 'term':
    case 'life':
      return 'navy'
    case 'car':
      return 'orange'
    case 'bike':
      return 'orange'
    case 'travel':
      return 'navy'
    case 'fire':
      return 'orange'
    case 'commercial':
      return 'navy'
    default:
      return 'navy'
  }
}

export default function InsuranceDetailPage({ typeId = 'health', onExplorePlans }) {
  const type = useMemo(() => {
    const map = {
      health: { title: 'Health Insurance', sub: 'Compare plans for you & your family' },
      term: { title: 'Term Insurance', sub: 'Secure coverage for your family with term plans' },
      life: { title: 'Life Insurance', sub: 'Term plans with flexible coverage' },
      car: { title: 'Car Insurance', sub: 'Renew, compare and save instantly' },
      bike: { title: 'Bike Insurance', sub: 'Quick cover with add-ons' },
      travel: { title: 'Travel Insurance', sub: 'Protection for every trip' },
      fire: { title: 'Fire Insurance', sub: 'Protect your home and business assets' },
      commercial: { title: 'Commercial Vehicle', sub: 'Business vehicle and fleet protection plans' },
    }
    return map[typeId] ?? map.health
  }, [typeId])

  const tint = toneForType(typeId)
  const [cover, setCover] = useState(500000)
  const [tenure, setTenure] = useState(1)
  const [carNumber, setCarNumber] = useState('')
  const [healthGender, setHealthGender] = useState('male')
  const [healthName, setHealthName] = useState('')
  const [healthMobile, setHealthMobile] = useState('')
  const [healthPin, setHealthPin] = useState('')
  const [travelQuery, setTravelQuery] = useState('')
  const [travelStartDate, setTravelStartDate] = useState('')
  const [travelEndDate, setTravelEndDate] = useState('')
  const [travellerCount, setTravellerCount] = useState(0)
  const [travelPopularSelection, setTravelPopularSelection] = useState(TRAVEL_POPULAR_DESTINATIONS[0])

  const estimate = useMemo(() => {
    // Simple premium heuristic for UI (not real pricing)
    const base = typeId === 'life' || typeId === 'term' ? 900 : typeId === 'travel' ? 650 : 1200
    const coverFactor = Math.max(1, cover / 500000)
    const tenureFactor = Math.max(1, tenure)
    return base * coverFactor * tenureFactor
  }, [cover, tenure, typeId])

  const plans = useMemo(
    () => [
      { id: 'p1', name: 'Essential', desc: 'Best for basics', price: estimate * 0.9 },
      { id: 'p2', name: 'Smart', desc: 'Most popular', price: estimate },
      { id: 'p3', name: 'Premium', desc: 'Maximum benefits', price: estimate * 1.25 },
    ],
    [estimate],
  )

  const benefits = useMemo(() => {
    const common = ['Paperless onboarding', 'Trusted partners', 'In-app support']
    if (typeId === 'health') return ['Cashless network', 'No-claim bonus', 'Wellness perks', ...common]
    if (typeId === 'term') return ['Flexible tenure options', 'High coverage options', 'Family protection', ...common]
    if (typeId === 'life') return ['High coverage options', 'Riders available', 'Flexible tenure', ...common]
    if (typeId === 'car') return ['Zero dep add-on', 'Instant renewal', 'Roadside assistance', ...common]
    if (typeId === 'bike') return ['Theft cover', 'Accident protection', 'Fast claim support', ...common]
    if (typeId === 'fire') return ['Property damage cover', 'Reinstatement support', 'Add-on riders', ...common]
    if (typeId === 'commercial') return ['Fleet cover options', 'Third-party liability', 'Downtime protection', ...common]
    return ['Medical cover', 'Trip delay cover', 'Luggage protection', ...common]
  }, [typeId])

  if (typeId === 'car') {
    return (
      <div className="feInsDetail feInsDetail--car" aria-label="Car insurance quick quote">
        <section className="feCarQuote">
          <div className="feCarQuote__head">
            <div className="feCarQuote__title">
              Save upto <strong>80%+</strong> on car insurance
            </div>
            <div className="feCarQuote__sub">Renew in 2 minutes</div>
          </div>

          <div className="feCarQuote__search">
            <input
              type="text"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
              className="feCarQuote__input"
              placeholder="Enter Car Number:  (eg. DL-10-CB-1234)"
              aria-label="Enter car number"
            />
            <button type="button" className="feCarQuote__cta" onClick={() => onExplorePlans?.()}>
              View Prices <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="feCarQuote__or">
            <span>or</span>
          </div>

          <button type="button" className="feCarQuote__ghost" onClick={() => onExplorePlans?.()}>
            Proceed without car number <span aria-hidden="true">➜</span>
          </button>

          <button type="button" className="feCarQuote__link" onClick={() => onExplorePlans?.()}>
            Brand new car? Click here
          </button>
        </section>
      </div>
    )
  }

  if (typeId === 'bike') {
    return (
      <div className="feInsDetail feInsDetail--bike" aria-label="Bike insurance quick quote">
        <section className="feBikeQuote">
          <div className="feBikeQuote__head">
            <div className="feBikeQuote__title">
              Save upto <strong>85% *</strong> on Two Wheeler Insurance
            </div>
            <div className="feBikeQuote__bullets">
              <span>Instant policy</span>
              <span>No inspection</span>
              <span>No documentation</span>
            </div>
          </div>

          <div className="feBikeQuote__search">
            <input
              type="text"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
              className="feBikeQuote__input"
              placeholder="Enter Bike Number:  (eg. DL-10-CB-1234)"
              aria-label="Enter bike number"
            />
            <button type="button" className="feBikeQuote__cta" onClick={() => onExplorePlans?.()}>
              View Prices <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="feBikeQuote__or">
            <span>or</span>
          </div>

          <button type="button" className="feBikeQuote__link" onClick={() => onExplorePlans?.()}>
            Bought a new bike? <u>Click Here</u>
          </button>
        </section>
      </div>
    )
  }

  if (typeId === 'commercial') {
    return (
      <div className="feInsDetail feInsDetail--commercial" aria-label="Commercial vehicle insurance quick quote">
        <section className="feCommercialQuote">
          <div className="feCommercialQuote__head">
            <div className="feCommercialQuote__kicker">
              Compare &amp; Save upto <strong>85%*</strong> on
            </div>
            <div className="feCommercialQuote__title">Commercial Vehicle Insurance</div>
          </div>

          <div className="feCommercialQuote__search">
            <input
              type="text"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
              className="feCommercialQuote__input"
              placeholder="Enter Vehicle Registration number"
              aria-label="Enter vehicle registration number"
            />
            <button type="button" className="feCommercialQuote__cta" onClick={() => onExplorePlans?.()}>
              Search
            </button>
          </div>

          <div className="feCommercialQuote__or">
            <span>OR</span>
          </div>

          <button type="button" className="feCommercialQuote__ghost" onClick={() => onExplorePlans?.()}>
            Proceed Without Vehicle Number <span aria-hidden="true">→</span>
          </button>

          <button type="button" className="feCommercialQuote__link" onClick={() => onExplorePlans?.()}>
            Brand New Vehicle?<u>Click Here</u>
          </button>
        </section>
      </div>
    )
  }

  if (typeId === 'health') {
    const cities = ['Delhi', 'Bengaluru', 'Mumbai', 'Pune', 'Hyderabad', 'Thane', 'Gurgaon', 'Ghaziabad', 'Kolkata', 'Navi Mumbai']

    return (
      <div className="feInsDetail feInsDetail--health" aria-label="Health insurance details form">
        <section className="feHealthForm">
          <div className="feHealthForm__top">
            <span className="feHealthForm__icon" aria-hidden="true">👤</span>
            <span>We will use this information on policy copy</span>
          </div>

          <div className="feHealthForm__body">
            <div className="feHealthForm__label">Select gender</div>
            <div className="feHealthForm__genderRow">
              <button
                type="button"
                className={`feHealthForm__genderCard${healthGender === 'male' ? ' is-on' : ''}`}
                onClick={() => setHealthGender('male')}
              >
                <span>Male</span>
                <span className="feHealthForm__genderAvatar" aria-hidden="true">🧑🏻</span>
              </button>
              <button
                type="button"
                className={`feHealthForm__genderCard${healthGender === 'female' ? ' is-on' : ''}`}
                onClick={() => setHealthGender('female')}
              >
                <span>Female</span>
                <span className="feHealthForm__genderAvatar" aria-hidden="true">👩🏻</span>
              </button>
            </div>

            <input
              className="feHealthForm__input"
              type="text"
              value={healthName}
              onChange={(e) => setHealthName(e.target.value)}
              placeholder="Enter Full Name"
              aria-label="Enter full name"
            />
            <input
              className="feHealthForm__input"
              type="tel"
              value={healthMobile}
              onChange={(e) => setHealthMobile(e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
              placeholder="Enter 10 Digit Mobile Number"
              aria-label="Enter mobile number"
            />
            <input
              className="feHealthForm__input"
              type="tel"
              value={healthPin}
              onChange={(e) => setHealthPin(e.target.value.replace(/[^\d]/g, '').slice(0, 6))}
              placeholder="Enter PIN Code"
              aria-label="Enter pin code"
            />

            <div className="feHealthForm__chips" role="list" aria-label="Popular cities">
              {cities.map((city) => (
                <button key={city} type="button" className="feHealthForm__chip" role="listitem">
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="feHealthForm__footer">
            <div className="feHealthForm__disclaimer">
              By clicking on "CONTINUE", you agree to our Privacy Policy , Terms of Use &amp; *Disclaimer
            </div>
            <button type="button" className="feHealthForm__continue" onClick={() => onExplorePlans?.()}>
              CONTINUE <span aria-hidden="true">›</span>
            </button>
          </div>
        </section>
      </div>
    )
  }

  if (typeId === 'travel') {
    const destCount = TRAVEL_POPULAR_DESTINATIONS.length

    return (
      <div className="feInsDetail feInsDetail--travel" aria-label="Travel insurance plan finder">
        <section className="feTravelForm">
          <div className="feTravelForm__card">
            <div className="feTravelForm__title">Where are you travelling to?</div>
            <label className="feTravelForm__search" aria-label="Search country">
              <span className="feTravelForm__searchIcon" aria-hidden="true">⌕</span>
              <input
                type="text"
                value={travelQuery}
                onChange={(e) => setTravelQuery(e.target.value)}
                placeholder="Search country"
              />
            </label>
            <div className="feTravelForm__popularHead">
              Popular choices <span>(You can add more than one country)</span>
            </div>
            <div className="feTravelForm__popularWrap">
              <div
                className="feTravelForm__popularRow"
                role="group"
                aria-label="Popular countries — swipe sideways to see more"
              >
                {TRAVEL_POPULAR_DESTINATIONS.map((country, i) => (
                  <div
                    key={country}
                    role="button"
                    tabIndex={0}
                    aria-current={travelPopularSelection === country ? 'true' : undefined}
                    className={`feTravelForm__country${travelPopularSelection === country ? ' feTravelForm__country--selected' : ''}`}
                    onClick={() => setTravelPopularSelection(country)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setTravelPopularSelection(country)
                      }
                    }}
                  >
                    <span className="feTravelForm__countryCard" aria-hidden="true">
                      <span
                        className="feTravelForm__countryIcon"
                        style={{
                          backgroundImage: `url(${TRAVEL_POPULAR_DESTINATIONS_SPRITE})`,
                          backgroundPosition: `${destCount <= 1 ? 0 : (i / (destCount - 1)) * 100}% 50%`,
                        }}
                      />
                    </span>
                    <span className="feTravelForm__countryLabel">{country}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="feTravelForm__dates">
            <label className="feTravelForm__dateField">
              <span className="feTravelForm__dateIcon" aria-hidden="true">📅</span>
              <input
                type="date"
                value={travelStartDate}
                onChange={(e) => setTravelStartDate(e.target.value)}
                aria-label="Start date"
              />
            </label>
            <label className="feTravelForm__dateField">
              <span className="feTravelForm__dateIcon" aria-hidden="true">📅</span>
              <input
                type="date"
                value={travelEndDate}
                onChange={(e) => setTravelEndDate(e.target.value)}
                aria-label="End date"
              />
            </label>
          </div>

          <button
            type="button"
            className="feTravelForm__travellers"
            onClick={() => setTravellerCount((n) => Math.min(9, n + 1))}
            aria-label="Add travellers"
          >
            <span className="feTravelForm__travellersLeft">
              <span aria-hidden="true">🧑‍🤝‍🧑</span>
              {travellerCount} Traveller(s)
            </span>
            <span className="feTravelForm__travellersAdd">+ Add travellers</span>
          </button>

          <button type="button" className="feTravelForm__cta" onClick={() => onExplorePlans?.()}>
            Explore Plans ›
          </button>
        </section>
      </div>
    )
  }

  return (
    <div className="feInsDetail" aria-label="Insurance detail">
      <div className={`feInsHero feInsHero--${tint}`}>
        <div className="feInsHero__title">{type.title}</div>
        <div className="feInsHero__sub">{type.sub}</div>
      </div>

      <div className="feInsCardX">
        <div className="feInsCardX__title">Premium estimate</div>
        <div className="feInsEstimate">
          <div className="feInsEstimate__row">
            <span>Coverage</span>
            <strong>{formatINR(cover)}</strong>
          </div>
          <input
            className="feRange"
            type="range"
            min="100000"
            max="2000000"
            step="50000"
            value={cover}
            onChange={(e) => setCover(Number(e.target.value))}
          />
          <div className="feInsEstimate__row">
            <span>Tenure</span>
            <strong>{tenure} year{tenure === 1 ? '' : 's'}</strong>
          </div>
          <input
            className="feRange"
            type="range"
            min="1"
            max="5"
            step="1"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
          />
          <div className="feInsEstimate__result">
            <div className="feInsEstimate__k">Estimated premium</div>
            <div className="feInsEstimate__v">{formatINR(estimate)}</div>
          </div>
        </div>
      </div>

      <div className="feInsCardX">
        <div className="feInsCardX__title">Plan comparison</div>
        <div className="feInsPlans" role="list" aria-label="Plan comparison cards">
          {plans.map((p) => (
            <div key={p.id} className="feInsPlan" role="listitem">
              <div className="feInsPlan__top">
                <div className="feInsPlan__name">{p.name}</div>
                <div className="feInsPlan__price">{formatINR(p.price)}/yr</div>
              </div>
              <div className="feInsPlan__desc">{p.desc}</div>
              <button
                type="button"
                className="feBtn feBtn--primary feBtn--full"
                onClick={() => onExplorePlans?.()}
              >
                Explore Insurance
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="feInsCardX">
        <div className="feInsCardX__title">Benefits</div>
        <div className="feInsBenefits">
          {benefits.map((b) => (
            <div key={b} className="feInsBenefit">
              <span className="feInsBenefit__dot" aria-hidden="true" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

