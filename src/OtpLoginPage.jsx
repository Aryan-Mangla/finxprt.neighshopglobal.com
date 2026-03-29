import { useState } from 'react'

export default function OtpLoginPage({ onBack, onSuccess }) {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const sendOtp = () => {
    const next = {}
    const digits = phone.replace(/\D/g, '')
    if (!digits) next.phone = 'Phone number is required.'
    else if (digits.length !== 10) next.phone = 'Enter a valid 10-digit phone number.'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      return
    }
    setError('')
    setStep(2)
  }

  const verify = async () => {
    const next = {}
    const digits = otp.replace(/\D/g, '')
    if (!digits) next.otp = 'OTP is required.'
    else if (digits.length !== 4 && digits.length !== 6) next.otp = 'Enter a valid 4 or 6 digit OTP.'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      return
    }
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    setLoading(false)
    onSuccess?.({ phone: phone.replace(/\D/g, '') })
  }

  return (
    <div className="feLoginPage" aria-label="Login with OTP">
      <div className="feLoginCard">
        <div className="feLoginTop">
          <button type="button" className="feBackBtn" onClick={() => (step === 1 ? onBack?.() : setStep(1))} aria-label="Back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width={20} height={20} stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="feLoginCard__title">Login with OTP</div>
        <div className="feLoginCard__sub">Quick and secure sign in</div>

        {step === 1 ? (
          <>
            <label className="feField">
              <span className="feField__label">Phone Number</span>
              <input
                className={`feField__input ${errors.phone ? 'feField__input--invalid' : ''}`}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                  setError('')
                  setErrors((prev) => ({ ...prev, phone: '' }))
                }}
                placeholder="Enter 10-digit phone number"
                inputMode="numeric"
              />
              {errors.phone ? <span className="feField__error">{errors.phone}</span> : null}
            </label>
            <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        ) : (
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
            <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={verify} disabled={loading}>
              {loading ? (
                <span className="feBtn__loading" aria-label="Logging in with OTP">
                  <span className="feSpinner" aria-hidden="true" />
                  Verifying...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </>
        )}

        {error ? <div className="feAuthError" role="alert">{error}</div> : null}
      </div>
    </div>
  )
}
