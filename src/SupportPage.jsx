import { useState } from 'react'

const FAQS = [
  {
    q: 'How can I refresh my CIBIL score?',
    a: 'Open Credit Health and tap "Refresh Score". It may take a few seconds.',
  },
  {
    q: 'Why is my linked account pending?',
    a: 'Newly linked accounts can take some time for verification from the bank side.',
  },
  {
    q: 'How do I update profile details?',
    a: 'Go to Profile > Edit Profile and tap "Save Changes".',
  },
]

export default function SupportPage() {
  const [name, setName] = useState('')
  const [issue, setIssue] = useState('')
  const [toast, setToast] = useState('')
  const [openFaq, setOpenFaq] = useState(FAQS[0].q)

  const raiseTicket = () => {
    if (!name.trim() || !issue.trim()) {
      setToast('Please fill your name and issue details.')
      window.setTimeout(() => setToast(''), 2200)
      return
    }
    setToast('Ticket raised successfully. Support team will contact you.')
    setName('')
    setIssue('')
    window.setTimeout(() => setToast(''), 2800)
  }

  return (
    <div className="feSupportPage" aria-label="Support">
      <section className="feSection" aria-label="FAQs">
        <div className="feSection__head">
          <div className="feSection__title">FAQs</div>
        </div>
        <div className="feSupportFaqs" role="list">
          {FAQS.map((f) => {
            const isOpen = openFaq === f.q
            return (
              <div key={f.q} className={`feSupportFaq ${isOpen ? 'is-open' : ''}`} role="listitem">
                <button
                  type="button"
                  className="feSupportFaq__btn"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq((prev) => (prev === f.q ? '' : f.q))}
                >
                  <span className="feSupportFaq__q">{f.q}</span>
                  <span className="feSupportFaq__icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen ? <div className="feSupportFaq__a">{f.a}</div> : null}
              </div>
            )
          })}
        </div>
      </section>

      <section className="feSection" aria-label="Contact form">
        <div className="feSection__head">
          <div className="feSection__title">Contact form</div>
        </div>
        <div className="feApplyCard feSupportForm">
          <label className="feField">
            <span className="feField__label">Your Name</span>
            <input
              className="feField__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </label>
          <label className="feField">
            <span className="feField__label">Issue</span>
            <textarea
              className="feField__input feField__input--area"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Describe your issue"
              rows={4}
            />
          </label>
          <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={raiseTicket}>
            Raise Ticket
          </button>
        </div>
      </section>

      {toast ? (
        <div className="feToast feToast--high" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}
    </div>
  )
}
