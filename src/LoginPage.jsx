import { useState } from 'react'

function EyeIcon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width={18}
      height={18}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
      {!open ? <path d="M4 4l16 16" /> : null}
    </svg>
  )
}

export default function LoginPage({ onLogin, onCreateAccount, onBack, onForgotPassword, onLoginWithOtp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const next = {}
    const e = email.trim()
    if (!e) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) next.email = 'Please enter a valid email address.'
    if (!password) next.password = 'Password is required.'
    else if (password.length < 6) next.password = 'Password must be at least 6 characters.'
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
    const res = (await onLogin?.({ email: email.trim(), password })) ?? { ok: false }
    setLoading(false)
    if (!res.ok) setError(res.message || 'Invalid email or password')
  }

  return (
    <div className="feLoginPage" aria-label="Login">
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

        <div className="feLoginCard__title">Welcome Back 👋</div>
        <div className="feLoginCard__sub">Login to continue</div>

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
          <span className="feField__label">Password</span>
          <div className="feInputWithAction">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`feField__input ${errors.password ? 'feField__input--invalid' : ''}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
                setErrors((prev) => ({ ...prev, password: '' }))
              }}
              placeholder="Enter password"
            />
            <button
              type="button"
              className="feInputActionBtn"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
          {errors.password ? <span className="feField__error">{errors.password}</span> : null}
        </label>

        <button type="button" className="feLoginMetaBtn" onClick={() => onForgotPassword?.()}>
          Forgot Password?
        </button>

        <button type="button" className="feBtn feBtn--secondary feBtn--full" onClick={() => onLoginWithOtp?.()}>
          Login with OTP
        </button>

        {error ? <div className="feAuthError" role="alert">{error}</div> : null}

        <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={submit} disabled={loading}>
          {loading ? (
            <span className="feBtn__loading" aria-label="Logging in">
              <span className="feSpinner" aria-hidden="true" />
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </button>

        <div className="feLoginFooter">
          <span>Don&apos;t have an account?</span>
          <button type="button" className="feLoginMetaBtn" onClick={() => onCreateAccount?.()}>
            Create Account
          </button>
        </div>
      </div>

    </div>
  )
}
