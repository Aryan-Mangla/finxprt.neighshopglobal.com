import { useState } from 'react'

export default function EditProfilePage({
  initialName = 'Prashant Kumar',
  initialEmail = 'prashant@finexpert.app',
  initialPhone = '9876543210',
  onSave,
}) {
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhone)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [toast, setToast] = useState(false)

  const validate = () => {
    const n = name.trim()
    const e = email.trim()
    const p = phone.replace(/\D/g, '')

    if (!n) return 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return 'Please enter a valid email address.'
    if (p.length > 0 && p.length !== 10) return 'Phone must be 10 digits (or leave blank).'
    return ''
  }

  const save = async () => {
    const msg = validate()
    if (msg) {
      setError(msg)
      setSuccess(false)
      return
    }
    setError('')
    setSaving(true)
    setSuccess(false)

    await new Promise((r) => setTimeout(r, 450))

    const digits = phone.replace(/\D/g, '').slice(0, 10)
    const next = {
      name: name.trim(),
      email: email.trim(),
      phone: digits.length === 10 ? digits : initialPhone,
    }
    onSave?.(next)

    setSaving(false)
    setSuccess(true)
    setToast(true)
    setTimeout(() => setSuccess(false), 5000)
    setTimeout(() => setToast(false), 3200)
  }

  return (
    <div className="feEditProfile" aria-label="Edit profile">
      {success ? (
        <div className="feEditProfile__banner" role="status">
          Your profile was saved. It will show on the Profile tab.
        </div>
      ) : null}

      <div className="feApplyCard" aria-label="Profile form">
        <label className="feField">
          <span className="feField__label">Name</span>
          <input
            className="feField__input"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError('')
            }}
            placeholder="Full name"
            autoComplete="name"
          />
        </label>
        <label className="feField">
          <span className="feField__label">Email</span>
          <input
            className="feField__input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            placeholder="Email address"
            type="email"
            inputMode="email"
            autoComplete="email"
          />
        </label>
        <label className="feField">
          <span className="feField__label">Phone</span>
          <input
            className="feField__input"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              setError('')
            }}
            placeholder="10-digit mobile number"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
          />
        </label>

        {error ? (
          <div className="feEditProfile__error" role="alert">
            {error}
          </div>
        ) : null}

        <button
          type="button"
          className="feBtn feBtn--primary feBtn--full"
          onClick={() => save()}
          disabled={saving}
        >
          {saving ? (
            <span className="feBtn__loading" aria-label="Saving">
              <span className="feSpinner" aria-hidden="true" />
              Saving…
            </span>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      <p className="feEditProfile__hint">Changes apply to this device and sync when you open Profile.</p>

      {toast ? (
        <div className="feToast feToast--high" role="status" aria-live="polite">
          Profile updated successfully
        </div>
      ) : null}
    </div>
  )
}
