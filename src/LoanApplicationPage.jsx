import { useMemo, useState } from 'react'

export default function LoanApplicationPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loanType, setLoanType] = useState('Personal Loan')
  const [amount, setAmount] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const status = useMemo(() => {
    if (!submitted) return null
    return {
      title: 'Application Submitted',
      text: 'We’ll contact you shortly with the best offers.',
    }
  }, [submitted])

  return (
    <div className="feApplyLoan" aria-label="Loan application">
      <div className="feApplyLoanCard">
        <div className="feApplyLoanCard__title">Loan Application</div>
        <div className="feApplyLoanCard__sub">Fill details to apply instantly.</div>

        <label className="feField">
          <span className="feField__label">Name</span>
          <input className="feField__input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        </label>

        <label className="feField">
          <span className="feField__label">Phone</span>
          <input className="feField__input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" inputMode="numeric" />
        </label>

        <label className="feField">
          <span className="feField__label">Loan type</span>
          <select className="feField__input" value={loanType} onChange={(e) => setLoanType(e.target.value)}>
            <option>Personal Loan</option>
            <option>Home Loan</option>
            <option>Car Loan</option>
            <option>Business Loan</option>
            <option>Education Loan</option>
          </select>
        </label>

        <label className="feField">
          <span className="feField__label">Amount</span>
          <input className="feField__input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 5,00,000" inputMode="numeric" />
        </label>

        <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={() => setSubmitted(true)}>
          Apply Now
        </button>
      </div>

      {status ? (
        <div className="feApplyLoanResult" role="status" aria-live="polite">
          <div className="feApplyLoanResult__title">{status.title}</div>
          <div className="feApplyLoanResult__text">{status.text}</div>
        </div>
      ) : null}
    </div>
  )
}

