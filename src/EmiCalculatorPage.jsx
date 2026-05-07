import { useMemo, useState } from 'react'
import PremiumCalculatorLayout from './PremiumCalculatorLayout.jsx'

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

export default function EmiCalculatorPage({ reduceMotion = false }) {
  const [loanAmount, setLoanAmount] = useState(750000)
  const [interestRate, setInterestRate] = useState(11.5)
  const [tenureYears, setTenureYears] = useState(5)

  const emi = useMemo(() => {
    const P = Math.max(0, loanAmount)
    const annual = Math.max(0, interestRate) / 100
    const n = Math.max(1, Math.round(tenureYears * 12))
    const r = annual / 12

    const monthly =
      r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = monthly * n
    const totalInterest = Math.max(0, totalPayment - P)
    return { monthly, totalPayment, totalInterest }
  }, [interestRate, loanAmount, tenureYears])

  return (
    <PremiumCalculatorLayout
      ariaLabel="EMI Calculator"
      topLabel="EMI Calculator"
      headingPrefix="Plan Your"
      headingHighlight="Loan Cost"
      subtitle="Calculate monthly EMI and total interest quickly"
      primaryResult={{ label: 'Monthly EMI', value: emi.monthly }}
      secondaryResult={{ label: 'Total interest', value: emi.totalInterest }}
      totalResult={{ label: 'Total payment', value: emi.totalPayment }}
      inputs={[
        {
          id: 'loan_amount',
          label: 'Loan amount',
          display: formatINR(loanAmount),
          value: loanAmount,
          min: 50000,
          max: 5000000,
          step: 10000,
          toneClass: 'feSipModern__range--blue',
          hint: '₹50,000 – ₹50,00,000',
          onChange: setLoanAmount,
        },
        {
          id: 'interest_rate',
          label: 'Interest rate',
          display: `${interestRate.toFixed(1)}%`,
          value: interestRate,
          min: 6,
          max: 24,
          step: 0.1,
          toneClass: 'feSipModern__range--violet',
          hint: '6% – 24% annual',
          onChange: setInterestRate,
        },
        {
          id: 'tenure',
          label: 'Tenure',
          display: `${tenureYears} years`,
          value: tenureYears,
          min: 1,
          max: 30,
          step: 1,
          toneClass: 'feSipModern__range--amber',
          hint: '1 – 30 years',
          onChange: setTenureYears,
        },
      ]}
      buttonText="Calculate / Apply Now"
      onButtonClick={() => {
        if (typeof window !== 'undefined') window.location.hash = '#/application_form'
      }}
      reduceMotion={reduceMotion}
      formatValue={formatINR}
    />
  )
}

