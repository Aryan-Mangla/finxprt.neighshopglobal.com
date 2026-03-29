import { useMemo, useState } from 'react'

export default function ApplicationFormPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [income, setIncome] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const status = useMemo(() => {
    if (!submitted) return null
    return {
      title: 'Application Submitted Successfully',
      text: 'Thanks! Our team will contact you shortly.',
    }
  }, [submitted])

  return (
    <div className="feApply" aria-label="Application form">
      <div className="feApplyCard" aria-label="Application form card">
        <div className="feApplyCard__title">Application Form</div>
        <div className="feApplyCard__sub">Fill details to continue.</div>

        <label className="feField">
          <span className="feField__label">Name</span>
          <input className="feField__input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        </label>

        <label className="feField">
          <span className="feField__label">Phone</span>
          <input className="feField__input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" inputMode="numeric" />
        </label>

        <label className="feField">
          <span className="feField__label">City</span>
          <input className="feField__input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Mumbai" />
        </label>

        <label className="feField">
          <span className="feField__label">Monthly Income</span>
          <input className="feField__input" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="e.g. 80,000" inputMode="numeric" />
        </label>

        <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={() => setSubmitted(true)}>
          Submit Application
        </button>
      </div>

      {status ? (
        <div className="feApplyResult" role="status" aria-live="polite">
          <div className="feApplyResult__title">{status.title}</div>
          <div className="feApplyResult__text">{status.text}</div>
        </div>
      ) : null}
    </div>
  )
}

