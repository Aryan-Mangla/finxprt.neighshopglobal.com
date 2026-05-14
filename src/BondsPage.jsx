import { useMemo, useState } from 'react'

function Icon({ name }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    width: 22,
    height: 22,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'gov':
      return (
        <svg {...common}>
          <path d="M4 10h16" />
          <path d="M6 10V8l6-4 6 4v2" />
          <path d="M6.5 10V20" />
          <path d="M10 10V20" />
          <path d="M14 10V20" />
          <path d="M17.5 10V20" />
          <path d="M4 20h16" />
        </svg>
      )
    case 'corp':
      return (
        <svg {...common}>
          <path d="M4 20V8l8-4 8 4v12" />
          <path d="M8 20V10" />
          <path d="M12 20V10" />
          <path d="M16 20V10" />
        </svg>
      )
    case 'taxfree':
      return (
        <svg {...common}>
          <path d="M7 4h10v16H7z" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M12 6v12" />
          <path d="M6 12h12" />
        </svg>
      )
  }
}

function RiskPill({ level }) {
  const tone = level === 'Low' ? 'good' : 'medium'
  return <span className={`feBadge feBadge--${tone}`}>Risk: {level}</span>
}

export default function BondsPage({ onApply }) {
  return (
    <div className="feCibilPage" aria-label="Bonds coming soon">
      <section className="feCibilSoon" aria-label="Bonds coming soon card">
        <div className="feCibilSoon__badge" aria-hidden="true">
          <span className="feCibilSoon__dot" />
          SECURE INVESTMENTS
        </div>
        <div className="feCibilSoon__icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <circle cx="12" cy="16" r="1.5" />
          </svg>
        </div>
        <div className="feCibilSoon__title">
          Bonds <span className="feCibilSoon__titleAccent">Soon</span>
        </div>
        <div className="feCibilSoon__sub">
          We are building a premium marketplace for high-yield corporate and government bonds with institutional-grade security.
        </div>
        <div className="feCibilSoon__points" aria-label="Upcoming Bonds features">
          <span className="feCibilSoon__point">High-Yield Corporate Bonds</span>
          <span className="feCibilSoon__point">Tax-Free Govt. Securities</span>
          <span className="feCibilSoon__point">Zero-Commission Investing</span>
          <span className="feCibilSoon__point">Bank-Grade Asset Security</span>
        </div>
        <button 
          type="button" 
          className="feBtn feBtn--primary feBtn--full" 
          style={{ marginTop: '8px' }}
          onClick={() => {
            if (onApply) onApply('Early Access: Bonds', 'Join the waitlist for premium bond offerings')
          }}
        >
          Get Early Access
        </button>
      </section>
    </div>
  )
}

