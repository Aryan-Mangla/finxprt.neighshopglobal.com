export default function CibilPage() {
  return (
    <div className="feCibilPage" aria-label="CIBIL Coming Soon">
      <section className="feCibilSoon" aria-label="CIBIL coming soon card">
        <div className="feCibilSoon__badge" aria-hidden="true">
          <span className="feCibilSoon__dot" />
          CREDIT HEALTH
        </div>
        <div className="feCibilSoon__icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M7 14l3-3 3 2 4-5" />
            <path d="M16 8h4v4" />
          </svg>
        </div>
        <div className="feCibilSoon__title">
          Coming <span className="feCibilSoon__titleAccent">Soon</span>
        </div>
        <div className="feCibilSoon__sub">
          We are building a smarter CIBIL dashboard with score insights, factors and weekly tips.
        </div>
        <div className="feCibilSoon__points" aria-label="Upcoming CIBIL features">
          <span className="feCibilSoon__point">Real-time score trends</span>
          <span className="feCibilSoon__point">Personalized improvement tips</span>
          <span className="feCibilSoon__point">Weekly health alerts</span>
        </div>
        <button type="button" className="feBtn feBtn--primary feBtn--full">
          Notify Me
        </button>
      </section>
    </div>
  )
}
