import { useEffect, useMemo, useRef, useState } from 'react'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function useAnimatedNumber(target, { durationMs = 280, reduceMotion = false } = {}) {
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  const rafRef = useRef(0)

  useEffect(() => {
    if (reduceMotion) {
      setValue(target)
      fromRef.current = target
      return
    }

    const from = fromRef.current
    const start = performance.now()

    const tick = (now) => {
      const t = clamp((now - start) / durationMs, 0, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = from + (target - from) * eased
      setValue(next)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else fromRef.current = target
    }

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [durationMs, reduceMotion, target])

  return value
}

export default function PremiumCalculatorLayout({
  ariaLabel,
  topLabel,
  headingPrefix,
  headingHighlight,
  subtitle,
  primaryResult,
  secondaryResult,
  totalResult,
  inputs,
  buttonText = 'Calculate / Apply Now',
  onButtonClick,
  onBack,
  showBack = false,
  reduceMotion = false,
  formatValue = (n) => String(n),
}) {
  const aPrimary = useAnimatedNumber(primaryResult?.value ?? 0, { reduceMotion })
  const aSecondary = useAnimatedNumber(secondaryResult?.value ?? 0, { reduceMotion })
  const aTotal = useAnimatedNumber(totalResult?.value ?? 0, { reduceMotion })

  const normalizedInputs = useMemo(
    () =>
      (inputs ?? []).map((input) => {
        const fill = ((input.value - input.min) / Math.max(1, input.max - input.min)) * 100
        return { ...input, fill: clamp(fill, 0, 100) }
      }),
    [inputs],
  )

  return (
    <div className="feSipModern" aria-label={ariaLabel}>
      {showBack ? (
        <div className="feSipModern__topBar">
          <button
            type="button"
            className="feSipModern__backBtn"
            aria-label="Back"
            onClick={() => {
              if (onBack) onBack()
              else if (typeof window !== 'undefined') window.history.back()
            }}
          >
            ‹
          </button>
        </div>
      ) : null}

      <div className="feSipModern__panel">
        <header className="feSipModern__intro">
          <p className="feSipModern__label">{topLabel}</p>
          <h2 className="feSipModern__heading">
            <span className="feSipModern__headingLine">{headingPrefix}</span>
            <span className="feSipModern__headingLine">
              <span className="feSipModern__grad feSipModern__grad--wealth">{headingHighlight}</span>
            </span>
          </h2>
          <p className="feSipModern__sub">{subtitle}</p>
        </header>

        <div className="feSipModern__resultGrid" role="group" aria-label="Projection summary">
          <div className="feSipModern__resultCard feSipModern__resultCard--invested">
            <span className="feSipModern__resultLabel">{primaryResult?.label ?? 'Invested'}</span>
            <span className="feSipModern__resultValue">
              {primaryResult?.format ? primaryResult.format(aPrimary) : formatValue(aPrimary)}
            </span>
          </div>
          <div className="feSipModern__resultCard feSipModern__resultCard--returns">
            <span className="feSipModern__resultLabel">{secondaryResult?.label ?? 'Returns'}</span>
            <span className="feSipModern__resultValue">
              {secondaryResult?.format ? secondaryResult.format(aSecondary) : formatValue(aSecondary)}
            </span>
          </div>
        </div>

        <div className="feSipModern__totalStrip">
          <span className="feSipModern__totalStripLabel">{totalResult?.label ?? 'Total value'}</span>
          <span className="feSipModern__totalStripValue">
            {totalResult?.format ? totalResult.format(aTotal) : formatValue(aTotal)}
          </span>
        </div>

        <div className="feSipModern__inputs">
          {normalizedInputs.map((input) => (
            <label key={input.id} className="feSipModern__input">
              <div className="feSipModern__inputTop">
                <span>{input.label}</span>
                <strong>{input.display}</strong>
              </div>
              <input
                className={`feSipModern__range ${input.toneClass ?? 'feSipModern__range--blue'}`}
                type="range"
                min={input.min}
                max={input.max}
                step={input.step}
                value={input.value}
                style={{ '--fill': `${input.fill}%` }}
                onChange={(e) => input.onChange(Number(e.target.value))}
              />
              {input.hint ? <span className="feSipModern__hint">{input.hint}</span> : null}
            </label>
          ))}
        </div>

        <button type="button" className="feSipModern__cta" onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}
