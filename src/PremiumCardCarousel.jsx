import { useState, useRef, useMemo } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react'

const CARDS = [
  {
    id: 'prime-gold',
    type: 'PRIME GOLD',
    number: '**** **** **** 7850',
    expiry: '12/29',
    holder: 'PRASHANT KUMAR',
    color: 'linear-gradient(135deg, #d4af37 0%, #f9d976 50%, #b8860b 100%)',
    accent: '#8b6d1b',
    textColor: '#1a1a1a',
    chipColor: '#ffd700'
  },
  {
    id: 'elite-navy',
    type: 'ELITE NAVY',
    number: '**** **** **** 4201',
    expiry: '08/30',
    holder: 'PRASHANT KUMAR',
    color: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    accent: '#64748b',
    textColor: '#f8fafc',
    chipColor: '#94a3b8'
  },
  {
    id: 'emerald-green',
    type: 'EMERALD PLUS',
    number: '**** **** **** 9912',
    expiry: '05/31',
    holder: 'PRASHANT KUMAR',
    color: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #10b981 100%)',
    accent: '#065f46',
    textColor: '#ecfdf5',
    chipColor: '#34d399'
  }
]

const SPRING_CONFIG = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1
}

const CARD_WIDTH = 260
const CARD_GAP = 20
const CARD_OFFSET = CARD_WIDTH + CARD_GAP

function Card({ card, index, x, activeIndex, onClick, onApply }) {
  // ... existing transforms ...
  const relativeX = useTransform(x, (val) => {
    return val + index * CARD_OFFSET
  })

  const scale = useTransform(
    relativeX,
    [-CARD_OFFSET, 0, CARD_OFFSET],
    [0.85, 1, 0.85]
  )

  const opacity = useTransform(
    relativeX,
    [-CARD_OFFSET * 1.5, 0, CARD_OFFSET * 1.5],
    [0.4, 1, 0.4]
  )

  const rotateY = useTransform(
    relativeX,
    [-CARD_OFFSET, 0, CARD_OFFSET],
    [15, 0, -15]
  )

  const translateX = useTransform(
    relativeX,
    [-CARD_OFFSET, 0, CARD_OFFSET],
    [10, 0, -10]
  )

  const boxShadow = useTransform(
    relativeX,
    [-CARD_OFFSET, 0, CARD_OFFSET],
    [
      '0 4px 12px rgba(0,0,0,0.1)',
      '0 25px 50px rgba(0,0,0,0.25)',
      '0 4px 12px rgba(0,0,0,0.1)'
    ]
  )

  return (
    <motion.div
      style={{
        x: translateX,
        left: index * CARD_OFFSET,
        scale,
        opacity,
        rotateY,
        boxShadow,
        zIndex: activeIndex === index ? 10 : 1,
        position: 'absolute',
        width: CARD_WIDTH,
        height: 160,
        borderRadius: 22,
        background: card.color,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'grab',
        perspective: 1000,
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.2)'
      }}
      onTap={onClick}
      whileTap={{ cursor: 'grabbing' }}
    >
      {/* Glossy Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', color: card.textColor }}>
        <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>{card.type}</div>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#eb001b', opacity: 0.9 }} />
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#f79e1b', opacity: 0.9, marginLeft: -12 }} />
        </div>
      </div>

      <div style={{ color: card.textColor, fontSize: 18, letterSpacing: 2, fontWeight: 700, margin: '10px 0', opacity: 0.9 }}>
        {card.number}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: card.textColor }}>
        <div style={{ opacity: 0.9 }}>
          <div style={{ fontSize: 7, fontWeight: 600, opacity: 0.6, marginBottom: 2 }}>VALID THRU</div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>{card.expiry}</div>
        </div>
        <div style={{ textAlign: 'right', opacity: 0.9 }}>
          <div style={{ fontSize: 7, fontWeight: 600, opacity: 0.6, marginBottom: 2 }}>CARD HOLDER</div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>{card.holder}</div>
        </div>
      </div>

      {/* Apply Now Button on Card */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          if (onApply) onApply(`Apply for ${card.type}`, 'Premium credit card application');
        }}
        style={{
          marginTop: 10,
          padding: '6px 14px',
          borderRadius: 20,
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: card.textColor,
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: 0.5,
          alignSelf: 'flex-start',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          pointerEvents: 'auto'
        }}
      >
        APPLY NOW
      </motion.button>
    </motion.div>
  )
}

export default function PremiumCardCarousel({ onCheckEligibility, onApply }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const x = useMotionValue(0)
  const springX = useSpring(x, SPRING_CONFIG)
  const containerRef = useRef(null)

  const handleDragEnd = (event, info) => {
    const threshold = 50
    const offset = info.offset.x
    const velocity = info.velocity.x

    let nextIndex = activeIndex
    if (offset < -threshold || velocity < -500) {
      nextIndex = Math.min(activeIndex + 1, CARDS.length - 1)
    } else if (offset > threshold || velocity > 500) {
      nextIndex = Math.max(activeIndex - 1, 0)
    }

    setActiveIndex(nextIndex)
    x.set(-nextIndex * CARD_OFFSET)
  }

  return (
    <div className="premium-carousel-container" style={{ padding: '16px 0', overflow: 'hidden' }}>
      <div className="premium-carousel-header" style={{ marginBottom: 28, padding: '0 20px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0d2342', marginBottom: 2 }}>Premium Cards</h2>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8' }}>Exclusively curated for you</p>
      </div>

      <div
        ref={containerRef}
        style={{
          height: 200,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
          touchAction: 'none',
          perspective: 1200
        }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -(CARDS.length - 1) * CARD_OFFSET, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{
            x: springX,
            position: 'absolute',
            left: 'calc(50% - 130px)', // CARD_WIDTH / 2
            width: CARDS.length * CARD_OFFSET,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            transformStyle: 'preserve-3d'
          }}
        >
          {CARDS.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              index={index}
              x={springX}
              activeIndex={activeIndex}
              onClick={onCheckEligibility}
              onApply={onApply}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

