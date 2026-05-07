import { useMemo, useState } from 'react'

function formatINR(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

export default function GoalPlannerPage() {
  const [goalAmount, setGoalAmount] = useState(2500000)
  const [years, setYears] = useState(7)
  const [returnRate, setReturnRate] = useState(10)

  const monthlyNeed = useMemo(() => {
    const target = Math.max(0, goalAmount)
    const n = Math.max(1, years * 12)
    const i = Math.max(0, returnRate) / 100 / 12
    if (i === 0) return target / n
    return target / ((((Math.pow(1 + i, n) - 1) / i) * (1 + i)))
  }, [goalAmount, years, returnRate])

  return (
    <section className="feSimpleCalc" aria-label="Goal Planner">
      <label className="feSimpleCalc__field">
        <span>Target Goal Amount</span>
        <input type="number" min="0" value={goalAmount} onChange={(e) => setGoalAmount(Number(e.target.value || 0))} />
      </label>
      <label className="feSimpleCalc__field">
        <span>Time to Goal (Years)</span>
        <input type="number" min="1" value={years} onChange={(e) => setYears(Number(e.target.value || 1))} />
      </label>
      <label className="feSimpleCalc__field">
        <span>Expected Return (% p.a)</span>
        <input
          type="number"
          min="0"
          step="0.1"
          value={returnRate}
          onChange={(e) => setReturnRate(Number(e.target.value || 0))}
        />
      </label>
      <div className="feSimpleCalc__result">
        <div>Required Monthly Investment</div>
        <strong>{formatINR(monthlyNeed)}</strong>
      </div>
    </section>
  )
}
