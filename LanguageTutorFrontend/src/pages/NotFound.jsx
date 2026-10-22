import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="surface-card p-5 text-center">
      <p className="eyebrow mb-2">404 · Page not found</p>
      <h1 className="page-title">This page wandered off</h1>
      <p className="page-description mx-auto mb-4">The address may be incorrect, or the page may have moved.</p>
      <Link className="btn btn-primary" to="/dashboard">Back to dashboard</Link>
    </div>
  )
}

export default NotFound
