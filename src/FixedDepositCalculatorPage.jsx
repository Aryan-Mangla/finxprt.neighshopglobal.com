import { useMemo, useState } from 'react'
import PremiumCalculatorLayout from './PremiumCalculatorLayout.jsx'

function formatINR(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

export default function FixedDepositCalculatorPage() {
  const [amount, setAmount] = useState(200000)
  const [rate, setRate] = useState(7.1)
  const [years, setYears] = useState(3)

  const maturity = useMemo(() => {
    const p = Math.max(0, amount)
    const r = Math.max(0, rate) / 100
    const n = 4
    const t = Math.max(0, years)
    return p * Math.pow(1 + r / n, n * t)
  }, [amount, rate, years])

  const gain = Math.max(0, maturity - amount)

  return (
    <PremiumCalculatorLayout
      ariaLabel="Fixed Deposit Calculator"
      topLabel="FD Calculator"
      headingPrefix="Grow Your"
      headingHighlight="Savings"
      subtitle="Estimate maturity amount with fixed returns"
      primaryResult={{ label: 'Invested', value: amount }}
      secondaryResult={{ label: 'Returns', value: gain }}
      totalResult={{ label: 'Maturity amount', value: maturity }}
      inputs={[
        {
          id: 'amount',
          label: 'Investment amount',
          display: formatINR(amount),
          value: amount,
          min: 10000,
          max: 5000000,
          step: 10000,
          toneClass: 'feSipModern__range--blue',
          hint: '₹10,000 – ₹50,00,000',
          onChange: setAmount,
        },
        {
          id: 'rate',
          label: 'Interest rate (p.a.)',
          display: `${rate.toFixed(1)}%`,
          value: rate,
          min: 1,
          max: 12,
          step: 0.1,
          toneClass: 'feSipModern__range--violet',
          hint: '1% – 12% annual',
          onChange: setRate,
        },
        {
          id: 'years',
          label: 'Tenure',
          display: `${years} yrs`,
          value: years,
          min: 1,
          max: 20,
          step: 1,
          toneClass: 'feSipModern__range--amber',
          hint: '1 – 20 years',
          onChange: setYears,
        },
      ]}
      buttonText="Calculate / Apply Now"
      onButtonClick={() => {
        if (typeof window !== 'undefined') window.location.hash = '#/application_form'
      }}
      formatValue={formatINR}
    />
  )
}
