import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MessageAlert from '../components/MessageAlert.jsx'
import { createTutor } from '../services/tutorService.js'

const initialForm = {
  tutorName: '',
  language: '',
  hourlyFee: '',
  available: 'true',
}

function AddTutor() {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const name = form.tutorName.trim()
    const lang = form.language.trim()
    const fee = Number(form.hourlyFee)

    if (!name) {
      setError('Tutor name is required and cannot be blank.')
      return
    }
    if (name.length > 100) {
      setError('Tutor name cannot exceed 100 characters.')
      return
    }
    if (!lang) {
      setError('Language is required and cannot be blank.')
      return
    }
    if (lang.length > 60) {
      setError('Language cannot exceed 60 characters.')
      return
    }
    if (isNaN(fee) || fee <= 0) {
      setError('Hourly fee must be greater than zero.')
      return
    }

    setSaving(true)
    try {
      await createTutor({
        tutorName: name,
        language: lang,
        hourlyFee: fee,
        available: form.available === 'true',
      })
      navigate('/tutors', { state: { message: 'Tutor added successfully.' } })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="mb-4">
        <p className="eyebrow mb-2">Add to your community</p>
        <h1 className="page-title mb-2">Add a tutor</h1>
        <p className="page-description mb-0">Enter the tutor details below. The tutor ID is assigned automatically by the database.</p>
      </div>

      <section className="surface-card form-card">
        {error && <MessageAlert type="danger" message={error} onDismiss={() => setError('')} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label" htmlFor="tutorName">Tutor name</label>
            <input
              className="form-control"
              id="tutorName"
              name="tutorName"
              type="text"
              autoComplete="name"
              placeholder="e.g. Maya Chen"
              value={form.tutorName}
              onChange={updateField}
              maxLength={100}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="language">Language taught</label>
            <input
              className="form-control"
              id="language"
              name="language"
              type="text"
              placeholder="e.g. Spanish"
              value={form.language}
              onChange={updateField}
              maxLength={60}
              required
            />
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label" htmlFor="hourlyFee">Hourly fee</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  className="form-control"
                  id="hourlyFee"
                  name="hourlyFee"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="35.00"
                  value={form.hourlyFee}
                  onChange={updateField}
                  required
                />
              </div>
              <div className="form-text">Enter a positive amount per hour (e.g. 35.00).</div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="available">Availability</label>
              <select
                className="form-select"
                id="available"
                name="available"
                value={form.available}
                onChange={updateField}
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>

          <div className="d-flex flex-column-reverse flex-sm-row justify-content-end gap-2 pt-2">
            <Link className="btn btn-light px-4 py-2" to="/tutors">Cancel</Link>
            <button className="btn btn-primary px-4 py-2" type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save tutor'}
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddTutor
