import { useState } from 'react'

export default function ForgotPasswordPage({ onBack, onDone }) {
  const [step, setStep] = useState(1)
  const [identifier, setIdentifier] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const sendOtp = () => {
    const next = {}
    const v = identifier.trim()
    const phoneDigits = v.replace(/\D/g, '')
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    const isPhone = phoneDigits.length === 10
    if (!v) next.identifier = 'Email or phone is required.'
    else if (!isEmail && !isPhone) next.identifier = 'Enter a valid email or 10-digit phone number.'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      return
    }
    setError('')
    setStep(2)
  }

  const verifyOtp = () => {
    const next = {}
    const digits = otp.replace(/\D/g, '')
    if (!digits) next.otp = 'OTP is required.'
    else if (digits.length !== 4 && digits.length !== 6) next.otp = 'Enter a valid 4 or 6 digit OTP.'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      return
    }
    setError('')
    setStep(3)
  }

  const resetPassword = async () => {
    const next = {}
    if (!newPassword) next.newPassword = 'New password is required.'
    else if (newPassword.length < 6) next.newPassword = 'New password must be at least 6 characters.'
    if (!confirmPassword) next.confirmPassword = 'Confirm password is required.'
    else if (newPassword !== confirmPassword) next.confirmPassword = 'Password and confirm password do not match.'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      return
    }
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    setLoading(false)
    onDone?.({ password: newPassword })
  }

  return (
    <div className="feLoginPage" aria-label="Forgot password">
      <div className="feLoginCard">
        <div className="feLoginTop">
          <button type="button" className="feBackBtn" onClick={() => (step === 1 ? onBack?.() : setStep(step - 1))} aria-label="Back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width={20} height={20} stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="feLoginCard__title">Forgot Password</div>
        <div className="feLoginCard__sub">Recover your account securely</div>

        <div className="feAuthSteps">
          <span className={`feAuthStep ${step >= 1 ? 'is-on' : ''}`}>1</span>
          <span className={`feAuthStep ${step >= 2 ? 'is-on' : ''}`}>2</span>
          <span className={`feAuthStep ${step >= 3 ? 'is-on' : ''}`}>3</span>
        </div>

        {step === 1 ? (
          <>
            <label className="feField">
              <span className="feField__label">Email or Phone</span>
              <input
                className={`feField__input ${errors.identifier ? 'feField__input--invalid' : ''}`}
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value)
                  setError('')
                  setErrors((prev) => ({ ...prev, identifier: '' }))
                }}
                placeholder="you@example.com / 9876543210"
              />
              {errors.identifier ? <span className="feField__error">{errors.identifier}</span> : null}
            </label>
            <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <label className="feField">
              <span className="feField__label">Enter OTP (4/6 digit)</span>
              <input
                className={`feField__input feField__input--otp ${errors.otp ? 'feField__input--invalid' : ''}`}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                  setError('')
                  setErrors((prev) => ({ ...prev, otp: '' }))
                }}
                placeholder="Enter OTP"
                inputMode="numeric"
              />
              {errors.otp ? <span className="feField__error">{errors.otp}</span> : null}
            </label>
            <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <label className="feField">
              <span className="feField__label">New Password</span>
              <input
                type="password"
                className={`feField__input ${errors.newPassword ? 'feField__input--invalid' : ''}`}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  setError('')
                  setErrors((prev) => ({ ...prev, newPassword: '' }))
                }}
                placeholder="Enter new password"
              />
              {errors.newPassword ? <span className="feField__error">{errors.newPassword}</span> : null}
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
                placeholder="Confirm new password"
              />
              {errors.confirmPassword ? <span className="feField__error">{errors.confirmPassword}</span> : null}
            </label>
            <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={resetPassword} disabled={loading}>
              {loading ? (
                <span className="feBtn__loading" aria-label="Resetting password">
                  <span className="feSpinner" aria-hidden="true" />
                  Resetting...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </>
        ) : null}

        {error ? <div className="feAuthError" role="alert">{error}</div> : null}
      </div>
    </div>
  )
}
