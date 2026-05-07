import { useMemo, useState } from 'react'

function formatINR(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

export default function IncomeTaxCalculatorPage() {
  const [annualIncome, setAnnualIncome] = useState(1200000)

  const tax = useMemo(() => {
    const taxable = Math.max(0, annualIncome - 75000)
    let base = 0
    if (taxable > 1200000) base += (taxable - 1200000) * 0.15
    if (taxable > 800000) base += (Math.min(taxable, 1200000) - 800000) * 0.1
    if (taxable > 400000) base += (Math.min(taxable, 800000) - 400000) * 0.05
    return base * 1.04
  }, [annualIncome])

  return (
    <section className="feSimpleCalc" aria-label="Income Tax Calculator">
      <label className="feSimpleCalc__field">
        <span>Annual Income</span>
        <input
          type="number"
          min="0"
          step="10000"
          value={annualIncome}
          onChange={(e) => setAnnualIncome(Number(e.target.value || 0))}
        />
      </label>
      <div className="feSimpleCalc__result">
        <div>Estimated Tax</div>
        <strong>{formatINR(tax)}</strong>
      </div>
    </section>
  )
}
