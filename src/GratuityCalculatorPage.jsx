import { useMemo, useState } from 'react'

function formatINR(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

export default function GratuityCalculatorPage() {
  const [monthlySalary, setMonthlySalary] = useState(50000)
  const [years, setYears] = useState(7)

  const amount = useMemo(() => {
    if (years < 5) return 0
    return (monthlySalary * 15 * years) / 26
  }, [monthlySalary, years])

  return (
    <section className="feSimpleCalc" aria-label="Gratuity Calculator">
      <label className="feSimpleCalc__field">
        <span>Last Drawn Salary (Monthly)</span>
        <input
          type="number"
          min="0"
          step="1000"
          value={monthlySalary}
          onChange={(e) => setMonthlySalary(Number(e.target.value || 0))}
        />
      </label>
      <label className="feSimpleCalc__field">
        <span>Years of Service</span>
        <input
          type="number"
          min="0"
          step="1"
          value={years}
          onChange={(e) => setYears(Number(e.target.value || 0))}
        />
      </label>
      <div className="feSimpleCalc__result">
        <div>Estimated Gratuity</div>
        <strong>{years < 5 ? 'Not eligible (< 5 years)' : formatINR(amount)}</strong>
      </div>
    </section>
  )
}
