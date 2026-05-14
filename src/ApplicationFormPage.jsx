import { useState, useEffect, useRef } from 'react'
import { 
  Smartphone, 
  Ticket, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  ExternalLink, 
  Lock,
  ChevronRight,
  ShieldAlert,
  User,
  Mail
} from 'lucide-react'

export default function ApplicationFormPage({ 
  title = 'Application Form', 
  subtitle = 'Fill in the details below to proceed',
  skipOtp = false
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', ''])
  const [step, setStep] = useState('form') // 'form' or 'otp'
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const timerRef = useRef(null)
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]

  const DEVELOPER_OTP = '123456'
  const BANK_REDIRECT_URL = 'https://www.hdfcbank.com/personal/pay/cards/credit-cards'

  useEffect(() => {
    if (success && !skipOtp && countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    } else if (success && !skipOtp && countdown === 0) {
      window.location.href = BANK_REDIRECT_URL
    }
    return () => clearTimeout(timerRef.current)
  }, [success, countdown, skipOtp])

  const handleRequestOtp = () => {
    if (!name.trim()) {
      setError('Please enter your full name.')
      return
    }
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setIsVerifying(true)
    
    // Simulate sending OTP or direct success
    setTimeout(() => {
      setIsVerifying(false)
      if (skipOtp) {
        setSuccess(true)
      } else {
        setStep('otp')
      }
    }, 1200)
  }

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1)
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otpValues]
    newOtp[index] = value
    setOtpValues(newOtp)

    if (value && index < 5) {
      otpRefs[index + 1].current.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpRefs[index - 1].current.focus()
    }
  }

  const handleVerifyOtp = () => {
    const otp = otpValues.join('')
    if (otp !== DEVELOPER_OTP) {
      setError('Invalid OTP. Use: 1 2 3 4 5 6')
      return
    }

    setError('')
    setIsVerifying(true)
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false)
      setSuccess(true)
    }, 1200)
  }

  const goBackToCards = () => {
    clearTimeout(timerRef.current)
    window.location.hash = '#/credit_card_eligibility'
  }

  return (
    <div className="feAppView no-scroll">
      <div className="feAppContainer">
        {/* Progress Header */}
        {/* Progress Header - Hidden for skipOtp (single page flow) */}
        {!success && !skipOtp && (
          <div className="feAppProgress">
            <div className={`feAppProgress__step ${step === 'form' ? 'is-active' : 'is-complete'}`}>
              <span className="feAppProgress__num">{step === 'form' ? '1' : <CheckCircle2 size={14} />}</span>
              <span className="feAppProgress__label">Contact</span>
            </div>
            <div className="feAppProgress__line" />
            <div className={`feAppProgress__step ${step === 'otp' ? 'is-active' : ''}`}>
              <span className="feAppProgress__num">2</span>
              <span className="feAppProgress__label">Verify</span>
            </div>
          </div>
        )}

        <div className="feAppCardMain compact">
          {success ? (
            <div className="feAppSuccessView">
              <div className="feAppSuccessView__icon">
                <div className="feAppSuccessView__ring" />
                <CheckCircle2 size={40} color="var(--success, #22c55e)" strokeWidth={2.5} />
              </div>
              <h2 className="feAppSuccessView__title">{skipOtp ? 'Waitlist Joined!' : 'Verified!'}</h2>
              <p className="feAppSuccessView__sub">
                {skipOtp 
                  ? 'Thank you! We will notify you once early access to Bonds is available.' 
                  : <>Redirecting to secure bank portal in <span className="feAppSuccessView__timer">{countdown}s</span></>
                }
              </p>
              
              <div className="feAppSuccessView__actions">
                <button 
                  type="button" 
                  className="feAppBtn feAppBtn--primary" 
                  onClick={() => window.location.href = BANK_REDIRECT_URL}
                >
                  <ExternalLink size={18} />
                  Apply Now
                </button>
                <button 
                  type="button" 
                  className="feAppBtn feAppBtn--ghost" 
                  onClick={goBackToCards}
                >
                  <ArrowLeft size={18} />
                  Go Back
                </button>
              </div>
            </div>
          ) : step === 'form' ? (
            <div className="feAppFormView">
              <div className="feAppView__header compact">
                <h1 className="feAppView__title">{title}</h1>
                <p className="feAppView__subtitle">{subtitle}</p>
              </div>

              <div className="feAppFormGroup compact">
                <div className="feAppInputWrapper">
                  <span className="feAppInputIcon"><User size={18} /></span>
                  <input 
                    className="feAppInput" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder={name ? "" : "Full Name"} 
                  />
                  <label className={`feAppInputLabel ${name ? 'is-floating' : ''}`}>Full Name*</label>
                </div>

                <div className="feAppInputWrapper">
                  <span className="feAppInputIcon"><Smartphone size={18} /></span>
                  <input 
                    type="tel"
                    className="feAppInput" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                    placeholder={phone ? "" : "Mobile Number"} 
                  />
                  <label className={`feAppInputLabel ${phone ? 'is-floating' : ''}`}>Mobile Number*</label>
                </div>

                <div className="feAppInputWrapper">
                  <span className="feAppInputIcon"><Mail size={18} /></span>
                  <input 
                    type="email"
                    className="feAppInput" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder={email ? "" : "Email Address"} 
                  />
                  <label className={`feAppInputLabel ${email ? 'is-floating' : ''}`}>Email Address*</label>
                </div>

                <div className="feAppInputWrapper">
                  <span className="feAppInputIcon"><Ticket size={18} /></span>
                  <input 
                    className="feAppInput" 
                    value={referralCode} 
                    onChange={(e) => setReferralCode(e.target.value)} 
                    placeholder={referralCode ? "" : "Referral Code"} 
                  />
                  <label className={`feAppInputLabel ${referralCode ? 'is-floating' : ''}`}>Referral Code (Optional)</label>
                </div>
              </div>

              {error && (
                <div className="feAppError">
                  <ShieldAlert size={14} />
                  <span>{error}</span>
                </div>
              )}

              <div className="feAppSecurityNote">
                <Lock size={12} />
                <span>SSL Secured & Encrypted</span>
              </div>

              <button 
                type="button" 
                className={`feAppBtn feAppBtn--primary feAppBtn--full ${isVerifying ? 'is-loading' : ''}`} 
                onClick={handleRequestOtp}
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <span className="feAppBtn__loading">
                    <span className="feAppSpinner" /> Processing...
                  </span>
                ) : (
                  <>
                    {skipOtp ? 'Submit' : 'Submit & Verify'}
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="feAppOtpView">
              <div className="feAppView__header compact">
                <div className="feAppOtpView__icon"><ShieldCheck size={28} color="var(--orange)" /></div>
                <h1 className="feAppView__title">Security Check</h1>
                <p className="feAppView__subtitle">Enter 6-digit code sent to <strong>+91 {phone}</strong></p>
              </div>

              <div className="feAppOtpBoxes">
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpRefs[idx]}
                    type="tel"
                    className="feAppOtpBox"
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    maxLength={1}
                    inputMode="numeric"
                  />
                ))}
              </div>

              {error && (
                <div className="feAppError">
                  <ShieldAlert size={14} />
                  <span>{error}</span>
                </div>
              )}

              <div className="feAppOtpTimer">
                Didn't receive? <button type="button" className="feAppBtn--link">Resend</button>
              </div>

              <div className="feAppView__actionsRow">
                <button 
                  type="button" 
                  className="feAppBtn feAppBtn--secondary feAppBtn--flex" 
                  onClick={() => setStep('form')}
                >
                  <ArrowLeft size={18} />
                  Back
                </button>
                <button 
                  type="button" 
                  className={`feAppBtn feAppBtn--primary feAppBtn--flex ${isVerifying ? 'is-loading' : ''}`} 
                  onClick={handleVerifyOtp}
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    'Verifying...'
                  ) : (
                    'Verify Code'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
