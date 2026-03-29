import { useState } from 'react'

const INITIAL_ACCOUNTS = [
  { id: 'a1', name: 'HDFC Bank', detail: 'Savings · ···5012', kind: 'bank' },
  { id: 'a2', name: 'ICICI Bank', detail: 'Salary account · ···8820', kind: 'bank' },
  { id: 'a3', name: 'Axis Bank', detail: 'Credit card · ···7821', kind: 'card' },
]

export default function LinkedAccountsPage() {
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS)
  const [activeId, setActiveId] = useState('a1')
  const [toast, setToast] = useState('')

  const showToast = (text) => {
    setToast(text)
    window.setTimeout(() => setToast(''), 2600)
  }

  const setActive = (id) => {
    setActiveId(id)
    const account = accounts.find((a) => a.id === id)
    if (account) showToast(`${account.name} is now active`)
  }

  const linkNew = () => {
    const id = `new-${Date.now()}`
    const next = {
      id,
      name: 'New bank (demo)',
      detail: 'Pending verification',
      kind: 'bank',
    }
    setAccounts((prev) => [...prev, next])
    setActiveId(id)
    showToast('Account added — complete verification in your bank app.')
  }

  return (
    <div className="feLinkedAccounts" aria-label="Linked accounts">
      <p className="feLinkedAccounts__intro">
        Manage banks and cards connected to FinExpert for insights and offers.
      </p>

      <div className="feSection__head feLinkedAccounts__head">
        <div className="feSection__title">Connected accounts</div>
      </div>

      <div className="feSettingsCard" role="list">
        {accounts.map((a) => {
          const isActive = a.id === activeId
          return (
            <button
              key={a.id}
              type="button"
              className={`feSettingRow feSettingRow--btn feLinkedRow ${isActive ? 'is-active' : ''}`}
              role="listitem"
              onClick={() => setActive(a.id)}
            >
              <div className="feSettingRow__left">
                <span className="feSettingRow__icon" aria-hidden="true">
                  {a.kind === 'card' ? '💳' : '🏦'}
                </span>
                <div className="feSettingRow__texts">
                  <div className="feSettingRow__title">{a.name}</div>
                  <div className="feSettingRow__sub">{a.detail}</div>
                </div>
              </div>
              <span className={`feStatus ${isActive ? 'feStatus--medium' : 'feStatus--good'}`}>
                {isActive ? 'Active' : 'Linked'}
              </span>
            </button>
          )
        })}
      </div>

      <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={linkNew}>
        Link New Account
      </button>

      {toast ? (
        <div className="feToast feToast--high" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}
    </div>
  )
}
