import { useMemo, useState } from 'react'

function Icon({ name }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    width: 18,
    height: 18,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'offer':
      return (
        <svg {...common}>
          <path d="M20 12V7a2 2 0 0 0-2-2h-5" />
          <path d="M4 12V7a2 2 0 0 1 2-2h5" />
          <path d="M20 12v5a2 2 0 0 1-2 2h-5" />
          <path d="M4 12v5a2 2 0 0 0 2 2h5" />
          <path d="M9 9h.01" />
          <path d="M15 15h.01" />
          <path d="M8.5 15.5l7-7" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 2l8 4v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4z" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6l4 2" />
        </svg>
      )
    case 'megaphone':
      return (
        <svg {...common}>
          <path d="M3 11v4a2 2 0 0 0 2 2h1" />
          <path d="M7 9v8l10 3V6L7 9z" />
          <path d="M17 6v12" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M3 12h18" />
        </svg>
      )
  }
}

const NOTIF_ICON_BY_TYPE = {
  Offers: 'offer',
  Alerts: 'shield',
  Updates: 'megaphone',
}

export default function NotificationsPage() {
  const [pushEnabled, setPushEnabled] = useState(true)
  const [active, setActive] = useState('Offers')
  const tabs = useMemo(() => ['Offers', 'Alerts', 'Updates'], [])

  const items = useMemo(
    () => [
      {
        id: 'n1',
        type: 'Offers',
        icon: 'offer',
        title: 'Pre-approved card offers',
        text: 'Cashback & rewards — check eligibility before expiry.',
        time: '2 hrs ago',
        unread: true,
      },
      {
        id: 'n2',
        type: 'Offers',
        icon: 'offer',
        title: 'Home loan rate drop',
        text: 'Partners updated rates — compare and save.',
        time: '1 day ago',
        unread: false,
      },
      {
        id: 'n3',
        type: 'Alerts',
        icon: 'shield',
        title: 'CIBIL score refresh available',
        text: 'Refresh to see latest score.',
        time: 'Just now',
        unread: true,
      },
      {
        id: 'n4',
        type: 'Alerts',
        icon: 'shield',
        title: 'Unusual login detected',
        text: 'New device sign-in from Mumbai — was this you?',
        time: '3 days ago',
        unread: false,
      },
      {
        id: 'n5',
        type: 'Updates',
        icon: 'megaphone',
        title: 'FinExpert app update',
        text: 'Faster calculators and new CIBIL insights.',
        time: '5 days ago',
        unread: false,
      },
      {
        id: 'n6',
        type: 'Updates',
        icon: 'megaphone',
        title: 'New blog: SIP tips',
        text: 'Read the latest in Investments.',
        time: '1 week ago',
        unread: false,
      },
    ],
    [],
  )

  const filtered = useMemo(() => {
    if (!pushEnabled) return []
    return items.filter((i) => i.type === active)
  }, [active, items, pushEnabled])

  return (
    <div className="feNotifs" aria-label="Notifications">
      <div className="feNotifsMaster">
        <div className="feNotifsMaster__texts">
          <div className="feNotifsMaster__title">Push notifications</div>
          <div className="feNotifsMaster__sub">Enable or disable all alerts</div>
        </div>
        <button
          type="button"
          className={`feToggle ${pushEnabled ? 'is-on' : ''}`}
          aria-label={pushEnabled ? 'Disable notifications' : 'Enable notifications'}
          aria-pressed={pushEnabled}
          onClick={() => setPushEnabled((v) => !v)}
        >
          <span className="feToggle__dot" aria-hidden="true" />
        </button>
      </div>

      <div className="feNotifsTabs" role="tablist" aria-label="Notification categories">
        {tabs.map((t) => {
          const isActive = t === active
          return (
            <button
              key={t}
              type="button"
              className={`feCatTab ${isActive ? 'is-active' : ''}`}
              onClick={() => setActive(t)}
              role="tab"
              aria-selected={isActive}
              disabled={!pushEnabled}
            >
              {t}
            </button>
          )
        })}
      </div>

      {!pushEnabled ? (
        <div className="feNotifsEmpty" role="status">
          Notifications are turned off. Enable them above to see offers, alerts, and updates.
        </div>
      ) : (
        <div className="feNotifsList" role="list" aria-label="Notifications list">
          {filtered.length === 0 ? (
            <div className="feNotifsEmpty">Nothing in this category yet.</div>
          ) : (
            filtered.map((n) => (
              <button key={n.id} type="button" className={`feNotif ${n.unread ? 'is-unread' : ''}`} role="listitem">
                <span className="feNotif__icon" aria-hidden="true">
                  <Icon name={NOTIF_ICON_BY_TYPE[n.type] || 'shield'} />
                </span>
                <span className="feNotif__mid">
                  <span className="feNotif__title">{n.title}</span>
                  <span className="feNotif__text">{n.text}</span>
                  <span className="feNotif__meta">
                    <span className="feTag feTag--soft">{n.type}</span>
                    <span className="feTime">{n.time}</span>
                  </span>
                </span>
                <span className="feNotif__dot" aria-hidden="true" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
