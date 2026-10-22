import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ConfirmDelete from '../components/ConfirmDelete.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import MessageAlert from '../components/MessageAlert.jsx'
import { deleteTutor, getTutors } from '../services/tutorService.js'

function TutorList() {
  const location = useLocation()
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState(() => location.state?.message ?? '')
  const [searchTerm, setSearchTerm] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL')

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
    return () => {
      active = false
    }
  }, [])

  async function reloadTutors() {
    setLoading(true)
    setError('')
    try {
      setTutors(await getTutors())
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  async function confirmDelete() {
    if (!selectedTutor) return

    setDeleting(true)
    setError('')
    try {
      await deleteTutor(selectedTutor.id)
      setTutors((current) => current.filter((tutor) => tutor.id !== selectedTutor.id))
      setMessage(`${selectedTutor.tutorName} was removed successfully.`)
      setSelectedTutor(null)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setDeleting(false)
    }
  }

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const term = searchTerm.trim().toLowerCase()
      const matchesSearch =
        !term ||
        String(tutor.id).includes(term) ||
        (tutor.tutorName && tutor.tutorName.toLowerCase().includes(term)) ||
        (tutor.language && tutor.language.toLowerCase().includes(term))

      const matchesAvailability =
        availabilityFilter === 'ALL' ||
        (availabilityFilter === 'AVAILABLE' && tutor.available) ||
        (availabilityFilter === 'UNAVAILABLE' && !tutor.available)

      return matchesSearch && matchesAvailability
    })
  }, [tutors, searchTerm, availabilityFilter])

  return (
    <>
      <div className="d-flex flex-column flex-sm-row align-items-sm-end justify-content-between gap-3 mb-4">
        <div>
          <p className="eyebrow mb-2">Tutor directory</p>
          <h1 className="page-title mb-2">View tutors</h1>
          <p className="page-description mb-0">
            Manage tutor profiles, update hourly fees, and adjust availability in real time.
          </p>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary px-3 py-2"
            type="button"
            onClick={reloadTutors}
            disabled={loading}
            title="Refresh list from backend"
          >
            ↻ Refresh
          </button>
          <Link className="btn btn-primary px-4 py-2" to="/tutors/add">
            + Add a tutor
          </Link>
        </div>
      </div>

      {message && <MessageAlert type="success" message={message} onDismiss={() => setMessage('')} />}
      {error && <MessageAlert type="danger" message={error} onDismiss={() => setError('')} />}

      {/* Filter and Search Bar */}
      {tutors.length > 0 && (
        <div className="surface-card p-3 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-7">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, language, or ID…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-5 d-flex gap-2 align-items-center">
              <select
                className="form-select"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
              >
                <option value="ALL">All Statuses ({tutors.length})</option>
                <option value="AVAILABLE">Available only</option>
                <option value="UNAVAILABLE">Unavailable only</option>
              </select>
              {(searchTerm || availabilityFilter !== 'ALL') && (
                <button
                  type="button"
                  className="btn btn-light text-nowrap"
                  onClick={() => {
                    setSearchTerm('')
                    setAvailabilityFilter('ALL')
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <section className="surface-card overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : error && tutors.length === 0 ? (
          <div className="empty-state">
            <h2 className="h5">Tutors could not be loaded</h2>
            <button
              className="btn btn-outline-primary mt-2"
              type="button"
              onClick={reloadTutors}
            >
              Try again
            </button>
          </div>
        ) : tutors.length === 0 ? (
          <div className="empty-state">
            <div className="stat-icon mx-auto mb-3" aria-hidden="true">
              ✦
            </div>
            <h2 className="h5">No tutors yet</h2>
            <p className="text-secondary mb-3">Add a tutor to see their details here.</p>
            <Link className="btn btn-primary" to="/tutors/add">
              Add your first tutor
            </Link>
          </div>
        ) : filteredTutors.length === 0 ? (
          <div className="empty-state">
            <h2 className="h5">No matching tutors found</h2>
            <p className="text-secondary mb-3">No tutors matched your current search or filter.</p>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => {
                setSearchTerm('')
                setAvailabilityFilter('ALL')
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Tutor</th>
                  <th scope="col">Language</th>
                  <th scope="col">Hourly fee</th>
                  <th scope="col">Availability</th>
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTutors.map((tutor) => (
                  <tr key={tutor.id}>
                    <td className="text-secondary">#{tutor.id}</td>
                    <td className="fw-semibold">{tutor.tutorName}</td>
                    <td>{tutor.language}</td>
                    <td>
                      ${Number(tutor.hourlyFee).toFixed(2)}{' '}
                      <span className="text-secondary">/ hr</span>
                    </td>
                    <td>
                      <span
                        className={`status-badge${tutor.available ? '' : ' unavailable'}`}
                      >
                        {tutor.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <Link
                          to={`/tutors/edit/${tutor.id}`}
                          className="btn btn-sm btn-outline-primary"
                          aria-label={`Edit ${tutor.tutorName}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={() => setSelectedTutor(tutor)}
                          aria-label={`Delete ${tutor.tutorName}`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <ConfirmDelete
        tutor={selectedTutor}
        loading={deleting}
        onCancel={() => setSelectedTutor(null)}
        onConfirm={confirmDelete}
      />
    </>
  )
}

export default TutorList
