import { useMemo, useState } from 'react'

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

function toneForType(typeId) {
  switch (typeId) {
    case 'health':
      return 'green'
    case 'life':
      return 'navy'
    case 'car':
      return 'orange'
    case 'bike':
      return 'orange'
    case 'travel':
      return 'navy'
    default:
      return 'navy'
  }
}

export default function InsuranceDetailPage({ typeId = 'health', onExplorePlans }) {
  const type = useMemo(() => {
    const map = {
      health: { title: 'Health Insurance', sub: 'Compare plans for you & your family' },
      life: { title: 'Life Insurance', sub: 'Term plans with flexible coverage' },
      car: { title: 'Car Insurance', sub: 'Renew, compare and save instantly' },
      bike: { title: 'Bike Insurance', sub: 'Quick cover with add-ons' },
      travel: { title: 'Travel Insurance', sub: 'Protection for every trip' },
    }
    return map[typeId] ?? map.health
  }, [typeId])

  const tint = toneForType(typeId)
  const [cover, setCover] = useState(500000)
  const [tenure, setTenure] = useState(1)

  const estimate = useMemo(() => {
    // Simple premium heuristic for UI (not real pricing)
    const base = typeId === 'life' ? 900 : typeId === 'travel' ? 650 : 1200
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
    if (typeId === 'life') return ['High coverage options', 'Riders available', 'Flexible tenure', ...common]
    if (typeId === 'car') return ['Zero dep add-on', 'Instant renewal', 'Roadside assistance', ...common]
    if (typeId === 'bike') return ['Theft cover', 'Accident protection', 'Fast claim support', ...common]
    return ['Medical cover', 'Trip delay cover', 'Luggage protection', ...common]
  }, [typeId])

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

