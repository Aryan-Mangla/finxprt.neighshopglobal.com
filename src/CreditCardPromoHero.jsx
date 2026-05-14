import { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export const CREDIT_CARD_PROMO_SLIDES = [
  {
    id: 'cashback',
    title: '5% Cashback on All Spends',
    subtitle:
      'Experience the smooth rewards ecosystem and premium lifestyle perks.',
    bg: 'linear-gradient(135deg, #061538 0%, #0b2f73 52%, #1e56d4 100%)',
  },
  {
    id: 'joining',
    title: 'Zero Joining Fee',
    subtitle:
      'Start earning from day one - quick digital onboarding with no upfront card fees on select offers.',
    bg: 'linear-gradient(135deg, #071240 0%, #152c6e 45%, #2563eb 100%)',
  },
  {
    id: 'lounge',
    title: 'Airport Lounge Access',
    subtitle:
      'Complimentary domestic lounge visits every quarter - travel calm before you fly.',
    bg: 'linear-gradient(135deg, #0c1938 0%, #133e7c 50%, #3b82f6 100%)',
  },
  {
    id: 'points',
    title: 'Reward Points on Every Purchase',
    subtitle:
      'Accelerated points on dining, travel and fuel - redeem for vouchers, miles or statement credit.',
    bg: 'linear-gradient(135deg, #052e26 0%, #0b4f6c 48%, #1149ae 100%)',
  },
  {
    id: 'dining',
    title: 'Exclusive Dining Discounts',
    subtitle:
      'Save at partner restaurants and cafes - curated offers for weekday and weekend dining.',
    bg: 'linear-gradient(135deg, #1a0f3d 0%, #312e81 55%, #4338ca 100%)',
  },
]

// Shared promo carousel for credit card eligibility and credit_cards hub routes.
const CreditCardPromoHero = memo(function CreditCardPromoHero({ density = 'default' }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % CREDIT_CARD_PROMO_SLIDES.length)
    }, 5000)
    return () => window.clearInterval(t)
  }, [])

  const slide = CREDIT_CARD_PROMO_SLIDES[idx]
  const rootClass =
    density === 'compact' ? 'feCCPromoHero feCCPromoHero--compact' : 'feCCPromoHero'

  return (
    <div className={rootClass}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.id}
          className="feCCPromoHero__slide"
          style={{ background: slide.bg }}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="feCCPromoHero__figure" aria-hidden="true" />
          <div className="feCCPromoHero__glow" aria-hidden="true" />
          <div className="feCCPromoHero__inner">
            <h1 className="feCCPromoHero__title">{slide.title}</h1>
            <p className="feCCPromoHero__sub">{slide.subtitle}</p>
          </div>
          <div className="feCCPromoHero__dots" role="tablist" aria-label="Promotional slides">
            {CREDIT_CARD_PROMO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`feCCPromoHero__dot${i === idx ? ' is-active' : ''}`}
                aria-label={`Show slide ${i + 1}: ${s.title}`}
                aria-current={i === idx || undefined}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
})

export default CreditCardPromoHero
