import { useState } from 'react'

export default function SignupPage({ onSignup, onGotoLogin, onBack, onOpenTerms, onOpenPrivacy }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const next = {}
    if (!fullName.trim()) next.fullName = 'Full name is required.'
    if (!email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Please enter a valid email address.'
    const digits = phone.replace(/\D/g, '')
    if (!digits) next.phone = 'Phone number is required.'
    else if (digits.length !== 10) next.phone = 'Phone number must be 10 digits.'
    if (!password) next.password = 'Password is required.'
    else if (password.length < 6) next.password = 'Password must be at least 6 characters.'
    if (!confirmPassword) next.confirmPassword = 'Confirm password is required.'
    else if (password !== confirmPassword) next.confirmPassword = 'Password and Confirm Password do not match.'
    if (!agreed) next.agreed = 'Please accept Terms & Conditions to continue.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async () => {
    if (!validate()) {
      setError('')
      return
    }
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    const res = (await onSignup?.({
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.replace(/\D/g, ''),
      password,
    })) ?? { ok: false }
    setLoading(false)
    if (!res.ok) setError(res.message || 'Unable to create account. Please try again.')
  }

  return (
    <div className="feLoginPage" aria-label="Signup">
      <div className="feLoginCard">
        <div className="feLoginTop">
          <button type="button" className="feBackBtn" onClick={() => onBack?.()} aria-label="Back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              width={20}
              height={20}
              stroke="currentColor"
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="feLoginBrand" aria-hidden="true">
          <span className="feLoginBrand__logo">FE</span>
          <span className="feLoginBrand__name">FinExpert</span>
        </div>

        <div className="feLoginCard__title">Create Account</div>
        <div className="feLoginCard__sub">Register to get started</div>

        <label className="feField">
          <span className="feField__label">Full Name</span>
          <input
            className={`feField__input ${errors.fullName ? 'feField__input--invalid' : ''}`}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value)
              setError('')
              setErrors((prev) => ({ ...prev, fullName: '' }))
            }}
            placeholder="Enter full name"
          />
          {errors.fullName ? <span className="feField__error">{errors.fullName}</span> : null}
        </label>

        <div className={`feConsent ${errors.agreed ? 'is-invalid' : ''}`}>
          <label className="feConsent__row">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked)
                setErrors((prev) => ({ ...prev, agreed: '' }))
              }}
            />
            <span>
              I agree to{' '}
              <button type="button" className="feLinkBtn" onClick={() => onOpenTerms?.()}>
                Terms &amp; Conditions
              </button>{' '}
              and{' '}
              <button type="button" className="feLinkBtn" onClick={() => onOpenPrivacy?.()}>
                Privacy Policy
              </button>
            </span>
          </label>
          {errors.agreed ? <span className="feField__error">{errors.agreed}</span> : null}
        </div>

        <label className="feField">
          <span className="feField__label">Email</span>
          <input
            type="email"
            className={`feField__input ${errors.email ? 'feField__input--invalid' : ''}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
              setErrors((prev) => ({ ...prev, email: '' }))
            }}
            placeholder="you@example.com"
          />
          {errors.email ? <span className="feField__error">{errors.email}</span> : null}
        </label>

        <label className="feField">
          <span className="feField__label">Phone Number</span>
          <input
            type="tel"
            className={`feField__input ${errors.phone ? 'feField__input--invalid' : ''}`}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              setError('')
              setErrors((prev) => ({ ...prev, phone: '' }))
            }}
            placeholder="10-digit phone number"
          />
          {errors.phone ? <span className="feField__error">{errors.phone}</span> : null}
        </label>

        <label className="feField">
          <span className="feField__label">Password</span>
          <input
            type="password"
            className={`feField__input ${errors.password ? 'feField__input--invalid' : ''}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
              setErrors((prev) => ({ ...prev, password: '' }))
            }}
            placeholder="Create password"
          />
          {errors.password ? <span className="feField__error">{errors.password}</span> : null}
        </label>

        <label className="feField">
          <span className="feField__label">Confirm Password</span>
          <input
            type="password"
            className={`feField__input ${errors.confirmPassword ? 'feField__input--invalid' : ''}`}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setError('')
              setErrors((prev) => ({ ...prev, confirmPassword: '' }))
            }}
            placeholder="Confirm password"
          />
          {errors.confirmPassword ? <span className="feField__error">{errors.confirmPassword}</span> : null}
        </label>

        {error ? <div className="feAuthError" role="alert">{error}</div> : null}

        <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={submit} disabled={loading}>
          {loading ? (
            <span className="feBtn__loading" aria-label="Creating account">
              <span className="feSpinner" aria-hidden="true" />
              Creating...
            </span>
          ) : (
            'Create Account'
          )}
        </button>

        <div className="feLoginFooter">
          <span>Already have an account?</span>
          <button type="button" className="feLoginMetaBtn" onClick={() => onGotoLogin?.()}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
