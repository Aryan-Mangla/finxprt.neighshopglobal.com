import { useEffect, useMemo, useState } from 'react'

const OPTIONS = [
  { code: 'en', label: 'English', sub: 'App content in English' },
  { code: 'hi', label: 'Hindi', sub: 'App content in Hindi' },
  { code: 'mr', label: 'Marathi', sub: 'Common in Maharashtra' },
  { code: 'bn', label: 'Bengali', sub: 'Common in West Bengal' },
  { code: 'ta', label: 'Tamil', sub: 'Common in Tamil Nadu' },
  { code: 'te', label: 'Telugu', sub: 'Common in Andhra & Telangana' },
  { code: 'kn', label: 'Kannada', sub: 'Common in Karnataka' },
  { code: 'gu', label: 'Gujarati', sub: 'Common in Gujarat' },
  { code: 'pa', label: 'Punjabi', sub: 'Common in Punjab' },
  { code: 'ml', label: 'Malayalam', sub: 'Common in Kerala' },
]

export default function LanguagePage({ initialCode = 'en', onApply }) {
  const [selected, setSelected] = useState(initialCode)
  const [applied, setApplied] = useState(initialCode)
  const [toast, setToast] = useState('')

  useEffect(() => {
    setSelected(initialCode)
    setApplied(initialCode)
  }, [initialCode])

  const selectedLabel = useMemo(
    () => OPTIONS.find((o) => o.code === selected)?.label ?? 'English',
    [selected],
  )

  const apply = () => {
    onApply?.(selected)
    setApplied(selected)
    setToast(`Language changed to ${selectedLabel}`)
    window.setTimeout(() => setToast(''), 3200)
  }

  return (
    <div className="feLanguagePage" aria-label="Language selection">
      <div className="feLanguagePage__meta">
        <span className="feLanguageChip">Current: {OPTIONS.find((o) => o.code === applied)?.label}</span>
      </div>

      <div className="feApplyCard" aria-label="Choose language">
        <div className="feLangChoices" role="radiogroup" aria-label="App language">
          {OPTIONS.map((o) => {
            const isOn = selected === o.code
            return (
              <button
                key={o.code}
                type="button"
                role="radio"
                aria-checked={isOn}
                className={`feLangChoice ${isOn ? 'is-selected' : ''}`}
                onClick={() => setSelected(o.code)}
              >
                <span className="feLangChoice__texts">
                  <span className="feLangChoice__title">{o.label}</span>
                  <span className="feLangChoice__sub">{o.sub}</span>
                </span>
                <span className={`feLangChoice__dot ${isOn ? 'is-on' : ''}`} aria-hidden="true" />
              </button>
            )
          })}
        </div>

        <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={apply}>
          Apply Language
        </button>
      </div>

      <p className="feLanguagePage__hint">
        Language preference is saved on this device and used across your profile flow.
      </p>

      {toast ? (
        <div className="feToast feToast--high" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}
    </div>
  )
}
