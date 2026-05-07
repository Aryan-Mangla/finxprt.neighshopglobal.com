import { useMemo, useState } from 'react'

const PARTNERS = [
  'HDFC BANK',
  'ICICI BANK',
  'LIC HFL',
  'SBI YONO',
  'Union Bank',
  'Bank of Baroda',
  'PNB',
  'Canara Bank',
  'Indian Bank',
  'IOB',
  'BOI',
  'UCO Bank',
  'Bank of Maha',
  'P&S Bank',
  'Central Bank',
]

export default function HomeLoanPage() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [propertyType, setPropertyType] = useState('home')
  const [propertyValue, setPropertyValue] = useState('')

  const canSubmit = useMemo(
    () =>
      fullName.trim().length >= 2 &&
      phone.replace(/\D/g, '').length === 10 &&
      pincode.replace(/\D/g, '').length === 6 &&
      Number((propertyValue || '').replace(/,/g, '')) > 0,
    [fullName, phone, pincode, propertyValue],
  )

  return (
    <section className="feHomeLoan" aria-label="Home loan lead form">
      <article className="feHomeLoanHero" aria-label="Home loan offer">
        <div className="feHomeLoanHero__badge">NEW OFFER</div>
        <div className="feHomeLoanHero__title">Low Interest Rates starting @ 8.40%*</div>
      </article>

      <article className="feHomeLoanForm">
        <h1 className="feHomeLoanForm__title">Get Started</h1>
        <p className="feHomeLoanForm__sub">Enter your details and our expert will contact you.</p>

        <label className="feHomeLoanField">
          <span>Full Name</span>
          <input type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>

        <label className="feHomeLoanField">
          <span>Phone Number</span>
          <div className="feHomeLoanField__phoneWrap">
            <span>+91</span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="9876543210"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
          </div>
        </label>

        <label className="feHomeLoanField">
          <span>Pincode</span>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={6}
            placeholder="400001"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          />
        </label>

        <div className="feHomeLoanField">
          <span>Property Type</span>
          <div className="feHomeLoanTypeRow">
            <button type="button" className={`feHomeLoanType ${propertyType === 'home' ? 'is-active' : ''}`} onClick={() => setPropertyType('home')}>
              <span>Home</span>
            </button>
            <button type="button" className={`feHomeLoanType ${propertyType === 'flat' ? 'is-active' : ''}`} onClick={() => setPropertyType('flat')}>
              <span>Flat</span>
            </button>
          </div>
        </div>

        <label className="feHomeLoanField">
          <span>Property Value (₹)</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="₹ 75,00,000"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value.replace(/[^\d,]/g, ''))}
          />
        </label>

        <button type="button" className="feHomeLoanTalkBtn" disabled={!canSubmit}>
          Talk to Expert
        </button>
        <p className="feHomeLoanPolicy">By clicking, you agree to our Terms and Privacy Policy.</p>
      </article>

      <section className="feHomeLoanPartners" aria-label="Banking partners">
        <h2>Our Banking Partners</h2>
        <div className="feHomeLoanPartners__grid">
          {PARTNERS.map((name) => (
            <div key={name} className="feHomeLoanPartners__item">
              {name}
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
