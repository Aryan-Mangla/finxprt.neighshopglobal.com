import { useMemo, useState } from 'react'

export default function FullCreditReportPage() {
  const [downloadToast, setDownloadToast] = useState('')

  const personal = useMemo(
    () => ({
      name: 'Rahul Sharma',
      pan: 'ABCDE1234F',
      email: 'rahul.sharma@email.com',
    }),
    [],
  )

  const accounts = useMemo(
    () => [
      { id: 'a1', type: 'Personal Loan', lender: 'HDFC Bank', status: 'Active' },
      { id: 'a2', type: 'Credit Card', lender: 'Axis Bank', status: 'Active' },
      { id: 'a3', type: 'Two-wheeler Loan', lender: 'Bajaj Finserv', status: 'Closed' },
      { id: 'a4', type: 'Credit Card', lender: 'SBI Card', status: 'Closed' },
    ],
    [],
  )

  const paymentMonths = useMemo(
    () => [
      { m: 'Jan', status: 'Paid' },
      { m: 'Feb', status: 'Paid' },
      { m: 'Mar', status: 'Paid' },
      { m: 'Apr', status: 'Late' },
      { m: 'May', status: 'Paid' },
      { m: 'Jun', status: 'Paid' },
    ],
    [],
  )

  const enquiries = useMemo(
    () => [
      { id: 'e1', type: 'Credit Card', by: 'ICICI Bank', date: '12 Mar 2026' },
      { id: 'e2', type: 'Personal Loan', by: 'HDFC Bank', date: '28 Feb 2026' },
      { id: 'e3', type: 'Home Loan', by: 'SBI', date: '05 Jan 2026' },
    ],
    [],
  )

  const onDownload = () => {
    setDownloadToast('Preparing PDF… You will receive it shortly.')
    setTimeout(() => setDownloadToast(''), 2800)
  }

  return (
    <div className="feCreditReport" aria-label="Full credit report">
      <section className="feCreditReport__section" aria-labelledby="cr-personal">
        <h2 id="cr-personal" className="feCreditReport__h">
          Personal Info
        </h2>
        <div className="feCreditReport__card">
          <div className="feCreditReport__row">
            <span className="feCreditReport__k">Name</span>
            <span className="feCreditReport__v">{personal.name}</span>
          </div>
          <div className="feCreditReport__row">
            <span className="feCreditReport__k">PAN</span>
            <span className="feCreditReport__v">{personal.pan}</span>
          </div>
          <div className="feCreditReport__row">
            <span className="feCreditReport__k">Email</span>
            <span className="feCreditReport__v">{personal.email}</span>
          </div>
        </div>
      </section>

      <section className="feCreditReport__section" aria-labelledby="cr-accounts">
        <h2 id="cr-accounts" className="feCreditReport__h">
          Credit Accounts
        </h2>
        <div className="feCreditReport__list" role="list">
          {accounts.map((a) => (
            <div key={a.id} className="feCreditReport__acct" role="listitem">
              <div className="feCreditReport__acctTop">
                <span className="feCreditReport__acctType">{a.type}</span>
                <span
                  className={`feCreditReport__acctStatus ${
                    a.status === 'Active' ? 'is-active' : 'is-closed'
                  }`}
                >
                  {a.status}
                </span>
              </div>
              <div className="feCreditReport__acctLender">{a.lender}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="feCreditReport__section" aria-labelledby="cr-payment">
        <h2 id="cr-payment" className="feCreditReport__h">
          Payment History
        </h2>
        <p className="feCreditReport__hint">Monthly status across your active accounts (sample)</p>
        <div className="feCreditReport__timeline" role="list" aria-label="Payment timeline">
          {paymentMonths.map((p) => (
            <div key={p.m} className="feCreditReport__month" role="listitem">
              <span className="feCreditReport__monthLabel">{p.m}</span>
              <span
                className={`feCreditReport__pill ${p.status === 'Paid' ? 'is-paid' : 'is-late'}`}
              >
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="feCreditReport__section" aria-labelledby="cr-enquiries">
        <h2 id="cr-enquiries" className="feCreditReport__h">
          Credit Enquiries
        </h2>
        <p className="feCreditReport__hint">Recent loan or card applications / checks</p>
        <div className="feCreditReport__list" role="list">
          {enquiries.map((e) => (
            <div key={e.id} className="feCreditReport__enq" role="listitem">
              <div className="feCreditReport__enqTop">
                <span className="feCreditReport__enqType">{e.type}</span>
                <span className="feCreditReport__enqDate">{e.date}</span>
              </div>
              <div className="feCreditReport__enqBy">{e.by}</div>
            </div>
          ))}
        </div>
      </section>

      <button type="button" className="feBtn feBtn--primary feBtn--full" onClick={onDownload}>
        Download Report (PDF)
      </button>

      {downloadToast ? (
        <div className="feToast" role="status" aria-live="polite">
          {downloadToast}
        </div>
      ) : null}
    </div>
  )
}
