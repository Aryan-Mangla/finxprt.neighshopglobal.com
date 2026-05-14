import { useEffect, useMemo, useState } from 'react'

export default function OtpLoginPage({ onBack, onSuccess, initialPhone = '' }) {
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(90)
  const [error, setError] = useState('')

  const maskedPhone = useMemo(() => {
    const d = initialPhone.replace(/\D/g, '').slice(0, 10)
    if (d.length < 10) return '+91 **********'
    return `+91 ${d}`
  }, [initialPhone])

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const canConfirm = otp.length === 4

  const verify = () => {
    if (!canConfirm) {
      setError('Enter 4-digit OTP.')
      return
    }
    setError('')
    onSuccess?.({ phone: initialPhone, otp })
  }

  return (
    <section className="feOtpPage" aria-label="Verify OTP">
      <div className="feLoginPage__header">
        <div className="feLoginPage__brand" aria-label="FinExprt">
          <span className="feLoginPage__brandFin">Fin</span>
          <span className="feLoginPage__brandXpert">Exprt</span>
        </div>
      </div>

      <div className="feLoginPage__formCard">
        <button type="button" className="feVerifyPage__back" onClick={() => onBack?.()} aria-label="Back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="feVerifyPage__content" style={{ display: 'grid', gap: '8px' }}>
          <p className="feVerifyPage__intro">Start your journey to financial freedom</p>
          <h1 className="feVerifyPage__title">Verify your Number</h1>
          <div style={{ marginTop: '4px' }}>
            <p className="feOtpPage__sub">An OTP was sent to your number</p>
            <p className="feOtpPage__phone">{maskedPhone}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '24px' }}>
          <input
            className="feOtpPage__input"
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="----"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))
              setError('')
            }}
          />
          
          <p className="feOtpPage__timer">
            Resend OTP in <strong>{timer} sec</strong>
          </p>
        </div>

        {error ? <p className="feVerifyError" style={{ color: '#ef4444', fontSize: '13px', fontWeight: '600', textAlign: 'center' }}>{error}</p> : null}
        
        <button type="button" className="feLoginPage__cta" disabled={!canConfirm} onClick={verify}>
          Confirm
        </button>
      </div>
    </section>
  )
}
