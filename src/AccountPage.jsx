export default function AccountPage({ onOpenProfile, onOpenCibil, onOpenApplication }) {
  return (
    <div className="feAccount" aria-label="Account">
      <div className="feAccountHero">
        <div className="feAccountHero__avatar" aria-hidden="true" />
        <div className="feAccountHero__texts">
          <div className="feAccountHero__name">User</div>
          <div className="feAccountHero__email">user@example.com</div>
        </div>
      </div>

      <div className="feAccountCards" aria-label="Account shortcuts">
        <button type="button" className="feAccountCard" onClick={onOpenProfile}>
          <div className="feAccountCard__k">Profile</div>
          <div className="feAccountCard__v">Edit details & settings</div>
        </button>
        <button type="button" className="feAccountCard" onClick={onOpenCibil}>
          <div className="feAccountCard__k">Credit Health</div>
          <div className="feAccountCard__v">View CIBIL dashboard</div>
        </button>
        <button type="button" className="feAccountCard" onClick={onOpenApplication}>
          <div className="feAccountCard__k">Applications</div>
          <div className="feAccountCard__v">Apply to offers in one place</div>
        </button>
      </div>

      <div className="feAccountList" aria-label="Account menu">
        <button type="button" className="feRowBtn" onClick={onOpenProfile}>
          <span className="feRowBtn__k">Settings & Preferences</span>
          <span className="feRowBtn__v">Open</span>
        </button>
        <button type="button" className="feRowBtn" onClick={onOpenApplication}>
          <span className="feRowBtn__k">KYC / Verification</span>
          <span className="feRowBtn__v">Start</span>
        </button>
        <button type="button" className="feRowBtn">
          <span className="feRowBtn__k">Help & Support</span>
          <span className="feRowBtn__v">Chat</span>
        </button>
      </div>
    </div>
  )
}

