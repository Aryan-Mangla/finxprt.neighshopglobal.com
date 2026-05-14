import { useMemo, useState } from 'react'

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

export default function InsuranceExplorerPage({ typeId = 'health', onApply }) {
  const [maxPrice, setMaxPrice] = useState(2500)
  const [coverage, setCoverage] = useState(500000)

  const title = useMemo(() => {
    const map = {
      health: 'Health Insurance Plans',
      term: 'Term Insurance Plans',
      life: 'Life Insurance Plans',
      car: 'Car Insurance Plans',
      bike: 'Bike Insurance Plans',
      travel: 'Travel Insurance Plans',
      commercial: 'Commercial Vehicle Insurance Plans',
    }
    return map[typeId] ?? 'Insurance Plans'
  }, [typeId])

  const plans = useMemo(() => {
    const base = [
      { id: 'e', name: 'Essential', perks: 'Cashless • Basic cover', price: 1499, cover: 500000 },
      { id: 's', name: 'Smart', perks: 'Most popular • Add-ons', price: 1999, cover: 700000 },
      { id: 'p', name: 'Premium', perks: 'Max benefits • Faster claims', price: 2499, cover: 1000000 },
    ]
    return base.filter((p) => p.price <= maxPrice && p.cover >= coverage)
  }, [coverage, maxPrice])

  return (
    <div className="feInsExp" aria-label="Insurance plans explorer">
      <div className="feInsExpTop">
        <div className="feInsExpTop__title">{title}</div>
        <div className="feInsExpTop__sub">Compare plans, benefits and pricing.</div>
      </div>

      <div className="feInsFilters" aria-label="Filters">
        <div className="feInsFilters__head">Filters</div>

        <label className="feCalcInput">
          <div className="feCalcInput__top">
            <span>Max price</span>
            <strong>{formatINR(maxPrice)}/yr</strong>
          </div>
          <input
            className="feRange"
            type="range"
            min="500"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>

        <label className="feCalcInput">
          <div className="feCalcInput__top">
            <span>Min coverage</span>
            <strong>{formatINR(coverage)}</strong>
          </div>
          <input
            className="feRange"
            type="range"
            min="100000"
            max="2000000"
            step="50000"
            value={coverage}
            onChange={(e) => setCoverage(Number(e.target.value))}
          />
        </label>
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
              <div className="feInsPlan__desc">{p.perks}</div>
              <button
                type="button"
                className="feBtn feBtn--primary feBtn--full"
                onClick={() => {
                  const cleanTitle = title.replace(' Plans', '')
                  if (onApply) {
                    onApply(`Apply for ${cleanTitle}`, `${p.name} Plan • ${formatINR(p.cover)} cover`)
                  }
                }}
              >
                Buy Now
              </button>
            </div>
          ))}
          {plans.length === 0 ? (
            <div className="feEmpty">No plans match your filters. Try relaxing filters.</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

