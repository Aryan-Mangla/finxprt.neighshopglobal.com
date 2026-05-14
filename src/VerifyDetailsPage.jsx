import { useMemo, useState } from 'react'

function FieldIcon({ type }) {
  if (type === 'email') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 8l9 6 9-6" />
      </svg>
    )
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export default function VerifyDetailsPage({ phone = '', onBack, onSubmit }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState(phone.slice(0, 10))
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = useMemo(() => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    return (
      firstName.trim().length >= 2 &&
      lastName.trim().length >= 2 &&
      validEmail &&
      mobile.length === 10 &&
      consent
    )
  }, [firstName, lastName, email, mobile, consent])

  const submit = () => {
    if (!canSubmit) {
      setError('Please complete all details and consent to continue.')
      return
    }
    setError('')
    onSubmit?.({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: mobile,
    })
  }

  return (
    <section className="feVerifyPage" aria-label="Verify your details">
      <div className="feLoginPage__header">
        <div className="feLoginPage__brand" aria-label="FinExprt">
          <span className="feLoginPage__brandFin">Fin</span>
          <span className="feLoginPage__brandXpert">Exprt</span>
        </div>
      </div>

      <div className="feLoginPage__formCard" style={{ overflowY: 'auto' }}>
        <button type="button" className="feVerifyPage__back" onClick={() => onBack?.()} aria-label="Back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="feVerifyPage__content" style={{ display: 'grid', gap: '8px' }}>
          <p className="feVerifyPage__intro">Start your journey to financial freedom</p>
          <h1 className="feVerifyPage__title">Verify Your Details</h1>
          <p className="feVerifyPage__subtitle">We need these details to fetch your credit report.</p>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          <label className="feVerifyField">
            <span>First Name (as per PAN)</span>
            <div className="feVerifyField__box">
              <FieldIcon type="person" />
              <input type="text" maxLength={100} placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
          </label>

          <label className="feVerifyField">
            <span>Last Name (as per PAN)</span>
            <div className="feVerifyField__box">
              <FieldIcon type="person" />
              <input type="text" maxLength={100} placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </label>

          <label className="feVerifyField">
            <span>Email Address</span>
            <div className="feVerifyField__box">
              <FieldIcon type="email" />
              <input type="email" maxLength={100} placeholder="Enter a valid email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </label>

          <label className="feVerifyField">
            <span>Mobile Number (as per PAN)*</span>
            <div className="feVerifyField__box">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.4 2.5a2 2 0 0 1-.6 1.8l-1.1 1.1a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 1.8-.6l2.5.4A2 2 0 0 1 22 16.9z" />
              </svg>
              <input type="tel" inputMode="numeric" maxLength={10} value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} />
            </div>
          </label>
        </div>

        <div className="feVerifyInfo">
          <strong>i</strong>
          <span>This is a soft inquiry and won&apos;t affect your credit score.</span>
        </div>

        <label className="feVerifyConsent">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>
            I hereby accept the <button type="button">terms and conditions</button> of the application.
          </span>
        </label>

        <div className="feVerifySecure">
          <span className="feVerifySecure__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7 3v6c0 4.4-2.9 7.7-7 9-4.1-1.3-7-4.6-7-9V6l7-3z" />
            </svg>
          </span>
          <span>Your data is encrypted and secure. We follow RBI guidelines for data protection.</span>
        </div>

        {error ? <p className="feVerifyError" style={{ color: '#ef4444', fontSize: '13px', fontWeight: '600', textAlign: 'center' }}>{error}</p> : null}

        <button type="button" className="feLoginPage__cta" disabled={!canSubmit} onClick={submit} style={{ marginTop: '12px' }}>
          Verify &amp; Fetch Score
        </button>
      </div>
    </section>
  )
}
