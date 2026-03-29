import { useMemo, useState } from 'react'

function formatINR(value) {
  const rounded = Math.round(value)
  return `₹${rounded.toLocaleString('en-IN')}`
}

function FieldIcon({ children }) {
  return (
    <span className="feField__icon" aria-hidden="true">
      <svg
        className="feField__iconSvg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </span>
  )
}

export default function EligibilityFormPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [income, setIncome] = useState('')
  const [employment, setEmployment] = useState('Salaried')
  const [submitted, setSubmitted] = useState(false)

  const result = useMemo(() => {
    if (!submitted) return null
    const monthlyIncome = Math.max(0, Number(String(income).replace(/[^0-9.]/g, '')) || 0)
    const base = employment === 'Self-employed' ? 18 : employment === 'Student' ? 6 : 14
    const eligible = Math.max(0, monthlyIncome * base)
    return {
      eligible,
      label: eligible > 0 ? 'Eligible Amount' : 'Add income to estimate',
    }
  }, [employment, income, submitted])

  return (
    <div className="feElig" aria-label="Eligibility form">
      <p className="feElig__intro">
        Share a few details — we&apos;ll show an indicative limit based on typical underwriting rules.
      </p>
      <div className="feLoansForm feLoansForm--premium" aria-label="Eligibility form card">
        <div className="feLoansForm__head">
          <div className="feLoansForm__headInner">
            <div className="feLoansForm__headBadge" aria-hidden="true">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L4 6v6c0 5.5 3.5 10.5 8 12 4.5-1.5 8-6.5 8-12V6l-8-4z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 12.5l2 2 3.5-4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="feLoansForm__headText">
              <div className="feLoansForm__headTitle">Your details</div>
              <div className="feLoansForm__headSub">Encrypted · used only for this estimate</div>
            </div>
          </div>
        </div>

        <label className="feField feField--elig">
          <span className="feField__label">Name</span>
          <div className="feField__control">
            <FieldIcon>
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.75" />
            </FieldIcon>
            <input
              className="feField__input feField__input--padded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              name="name"
              autoComplete="name"
            />
          </div>
        </label>

        <label className="feField feField--elig">
          <span className="feField__label">Phone</span>
          <div className="feField__control">
            <FieldIcon>
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.19a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </FieldIcon>
            <input
              className="feField__input feField__input--padded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile number"
              inputMode="numeric"
              name="phone"
              autoComplete="tel"
            />
          </div>
        </label>

        <label className="feField feField--elig">
          <span className="feField__label">Monthly income</span>
          <div className="feField__control">
            <FieldIcon>
              <path
                d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </FieldIcon>
            <input
              className="feField__input feField__input--padded"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g. 80,000"
              inputMode="numeric"
              name="income"
              autoComplete="transaction-amount"
            />
          </div>
        </label>

        <label className="feField feField--elig">
          <span className="feField__label">Employment type</span>
          <div className="feField__control feField__control--select">
            <FieldIcon>
              <rect
                x="2"
                y="7"
                width="20"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <path
                d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </FieldIcon>
            <select
              className="feField__input feField__input--padded feField__input--select"
              value={employment}
              onChange={(e) => setEmployment(e.target.value)}
              aria-label="Employment type"
            >
              <option>Salaried</option>
              <option>Self-employed</option>
              <option>Student</option>
              <option>Retired</option>
            </select>
          </div>
        </label>

        <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={() => setSubmitted(true)}>
          Check Now
        </button>
      </div>

      {result ? (
        <div className="feEligResult" role="status" aria-live="polite">
          <div className="feEligResult__k">{result.label}</div>
          <div className="feEligResult__v">{formatINR(result.eligible)}</div>
          <div className="feEligResult__note">This is an indicative estimate based on your inputs.</div>
        </div>
      ) : null}
    </div>
  )
}
