import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import MessageAlert from '../components/MessageAlert.jsx'
import { getTutors } from '../services/tutorService.js'

function Dashboard() {
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getTutors()
      .then((data) => {
        if (active) setTutors(data)
      })
      .catch((requestError) => {
        if (active) setError(requestError.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  const availableCount = tutors.filter((tutor) => tutor.available).length

  return (
    <>
      <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4 mb-lg-5">
        <div>
          <p className="eyebrow mb-2">Tutor overview</p>
          <h1 className="page-title mb-2">Your teaching community</h1>
          <p className="page-description mb-0">A clear view of your tutors and their current availability.</p>
        </div>
        <Link className="btn btn-primary px-4 py-2" to="/tutors/add">+ Add a tutor</Link>
      </div>

      {error && <MessageAlert type="danger" message={error} onDismiss={() => setError('')} />}
      {loading ? (
        <LoadingSpinner label="Loading your dashboard…" />
      ) : (
        <div className="row g-3 g-lg-4">
          <div className="col-12 col-md-4">
            <StatCard label="Total tutors" count={tutors.length} icon="✦" />
          </div>
          <div className="col-12 col-md-4">
            <StatCard label="Available now" count={availableCount} icon="✓" />
          </div>
          <div className="col-12 col-md-4">
            <StatCard label="Unavailable" count={tutors.length - availableCount} icon="◷" unavailable />
          </div>
        </div>
      )}
      {!loading && !error && tutors.length === 0 && (
        <div className="surface-card mt-4 p-4 p-md-5 text-center">
          <h2 className="h4">Your tutor list is ready to grow</h2>
          <p className="text-secondary mb-3">Add your first tutor to start tracking language lessons.</p>
          <Link className="btn btn-outline-primary" to="/tutors/add">Add your first tutor</Link>
        </div>
      )}
    </>
  )
}

function StatCard({ label, count, icon, unavailable = false }) {
  return (
    <article className="stat-card">
      <div className="d-flex align-items-center justify-content-between">
        <span className="stat-label">{label}</span>
        <span className={`stat-icon${unavailable ? ' unavailable' : ''}`} aria-hidden="true">{icon}</span>
      </div>
      <p className="stat-value">{count}</p>
    </article>
  )
}

export default Dashboard
