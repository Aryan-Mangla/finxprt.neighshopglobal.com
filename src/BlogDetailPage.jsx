export default function BlogDetailPage({ article, onShare }) {
  const a = article ?? {
    title: 'How to Improve Your CIBIL Score',
    author: 'FinExpert Team',
    date: 'Mar 26, 2026',
    coverLabel: 'Credit Health',
    sections: [
      {
        title: 'Pay EMIs on time',
        text: 'Payment history is the biggest factor. Set autopay reminders and keep a buffer before due dates.',
      },
      {
        title: 'Reduce credit usage',
        text: 'Try to keep utilization below 30%. Pay down revolving balances before statement generation.',
      },
      {
        title: 'Avoid multiple loans',
        text: 'Too many applications in a short time can hurt your score. Apply only when necessary and compare smartly.',
      },
    ],
  }

  return (
    <article className="feBlogDetail" aria-label="Blog detail">
      <div className="feBlogDetail__banner" role="img" aria-label={a.coverLabel ?? 'Article banner'} />

      <div className="feBlogDetail__body">
        <div className="feBlogDetail__topRow">
          <div className="feBlogDetail__meta">
            <div className="feBlogDetail__author">{a.author ?? 'FinExpert Team'}</div>
            <div className="feBlogDetail__date">{a.date ?? ''}</div>
          </div>
          <button type="button" className="feBtn feBtn--secondary" onClick={onShare} aria-label="Share article">
            Share
          </button>
        </div>

        <h1 className="feBlogDetail__title">{a.title}</h1>

        <div className="feBlogDetail__sections" aria-label="Article sections">
          {(a.sections ?? []).map((s) => (
            <section key={s.title} className="feBlogDetail__section" aria-label={s.title}>
              <h2 className="feBlogDetail__h">{s.title}</h2>
              <p className="feBlogDetail__p">{s.text}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}

